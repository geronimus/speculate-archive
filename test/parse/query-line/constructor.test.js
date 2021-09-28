const { assert } = require( "chai" );
const { QueryLine, QueryText } = require( "../../../src/parse/query-text" );
const { errorType } = require( "../../../src/text/error" );

describe( "QueryLine( text, parent )", () => {

  const defaultParent = QueryText( "default parent" );

  it( "Rejects non-string arguments for text.", () => {
  
    [ undefined, null, true, 1, { text: true }, [ "text" ] ]
      .forEach( nonString => {
        assert.throws(
          () => { QueryLine( nonString, defaultParent ); },
          TypeError
        );  
      });
  });

  it( "Rejects multiline text.", () => {

    [
			"one\ntwo",
			"one\r\ntwo",
			"one\u2028two",
			"one\u2029two"
		].forEach( multilineString => {
    
      let err = undefined;

      try {
        QueryLine( multilineString, defaultParent )
      } catch ( e ) {
        err = e;
      }

      assert.strictEqual( err.name, errorType.multilineTextNotAllowed );
    });
  });

  it( "Returns a new object of type QueryLine.", () => {
  
    assert.instanceOf( QueryLine( "", defaultParent ), QueryLine );
  });

  it( "Rejects parent arguments that are not of type QueryText.", () => {
    
    [ undefined, null, true, 1, "parent" ].forEach( badParent => {
      assert.throws(
        () => { QueryLine( "", badParent ) },
        TypeError
      );  
    });
  });
});


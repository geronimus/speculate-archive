const { assert } = require( "chai" );
const { QueryText } = require( "../../../src/parse/query-text" );

describe( "QueryText( text )", () => {

  it( "Rejects non-string arguments", () => {
  
    [ undefined, null, true, 1, { text: true }, [ "text" ] ]
      .forEach( nonString => {
        assert.throws(
          () => { QueryText( nonString ); },
          TypeError
        );  
      });
  });

  it( "Returns a new object of type QueryText.", () => {
  
    assert.instanceOf( QueryText( "" ), QueryText );
  });
});


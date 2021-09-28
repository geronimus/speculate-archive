const { assert } = require( "chai");
const { QueryLine, QueryText } = require( "../../../src/parse/query-text" );

describe( "QueryText methods", () => {

  describe( ".getLine( lineNumber )", () => {
  
    it( "Rejects non-numbers.", () => {
    
      [ undefined, null, true, "1" ].forEach( nonNumber => {
        assert.throws(
          () => {
            QueryText( "SELECT *\nFROM TABLE" ).getLine( nonNumber );
          },
          TypeError
        );
      });
    });

    it(
      "Throws a RangeError when the number is outside the (1-based) " +
        "boundaries of the QueryLines collection.",
      () => {
        [ 0, 3 ].forEach( index => {
        
          const query = QueryText( "SELECT *\nFROM TEXT" );
          assert.throws(
            () => { query.getLine( index ); },
            RangeError
          );
        });
      }
    );

    it( "Returns a QueryLine object containing the text of that line.", () => {
    
      const line1 = "SELECT *";
      const line2 = "FROM TABLE";
      const text = [ line1, line2 ].join( "\r\n" );
      const example = QueryText( text );

      assert.instanceOf( example.getLine( 1 ), QueryLine );
      assert.strictEqual( example.getLine( 1 ).text, line1 );
      assert.instanceOf( example.getLine( 2 ), QueryLine );
      assert.strictEqual( example.getLine( 2 ).text, line2 );
    }); 
  });

  describe( ".getChar( line, position )", () => {
    
    it( "Throws a TypeError is either argument is not a number.", () => {
    
      [
        [ 1, "1" ],
        [ "1", 1 ]
      ].forEach( badParams => {
      
        assert.throws(
          () => {
            QueryText( "SELECT * FROM TABLE" )
              .getChar( badParams[ 0 ], badParams[ 1 ] )
          },
          TypeError
        );
      });
    });

    it( "Returns the character at the line and position indicated.", () => {
    
      line1 = "1234567890";
      line2 = "abcdefghij";
      const example = QueryText( [ line1, line2 ].join( "\r\n" ) );

      assert.strictEqual( example.getChar( 2, 9 ), "i" );
      assert.strictEqual( example.getChar( 1, 9 ), "9" );
      assert.strictEqual( example.getChar( 2, 3 ), "c" );
      assert.strictEqual( example.getChar( 2, 7 ), "g" );
    });
  });
});


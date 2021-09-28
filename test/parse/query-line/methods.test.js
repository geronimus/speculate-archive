const { assert } = require( "chai" );
const { QueryLine, QueryText } = require( "../../../src/parse/query-text" );

describe( "QueryLine methods", () => {

  const defaultParent = QueryText( "default parent" );

  describe( ".position( charNumber )", () => {
  
    it( "Throws a TypeError if charNumber is not a number.", () => {
      
      [ undefined, null, true, "1" ].forEach( nonNumber => () => {
      
        assert.throws(
          () => {
            QueryLine( "SELECT * FROM TABLE", defaultParent )
              .getPosition( nonNumber );
          },
          TypeError
        );
      });
    });

    it(
      "Throws a RangeError if charNumber is outside of the 1-based " +
        "character collection.",
      () => {
        [ 0, 20 ].forEach( badIndex => {
          assert.throws(
            () => {
              QueryLine( "SELECT * FROM TABLE", defaultParent )
                .getPosition( badIndex );
            },
            RangeError
          );  
        });
      }
    );

    it( "Returns the character at the 1-based index specified.", () => {
      
      [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ].forEach( humanIndex => {
      
        assert.strictEqual(
          QueryLine( "123456789", defaultParent ).getPosition( humanIndex ),
          humanIndex.toString()
        );
      });
    });
  });
});


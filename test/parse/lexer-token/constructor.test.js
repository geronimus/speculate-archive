const { assert } = require( "chai" );
const LexerToken = require( "../../../src/parse/lexer-token" );
const { QueryText } = require( "../../../src/parse/query-text" );
const { errorType } = require( "../../../src/util/error" );

describe( "LexerToken( props )", () => {

  const defaultQuery = QueryText( "SELECT *\r\nFROM TABLE\r\nWHERE 1 = 1" );
  const defaultProps = Object.freeze({
    name: "select-keyword",
    queryText: defaultQuery,
    startLine: 1,
    startPos: 1,
    endLine: 1,
    endPos: 7
  });
  
  it( "Rejects props arguments that are not objects.", () => {
  
    [
      undefined,
      null,
      true,
      1,
      "select-keyword",
      [ "name", "select-keyword" ]
    ].forEach( badInit => {
      assert.throws(
        () => { LexerToken( badInit ); },
        TypeError
      );
    });
  });

  it( "Rejects props arguments that are missing required properties.", () => {
    
    Object.getOwnPropertyNames( defaultProps ).forEach( excludedProp => {
      
      const badProps = {};
      Object.getOwnPropertyNames( defaultProps )
        .filter( prop => prop !== excludedProp )
        .forEach( prop => {
          badProps[ prop ] = defaultProps[ prop ];  
        });

      let err = undefined;
      try {
        LexerToken( badProps );  
      } catch ( e ) {
        err = e;
      }
      assert.instanceOf( err, Error );
      assert.strictEqual( err.name, errorType.requiredPropertyMissing );
    });
  });

  it( "Rejects props arguments that are of the wrong type.", () => {
  
    const badProps = {
      name: { name: "select-keyword" },
      queryText: { text: "SELECT *\r\nFROM TABLE\r\nWHERE 1 = 1" },
      startLine: "1",
      startPos: "1",
      endLine: "1",
      endPos: "7"
    };

    Object.getOwnPropertyNames( defaultProps ).forEach( replacedProp => {
    
      const poisonedProps = {};
      Object.getOwnPropertyNames( defaultProps )
        .filter( defaultProp => defaultProp !== replacedProp )
        .forEach( defaultProp => {
          poisonedProps[ defaultProp ] = defaultProps[ defaultProp ];
        });

      poisonedProps[ replacedProp ] = badProps[ replacedProp ];
      
      assert.throws(
        () => { LexerToken( poisonedProps ); },
        TypeError
      );
    });
  });

  it(
    "When correctly initialized, returns an object of type LexerToken.",
    () => {
      assert.instanceOf( LexerToken( defaultProps ), LexerToken );
    }
  );
});
 

const { assert } = require( "chai" );
const LexerToken = require( "../../../src/parse/lexer-token" );
const { QueryText } = require( "../../../src/parse/query-text" );

describe( "LexerToken properties", () => {

  const defaultQuery = QueryText( "SELECT *\r\nFROM TABLE\r\nWHERE 1 = 1" );
  const defaultProps = Object.freeze({
    name: "select-keyword",
    queryText: defaultQuery,
    startLine: 1,
    startPos: 1,
    endLine: 1,
    endPos: 7
  });
  
  it(
    "A LexerToken is a structure containing all of its initializer arguments.",
    () => {
      const example = LexerToken( defaultProps );
      Object.getOwnPropertyNames( defaultProps ).forEach( prop => {
      
        assert.strictEqual( example[ prop ], defaultProps[ prop ] );
      });
    }
  );
});


const { assert } = require( "chai" );
const LexerToken = require( "../../../src/parse/lexer-token" );
const { QueryText } = require( "../../../src/parse/query-text" );

describe( "LexerToken methods", () => {

  const defaultQuery = QueryText( "SELECT *\r\nFROM TABLE\r\nWHERE 1 = 1" );
  const select = LexerToken({
    name: "select-keyword",
    queryText: defaultQuery,
    startLine: 1,
    startPos: 1,
    endLine: 1,
    endPos: 7
  });
  const from = LexerToken({
    name: "from-keyword",
    queryText: defaultQuery,
    startLine: 2,
    startPos: 1,
    endLine: 2,
    endPos: 5
  });

  describe( ".getText()", () => {
    
    it(
      "Returns an end-of-line-normalized string representation of the source " +
        "queryText region representing the token.",
      () => {
        assert.strictEqual( select.getText(), "SELECT " );  
        assert.strictEqual( from.getText(), "FROM " );  

        const multilineTokenQuery = QueryText(
          "SELECT *\r\nFROM TABLE\r\nWHERE 1 =\r\n  1"
        );
        const multilineExample = LexerToken({
          name: "logical-expression",
          queryText: multilineTokenQuery,
          startLine: 3,
          startPos: 7,
          endLine: 4,
          endPos: 3
        });

        assert.strictEqual( multilineExample.getText(), "1 =\n  1" );
      }
    );
  });
  
  describe( ".toString()", () => {
  
    it( "Has the form: <name start=\"x,y\" end=\"x,y\"/>", () => {
      assert.strictEqual(
        select.toString(),
        "<select-keyword start=\"1,1\" end=\"1,7\"/>"
      );

      assert.strictEqual(
        from.toString(),
        "<from-keyword start=\"2,1\" end=\"2,5\"/>"
      );
    });
  });
});

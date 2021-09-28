const { assert } = require( "chai" );
const { QueryText } = require( "../../../src/parse/query-text" );

describe( "QueryText properties", () => {

  describe( ".text", () => {
    
    it( "Returns the full original text.", () => {

      [ "", "SELECT * FROM TABLE", "1\n2\r\n3" ].forEach( initText => {
        
        const example = QueryText( initText );
        assert.strictEqual( example.text, initText );
      });
    });
  });

  describe( ".lines", () => {
    
    it(
      "Returns an array of QueryLines of the same length as the number of " +
        "lines in the input text.",
      () => {
        [
          [ "", 1 ],
          [ "SELECT * FROM TABLE", 1 ],
          [ "SELECT *\nFROM TABLE", 2 ],
          [ "SELECT *\nFROM TABLE\nWHERE 1 = 1;\n\nSELECT * FROM TABLE", 5 ],
          [ "SELECT *\r\nFROM TABLE\r\nWHERE 1 = 1;\nSELECT * FROM TABLE", 4 ]
        ].forEach( testTuple => {
          const example = QueryText( testTuple[ 0 ] );
          assert.strictEqual( example.lines.length, testTuple[ 1 ] );
        });
      }
    );
  });
});


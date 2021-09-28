const { assert } = require( "chai" );
const { QueryLine, QueryText } = require( "../../../src/parse/query-text" );

describe( "QueryLine properties", () => {

  const defaultParent = QueryText( "default parent" );

  describe( ".text", () => {
    
    it( "Returns the full original text.", () => {

      [ "", "SELECT * FROM TABLE" ].forEach( initText => {
        
        const example = QueryLine( initText, defaultParent );
        assert.strictEqual( example.text, initText );
      });
    });
  });

  describe( ".parent", () => {
  
    it(
      "When initialized by a QueryText object, the QueryLine retains that " +
        "object as its parent.",
      () => {
        const example = QueryText( "SELECT *\nFROM TABLE\nWHERE 1 = 1" );
        example.lines.forEach( line => {
        
          assert.strictEqual( line.parent, example );
        });
      }
    );
  });
});


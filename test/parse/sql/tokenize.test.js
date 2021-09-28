const { assert } = require( "chai" );
const tokenize = require( "../../../src/parse/sql/tokenize" );
const { QueryText } = require( "../../../src/parse/query-text" );

describe( "tokenize( queryText )", () => {
  
  it( "Rejects non-QueryText arguments.", () => {
  
    [
      undefined,
      null,
      true,
      1,
      "SELECT * FROM TABLE",
      { text: "SELECT * FROM TABLE" }
    ].forEach( badType => {
      
      assert.throws(
        () => { tokenize( badType ); },
        TypeError
      );
    });
  });
});


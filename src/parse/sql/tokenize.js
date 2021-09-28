const LexerToken = require( "../lexer-token" );
const { QueryText } = require( "../query-text" );
const TypeErr = require( "../../util/type-err" );

const clauseOrder = [
  "WITH",
  "SELECT",
  "FROM",
  "WHERE",
  "GROUP BY",
  "HAVING",
  "ORDER BY"
];

function tokenize( queryText ) {
  
  if ( !( queryText instanceof QueryText ) )
    throw TypeErr( "queryText", "QueryText", queryText );

  let buffer = "";
  let line = 1;
  let pos = 1;
  let tokens = [];

  let statementNumber = 1;
  let clause = 0;

  while ( line <= queryText.lines.length ) {
  
    line += 1;
  }

  return tokens.slice( 0 );
}

module.exports = tokenize;


const controlCharacters = (() => {

  let result = [];

  for ( let i = 0; i < 160; i += 1 ) {
    if ( i < 32 && i > 126 ) {
      result.push( String.fromCodePoint( i ) );  
    }  
  }

  return Object.freeze( result );
})();

const linebreakCharacters = Object.freeze([
  "\u000A", "\u000D", "\u2028", "\u2029"
]);

const spaceCharacters = Object.freeze([
  "\u0009", "\u000B", "\u000C", "\u0020", "\u00A0", "\uFEFF"
]);

function isMultiline( text ) {

  if ( typeof text !== "string" )
    return false;
  else return linebreakCharacters
    .filter( char => [ ...text ].includes( char ) )
    .length > 0;
}

module.exports = {
  controlCharacters,
  linebreakCharacters,
  isMultiline,
  spaceCharacters
};


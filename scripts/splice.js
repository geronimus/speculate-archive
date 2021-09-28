const resolveTypeName = require( "./src/util/resolve-type-name" );

function splice( templateText, replacerObj ) {

  if ( typeof templateText !== "string" )
    throw new TypeError(
      `Expected: string\Found: ${ resolveTypeName( templateText ) }`
    );
  else if ( typeof replacerObj !== "object" || replacerObj === null )
    throw new TypeError(
      `Expected: object\nFound: ${ resolveTypeName( replacerObj ) }`
    );

  let result = templateText;

  const replacePattern = /{{{([^}]+?)}}}/g/;
  const placeholders = {};
  let match = replacePattern.exec( templateText );

  while ( match !== null ) {
    placeholders[ match[ 1 ] ] = match[ 0 ];
    match = replacePattern.exec( templateText );
  }

  Object.getOwnPropertyNames( placeholders ).forEach(
    placeholder => {
      if (
        replacerObj.hasOwnProperty( placeholder ) &&
          typeof replacerObj[ placeholder ] === "string"
      ) {
        const searchText = new RegExp( placeholders[ placeholder ], "g" );
        result = result.replace( searchText, replacerObj[ placeholder ] );
      }
    }
  );

  return result;
}

module.exports = splice;


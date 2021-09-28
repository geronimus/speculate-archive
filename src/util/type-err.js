const resolveTypeName = require( "./resolve-type-name" );

function TypeErr( refName, expectedTypeName, foundInstance ) {

  return new TypeError(
    `Reading reference: ${ refName }\n` +
      `  Expected: ${ expectedTypeName }\n` +
      `  Found: ${ resolveTypeName( foundInstance ) }`
  );
}

module.exports = TypeErr;


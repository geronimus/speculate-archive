const TypeErr = require( "./type-err" );

function defineReadOnly( obj, propertyMap ) {
  
  if ( obj === null || typeof obj !== "object" )
    throw TypeErr( "object", obj );
  else if ( Object.isFrozen( obj ) )
    throw new TypeError( "The object passed as `obj` must not be frozen." );
  else if ( propertyMap === null || typeof propertyMap !== "object" )
    throw TypeErr( "object", propertyMap );
  else {
    Object.getOwnPropertyNames( propertyMap )
      .forEach( prop => {
        Object.defineProperty(
          obj,
          prop,
          {
            enumerable: true,
            value: propertyMap[ prop ]
          }
        );  
      });

    return obj;
  }
}

module.exports = defineReadOnly;


function resolveTypeName ( value ) {
  
  if ( value === null )
    return "null";
  else if ( Array.isArray( value ) )
    return "array";
  else if (
    typeof value === "object" &&
      value.constructor.name !== "Object"
  )
    return value.constructor.name;
  else
    return typeof value;
}

module.exports = resolveTypeName;


const errorType = Object.freeze({
  requiredPropertyMissing: "requirePropertyMissing"  
});

function RequiredPropertyMissing( property, refName ) {
  
  const result = new Error(
    `Required property missing from reference: ${ refName }\n` +
      `  Property name: ${ property }`
  );

  result.name = errorType.requiredPropertyMissing;
  result.property = property;
  result.refName = refName;

  return result;
}

module.exports = {
  errorType,
  RequiredPropertyMissing
};


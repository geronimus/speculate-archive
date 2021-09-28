const errorType = Object.freeze({
  multilineTextNotAllowed: "multilineTextNotAllowed"  
});

function MultilineTextNotAllowed( refName ) {
  
  const result = new Error(
    `Multiline text not allowed. Found in reference: ${ refName }`
  );
  result.name = errorType.multilineTextNotAllowed;
  result.refName = refName;

  return result;
}

module.exports = {
  errorType,
  MultilineTextNotAllowed
};


const { QueryText } = require( "./query-text" );
const defineReadOnly = require( "../util/define-read-only" );
const { RequiredPropertyMissing } = require( "../util/error" );
const TypeErr = require( "../util/type-err" );

const requiredProps = Object.freeze({
  name: "string",
  queryText: QueryText,
  startLine: "number",
  startPos: "number",
  endLine: "number",
  endPos: "number"
});

function LexerToken( props ) {

  if ( typeof new.target !== "function" )
    return new LexerToken( props );

  if ( props === null || Array.isArray( props ) || typeof props !== "object" )
    throw TypeErr( "props", "object", props );

  Object.getOwnPropertyNames( requiredProps ).forEach( prop => {
  
    if ( !Object.hasOwnProperty.call( props, prop ) )
      throw RequiredPropertyMissing( prop, "props" );
    else if (
      typeof requiredProps[ prop ] === "string" &&
        typeof props[ prop ] !== requiredProps[ prop ]
    )
      throw TypeErr(
        `props[ ${ prop } ]`,
        requiredProps[ prop ],
        props[ prop ]
      );
    else if (
      typeof requiredProps[ prop ] === "function" &&
        !( props[ prop ] instanceof requiredProps[ prop ] )
    )
      throw TypeErr(
        `props[ ${ prop } ]`,
        requiredProps[ prop ].name,
        props[ prop ].constuctor.name
      );
  });

  const { name, queryText, startLine, startPos, endLine, endPos } = props;

  defineReadOnly(
    this,
    {
      get endLine() { return endLine; },
      get endPos() { return endPos; },
      getText,
      get name() { return name; },
      get queryText() { return queryText; },
      get startLine() { return startLine; },
      get startPos() { return startPos; },
      toString
    }
  );

  function getText() {

    if (
      startLine > endLine ||
        ( startLine === endLine && startPos > endPos )
    )
      throw new RangeError(
        `Starting position (${ startLine }, ${ startPos }) must not be ` +
          `greater than ending position (${ endLine }, ${ endPos }).`
      );
    else if ( startLine < 1 || startLine > queryText.lines.length )
      throw new RangeError(
        `The start line (${ startLine }) is outside the boundaries of the ` +
          `query text: 1-${ queryText.lines.length }`
      );

    let buffer = "";

    if ( startLine === endLine ) {
      buffer = queryText.getLine( startLine ).text
        .substring( startPos - 1, endPos );
    } else {
      buffer = queryText.getLine( startLine ).text
        .substring( startPos - 1 );

      let currentLine = startLine + 1;

      while ( currentLine < endLine ) {
        buffer = buffer + "\n" + queryText.getLine( currentLine ).text;
        currentLine += 1;
      }

      if ( currentLine === endLine && currentLine > startLine ) {
        buffer = buffer + "\n" +
          queryText.getLine( currentLine ).text.substring( 0, endPos );
      }
    }

    return buffer;
  }

  function toString() {
    return `<${ name } start="${ startLine },${ startPos }" ` +
      `end="${ endLine },${ endPos }"/>`;
  }
}

module.exports = LexerToken; 


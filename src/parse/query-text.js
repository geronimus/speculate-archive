const { isMultiline } = require( "../text" );
const { MultilineTextNotAllowed } = require( "../text/error" );
const defineReadOnly = require( "../util/define-read-only" );
const TypeErr = require( "../util/type-err" );

function QueryText( text ) {

  if ( typeof new.target !== "function" )
    return new QueryText( text );

  if ( typeof text !== "string" )
    throw TypeErr( "text", "string", text );

  const lines = (() => {
    const normalizedText = text.replace(
      // Replace Windows-style line-endings - and the LINE SEPARATOR and
      // PARAGRAPH SEPARATOR characters defined as Line Terminators in the
      // ECMAScript Standard - with a simple LINE FEED.
      new RegExp( "(\u000D\u000A|\u2028|\u2029)", "g" ),
      "\n"
    );

    return Object.freeze(
      normalizedText.split( "\n" )
        .map( line => QueryLine( line, this ) )
    );
  })();

  defineReadOnly(
    this,
    {
      getChar,
      getLine,
      get lines() { return lines.slice( 0 ); },
      text,
      toString
    }
  );

  function getChar( line, position ) {
    
    if ( typeof line !== "number" )
      throw TypeErr( "line", "number", line );
    if ( typeof position !== "number" )
      throw TypeErr( "position", "number", position );

    return getLine( line ).getPosition( position );
  }

  function getLine( lineNumber ) {
    
    if ( typeof lineNumber !== "number" )
      throw TypeErr( "lineNumber", "number", lineNumber );

    const index = Math.floor( lineNumber );

    if ( index < 1 || index > lines.length )
      throw new RangeError(
        `Line number ${ lineNumber } outside of legal range of 1 ` +
          `to ${ lines.length }.`
      );

    return lines[ index - 1 ];
  }

  function toString() {
    
    const suffix = " : QueryText";
    const textContent = lines.map( line => line.text )
      .join( " " )
      .replace( /"/g, "\\\"" );
    
    if ( textContent.length < 64 )
      return `"${ textContent }"${ suffix }`;
    else
      return `"${ textContent.substring( 0, 62 ) }..."${ suffix }`;
  }
}

function QueryLine( text, parent ) {

  if ( typeof new.target !== "function" )
    return new QueryLine( text, parent );

  if ( typeof text !== "string" )
    throw TypeErr( "text", "string", text );
  else if ( isMultiline( text ) )
    throw MultilineTextNotAllowed( "text" );
  else if ( !( parent instanceof QueryText ) )
    throw TypeErr( "parent", "QueryText", parent );

  defineReadOnly(
    this,
    {
      getPosition,
      get parent() { return parent; },
      get text() { return text; },
      toString
    }
  );

  function getPosition( charNumber ) {
  
    if ( typeof charNumber !== "number" )
      throw TypeErr( "charNumber", "number", charNumber );

    const index = Math.floor( charNumber );

    if ( index < 1 || index > text.length )
      throw new RangeError(
        `Position number ${ charNumber } outside of legal range of 1 ` +
          `to ${ text.length }.`
      );

    return text.charAt( index - 1 );
  }

  function toString() {
  
    const suffix = " : QueryLine";
    const textContent =
      text.replace( /"/g, "\\\"" );

    if ( textContent.length < 64 )
      return `"${ textContent }"${ suffix }`;
    else
      return `"${ textContent.substring( 0, 63 ) }..."${ suffix }`;
  }
}

module.exports = { QueryLine, QueryText };


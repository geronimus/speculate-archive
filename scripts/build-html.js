const fs = require( "fs" );
const path = require( "path" );
const splice = require( "./splice" );

const encoding = "utf-8";
const rootPath = path.join( __dirname, ".." );
const resourcesPath = path.join( rootPath, "resources" );
const cssPath = path.join( resourcesPath, "speculate.css" );
const htmlTemplatePath = path.join( resourcesPath, "speculate.html.template" );
const compuledPath = path.join( rootPath, "compiled" );
const scriptPath = path.join( compiledPath, "speculate.js" );
const distPath = path.join( rootPath, "dist" );
const htmlOutPath = path.join( distPath, "speculate.html" );

const htmlTemplate = fs.readFileSync( htmlTemplatePath, encoding );
const css = fs.readFileSync( cssPath, encoding );
const script = fs.readFileSync( scriptPath, encoding );

const htmlOut = splice(
  htmlTemplate,
  {
    "css": css,
    "js": script
  }
);

console.log( `Building file: ${ htmlOutPath }...` );

fs.writeFileSync( htmlOutPath, htmlOut );

console.log( `Successfully built file: ${ htmlOutPath }` );


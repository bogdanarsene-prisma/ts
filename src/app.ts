import fs = require('fs');
//import {parseString} from 'xml2js';
import os = require('os');
const chilkat = require('@chilkat/ck-node16-linux64');

console.log('hi.');

//const xmlFile = './D112_xml_complet.xml';
//const os = require('os');
if (os.platform() === 'win32') {
  if (os.arch() === 'ia32') {
    const chilkat = require('@chilkat/ck-node16-win-ia32');
  } else {
    const chilkat = require('@chilkat/ck-node16-win64');
  }
} else if (os.platform() === 'linux') {
  if (os.arch() === 'arm') {
    const chilkat = require('@chilkat/ck-node16-arm');
  } else if (os.arch() === 'x86') {
    const chilkat = require('@chilkat/ck-node16-linux32');
  } else {
    const chilkat = require('@chilkat/ck-node16-linux64');
  }
} else if (os.platform() === 'darwin') {
  const chilkat = require('@chilkat/ck-node16-macosx');
}

function chilkatExample() {
  // Load our PDF file.
  const bd = new chilkat.BinData();
  let success = bd.LoadFile('./D112_XML_2022_0822_290922bis.pdf');
  if (success !== true) {
    console.log('Failed to load PDF file.');
    return;
  }

  // Load the following XML:
  //
  // <?xml version="1.0" encoding="utf-8" ?>
  // <something>
  //     <xyz>
  //         <abc123>A base64 encoded PDF file will be inserted under this node.</abc123>
  //     </xyz>
  // </something>

  const xml = new chilkat.Xml();
  success = xml.LoadXmlFile('./D112_XML_2022_0822_270922_data.xml');
  if (success !== true) {
    console.log('Failed to load XML file.');
    return;
  }

  // Insert the PDF into the XML.
  xml.NewChild2('xyz|pdfData', bd.GetEncoded('base64'));

  // Show the new XML:
  console.log(xml.GetXml());

  // To extract the PDF data out and restore the PDF file:
  const bd2 = new chilkat.BinData();
  success = bd2.AppendEncoded(xml.GetChildContent('xyz|pdfData'), 'base64');
  success = bd2.WriteFile('./helloWorld.pdf');

  console.log('Success.');
}

chilkatExample();
console.log('byeeee');

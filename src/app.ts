import fs = require('fs');
import {parseString} from 'xml2js';
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
  //success = xml.LoadXmlFile('./D112_XML_2022_0822_270922_data.xml');
  success = xml.LoadXmlFile('./D112_xml_complet.xml');

  if (success !== true) {
    console.log('Failed to load XML file.');
    return;
  }
  // // const jj = parseString(xml, (error, result) => {
  // //   result.frmMAIN.sbfrmPage1Ang[0].sfmIdentif[0].den[0] = 'mmmmmm';
  // //   console.log(result);
  // //   console.log(error);
  // // });

  // // Insert the PDF into the XML.
  // const path = './D112_XML_2022_0822_270922_data.xml';
  // const ssss: string = fs.readFileSync(path, 'utf8');
  // let zzz;
  // parseString(ssss, (error, result) => {
  //   // console.log(result.frmMAIN.sbfrmPage1Ang[0].sfmSectAVal[0].nrcrt[0]);
  //   // result.frmMAIN.sbfrmPage1Ang[0].sfmSectAVal[0].nrcrt[0] = 111;
  //   // console.log(result.frmMAIN.sbfrmPage1Ang[0].sfmSectAVal[0].nrcrt[0]);
  //   result.frmMAIN.sbfrmPage1Ang[0].sfmIdentif[0].den[0] = 'mmmmmm';
  //   const xml2js = require('xml2js');
  //   const builder = new xml2js.Builder();
  //   zzz = builder.buildObject(result);
  //   console.log(result);
  //   console.log(error);
  // });
  let zzz;
  let mmm = xml.GetXml();
  parseString(mmm, (error, result) => {
    console.log(
      'sdsdsds is',
      result.frmMAIN.sbfrmPage1Ang[0].sfmIdentif[0].den[0]
    );
    //result.frmMAIN.sbfrmPage1Ang[0].sfmSectAVal[0].nrcrt[0] = 111;
    result.frmMAIN.sbfrmPage1Ang[0].sfmIdentif[0].den[0] = 'mmmmmm';
    console.log(result.frmMAIN.sbfrmPage1Ang[0].sfmIdentif[0].den[0]);
    const xml2js = require('xml2js');
    const builder = new xml2js.Builder();
    zzz = builder.buildObject(result);
    console.log(result);
    console.log(error);
  });
  //let status = xml.SaveXml(zzz);
  //xml.NewChild2('xyz|pdfData', bd.GetEncoded('base64'));
  xml.NewChild2('frmMAIN', bd.GetEncoded('base64'));

  // Show the new XML:
  console.log(xml.GetXml());

  // To extract the PDF data out and restore the PDF file:
  const bd2 = new chilkat.BinData();
  success = bd2.AppendEncoded(xml.GetChildContent('frmMAIN'), 'base64');
  success = bd2.WriteFile('./helloWorld.pdf');

  // const bd3 = new chilkat.BinData();
  // success = bd3.AppendEncoded(xml.GetChildContent(zzz), 'base64');
  // success = bd3.WriteFile('./helloWorld2.pdf');

  console.log('Success.');
}

function chilkatExample2() {
  const xSoapEnvelope = new chilkat.Xml();
  const success = xSoapEnvelope.LoadXmlFile('./D112_xml_complet.xml');
  if (success !== true) {
    console.log(xSoapEnvelope.LastErrorText);
    return;
  }

  // The root node is the SOAP envelope, and in this particular case has a Tag of "soapenv:Envelope"
  console.log('SOAP envelope tag: ' + xSoapEnvelope.Tag);

  // The SOAP body (in this case) is a direct child of the SOAP envelope
  // and has the tag "soapenv:Body"
  // xSoapBody: Xml
  const xSoapBody = xSoapEnvelope.FindChild('sbfrmPage1Ang');
  if (xSoapEnvelope.LastMethodSuccess === false) {
    console.log('No direct child having the tag "soapenv:Body" was found.');
    return;
  }

  // The SOAP message body is the direct child of the SOAP envelope body:
  // xMessageBody: Xml
  const xMessageBody = xSoapBody.FindChild('sfmIdentif');
  if (xSoapBody.LastMethodSuccess === false) {
    console.log(
      'No direct child having the tag "TimbreFiscalDigital" was found.'
    );

    return;
  }
  let bla = xMessageBody.FindChild('an_r');
  if (xSoapBody.LastMethodSuccess === false) {
    console.log('No direct child having the tag "an" was found.');

    return;
  }
  bla.Content = '2025';

  // If desired, get the XML of just the SOAP message body:
  const soapMessageXml = xSoapBody.GetXml();
}

chilkatExample2();

//chilkatExample();
console.log('byeeee');

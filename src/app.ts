import fs = require('fs');
import {parseString} from 'xml2js';

console.log('hi.');

const xmlFile = './D112_xml_complet.xml';

const xmlData: string = fs.readFileSync(xmlFile, 'utf8');
parseString(xmlData, (error, result) => {
  result.frmMAIN.sbfrmPage1Ang[0].sfmSectAVal[0].nrcrt[0] = 111;

  const xml2js = require('xml2js');
  const builder = new xml2js.Builder();
  const xml = builder.buildObject(result);

  console.log(result);
  console.log(error);
});

console.log('byeeee');

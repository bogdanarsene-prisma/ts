import * as fs from 'fs';
import {PDFDocument} from 'pdf-lib';
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

async function fillForm() {
  const formFileUrl =
    'https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/D112_XML_2022_0822_270922.pdf';
  const formFile = 'D112_completata.pdf';
  const uint8Array = fs.readFileSync(formFile);

  const pdf = await pdfjsLib.getDocument({
    url: formFileUrl,
    enableXfa: true,
  }).promise;
  const data = await pdf.getData();
  const fields = await pdf.getFieldObjects();
  const page = await pdf.getPage(1);
  const content = await page.getTextContent();
 

  pdf.annotationStorage.setValue('caen', {value: '0111'});
  //pdf.setValue('caen', {value: '0111'});

  await pdf.saveDocument();
  await pdf.saveDocument('asd.pdf');

  const data1 = await pdf.getData();
  console.log(data);

  const fields1 = await pdf.getFieldObjects();
  console.log(fields);

  // json tree of XFA data
  const xfa = pdf.allXfaHtml;

  console.log(pdf);
}

fillForm();

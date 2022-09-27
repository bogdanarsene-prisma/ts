console.log('hi.');

import {PDFDocument} from 'pdf-lib';
import * as fs from 'fs';

async function fillForm() {
  const formFile = 'D112_completata.pdf';
  const uint8Array = fs.readFileSync(formFile);
  const pdfDoc = await PDFDocument.load(uint8Array);

  const form = pdfDoc.getForm();

  const asd = form.acroForm;

  const pdfBytes = await pdfDoc.save();
}

fillForm();

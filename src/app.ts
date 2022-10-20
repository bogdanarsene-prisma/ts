import path = require('path');
const fs = require('fs');
const glob = require('glob');
const process = require('process');
const parseXML = require('xml2js').parseString;
const {exec} = require('node:child_process');
import fetch from 'cross-fetch';
const download = require('download');

console.log('hi.');

enum Form {
  //TODO add forms
  D100 = 'D100',
  D102 = 'D102',
}

enum Certificate {
  //TODO add certificates
  D100 = 'D100',
  D102 = 'D102',
}

async function formFiles(DUKIntegratorPath: string, action = 'download') {
  const config = path.resolve(
    DUKIntegratorPath + '/dist/config/config.properties'
  );

  const data = fs.readFileSync(config).toString();
  const xmlUrl = data.match(/(?<=urlVersiuni=)(.*?)(?=[\n\r])/)[0];
  const xmlStream = await fetch(xmlUrl);
  const xml = await xmlStream.text();

  const jarURLs: string[] = [];
  const txtURLs: string[] = [];

  parseXML(xml, (err: any, result: any) => {
    for (const decl in result.versiuni.declaratii[0]) {
      txtURLs.push(result.versiuni.declaratii[0][decl][0].DURL[0]);
      jarURLs.push(result.versiuni.declaratii[0][decl][0].JURL[0]);
      jarURLs.push(result.versiuni.declaratii[0][decl][0].PURL[0]);
    }
  });

  const jarDestination = path.resolve(DUKIntegratorPath + '/dist/lib');
  const txtDestination = path.resolve(DUKIntegratorPath + '/dist/doc');

  if (action === 'download') {
    await Promise.all(
      jarURLs.map(
        async (jarURL: string) => await download(jarURL, jarDestination)
      )
    );
    await Promise.all(
      txtURLs.map(
        async (txtURL: string) => await download(txtURL, txtDestination)
      )
    );
  }

  if (action === 'remove') {
    const files: string[] = [];

    jarURLs.map((jarURL: string) =>
      files.push(`${jarDestination}/${path.basename(jarURL)}`)
    );
    txtURLs.map((txtURL: string) =>
      files.push(`${txtDestination}/${path.basename(txtURL)}`)
    );

    await Promise.all(
      files.map(
        async (file: string) =>
          await fs.rm(file, {force: true}, (err: any) => {
            if (err) {
              console.error(err.message);
              return;
            }
            console.log(`${file} was deleted`);
          })
      )
    );
  }
}

function validate(
  fisierXML: string,
  tipDeclaratie: Form,
  generatePdf: boolean,
  optiuneValidare?: number,
  caleConfig?: string,
  pinSmartCard?: string,
  smartCard?: string,
  selectorCertificat?: number
) {
  const cwd = process.cwd();
  const version = ''; //' -version:1.6';
  const java = !process.env.JAVA_HOME
    ? 'java'
    : `${cwd}/DUKIntegrator_20200203/dist/jdk8u345-b01-jre/bin/java` + version;

  // java -version:1.6 -jar "<cale>\dist\DUKIntegrator.jar" [-c caleConfig] -s tipDeclaratie fisierXML [fisierRezultat] [optiuneValidare] [fisierZIP] [fisierPDF] pinSmartCard smartCard [selectorCertificat]
  let command = `${java} -jar ${cwd}/DUKIntegrator_20200203/dist/DUKIntegrator.jar`;

  if (caleConfig) {
    command += ` -c ${path.resolve(caleConfig)}`;
  }

  if (generatePdf) {
    if (pinSmartCard) {
      command += ' -s';
    } else {
      command += ' -p';
    }
  } else {
    command += ' -v';
  }

  const fisierXMLabsPath = path.resolve(fisierXML);
  command += ` ${tipDeclaratie} ${fisierXMLabsPath} $`;

  if (typeof optiuneValidare !== 'undefined') {
    command += ` ${optiuneValidare}`;
  } else {
    command += ' $';
  }

  if (pinSmartCard) {
    command += ` $ $ ${pinSmartCard} ${smartCard}`;
    if (selectorCertificat) {
      command += ` ${selectorCertificat}`;
    }
  }

  exec(command, (err: any, output: any) => {
    if (err) {
      console.error('could not execute command: ', err);
      return;
    }
    console.log('Output: \n', output);

    let filePath = `${fisierXMLabsPath}`;
    if (fs.statSync(fisierXMLabsPath).isFile()) {
      filePath = path.dirname(fisierXMLabsPath);
    }

    glob(`${filePath}/*.txt`, {absolute: true}, (er: any, files: string[]) => {
      files.map((file: string) => {
        const data = fs.readFileSync(file, 'utf8');
        //TODO handle errors
        if (data === 'ok') {
          console.log(`${path.parse(file).name} processed`);
        } else {
          console.log(`ERROR for ${path.parse(file).name}: ${data}`);
        }
      });
    });
  });
}

formFiles('./DUKIntegrator_20200203', 'remove');
//formFiles('./DUKIntegrator_20200203', 'download');

//validate('./xml/D100.xml', Form.D100, true, 0);

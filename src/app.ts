import path = require('path');
const fs = require('fs');
const glob = require('glob');
const process = require('process');
const parseXML = require('xml2js').parseString;
const {exec} = require('node:child_process');
import fetch from 'cross-fetch';
const download = require('download');
import {parseString} from 'xml2js';
const {create} = require('xmlbuilder2');
import xml2js = require('xml2js');

console.log('hi.');

enum Form {
  A4200 = 'A4200',
  A4201 = 'A4201',
  A4202 = 'A4202',
  A4203 = 'A4203',
  B900 = 'B900',
  C168 = 'C168',
  C310 = 'C310',
  C801 = 'C801',
  C802 = 'C802',
  D017 = 'D017',
  D085 = 'D085',
  D092 = 'D092',
  D100 = 'D100',
  D101 = 'D101',
  D104 = 'D104',
  D106 = 'D106',
  D107 = 'D107',
  D108 = 'D108',
  D110 = 'D110',
  D112 = 'D112',
  D119 = 'D119',
  D120 = 'D120',
  D130 = 'D130',
  D163 = 'D163',
  D169 = 'D169',
  D169n = 'D169n',
  D177 = 'D177',
  D179 = 'D179',
  D180 = 'D180',
  D200 = 'D200',
  D201 = 'D201',
  D204 = 'D204',
  D205 = 'D205',
  D207 = 'D207',
  D208 = 'D208',
  D212 = 'D212',
  D220 = 'D220',
  D221 = 'D221',
  D223 = 'D223',
  D230 = 'D230',
  D300 = 'D300',
  D301 = 'D301',
  D307 = 'D307',
  D311 = 'D311',
  D318 = 'D318',
  D390 = 'D390',
  D392 = 'D392',
  D393 = 'D393',
  D394 = 'D394',
  D398 = 'D398',
  D399 = 'D399',
  D401 = 'D401',
  D402 = 'D402',
  D403 = 'D403',
  D406 = 'D406',
  D5 = 'D5',
  D6 = 'D6',
  D600 = 'D600',
  D603 = 'D603',
  D7 = 'D7',
  D700 = 'D700',
  D710 = 'D710',
  D8 = 'D8',
  DAC6 = 'DAC6',
  F3000 = 'F3000',
  F4101 = 'F4101',
  F4102 = 'F4102',
  F4103 = 'F4103',
  F4105 = 'F4105',
  F4109 = 'F4109',
  L153 = 'L153',
  N012 = 'N012',
  N014 = 'N014',
  P1000 = 'P1000',
  P2000 = 'P2000',
  P4000 = 'P4000',
  P5000 = 'P5000',
  R404 = 'R404',
  R405 = 'R405',
  S1001 = 'S1001',
  S1002 = 'S1002',
  S1003 = 'S1003',
  S1004 = 'S1004',
  S1005 = 'S1005',
  S1006 = 'S1006',
  S1007 = 'S1007',
  S1008 = 'S1008',
  S1009 = 'S1009',
  S1010 = 'S1010',
  S1011 = 'S1011',
  S1012 = 'S1012',
  S1013 = 'S1013',
  S1014 = 'S1014',
  S1015 = 'S1015',
  S1016 = 'S1016',
  S1017 = 'S1017',
  S1018 = 'S1018',
  S1019 = 'S1019',
  S1020 = 'S1020',
  S1021 = 'S1021',
  S1022 = 'S1022',
  S1023 = 'S1023',
  S1024 = 'S1024',
  S1025 = 'S1025',
  S1026 = 'S1026',
  S1027 = 'S1027',
  S1028 = 'S1028',
  S1029 = 'S1029',
  S1030 = 'S1030',
  S1031 = 'S1031',
  S1032 = 'S1032',
  S1033 = 'S1033',
  S1034 = 'S1034',
  S1035 = 'S1035',
  S1036 = 'S1036',
  S1037 = 'S1037',
  S1038 = 'S1038',
  S1039 = 'S1039',
  S1040 = 'S1040',
  S1041 = 'S1041',
  S1042 = 'S1042',
  S1043 = 'S1043',
  S1044 = 'S1044',
  S1045 = 'S1045',
  S1046 = 'S1046',
  S1047 = 'S1047',
  S1048 = 'S1048',
  S1049 = 'S1049',
  S1050 = 'S1050',
  S1051 = 'S1051',
  S1052 = 'S1052',
  S1053 = 'S1053',
  S1054 = 'S1054',
  S1055 = 'S1055',
  S1056 = 'S1056',
  S1057 = 'S1057',
  S1058 = 'S1058',
  S1059 = 'S1059',
  S1060 = 'S1060',
  S1061 = 'S1061',
  S1070 = 'S1070',
  S1100 = 'S1100',
  S1110 = 'S1110',
  S1120 = 'S1120',
  S1121 = 'S1121',
  S1122 = 'S1122',
  S1123 = 'S1123',
  S1124 = 'S1124',
  S1125 = 'S1125',
  T100 = 'T100',
  T101 = 'T101',
}

enum Certificate {
  //TODO add certificates
  D100 = 'D100',
  D102 = 'D102',
  D112 = 'D112',
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
  const forms: string[] = [];

  const jarFiles: string[] = [];
  const txtFiles: string[] = [];

  const jarDestination = path.resolve(DUKIntegratorPath + '/dist/lib');
  const txtDestination = path.resolve(DUKIntegratorPath + '/dist/doc');

  parseXML(xml, (err: any, result: any) => {
    for (const decl in result.versiuni.declaratii[0]) {
      forms.push(decl);
      txtURLs.push(result.versiuni.declaratii[0][decl][0].DURL[0]);
      jarURLs.push(result.versiuni.declaratii[0][decl][0].JURL[0]);
      jarURLs.push(result.versiuni.declaratii[0][decl][0].PURL[0]);
    }
  });
  forms.sort();

  // Print all Statements for enum
  //forms.forEach(form => console.log(`  ${form} = '${form}',`));

  jarURLs.map((jarURL: string) =>
    jarFiles.push(`${jarDestination}/${path.basename(jarURL)}`)
  );
  txtURLs.map((txtURL: string) =>
    txtFiles.push(`${txtDestination}/${path.basename(txtURL)}`)
  );
  const allFiles = [...jarFiles, ...txtFiles];

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
    await Promise.all(
      allFiles.map(
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

async function validate(
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

  await exec(command, (err: any, output: any) => {
    if (err) {
      console.error('could not execute command: ', err);
      return;
    }
    console.log('Output: \n', output);

    let filePath = `${fisierXMLabsPath}`;
    if (fs.statSync(fisierXMLabsPath).isFile()) {
      filePath = path.dirname(fisierXMLabsPath);
    }

    glob(`${filePath}/*.txt`, {absolute: true}, (err: any, files: string[]) => {
      if (err) {
        console.error(err.message);
        return;
      }
      files.map((file: string) => {
        const data = fs.readFileSync(file).toString();
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

async function d112() {
  const xmlPath = path.resolve('./xml/d112_04102022.xml');

  const xmlData: string = fs.readFileSync(xmlPath, 'utf8');
  let decl;
  parseString(xmlData, (error, result) => {
    if (error === null) {
      result.declaratieUnica.$.luna_r = 9;
      result.declaratieUnica.$.an_r = 2022;
      // const xml2js = require('xml2js');
      // const builder = new xml2js.Builder();
      // const zzz = builder.buildObject(result);
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFileSync('./xml/D112.xml', xml, (err: any, data: any) => {
        if (err) console.log(err);

        console.log('successfully written our update xml to file');
      });
    }
  });
  console.log(decl);
}

//d112();
validate('./xml/d112_04102022.xml', Form.D112, true, 0);

formFiles('./DUKIntegrator_20200203', 'remove');
//formFiles('./DUKIntegrator_20200203', 'download');

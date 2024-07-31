
import fs from 'fs';
import path from 'path';

 function fontFamilies() {
  const fontDirectory = path.join(__dirname, '../../../../..', 'asset', 'font');
  const fontFiles = fs.readdirSync(fontDirectory);
  const ret = {};
  fontFiles.forEach(fontFile => {
    const fontPath = path.join(fontDirectory, fontFile, `${fontFile}.ttf`);
    const fontData = fs.readFileSync(fontPath);
    const fontBase64 = fontData.toString('base64');
    ret[fontFile] = {
      fontFamily: fontFile,
      src: `url(data:font/ttf;charset=utf-8;base64,${fontBase64})`,
    };
  });
  return ret;
}

export default fontFamilies();
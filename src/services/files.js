
import * as aresfiles from '@ares/files';
export function getFileNameAsPropertyName(fileName) {
    fileName = fileName.replaceAll(/\W/, '_').toLowerCase();
    while (fileName.includes('__')) {
        fileName = fileName.replaceAll('__', '_');
    }
    return fileName;
}

const files = {...aresfiles, getFileNameAsPropertyName };
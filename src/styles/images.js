
import * as fs from 'fs';
import path from 'path';
import { Image } from 'react-native';
import {getFileNameAsPropertyName} from "../services/files";

function images() {
    const imageDirectory = path.join(__dirname, '../../../../..',  'asset', 'img');
    const imageFiles = fs.readdirSync(imageDirectory);
    const ret = {};
    imageFiles.forEach(imageFile => {
        const imagePath = path.join(imageDirectory, imageFile);
        ret[getFileNameAsPropertyName(imageFile)] = Image.resolveAssetSource(imagePath);
    });
    return ret; 
}
export default images();

export function getAllAsImages() {
    const imageMap =  images();
    const ret = {};
    for (const key in imageMap) {
        ret[key] = <Image source={imageMap[key]}/>;
    }
    return ret;
}


export function getAllAsBackgroundImages() {
    const imageMap =  images();
    const ret = {};
    for (const key in imageMap) {
        ret[key] = {backgroundImage: `url(${imageMap[key]})`};
    }
    return ret;
}
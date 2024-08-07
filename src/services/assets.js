import { Image } from 'react-native';
import images from "../../../../../src/styles/images.json";
import fonts from "../../../../../src/styles/fonts.json";

/*
* Get all images as react components from images.json
* @returns {Object}
* 
* Get all images from images.json
*/
export function getAllAsImages() {
    const imageMap =  images;
    const ret = {};
    for (const key in imageMap) {
        ret[key] = <Image source={imageMap[key]}/>;
    }
    return ret;
}

/*
* Get all images as background images from images.json
* @returns {Object}
*
* Get all images from images.json
*/
export function getAllAsBackgroundImages() {
    const imageMap =  images;
    const ret = {};
    for (const key in imageMap) {
        ret[key] = {backgroundImage: `url(${imageMap[key]})`};
    }
    return ret;
}
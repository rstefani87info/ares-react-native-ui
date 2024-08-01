import { Image } from 'react-native';
import images from "../../../../../src/styles/images.json";
import fonts from "../../../../../src/styles/fonts.json";

/*
* Get all images as react components from images.json
* @returns {Object}
* 
* @desc {en} Get all images from images.json
* @desc {it} Ottieni tutte le immagini da images.json
* @desc {es} Obtener todas las imágenes de images.json
* @desc {pt} Obtenha todas as imagens de images.json
* @desc {fr} Obtenez toutes les images de images.json   
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
* @desc {en} Get all images from images.json
* @desc {it} Ottieni tutte le immagini da images.json
* @desc {es} Obtener todas las imágenes de images.json
* @desc {pt} Obtenha todas as imagens de images.json
* @desc {fr} Obtenez toutes les images de images.json
*/
export function getAllAsBackgroundImages() {
    const imageMap =  images;
    const ret = {};
    for (const key in imageMap) {
        ret[key] = {backgroundImage: `url(${imageMap[key]})`};
    }
    return ret;
}
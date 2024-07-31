import React from 'react';
import { Image } from 'react-native';
import {getAllAsImages,getAllAsBackgroundImages} from "../styles/images";

export default function Icon(props) {
  return getAllAsImages().logo_png(props);
}

export function backgroundIcon(props) {
    return getAllAsBackgroundImages().logo_png(props);
}
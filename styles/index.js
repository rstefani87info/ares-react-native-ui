import * as implicitColors from "./colors";
import implicitAssets from "../../../../styles/assets";
import * as styles from "../../../../styles/stylesheet";
import mainTheme from "../../../../styles/themes/mainTheme";

export const assets = implicitAssets;

export const colors = implicitColors;

export const globalStyle = styles;

export const themeList = { mainTheme };

//TODO: convertire in sistemma a puntamenti css
export function getStyle(config, type = null, name = null) {
  let ret = {};
  if (config && (type || name)) {
    if (type)
      ret =
        Object.assign(config["*"] ?? {}, config[type] ? config[type] : {}) ??
        {};
    if (name)
      ret =
        Object.assign(
          ret,
          config[name] ?? {},
          config[type] ? config[type][name] ?? {} : {}
        ) ?? {};
  } else if (config) ret = config["."] ?? {};
  return ret;
}

// export function getStyleConfigToCSS(config,parentKey = null, parent=null) {
//TODO: implementare
// }

//TODO: usare questo esempio con tutti i casi nella tabella infondo alla chat(GPT) https://chatgpt.com/share/674a4b3e-93dc-8011-a7ce-374fb941deec

// export const cssConverter = {
//     shadowColor:{
//         getKey:()=>'boxShadow',
//         getValue:(value,parent)=>{
//         let isHex = value?.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2}){0,1}$/);
//         let rgba;
//         const alpha =parent.shadowOpacity ?? 0;
//         const position = parent.shadowOffset ?? {width:0,height:0};
//         const shadowRadius = parent.shadowRadius ?? 0;
//         if(isHex) rgba = colors.convertHexToRGB(value);
//         else if(value?.match(/rgba?\((\d+),?)?|(\d+),?/)) rgba = colors.parseRGBA(value);
//         else rgba = colors.black;
//         rgba.a = (rgba.a ?? 1) - (1 - alpha);
//         const cssValue = colors.convertRGBAToCSSColor(...rgba??colors.black);
//         return  [position.width,'px ',position.height,'px ',shadowRadius,'px ',cssValue,';'].join('');
//     }},
// }

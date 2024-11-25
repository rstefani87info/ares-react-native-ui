
import * as implicitColors from './colors';
import implicitAssets from '../../../../styles/assets';
import * as styles from '../../../../styles/stylesheet';
import mainTheme from '../../../../styles/themes/mainTheme';

export const assets= {
    ...implicitAssets
};

export const colors= {
    ...implicitColors
};

export const globalStyle = {...styles};

const themeList = {mainTheme};
export const themes = {};
Object.entries(themeList).map(([key, value]) => {
    themes[key] = {};
    Object.entries(value).forEach(([key2, value2]) => {
        themes[key][key2] = {};
        if(key2 === 'colors') {
            Object.entries(value2).map(([key3, value3]) => {
                themes[key][key2][key3] = colors.getHexShade( value3);
            })
        }
    })
});

export function getStyle(config, type=null, name=null){
    let ret={};
    if(config && type && name)
        ret = Object.assign(getStyle(config, type),(config[type]? (config[type][name]??{} ): {} )) ??{};
    else if(config && type )
        ret = Object.assign((config['*']??{}),  ( config[type]? config[type] : {})) ??{};
    else if(config )
        ret =  config['.']??{}
    return ret;
}



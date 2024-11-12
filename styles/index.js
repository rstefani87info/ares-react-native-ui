
import * as implicitAssets from './assets';
import * as implicitColors from './colors';
// export * as variables from './variables';
import * as styles from './stylesheet';
import mainTheme from './themes/mainTheme';

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
    if(config && type && name)
        return {...(config[type]? (config[type][name]||{} ): {} ),...(config[type]? (config[type]['*']||{}) : {} )}
    if(config && type )
        return  config[type]? (config[type]['*']||{}) : {};
    if(config )
        return  config['.']||{}
    return{};
}



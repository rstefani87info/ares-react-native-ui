import * as implicitColors from './colors';
import { config } from '../config';
import PropTypes from 'prop-types';
import { Platform, View } from 'react-native';
let RNLinearGradient = null;
try {
  const resolved = typeof require === 'function' ? require('react-native-linear-gradient') : null;
  RNLinearGradient = resolved?.default ?? resolved;
} catch {}

export const assets = new Proxy({}, {
    get: (target, prop) => config.assets?.[prop],
});

export const colors = implicitColors;

export const globalStyle = new Proxy({}, {
    get: (target, prop) => config.styles?.[prop],
});

export const themeList = new Proxy({}, {
    get: (target, prop) => config.themes?.[prop],
});

function isPlainObject(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function deepMerge(base, override) {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override ?? base;
  }
  const out = {...base};
  for (const key of Object.keys(override)) {
    out[key] = deepMerge(base[key], override[key]);
  }
  return out;
}

export const uiDefaultTokens = {
  colors: {
    primary: '#4F46E5',
    onPrimary: '#FFFFFF',
    background: '#F6F7FB',
    surface: '#FFFFFF',
    surface2: '#EEF2FF',
    text: '#0F172A',
    textMuted: '#64748B',
    border: '#E2E8F0',
    danger: '#EF4444',
    onDanger: '#FFFFFF',
    warning: '#F59E0B',
    success: '#10B981',
    link: '#2563EB',
    overlay: 'rgba(15, 23, 42, 0.45)',
  },
  radii: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    pill: 999,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },
  typography: {
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 22,
      xxl: 28,
    },
    weight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  elevation: {
    0: {shadowOpacity: 0, elevation: 0},
    1: {
      shadowColor: '#0F172A',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 2,
    },
    2: {
      shadowColor: '#0F172A',
      shadowOffset: {width: 0, height: 6},
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 4,
    },
  },
};

export function getUiTokens(overrides) {
  const themeName = config.styles?.theme ?? config.themes?.active ?? null;
  const themeTokens = themeName ? themeList?.[themeName]?.tokens : null;
  const configTokens = config.styles?.tokens ?? null;
  const merged = deepMerge(deepMerge(uiDefaultTokens, themeTokens ?? {}), configTokens ?? {});
  return overrides ? deepMerge(merged, overrides) : merged;
}

export function getElevationStyle(level = 1) {
  const safe = Number.isFinite(level) ? level : 1;
  const token = uiDefaultTokens.elevation[safe] ?? uiDefaultTokens.elevation[1];
  if (Platform.OS === 'android') {
    const {elevation, ...rest} = token;
    return {elevation: elevation ?? 0, ...rest};
  }
  const {elevation, ...rest} = token;
  return rest;
}

//TODO: convertire in sistema a puntamenti css
// export function getStyle(config, type = null, name = null) {
//   let ret = {};
//   if (config && (type || name)) {
//     if (type)
//       ret =
//         Object.assign(config["*"] ?? {}, config[type] ? config[type] : {}) ??
//         {};
//     if (name)
//       ret =
//         Object.assign(
//           ret,
//           config[name] ?? {},
//           config[type] ? config[type][name] ?? {} : {}
//         ) ?? {};
//   } else if (config) ret = config["."] ?? {};
//   return ret;
// }

LinearGradient.propTypes = {
  direction: PropTypes.shape({
    start: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    end: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
  }).isRequired,
  colorDisposition: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    percentage: PropTypes.number,
  })),
};

export function LinearGradient({ direction, colorDisposition = [], opacity, style, children, ...props }) {
  const newArray = (colorDisposition || [])
    .filter(e => colors.Color.parseColor(e.color) && e.percentage >= 0 && e.percentage <= 1)
    .sort((a, b) => a.percentage - b.percentage)
    .map(x => x.color);

  const gradientBaseStyle = {position: 'absolute', opacity};
  const containerBaseStyle = {width: '100%', height: '100%'};

  if (!RNLinearGradient) {
    return (
      <View style={[style?.gradient || {}, gradientBaseStyle]}>
        <View style={[style?.container || {}, containerBaseStyle]}>
          {children}
        </View>
      </View>
    );
  }

  return (
    <RNLinearGradient
      colors={newArray.filter(x => x)}
      start={direction?.start}
      end={direction?.end}
      style={[style?.gradient || {}, gradientBaseStyle]}
      {...props}
    >
      <View style={[style?.container || {}, containerBaseStyle]}>
        {children}
      </View>
    </RNLinearGradient>
  );
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

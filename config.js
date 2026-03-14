export const config = {
    assets: {},
    styles: {},
    themes: {},
    locales: {},
    ares: null
};

export const setConfig = (newConfig) => {
    Object.assign(config, newConfig);
};

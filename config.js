export const config = {
    assets: {},
    styles: {},
    themes: {},
    locales: {},
    ares: null,
    logger: null,
    debug: false,
};

export const setConfig = (newConfig) => {
    Object.assign(config, newConfig);
};

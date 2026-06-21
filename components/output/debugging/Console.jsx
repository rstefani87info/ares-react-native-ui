import { config } from '../../../config';

export function Debug({children}) {
    if (config.logger?.debug) {
        config.logger.debug(children);
    } else {
        config.logger?.log?.(children);
    }
    return null;
}

export function Error({children}) {
    config.logger?.error?.(children);
    return null;
}

export function Log({children}) {
    config.logger?.log?.(children);
    return null;
}

export function Warn({children}) {
    config.logger?.warn?.(children);
    return null;
}

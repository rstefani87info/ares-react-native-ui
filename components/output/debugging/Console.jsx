export function Debug({children}) {
    console.debug(children)
    return null
}

export function Error({children}) {
    console.error(children)
    return null
}

export function Log({children}) {
    console.log(children)
    return null
}

export function Warn({children}) {
    console.warn(children)
    return null
}
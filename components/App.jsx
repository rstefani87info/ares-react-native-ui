import React, { useContext, useState } from 'react';
import aReS from '../contexts/aReSContext.js';
function App(aReSObject, themeObject ,...children) {
    const {aReS, setAres} = useState(aReSObject);
    const {theme, setTheme} = useState(themeObject);
    return (
        <View>
            <aReS.Provider value={{aReS, setAres}}>
            {...children}
            </aReS.Provider>
        </View>
    );
}
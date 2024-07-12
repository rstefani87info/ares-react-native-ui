/**
 * @author Roberto Stefani
 * @license MIT
 */
import * as RNLocalize from 'react-native-localize';
import datasources from '@ares/core/datasources.js';
import httpUtility from '@ares/web/httpUtility.js';
import aReSContext from '@ares/core';
import { createContext } from 'react';

function exportAsMethod(aReS, mapper, datasource) {
	asyncConsole.log('datasources', ' - creating Method '+mapper.name+': {');
	aReS[datasource.name + '_' + mapper.querySetting.name + '_' + mapper.name] =  (req, res) => {
		mapper.execute(
			req,
			(queryResponse) => {
				if (queryResponse.error)
					//TODO: fare in modo che l'errore venga visualizzato in maniera corretta
					httpUtility.sendError403(req, res, queryResponse.error);
				else res.json(queryResponse);
			},
		);
	};
	asyncConsole.log('datasources',' - }');
}
    
(await datasources.initAllDatasources(aReSContext,exportAsMethod,true)).forEach((datasource) => {
    if(datasource.restRouter && Array.isArray(datasource.restRouter))datasource.restRouter.forEach((r) => r(aReS.server));
    });

let currentLocale = {};
if (Platform.OS === 'web') {
	const langT	=	navigator.language || navigator.userLanguage;
	const langC = langT.split('-')[0];
	currentLocale = { languageTag: langT , languageCode: langC , languageCode: langC.toUpperCase()};
} else {
	currentLocale = RNLocalize.getLocales()[0];
}


const aReS = createContext({...aReSContext, locale: {...currentLocale, values:aReSContext.i18n[currentLocale.languageCode] }});

export default aReS;
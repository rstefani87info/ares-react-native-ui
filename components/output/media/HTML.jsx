
import React from 'react';
import PropTypes from 'prop-types';
import {regexMap} from '@ares/core/dataDescriptors';
import {getStyle} from '../../../styles';


HTML.propTypes = {
    code: PropTypes.string.isRequired,
    style: PropTypes.object,
    injectableScript: PropTypes.string,
    recognizeeStylableNodes: PropTypes.arrayOf(PropTypes.string),
    onMessage: PropTypes.func,
    mutationHandlers: PropTypes.arrayOf(PropTypes.shape({
        name:PropTypes.string,
        selector:PropTypes.string,
        handler:PropTypes.oneOfType([PropTypes.string,PropTypes.func]),
        eventTargets:PropTypes.arrayOf(PropTypes.string),

    })),


}
export default function HTML({code, style, injectableScript, recognizeStylableNodes, onMessage, mutationHandlers , ...props}) {
    const handleMessage = (event) => {
        const data = event.nativeEvent.data;
        onMessage(data,event);
        console.log("Having message from webView:", hashtags);
    };
    let source = {html:code};
    if (regexMap.urls.url.pattern.test(code)) {
        source={uri:code};
    }


    const script =  `
    window.aresWebView = {};
    
    window.aresWebView.lookup = (subjects, name, type) => {
        window.ReactNativeWebView.postMessage(JSON.stringify([subjects, name, type, message]));
    };
    window.aresWebView.setup = (subjects,name, eventTargets) => {
        subjects.filter(subject => !subject.classList.contains('ares-controller-'+name)).forEach(subject => {
            subject.classList.add('ares-controller-'+name);
            subject.style = (window.aresWebView.style[name]??{})["."];
            eventTargets.forEach(eventTarget => {
                subject.addEventListener(eventTarget, window.aresWebView[name]_observer.eventCallBack);
            });
        });
    };
    ${injectableScript??''}

    true;
  `;
    return (
        <WebView 
            source={{ source }} 
            style={getStyle(style)} 
            injectJavaScript={script} 
            onMessage={handleMessage}
            javaScriptEnabled={true}
            {...props}
        />
    );
}

function mapMutationHandler(mutationHandler) {
    const {name,selector,handler, everLasting,eventTargets} = mutationHandler;
    const eventTargetsWithoutLoad = eventTargets.filter(eventTarget => eventTarget !== 'load');
    return `
        window.aresWebView.${name}_observer = new MutationObserver((mutations) => {
            const subjects = Array.from(document.querySelectorAll('${selector}'));
            if (subjects.length > 0) {
                 window.aresWebView.setup(subjects,'${name}',${JSON.stringify(eventTargetsWithoutLoad)});
                 window.aresWebView.lookup(subjects, '${name}', 'scan'` + (everLasting ? '' : `, 'disconnecting'`) + `);
            ` + (everLasting ? '' : ` ${name}_observer.disconnect();`) + `
            }
        });
        window.aresWebView.${name}_observer.eventCallBack = ${typeof handler === 'string' ?  handler : handler.toString()};

        window.aresWebView.${name}_observer.observe(document.body, { childList: true, subtree: true });
    `;
    
}
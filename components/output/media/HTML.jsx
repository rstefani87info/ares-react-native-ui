
import PropTypes from 'prop-types';
import {regexMap} from '@ares/core/dataDescriptors';
import { WebView } from 'react-native-webview';


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


};
export default function HTML({code, style, injectableScript, recognizeStylableNodes, onMessage, mutationHandlers , ...props}) {
    const handleMessage = (event) => {
        const data = event.nativeEvent.data;
        if (typeof onMessage === 'function') {
            onMessage(data,event);
        }
    };
    let source = {html:code};
    if (regexMap.urls.url.pattern.test(code)) {
        source = {uri:code};
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
    ${injectableScript ?? ''}

    true;
  `;
    return (
        <WebView
            source={source}
            style={style}
            injectJavaScript={script}
            onMessage={handleMessage}
            javaScriptEnabled={true}
            {...props}
        />
    );
}

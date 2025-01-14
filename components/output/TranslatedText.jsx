import {Text} from 'react-native';
import useLocales from "../../locales/useLocales";

export default function TranslatedText({text, options, ...params}) {
    const {translate} = useLocales();
    console.debug("TranslatedText", translate(text, options));
    return (<Text {...params}>{translate(text, options)}</Text>);
}
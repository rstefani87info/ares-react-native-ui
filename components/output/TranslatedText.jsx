import {Text} from 'react-native';
import useLocales from "../../locales/useLocales";

export default function TranslatedText({text,  ...params}) {
    const {translate} = useLocales();
    return (<Text {...params}>{translate(text)}</Text>);
}
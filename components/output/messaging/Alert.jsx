import { Alert as RNAlert } from 'react-native';

export default function Alert({message}) {
    RNAlert.alert('', message);
    return null;
}

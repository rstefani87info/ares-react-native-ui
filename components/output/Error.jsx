import { View, Image, Text } from 'react-native';
import Link from './Link';
import {getElevationStyle, getUiTokens} from '../../styles';

const HTTPError = ({httpErrorCode,message, image, style, links}) => {
    const tokens = getUiTokens();
    const baseStyle = {
      container: {
        padding: tokens.spacing.xl,
        borderRadius: tokens.radii.lg,
        backgroundColor: tokens.colors.surface,
        borderWidth: 1,
        borderColor: tokens.colors.border,
        alignItems: 'center',
        gap: tokens.spacing.sm,
        ...getElevationStyle(2),
      },
      image: {width: 180, height: 180, resizeMode: 'contain'},
      title: {fontSize: tokens.typography.size.xl, fontWeight: tokens.typography.weight.bold, color: tokens.colors.text},
      description: {fontSize: tokens.typography.size.md, color: tokens.colors.textMuted, textAlign: 'center'},
      link: {marginTop: tokens.spacing.sm},
    };
    const resolvedStyle = style ? {
      container: [baseStyle.container, style.container],
      image: [baseStyle.image, style.image],
      title: [baseStyle.title, style.title],
      description: [baseStyle.description, style.description],
      link: [baseStyle.link, style.link],
    } : baseStyle;
    return (
        <View style={resolvedStyle.container}>
            {image ? <Image source={image} style={resolvedStyle.image}/> : null}
            <Text style={resolvedStyle.title}>
                Error {httpErrorCode}
            </Text>
            <Text style={resolvedStyle.description} >
                {message}
            </Text>
            {
                (links || []).map((link, index) => (
                  <Link
                    key={index}
                    url={link.url ?? link.href}
                    style={resolvedStyle.link}
                  >
                    {link.label}
                  </Link>
                ))
            }
        </View>
    );
};

export default HTTPError;

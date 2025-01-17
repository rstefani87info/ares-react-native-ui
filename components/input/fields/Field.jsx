import { View } from "react-native";
import PropTypes, { func } from "prop-types";
import { isEmptyString } from "@ares/core/text";
import { regexMap } from "@ares/core/dataDescriptors";
import Button from "../actions/Button";
import TranslatedText from '../../output/TranslatedText';
import { CheckBox } from "./CheckBox";
import { Switch } from "./Switch";
import { Text } from "./Text";
import * as derived from "./derived";

 

export const types = {
  Switch,CheckBox,Text,
 ...derived
};


/**
 * Data descriptors
 */
export const dataDescriptors = {
  
  [regexMap.text.id]: Text,
  [regexMap.countdown.id]:derived.Countdown,
  [regexMap.isodate.id]:derived.Date,
  [regexMap.isodatetime.id]:derived.DateTime,

  [regexMap.phoneNumber.id]:derived.Tel,
  [regexMap.ip.id]:Text,
  [regexMap.ipv6.id]:Text,
  [regexMap.urls.httpUrl.id]:derived.URL,
  [regexMap.urls.ftpUrl.id]: derived.FTPURL,
  [regexMap.urls.sshUrl.id]:derived.SSHURL,
  [regexMap.urls.smtpUrl.id]:derived.SMTPURL,
  [regexMap.urls.pop3Url.id]:derived.POP3URL,
  [regexMap.urls.blobUrl.id]:derived.BlobURL,
  [regexMap.urls.fileUrl.id]:derived.FileURL,
  [regexMap.hashes.md5.id]:derived.MD5,
  [regexMap.hashes.crc32.id]:derived.CRC32,
  [regexMap.hashes.crc64.id]:derived.CRC64,
  [regexMap.username.id]:Text,
  [regexMap.password.id]:derived.Password,
  [regexMap.zipCode.id]:derived.Number,
  [regexMap.countryCode.id]:Text,
  [regexMap.languageCode.id]:Text,
  // [regexMap.provinceCode.id]:Text,
  [regexMap.boolean.id]:derived.Boolean,
  [regexMap.nullableBoolean.id]: derived.NullableBoolean,
  [/switch/]:Switch,
  [regexMap.number.id]:derived.Number,
  [regexMap.gpsCoordinate.id]:derived.GPSCoordinate,
  [regexMap.gpsCoordinates.id]:derived.GPSCoordinates,
  [regexMap.hashtag.id]:derived.Hashtag,
 
  [regexMap.imageFileExtension.id]:derived.ImageFileExtension,
  [regexMap.videoFileExtension.id]:derived.VideoFileExtension,
  [regexMap.audioFileExtension.id]: derived.AudioFileExtension,
  [regexMap.documentFileExtension.id]:derived.DocumentFileExtension,
  [regexMap.oopFileExtension.id]:derived.OOPFileExtension,
  [regexMap.textFileExtension.id]:derived.TextFileExtension,
  [regexMap.programmingLanguageFileExtension.id]:derived.ProgrammingLanguageFileExtension,
  [regexMap.dataFileExtension.id]:derived.DataFileExtension,
  [regexMap.markupLanguageFileExtension.id]:derived.MarkupLanguageFileExtension,
  [regexMap.personalName.id]:derived.PersonalName,
  [regexMap.date.id]: derived.Date,
  [regexMap.datetime.id]:derived.DateTime,
  [regexMap.sqldatetime.id]: derived.SQLDateTime,
  [regexMap.isodatetime.id]:derived.ISODateTime,
  [regexMap.isotime.id]:derived.ISOTime,
  [regexMap.datetimeoffset.id]:derived.DateTimeOffset,
  [regexMap.time.id]:derived.Time,
  [regexMap.commonName.id]:derived.CommonName,
  [regexMap.phoneNumber.id]:derived.Tel,
  [regexMap.email.id]:derived.Email,
  [regexMap.ip.id]:derived.IP,
  [regexMap.ipv6.id]:derived.IPv6,
  [regexMap.urls.url.id]:derived.URL,
  [regexMap.urls.httpUrl.id]:derived.HTTPURL,
  [regexMap.urls.httpsUrl.id]:derived.HTTPSURL,
  [regexMap.urls.ftpUrl.id]:derived.FTPURL,
  [regexMap.urls.ftpsUrl.id]: derived.FTPSURL,
  [regexMap.urls.sshUrl.id]: derived.SSHURL,
  [regexMap.urls.smtpUrl.id]:derived.SMTPURL,
  [regexMap.urls.pop3Url.id]: derived.POP3URL,
  [regexMap.urls.blobUrl.id]:derived.BlobURL,
  [regexMap.urls.fileUrl.id]: derived.FileURL,
  [regexMap.urls.imapUrl.id]: derived.IMAPURL,
  [regexMap.urls.ldapUrl.id]:derived.LDAPURL,
  [regexMap.uuid.id]: derived.UUID,
  [regexMap.hashes.sha1.id]:derived.SHA1,
  [regexMap.hashes.sha256.id]:derived.SHA256,
  [regexMap.hashes.sha512.id]:derived.SHA512,
  [regexMap.hashes.sha3_224.id]: derived.SHA3_224,
  [regexMap.hashes.sha3_256.id]: derived.SHA3_256,
  [regexMap.hashes.sha3_384.id]: derived.SHA3_384,
  [regexMap.hashes.sha3_512.id]: derived.SHA3_512,
  [regexMap.hashes.blake2b_256.id]: derived.blake2b_256,
  [regexMap.hashes.blake2b_384.id]: derived.blake2b_384,
  [regexMap.hashes.blake2b_512.id]: derived.blake2s_512,
  [regexMap.hashes.blake2s_256.id]: derived.blake2s_256,
  [regexMap.hashes.blake2s_384.id]: derived.blake2s_384,
  [regexMap.hashes.blake2s_512.id]: derived.Keccak_512,
  [regexMap.hashes.keccak_256.id]: derived.Keccak_256,
  [regexMap.hashes.keccak_384.id]: derived.Keccak_384,
  [regexMap.hashes.keccak_512.id]: derived.Keccak_512,
  [regexMap.hashes.ripemd_128.id]: derived.RIPEMD_128,
  [regexMap.hashes.ripemd_160.id]: derived.RIPEMD_160,
  [regexMap.hashes.ripemd_256.id]:derived.RIPEMD_256,
  [regexMap.hashes.ripemd_320.id]:derived.RIPEMD_320,
  [regexMap.hashes.ripemd_384.id]: derived.RIPEMD_384,
  [regexMap.hashes.ripemd_512.id]:derived.RIPEMD_512,
 
  [regexMap.hashes.crc32c.id]:derived.CRC32C,
   
  [regexMap.hashes.crc64ecma.id]:derived.CRC64ECMA,
  [regexMap.hashes.crc64x.id]:derived.CRC64X,
  [regexMap.hashes.crc64xmod.id]:derived.CRC64XMode,
   
  
  [regexMap.mimeType.id]:derived.MIMEType,
    [regexMap.identity.id]:derived.Identity,
  [regexMap.jwt.id]:derived.JWT,

   // [regexMap.mime.id]: (properties) => {
  //   return (<types.Text {...properties}/>);
  // },
};
export function getComponent (name) {
  const ret =  dataDescriptors[name] || types[name];
  return ret;
}
Field.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ value: PropTypes.func }),
  ]),
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  mask: PropTypes.func,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
  helperText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helperLink: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  options: PropTypes.array,
  actions: PropTypes.array,
  exists: PropTypes.func,
  notExists: PropTypes.func,
};

export default function Field({
  id,
  name,
  type = "text",
  style,
  placeholder,
  label,
  mask,
  required,
  helperText,
  helperLink,
  options,
  actions,
  exists,
  notExists,
  ...props
},key) {
  
  if(!mask) mask = (node) => {console.debug("Field:::::::::::::::::::::::::::", type, node); return(
    <View
    key={key}
    style={style?.wrapper}
    >
    {!isEmptyString(label) && <TranslatedText
      style={style?.label } text={label}/>}
    {helperText || helperLink ? <View
      style={{
        flexDirection: 'row',
        ...(style?.helper?.wrapper ?? {}),
      }}>
      {helperText ? (
      <TranslatedText
        text={helperText} 
        style={ style?.helper?.text ?? {} }
        /> ): null }
      {helperLink && (
        <Link
          style={ style?.helper?.linK}
          source={helperLink?.source}>
          {translate(helperLink?.text)}
        </Link>
      )}
    </View> : null}
     {node}
    <View
      style={{
        flexDirection: 'row',
        ...style?.actions?.wrapper,
      }}>
      {actions &&
        actions.map((fieldAction, index) => (
          <Button
            key={index}
            onPress={fieldAction[name]}
            style={  
              fieldAction?.style
            }
            text={fieldAction?.label}
            icon={fieldAction?.icon}
          />
        ))}
    </View>
  </View>
  )};
  
  if (type && type instanceof Function) {
   
    return mask(type({
      id,
      name,
      placeholder,
      style,
      required,
      helperText,
      helperLink,
      options,
      actions,
      exists,
      notExists,
      ...props,
    }));
    
  };
  const ExistingType = getComponent(type);
  if (typeof type === "string" ) {
    console.debug("Field:::::::", type, ExistingType);
   const component = (<ExistingType   
      id = {id}
      name = {name}
      type  = {type}
      placeholder = {placeholder}
      style= {style}
      required= {required}
      helperText={helperText}
      helperLink= {helperLink}
      options= {options}
      actions= {actions}
      exists= {exists}
      notExists= {notExists} 
      {...props} /> );
    return mask(component);
  }
  else {
    console.error("Field: No type found for ", type);
    return null;
  }
}

import {forwardRef} from 'react';
import Text from './Text';

export const Countdown = forwardRef((props, ref) =>  <Text type="countdown" {...props} ref={ref}/>);
export const DateTime = forwardRef((props, ref) =>  <Text type="datetime"  {...props} ref={ref}/>);
export const DateTimeOffset = forwardRef((props, ref) =>  <Text type="datetime"  {...props} ref={ref}/>);
export const SQLDateTime = forwardRef((props, ref) =>  <Text type="datetime" {...props} ref={ref}/>);
export const ISODateTime = forwardRef((props, ref) =>  <Text type="datetime" {...props} ref={ref}/>);
export const Date = forwardRef((props, ref) =>  <Text type="date" {...props} ref={ref}/>);
export const ISODate = forwardRef((props, ref) =>  <Text type="date" {...props} ref={ref}/>);
export const Time = forwardRef((props, ref) =>  <Text type="time" {...props} ref={ref}/>);
export const ISOTime = forwardRef((props, ref) =>  <Text type="time" {...props} ref={ref}/>);
export const Number = forwardRef((props, ref) =>  <Text type="number" {...props} ref={ref}/>);
export const Tel = forwardRef((props, ref) =>  <Text type="tel" {...props} ref={ref}/>);
export const URL = forwardRef((props, ref) =>  <Text type="URL" {...props} ref={ref}/>);
export const Email = forwardRef((props, ref) =>  <Text type="email" {...props} ref={ref}/>);
export const Password = forwardRef((props, ref) =>  <Text type="password" showList={false} {...props} ref={ref}/>);
export const TextArea = forwardRef((props, ref) =>  <Text {...props} multiline ref={ref}/>);

export const IP = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const IPv6 = forwardRef((props, ref) =>  <Text type="text"  {...props} ref={ref}/>);
export const IPv4 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const MAC = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);

export const HTTPURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const HTTPSURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const SSHURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const FTPURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const FTPSURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const SMTPURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const POP3URL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const BlobURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const FileURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const IMAPURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);
export const LDAPURL = forwardRef((props, ref) =>  <URL {...props} ref={ref}/>);

export const MD5 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const CRC32 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const CRC32C = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const CRC64 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const CRC64ECMA = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const CRC64X = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const CRC64XMode = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const SHA1 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const SHA256 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const SHA512 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const SHA3_224 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const SHA3_256 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const SHA3_384 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const SHA3_512 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Blake2b_384 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Blake2b_512 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Blake2s_256 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Blake2s_128 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Blake2s_384 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Blake2s_512 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Keccak_224 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Keccak_256 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Keccak_384 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Keccak_512 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const RIPEMD_128 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const RIPEMD_160 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const RIPEMD_256 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const RIPEMD_320 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const RIPEMD_384 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const RIPEMD_512 = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);

export const MIMEType = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);

export const UUID = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const Identity = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const JWT = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);

export const CurrencyCode = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);

export const CommonName = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
export const PersonalName = forwardRef((props, ref) => {
    props.style = props.style || {};
        props.style.input = props.style.input || {};
        props.style.input.textTransform = "capitalize";
    return <Text type="text" {...props} ref={ref}/>});
    export const Boolean = forwardRef((props, ref) => {
        props.options = props.options ?? [true, false];
        return <Text type="text" {...props} ref={ref}/>});
    export const NullableBoolean = forwardRef((props, ref) => {
        props.options = props.options ?? [true, false, undefined];
        return <Text type="text" {...props} ref={ref}/>});
    export const GPSCoordinate = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
    export const GPSCoordinates = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
    export const HashTag = forwardRef((props, ref) =>  <Text type="text" {...props} ref={ref}/>);
    export const ImageFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.imageFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>}); 
    export const VideoFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.videoFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>}); 
    export const AudioFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.audioFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>});    
      export const DocumentFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.documentFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>});    
    export const OOPFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.oopFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>});    
    export const TextFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.textFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>});    
    export const ProgrammingLanguageFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.programmingLanguageFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>});    
    export const DataFileExtension =  forwardRef((props, ref) => {
        props.options =
              props.options ??
              regexMap.dataFileExtension.pattern
                .toString()
                .match(/\(([^)]+)\)/)[1]
                ?.split("|");
            props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
            return <Text type="text" {...props} ref={ref}/>});    
export const MarkupLanguageFileExtension =  forwardRef((props, ref) => {
props.options =
      props.options ??
      regexMap.markupLanguageFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text type="text" {...props} ref={ref}/>});

 
 
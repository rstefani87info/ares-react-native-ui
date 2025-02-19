import { forwardRef } from 'react';
import dateAndTime from '@ares/core/datesAndTime';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Text from '@ares/react-native-ui/components/input/fields/Text';
import useLocales from '@ares/react-native-ui/locales/useLocales';
import {regexMap} from '@ares/core/dataDescriptors';




function DateTimePicker ({etxtboxRef, type, style}){
    const { currentLanguage } = useLocales();
    
    const [show, setShow] = useState(false);
    const dateFormat = currentLanguage[type];
    const is24Hour = dateFormat.includes("HH");
    const getDateTime = () => {
      const stringDate =  etxtboxRef.value;
      const date = dateAndTime.parse(stringDate, dateFormat);
      return date;
    }
    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      etxtboxRef.value=dateAndTime.format(currentDate, dateFormat, dateFormat);
    };

    const pickerTrigger = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    return <> <Button showIcon={() => <Icon name="calendar-alt" />} onPress={pickerTrigger} />
        {show && (
            <RNDateTimePicker
              testID="dateTimePicker"
              value={getDateTime()}
              mode={mode}
              is24Hour={is24Hour}
              onChange={onDateChange}
            />
        )}
        </>
  }
 

  const types = {
    number: {  keyboardType: "numeric"},
    tel: {  keyboardType: "phone-pad" },
    email: {  keyboardType: "email-address"},
    password: {  secureTextEntry: true},
    url: {  keyboardType: "url" },
    date: { keyboardType: "phone-pad" , editable: false, additionalComponents:[DateTimePicker] },
    datetime: {   keyboardType: "phone-pad" , editable: false, additionalComponents:[DateTimePicker]},
    time: {  keyboardType: "phone-pad" , editable: false, additionalComponents:[DateTimePicker]},
    countdown: {  keyboardType: "phone-pad" , editable: false, additionalComponents:[DateTimePicker] },
    ip: {  keyboardType: "numeric"},

  };


export const Countdown = forwardRef((props, ref) => <Text type="countdown" {...types.countdown.typeAsset} regex={regexMap.countdown.regex} {...props} ref={ref}  />);
export const DateTime = forwardRef((props, ref) => <Text type="datetime" {...types.datetime.typeAsset} regex={regexMap.datetime.regex}  {...props} ref={ref}  />);
export const DateTimeOffset = forwardRef((props, ref) => <Text type="datetime" {...types.datetime.typeAsset} regex={regexMap.datetime.regex} {...props} ref={ref}  />);
export const SQLDateTime = forwardRef((props, ref) => <Text type="datetime"{...types.datetime.typeAsset} regex={regexMap.datetime.regex} {...props} ref={ref}  />);
export const ISODateTime = forwardRef((props, ref) => <Text type="datetime"{...types.datetime.typeAsset} regex={regexMap.datetime.regex} {...props} ref={ref}  />);
export const Date = forwardRef((props, ref) => <Text type="date"{...types.date.typeAsset} regex={regexMap.date.regex} {...props} ref={ref}  />);
export const ISODate = forwardRef((props, ref) => <Text type="date"{...types.date.typeAsset} regex={regexMap.date.regex}  {...props} ref={ref}  />);
export const Time = forwardRef((props, ref) => <Text type="time"{...types.time.typeAsset} regex={regexMap.time.regex}  {...props} ref={ref}  />);
export const ISOTime = forwardRef((props, ref) => <Text type="time"{...types.time.typeAsset} regex={regexMap.time.regex}  {...props} ref={ref}  />);
export const Number = forwardRef((props, ref) => <Text type="number"{...types.number.typeAsset} regex={regexMap.number.regex} {...props} ref={ref}  />);
export const Tel = forwardRef((props, ref) => <Text type="tel"{...types.tel.typeAsset} regex={regexMap.tel.regex} {...props} ref={ref}  />);
export const URL = forwardRef((props, ref) => <Text type="URL"{...types.url.typeAsset} regex={regexMap.url.regex} {...props} ref={ref}  />);
export const Email = forwardRef((props, ref) => <Text type="email"{...types.email.typeAsset} regex={regexMap.email.regex} {...props} ref={ref}  />);
export const Password = forwardRef((props, ref) => <Text type="password" showList={false}{...types.password.typeAsset} {...props} ref={ref}  />);
export const TextArea = forwardRef((props, ref) => <Text {...props} multiline ref={ref} />);

export const IPv4 = forwardRef((props, ref) => <Text type="text"  {...types.ip.typeAsset} regex={regexMap.ip.regex} {...props} ref={ref} />);

export const HTTPURL = forwardRef((props, ref) => <URL regex={regexMap.urls.httpUrl.regex}  {...props} ref={ref} />);
export const HTTPSURL = forwardRef((props, ref) => <URL regex={regexMap.urls.httpsUrl.regex} {...props} ref={ref} />);
export const SSHURL = forwardRef((props, ref) => <URL regex={regexMap.urls.sshUrl.regex} {...props} ref={ref} />);
export const FTPURL = forwardRef((props, ref) => <URL  regex={regexMap.urls.ftpUrl.regex} {...props} ref={ref} />);
export const FTPSURL = forwardRef((props, ref) => <URL regex={regexMap.urls.ftpsUrl.regex} {...props} ref={ref} />);
export const SMTPURL = forwardRef((props, ref) => <URL regex={regexMap.urls.smtpUrl.regex} {...props} ref={ref} />);
export const POP3URL = forwardRef((props, ref) => <URL regex={regexMap.urls.pop3Url.regex} {...props} ref={ref} />);
export const BlobURL = forwardRef((props, ref) => <URL regex={regexMap.urls.blobUrl.regex} {...props} ref={ref} />);
export const FileURL = forwardRef((props, ref) => <URL regex={regexMap.urls.fileUrl.regex} {...props} ref={ref} />);
export const IMAPURL = forwardRef((props, ref) => <URL regex={regexMap.urls.imapUrl.regex} {...props} ref={ref} />);
export const LDAPURL = forwardRef((props, ref) => <URL  regex={regexMap.urls.ldapUrl.regex} {...props} ref={ref} />);

export const MD5 = forwardRef((props, ref) => <Text regex={regexMap.hashes.md5} type="text" {...props} ref={ref} />);
export const CRC32 = forwardRef((props, ref) => <Text regex={regexMap.hashes.crc32} type="text" {...props} ref={ref} />);
export const CRC32C = forwardRef((props, ref) => <Text  regex={regexMap.hashes.crc32c} type="text" {...props} ref={ref} />);
export const CRC64 = forwardRef((props, ref) => <Text regex={regexMap.hashes.crc64} type="text" {...props} ref={ref} />);
export const CRC64ECMA = forwardRef((props, ref) => <Text regex={regexMap.hashes.crc64ecma} type="text" {...props} ref={ref} />);
export const CRC64X = forwardRef((props, ref) => <Text regex={regexMap.hashes.crc64x} type="text" {...props} ref={ref} />);
export const CRC64XMode = forwardRef((props, ref) => <Text regex={regexMap.hashes.crc64xmode} type="text" {...props} ref={ref} />);
export const SHA1 = forwardRef((props, ref) => <Text regex={regexMap.hashes.sha1} type="text" {...props} ref={ref} />);
export const SHA256 = forwardRef((props, ref) => <Text regex={regexMap.hashes.sha256} type="text" {...props} ref={ref} />);
export const SHA512 = forwardRef((props, ref) => <Text regex={regexMap.hashes.sha512} type="text" {...props} ref={ref} />);
export const SHA3_224 = forwardRef((props, ref) => <Text regex={regexMap.hashes.sha3_224} type="text" {...props} ref={ref} />);
export const SHA3_256 = forwardRef((props, ref) => <Text regex={regexMap.hashes.sha3_256} type="text" {...props} ref={ref} />);
export const SHA3_384 = forwardRef((props, ref) => <Text regex={regexMap.hashes.sha3_384} type="text" {...props} ref={ref} />);
export const SHA3_512 = forwardRef((props, ref) => <Text regex={regexMap.hashes.sha3_512} type="text" {...props} ref={ref} />);
export const Blake2b_384 = forwardRef((props, ref) => <Text regex={regexMap.hashes.blake2b_384}  type="text" {...props} ref={ref} />);
export const Blake2b_512 = forwardRef((props, ref) => <Text regex={regexMap.hashes.blake2b_512} type="text" {...props} ref={ref} />);
export const Blake2s_256 = forwardRef((props, ref) => <Text regex={regexMap.hashes.blake2s_256} type="text" {...props} ref={ref} />);
export const Blake2s_128 = forwardRef((props, ref) => <Text regex={regexMap.hashes.blake2s_128} type="text" {...props} ref={ref} />);
export const Blake2s_384 = forwardRef((props, ref) => <Text regex={regexMap.hashes.blake2s_384} type="text" {...props} ref={ref} />);
export const Blake2s_512 = forwardRef((props, ref) => <Text regex={regexMap.hashes.blake2s_512} type="text" {...props} ref={ref} />);
export const Keccak_224 = forwardRef((props, ref) => <Text regex={regexMap.hashes.keccak_224} type="text"  {...props} ref={ref} />);
export const Keccak_256 = forwardRef((props, ref) => <Text regex={regexMap.hashes.keccak_256} type="text" {...props} ref={ref} />);
export const Keccak_384 = forwardRef((props, ref) => <Text regex={regexMap.hashes.keccak_384} type="text" {...props} ref={ref} />);
export const Keccak_512 = forwardRef((props, ref) => <Text regex={regexMap.hashes.keccak_512} type="text" {...props} ref={ref} />);
export const RIPEMD_128 = forwardRef((props, ref) => <Text regex={regexMap.hashes.ripemd_128} type="text" {...props} ref={ref} />);
export const RIPEMD_160 = forwardRef((props, ref) => <Text regex={regexMap.hashes.ripemd_160} type="text" {...props} ref={ref} />);
export const RIPEMD_256 = forwardRef((props, ref) => <Text regex={regexMap.hashes.ripemd_256} type="text" {...props} ref={ref} />);
export const RIPEMD_320 = forwardRef((props, ref) => <Text regex={regexMap.hashes.ripemd_320} type="text" {...props} ref={ref} />);
export const RIPEMD_384 = forwardRef((props, ref) => <Text regex={regexMap.hashes.ripemd_384} type="text" {...props} ref={ref} />);
export const RIPEMD_512 = forwardRef((props, ref) => <Text regex={regexMap.hashes.ripemd_512} type="text" {...props} ref={ref} />);

export const MIMEType = forwardRef((props, ref) => <Text type="text" {...props} ref={ref} />);

export const UUID = forwardRef((props, ref) => <Text regex={regexMap.uuid} type="text" {...props} ref={ref} />);
export const Identity = forwardRef((props, ref) => <Text regex={regexMap.uuid} type="text" {...props} ref={ref} />);
export const JWT = forwardRef((props, ref) => <Text regex={regexMap.jwt} type="text" {...props} ref={ref} />);

export const CurrencyCode = forwardRef((props, ref) => <Text regex={regexMap.currencyCode} type="text" {...props} ref={ref} />);

export const CommonName = forwardRef((props, ref) => <Text regex={regexMap.commonName} type="text" {...props} ref={ref} />);
export const PersonalName = forwardRef((props, ref) => {
    props.style = props.style || {};
    props.style.input = props.style.input || {};
    props.style.input.textTransform = "capitalize";
    return <Text regex={regexMap.personalName} type="text" {...props} ref={ref} />
});
export const Boolean = forwardRef((props, ref) => {
    props.options = props.options ?? [true, false];
    return <Text regex={regexMap.boolean} type="text" {...props} ref={ref} />
});
export const NullableBoolean = forwardRef((props, ref) => {
    props.options = props.options ?? [true, false, undefined];
    return <Text type="text" {...props} ref={ref} />
});
export const GPSCoordinate = forwardRef((props, ref) => <Text regex={regexMap.gpsCoordinate} type="text" {...props} ref={ref} />);
export const GPSCoordinates = forwardRef((props, ref) => <Text regex={regexMap.gpsCoordinates} type="text" {...props} ref={ref} />);
export const HashTag = forwardRef((props, ref) => <Text regex={regexMap.hashTag} type="text" {...props} ref={ref} />);
export const ImageFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.imageFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.imageFileExtension} type="text" {...props} ref={ref} />
});
export const VideoFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.videoFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.videoFileExtension} type="text" {...props} ref={ref} />
});
export const AudioFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.audioFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.audioFileExtension} type="text" {...props} ref={ref} />
});
export const DocumentFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.documentFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.documentFileExtension} type="text" {...props} ref={ref} />
});
export const OOPFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.oopFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.oopFileExtension} type="text" {...props} ref={ref} />
});
export const TextFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.textFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.textFileExtension} type="text" {...props} ref={ref} />
});
export const ProgrammingLanguageFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.programmingLanguageFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.programmingLanguageFileExtension} type="text" {...props} ref={ref} />
});
export const DataFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.dataFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.dataFileExtension} type="text" {...props} ref={ref} />
});
export const MarkupLanguageFileExtension = forwardRef((props, ref) => {
    props.options =
        props.options ??
        regexMap.markupLanguageFileExtension.pattern
            .toString()
            .match(/\(([^)]+)\)/)[1]
            ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return <Text regex={regexMap.markupLanguageFileExtension} type="text" {...props} ref={ref} />
});



    
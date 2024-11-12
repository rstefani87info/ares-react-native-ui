import PropTypes, { node, number } from "prop-types";
import { findPropValueByAlias } from "@ares/core/objects";
import { isEmpty } from "@ares/core/text";
import { regexMap } from "@ares/core/dataDescriptors";
import { CheckBox } from "./CheckBox";
import { Switch } from "./Switch";
import { Text } from "./Text";
import Button from "../actions/Button";
import { getStyle } from "../../../utils/style";
import { p } from "../../../styles/stylesheet";
import { View } from "react-native";

export const types = {
  switch: { name: "switch", component: (props) => <Switch {...props} /> },
  checkbox: { name: "checkbox", component: (props) => <CheckBox {...props} /> },
  text: { name: "text", component: (props) => <Text {...props} /> },
  textArea: {
    name: "textArea",
    component: (props) => <Text {...props} multiline />,
  },
  password: {
    name: "password",
    component: (props) => <Text secureTextEntry showList={false} {...props} />,
  },
  number: {
    name: "number",
    component: (props) => <Text type="number" showList={false} {...props} />,
  },
  email: {
    name: "email",
    component: (props) => <Text type="email" showList={false} {...props} />,
  },
  url: {
    name: "url",
    component: (props) => <Text type="url" showList={false} {...props} />,
  },
  tel: {
    name: "tel",
    component: (props) => <Text type="tel" showList={false} {...props} />,
  },
  date: {
    name: "date",
    component: (props) => <Text type="date" showList={false} {...props} />,
  },
  time: {
    name: "time",
    component: (props) => <Text type="time" showList={false} {...props} />,
  },
  datetime: {
    name: "datetime",
    component: (props) => <Text type="datetime" showList={false} {...props} />,
  },
  countdown: {
    name: "countdown",
    component: (props) => <Text type="countdown" showList={false} {...props} />,
  },
};

/**
 * Data descriptors
 */
export const dataDescriptors = {
  "@get": function (name) {
    return findPropValueByAlias(this, name);
  },
  [regexMap.countdown.id]: (...props) => {
    return types.countdown.component(props);
  },
  [regexMap.isodate.id]: (...props) => {
    return types.date.component(props);
  },
  [regexMap.isodatetime.id]: (...props) => {
    return types.datetime.component(props);
  },

  [regexMap.telephone.id]: (...props) => {
    return types.tel.component(props);
  },

  [regexMap.ipv4.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.ipv6.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.httpUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.ftpUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.sshUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.smtpUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.pop3Url.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.blobUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.fileUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.hashMd5.id]: (...props) => {
    return types.text.component({ maxLength: 32, ...props });
  },
  [regexMap.crc32.id]: (...props) => {
    return types.text.component({ maxLength: 8, ...props });
  },
  [regexMap.crc64.id]: (...props) => {
    return types.text.component({ maxLength: 16, ...props });
  },
  [regexMap.userName.id]: (...props) => {
    return types.text.component({ maxLength: 100, ...props });
  },
  [regexMap.password.id]: (...props) => {
    return types.password.component({ maxLength: 100, ...props });
  },
  [regexMap.zipCode.id]: (...props) => {
    props.maxLength = 9;
    return types.number.component(props);
  },

  [regexMap.countryCode.id]: (...props) => {
    props.maxLength = 9;
    return types.text.component(props);
  },
  [regexMap.languageCode.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.provinceCode.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.boolean.id]: (...props) => {
    props.options = props.options ?? [true, false];
    return types.checkbox.component(props);
  },
  [regexMap.nullableBoolean.id]: (...props) => {
    props.options = props.options ?? [true, false, undefined];
    return types.checkbox.component(props);
  },
  [regexMap.switch.id]: (...props) => {
    props.options = props.options ?? [true, false];
    return types.switch.component(props);
  },
  [regexMap.number.id]: (...props) => {
    return types.number.component(props);
  },
  [regexMap.geographicalCoordinate.id]: (...props) => {
    return types.number.component(props);
  },
  [regexMap.geographicalCoordinates.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.hashtag.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.mime.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.imageFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.imageFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    return types.text.component(props);
  },
  [regexMap.videoFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.videoFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.audioFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.audioFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.documentFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.documentFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.oopFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.oopFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.textFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.textFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.programmingLanguageFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.programmingLanguageFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.dataFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.dataFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.markupLanguageFileExtension.id]: (...props) => {
    props.options =
      props.options ??
      regexMap.markupLanguageFileExtension.pattern
        .toString()
        .match(/\(([^)]+)\)/)[1]
        ?.split("|");
    props.options = [...new Set(props.options.map((o) => o.toLowerCase()))];
    return types.text.component(props);
  },
  [regexMap.url.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.phone.id]: (...props) => {
    return types.phone.component(props);
  },
  [regexMap.currencyCode.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.jwt.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.personalName.id]: (...props) => {
    props.style = props.style || {};
    props.style.input = props.style.input || {};
    props.style.input.textTransform = "capitalize";
    return types.text.component(props);
  },
  [regexMap.date.id]: (...props) => {
    return types.date.component(props);
  },
  [regexMap.datetime.id]: (...props) => {
    return types.datetime.component(props);
  },
  [regexMap.sqldatetime.id]: (...props) => {
    return types.datetime.component(props);
  },
  [regexMap.isodatetime.id]: (...props) => {
    return types.datetime.component(props);
  },
  [regexMap.isotime.id]: (...props) => {
    return types.time.component(props);
  },
  [regexMap.datetimeoffset.id]: (...props) => {
    return types.datetime.component(props);
  },
  [regexMap.time.id]: (...props) => {
    return types.time.component(props);
  },
  [regexMap.commonName.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.phoneNumber.id]: (...props) => {
    return types.tel.component(props);
  },
  [regexMap.email.id]: (...props) => {
    return types.email.component(props);
  },
  [regexMap.ip.id]: (...props) => {
    // props.maxLength = 15;
    return types.text.component(props);
  },
  [regexMap.ipV6.id]: (...props) => {
    // props.maxLength = 39;
    return types.text.component(props);
  },
  [regexMap.url.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.httpUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.httpsUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.ftpUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.ftpsUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.sshUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.smtpUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.pop3Url.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.blobUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.fileUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.imapUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.urls.ldapUrl.id]: (...props) => {
    return types.url.component(props);
  },
  [regexMap.uuid.id]: (...props) => {
    // props.maxLength = 36;
    return types.text.component(props);
  },
  [regexMap.hashes.md5.id]: (...props) => {
    // props.maxLength = 32;
    return types.text.component(props);
  },
  [regexMap.hashes.sha1.id]: (...props) => {
    // props.maxLength = 40;
    return types.text.component(props);
  },
  [regexMap.hashes.sha256.id]: (...props) => {
    // props.maxLength = 64;
    return types.text.component(props);
  },
  [regexMap.hashes.sha512.id]: (...props) => {
    // props.maxLength = 128;
    return types.text.component(props);
  },
  [regexMap.hashes.sha3_224.id]: (...props) => {
    // props.maxLength = 56;
    return types.text.component(props);
  },
  [regexMap.hashes.sha3_256.id]: (...props) => {
    // props.maxLength = 64;
    return types.text.component(props);
  },
  [regexMap.hashes.sha3_384.id]: (...props) => {
    // props.maxLength = 96;
    return types.text.component(props);
  },
  [regexMap.hashes.sha3_512.id]: (...props) => {
    // props.maxLength = 128;
    return types.text.component(props);
  },
  [regexMap.hashes.blake2b_256.id]: (...props) => {
    // props.maxLength = 64;
    return types.text.component(props);
  },
  [regexMap.hashes.blake2b_384.id]: (...props) => {
    // props.maxLength = 96;
    return types.text.component(props);
  },
  [regexMap.hashes.blake2b_512.id]: (...props) => {
    // props.maxLength = 128;
    return types.text.component(props);
  },
  [regexMap.hashes.blake2s_256.id]: (...props) => {
    // props.maxLength = 64;
    return types.text.component(props);
  },
  [regexMap.hashes.blake2s_384.id]: (...props) => {
    // props.maxLength = 96;
    return types.text.component(props);
  },
  [regexMap.hashes.blake2s_512.id]: (...props) => {
    // props.maxLength = 128;
    return types.text.component(props);
  },
  [regexMap.hashes.keccak_256.id]: (...props) => {
    // props.maxLength = 64;
    return types.text.component(props);
  },
  [regexMap.hashes.keccak_384.id]: (...props) => {
    // props.maxLength = 96;
    return types.text.component(props);
  },
  [regexMap.hashes.keccak_512.id]: (...props) => {
    // props.maxLength = 128;
    return types.text.component(props);
  },
  [regexMap.hashes.ripemd_128.id]: (...props) => {
    // props.maxLength = 32;
    return types.text.component(props);
  },
  [regexMap.hashes.ripemd_160.id]: (...props) => {
    // props.maxLength = 40;
    return types.text.component(props);
  },
  [regexMap.hashes.ripemd_256.id]: (...props) => {
    // props.maxLength = 64;
    return types.text.component(props);
  },
  [regexMap.hashes.ripemd_320.id]: (...props) => {
    // props.maxLength = 80;
    return types.text.component(props);
  },
  [regexMap.hashes.ripemd_384.id]: (...props) => {
    // props.maxLength = 96;
    return types.text.component(props);
  },
  [regexMap.hashes.ripemd_512.id]: (...props) => {
    // props.maxLength = 128;
    return types.text.component(props);
  },
  [regexMap.hashes.crc32.id]: (...props) => {
    // props.maxLength = 32;
    return types.text.component(props);
  },
  [regexMap.hashes.crc32c.id]: (...props) => {
    // props.maxLength = 32;
    return types.text.component(props);
  },
  [regexMap.hashes.crc64.id]: (...props) => {
    // props.maxLength = 16;
    return types.text.component(props);
  },
  [regexMap.hashes.crc64ecma.id]: (...props) => {
    // props.maxLength = 16;
    return types.text.component(props);
  },
  [regexMap.hashes.crc64x.id]: (...props) => {
    // props.maxLength = 16;
    return types.text.component(props);
  },
  [regexMap.hashes.crc64xmod.id]: (...props) => {
    // props.maxLength = 16;
    return types.text.component(props);
  },
  [regexMap.hashes.crc64ecma.id]: (...props) => {
    // props.maxLength = 16;
    return types.text.component(props);
  },
  [regexMap.username.id]: (...props) => {
    // props.maxLength = 100;
    return types.text.component(props);
  },
  [regexMap.password.id]: (...props) => {
    // props.maxLength = 100;
    return types.password.component(props);
  },
  [regexMap.zipCode.id]: (...props) => {
    // props.maxLength = 9;
    return types.number.component(props);
  },
  [regexMap.countryCode.id]: (...props) => {
    // props.maxLength =  2;
    return types.text.component(props);
  },
  [regexMap.languageCode.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.provinceCode.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.gpsCoordinate.id]: (...props) => {
    return types.number.component(props);
  },
  [regexMap.gpsCoordinates.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.mimeType.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.identity.id]: (...props) => {
    return types.text.component(props);
  },
  [regexMap.jwt.id]: (...props) => {
    return types.text.component(props);
  },
};

Field.propTypes = {
  id: PropTypes.required.string,
  name: PropTypes.required.string,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ value: PropTypes.func }),
  ]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.object,
  mask: PropTypes.function,
};

export default function Field({
  id,
  name,
  type = "text",
  style,
  placeholder,
  label,
  mask = null,
  ...props
}) {
  const existingType = dataDescriptors['@get'](type);
  if(!mask) mask = (node) => (<View style={getStyle(style,'field-wrapper', name)}>{isEmpty(label) && <Text style={getStyle(style,'field-lebel', name)}>{label}</Text>} {node}</View>);
  if (existingType) {
    return mask(label,existingType({ id, name, placeholder, style, ...props }));
  } else if (type instanceof Function) {
    return mask(label,type({
      id,
      name,
      placeholder,
      style,
      ...props,
    }));
  }
}

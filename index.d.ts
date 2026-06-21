declare module '@ares/react-native-ui' {
  export const config: any;
  export function setConfig(newConfig: any): void;

  export const aReSContext: any;
  export function ARESProvider(props: any): any;

  export function AuthProvider(props: any): any;
  export function useAuth(): any;

  export const ApplicationRoot: any;
  export const Cache: any;
  export const Flash: any;

  export const Button: any;

  export const CheckBox: any;
  export const Field: any;
  export const Switch: any;
  export const Text: any;

  export const Form: any;
  export const FormField: any;

  export const Error: any;
  export const Link: any;
  export const Loading: any;
  export const Map: any;
  export const Modal: any;
  export const Rate: any;
  export const TranslatedText: any;
}

declare module '@ares/react-native-ui/*' {
  const value: any;
  export default value;
  export = value;
}

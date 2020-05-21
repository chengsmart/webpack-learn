declare const ENV_NAME: string;

declare const _hmt: any;

interface Window {
  openDatabase: any;
  _hmt: any;
}
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

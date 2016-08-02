declare module 'react-css-modules' {
  function ReactCssModules<TElement extends Function>(component: TElement, styles: any): TElement
  export = ReactCssModules;
}

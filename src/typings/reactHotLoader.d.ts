// tslint:disable
declare module ReactHotLoader {
  import React = __React;

  export class AppContainer extends React.Component<{}, {}> {}
}

declare module 'react-hot-loader' {
  export = ReactHotLoader;
}

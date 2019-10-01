import React from 'react';
import App from 'next/app';
import isLocalStorageAvailable from 'utils/local-storage-available';
import ApiUrlContext, { API_URL } from 'common/api-url-context';

const AUTH_KEY_NAME = 'whiskyneat';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   // const appProps = await App.getInitialProps(appContext);

  //   // return { ...appProps }
  //   console.log(appContext);
  //   return {};
  // }

  state = {
    token: null,
  };

  setToken = (token) => {
    // this.setState({ token });
    console.log(token);
  }

  componentDidMount() {
    if (!isLocalStorageAvailable()) {
      throw new Error('Get a better browser');
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ApiUrlContext.Provider value={API_URL}>
        <Component {
          ...{
            ...pageProps,
            setToken: this.setToken,
          }
        } />
      </ApiUrlContext.Provider>
    );
  }
}

export default MyApp;

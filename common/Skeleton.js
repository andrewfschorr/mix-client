import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/header';
// import Head from 'common/head';
// import Footer from 'common/footer';

const Skeleton = ({ pathname = '', children }) => {
  return (
    <>
      {/* <Head /> */}
      <Header className="header" pathname={pathname} />
      { children }
      {/* <Footer /> */}
    </>
  );
};

Skeleton.propTypes = {

};

export default Skeleton;

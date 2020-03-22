import React from 'react';
import PropTypes from 'prop-types';

// import Header from 'components/Header';
// import Head from '/head';
// import Footer from './footer';
import Header from 'components/Header';
import Head from 'common/Head';
import Footer from 'common/Footer';

const Skeleton = ({ pathname = '', children }) => {
  return (
    <>
      <Head />
      <Header className="header" pathname={pathname} />
      { children }
      <Footer />
    </>
  );
};

Skeleton.propTypes = {

};

export default Skeleton;

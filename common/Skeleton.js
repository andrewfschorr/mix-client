import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Head from 'common/Head';
import Footer from 'common/Footer';

const Skeleton = ({ pathname = '', children }) => {
  return (
    <>
      <Head />
      <Header type="loggedout" className="header" pathname={pathname} />
      { children }
      <Footer />
    </>
  );
};

Skeleton.propTypes = {

};

export default Skeleton;

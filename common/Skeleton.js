import React from 'react';
import PropTypes from 'prop-types';

import Navigation from 'components/Navigation';
import Head from './Head';
import Footer from './Foot';

const Skeleton = ({ pathname = '', children }) => {
  return (
    <>
      <Head />
      <Navigation className="header" pathname={pathname} />
      { children }
      <Footer />
    </>
  );
};

Skeleton.propTypes = {

};

export default Skeleton;

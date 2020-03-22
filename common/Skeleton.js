import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Header';
import Head from 'common/Head';
import Poop from 'common/Poop';

const Skeleton = ({ pathname = '', children }) => {
  return (
    <>
      <Head />
      <Header className="header" pathname={pathname} />
      { children }
      <Poop />
    </>
  );
};

Skeleton.propTypes = {

};

export default Skeleton;

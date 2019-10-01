import getConfig from 'next/config';
import React from 'react';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;
const ApiUrlContext = React.createContext(API_URL);
export default ApiUrlContext;
export { API_URL };

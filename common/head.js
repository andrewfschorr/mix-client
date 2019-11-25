import 'styles/global.css';
import Head from 'next/head';

const Layout = ({ children }) => (
  <Head>
    {children}
  </Head>
);

export default Layout;

import 'styles/global.css';
import Layout from 'common/layout';
import Header from 'components/header';

const Login = ({ pathname }) => (
  <>
    <Layout />
    <Header type="loggedout" pathname={pathname} />
    <p>{`this is the route ${pathname}`}</p>
  </>
);

Login.getInitialProps = async function ({
  pathname,
  query,
  asPath,
  req,
  res,
  err
}) {
  //     pathname - path section of URL
  // query - query string section of URL parsed as an object
  // asPath - String of the actual path (including the query) shows in the browser
  // req - HTTP request object (server only)
  // res - HTTP response object (server only)
  // err - Error object if any error is encountered during the rendering
  console.log(pathname);
  console.log(asPath);
  // console.log(req);
  // console.log(res);
  return {
    pathname,
  };
};

export default Login;
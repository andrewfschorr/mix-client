import 'styles/global.css';
import Head from 'common/Head';
import Footer from 'common/Footer';
import Header from 'components/Header';

const Login = ({ pathname }) => (
  <>
    <Head />
    <Header type="loggedout" className="header" pathname={pathname} />
    <div className="w-full justify-center items-center flex main">
      <form className="bg-white border-solid border-2 border-gray-600 rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="andrew@mixapp.com" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="" />
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign up
          </button>
        </div>
      </form>
    </div>
    <Footer />
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

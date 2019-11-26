import 'styles/global.css';

import https from 'https';

import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import doFetch from 'utils/doFetch';

import { IS_DEV } from 'utils/appConstants';

function Index({ pathname, data }) {
  return (
    <Skeleton pathname={pathname}>
    <div className="w-full flex main">
        <p>
          <button
            type="button"
            // onClick={() => doFetch(console.log, console.log)}>
            onClick={() => {}}>
            click me
          </button>
        </p>
        <br/><br/>
        <h2>{`Hello ${data.email}`}</h2>
      </div>
    </Skeleton>
  );
}

Index.getInitialProps = async (ctx) => {
  const { whiskyNeat } = cookies(ctx);
  const additionalData = IS_DEV ? {
    agent: new https.Agent({
      rejectUnauthorized: false,
    }),
  } : {};

  const res = await doFetch(
    '/me',
    {
      Authorization: `Bearer ${whiskyNeat}`,
    },
    undefined,
    additionalData,
  );
  const data = await res.json();
  return {
    data,
  };
};

export default Index;

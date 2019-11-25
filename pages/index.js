import 'styles/global.css';
import Skeleton from 'common/Skeleton';
import cookies from 'next-cookies';
import doFetch from 'utils/doFetch';

function Index({ pathname, data }) {
  // console.log(data);
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
  const res = await doFetch(
    '/me',
    {
      Authorization: `Bearer ${whiskyNeat}`,
    },
  );
  const data = await res.json();
  return {
    data,
  };
};

export default Index;

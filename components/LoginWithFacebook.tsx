import { useRouter } from 'next/router';
import { useState } from 'react';
import makeRequest from 'utils/makeRequest';
import { API_URL } from 'utils/appConstants';

export default () => {
  const router = useRouter();
  const [facebookAccessCode, setFacebookAccessCode] = useState('');
  const [error, setError] = useState(null);
  return (
    <>
      <h5>Log in with Facebook</h5>
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="facebookAccessCode"
        >
          Access Code
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="facebookAccessCode"
          type="password"
          placeholder=""
          value={facebookAccessCode}
          onChange={(e) => setFacebookAccessCode(e.target.value)}
        />
        {error ? <p className="text-red-500 text-xs italic">{error}</p> : null}
      </div>
      <a
        className="mt-6 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        // href={`https://mixapp.test/api/login/facebook?accessCode=${facebookAccessCode}`}
        onClick={(e) => {
          makeRequest(`/fbaccesscode?accessCode=${facebookAccessCode}`).then(
            (resp) => {
              if (resp.status !== 200) {
                return setError('Incorrect access code entered.');
              }
              document.location.href = `${API_URL}/api/login/facebook?accessCode=${facebookAccessCode}`;
            }
          );
        }}
        type="button"
      >
        login with facebook
      </a>
    </>
  );
};

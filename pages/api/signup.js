import doFetch from 'utils/doFetch';

export default async (req, res) => {
  const { email, password } = req.body;

  const response = await doFetch('/signup', {
    method: req.method,
    body: {
      password,
      email,
    },
  }, true);

  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    console.error(response);
    res.status(response.status).json(response.statusText);
  }
};

import doFetch from 'utils/doFetch';

export default async (req, res) => {
  const { email, password, accessCode } = req.body;

  const response = await doFetch('/signup', {
    method: req.method,
    body: {
      password,
      email,
      accessCode,
    },
  }, true);
  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    res.status(response.status).json(response.statusText);
  }
};

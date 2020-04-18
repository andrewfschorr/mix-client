import doFetch from 'utils/doFetch';

export default async (req, res) => {
  const { query: { id } } = req;
  const response = await doFetch(`/drink/${id}`, {}, true);
  if (response.status === 200) {
    res.status(200).json(await response.json());
  } else {
    res.status(response.status).json(response.statusText);
  }
};

export default (cookieProps) => {
  if (!(typeof cookieProps === 'object' && cookieProps !== null)) {
    throw new Error('Cookie props needs to be of type obejct');
  }
  let cookieString = '';
  Object.entries(cookieProps).forEach(arrayEntries => {
    const [key, value] = arrayEntries;
    cookieString += `${key}=${value};`;
  });
  console.log(cookieString);
  // TODO set time
  document.cookie = cookieString;
}

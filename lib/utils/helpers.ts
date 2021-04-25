import KSUID from 'ksuid';

export const titleCase = (name) =>
  name
    .trim()
    .toLowerCase()
    .split(/[ \t]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const addCountryCode = (num) => {
  if (num.search(/^[+]880[0-9]{10}/) !== -1) {
    return num;
  } else if (num.search(/^880[0-9]{10}/) !== -1) {
    return "+" + num;
  } else if (num.search(/^0[0-9]{10}/) !== -1) {
    // console.log(num);
    return "+88" + num;
  } else {
    return num;
  }
};

export function errorFactory(error, errorCreator) {
  return error.status ? error: errorCreator(error.message);
}

export async function generateID(): Promise<string> {
  const resp = await KSUID.random();
  return resp.string;
}
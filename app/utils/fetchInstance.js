import ENV from 'ember-todos/config/environment';

const headers = new Headers();
headers.set('Content-Type', 'application/json');

function getCookie(cname) {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/**
 *
 * @param {string} url
 * @param {{string, object}} param1
 * @returns
 */
const fetchInstance = async (url, { method = 'GET', body }) => {
  headers.set('Authorization', `Bearer ${getCookie('token')}`);
  return fetch(`${ENV.API_URL}${url}`, {
    method,
    body,
    headers,
  });
};

export default fetchInstance;

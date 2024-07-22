export const getClientCookie = (name: string) => {
  let matches = null;

  if (typeof window !== 'undefined') {
    matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)',
      ),
    );
  }

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setClientCookie = (
  name: string,
  value: string | number | boolean,
) => (document.cookie = `${name}=${value};path=/`);

import '../scss/main.scss';

import secrets from '../assets/secrets';

console.log('hello world!');

fetch(secrets.api, {
  method: 'POST',
  body: JSON.stringify({
    query: `query{
      courses{
        title
      }
    }`,
    variables: { id: 1 },
  }),
})
  .then((res) => res.json())
  .then((res) => console.log(res))
  .catch((e) => Error(e));

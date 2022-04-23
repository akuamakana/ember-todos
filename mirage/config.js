export default function () {
  this.urlPrefix = 'http://localhost:4004'; // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = 'http://localhost:4004'; // make this `/api`, for example, if your API is namespaced
  this.timing = 0; // delay for each request, automatically set to 0 during testing

  this.post('/user/login', (schema, request) => {
    let attrs = JSON.parse(request.requestBody);

    return {
      user: {
        age: 27,
        _id: '625f4b6685b3490017ee9f66',
        name: 'kion',
        email: attrs.email,
        createdAt: '2022-04-19T23:53:10.348Z',
        updatedAt: '2022-04-22T16:37:19.782Z',
        __v: 67,
      },
      token: `login${attrs.email}${attrs.password}`,
    };
  });

  this.post('/user/register', (schema, request) => {
    let attrs = JSON.parse(request.requestBody);

    return {
      user: {
        age: attrs.age,
        _id: '625f4b6685b3490017ee9f66',
        name: attrs.name,
        email: attrs.email,
        createdAt: '2022-04-19T23:53:10.348Z',
        updatedAt: '2022-04-22T16:37:19.782Z',
        __v: 67,
      },
      token: `register${attrs.email}${attrs.password}${attrs.age}${attrs.name}`,
    };
  });

  this.delete('/user/me', () => 'User Deleted');

  this.post('/user/logout', () => 'Logged out');

  this.get('/user/me', () => ({
    age: 27,
    _id: '625f4b6685b3490017ee9f66',
    name: 'kion',
    email: 'email@email.com',
    createdAt: '2022-04-19T23:53:10.348Z',
    updatedAt: '2022-04-22T16:37:19.782Z',
    __v: 67,
  }));
}

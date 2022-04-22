export default function () {
  this.urlPrefix = 'http://localhost:4004'; // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = 'http://localhost:4004'; // make this `/api`, for example, if your API is namespaced
  this.timing = 0; // delay for each request, automatically set to 0 during testing

  this.post('/user/login', (schema, request) => {
    let attrs = JSON.parse(request.requestBody);
    console.log(attrs);

    return {
      user: {
        age: 27,
        _id: '625f4b6685b3490017ee9f66',
        name: 'kion',
        email: 'akuamakana@gmail.com',
        createdAt: '2022-04-19T23:53:10.348Z',
        updatedAt: '2022-04-22T16:37:19.782Z',
        __v: 67,
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVmNGI2Njg1YjM0OTAwMTdlZTlmNjYiLCJpYXQiOjE2NTA2NDU0Mzl9.vR-Hd_LViQUrn5UN0bBh-0efEtgZD5ZT0rv-m3uYgFc',
    };
  });

  // this.create('user');

  // this.post(
  //   '/user/login',
  //   () => {
  //     console.log('Unable to login');
  //     return { error: 'Unable to login' };
  //   },
  //   400
  // );

  // this.post('/user/login', (schema, request) => {
  //   let attrs = JSON.parse(request.requestBody);
  //   console.log(attrs);
  // });
}

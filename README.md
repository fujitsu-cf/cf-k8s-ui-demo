# cf-k8s-ui-demo

## Getting started

1\. Clone the project: `git clone https://github.com/fujitsu-cf/cf-k8s-ui-demo.git`
2\. Change the `app/src/app.js` to your options and the endpoint to your REST service:

```
  .constant('server', 'http://cf-test-postgres.cf.svc.cluster.local');

```

3\. Install npm packages: `npm install`
4\. Push this application to Cloud Foundry using the cf Command Line Interface (CLI): `cf push`.
5\. Enjoy the CF application

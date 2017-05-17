# octo-tagger-frontend
This repository contains the Frontend for the _yolo tagger_ project, an infrastructure built around the amazing [darknet yolo project](https://pjreddie.com/darknet/yolo/). Check it out at [gruppe7.testsites.info](https://gruppe7.testsites.info).

## Technologies
This Frontend is using the following (notable) technologies:
* The Vue Stack ([VueJS](https://vuejs.org/), [vue-router](https://router.vuejs.org/en/), [vuex](https://vuex.vuejs.org/en/intro.html)), an awesome fully featured SPA Framework
* [Vue Material](https://vuematerial.github.io/#/), Material Design Components for Vue.
* [vue-resource](https://github.com/pagekit/vue-resource), an HTTP client for Vue.
* [Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events), for pushing classification results to the client in real time. We also support polling [if your browser doesn't support](http://gph.is/1sXV7Iq) SSE's.

## Deployment
### Nginx
This repository contains a [`Dockerfile`](https://github.com/SwaggerTagger/octo-tagger-frontend/blob/master/Dockerfile), as well as a [`NGINX configuration`](https://github.com/SwaggerTagger/octo-tagger-frontend/blob/master/deploy/nginx.conf), that builds an SSL-Enabled Docker container that serves this project as static HTML and provides a reverse proxy connection to the Backend. You can use `push.sh` at the root of the repository to push modifications of the frontend to our Container Registry.
### (re-)deploying to Kubernetes
Together with [tagger-kubernetes](https://github.com/SwaggerTagger/tagger-kubernetes), here's how you deploy the frontend to your cluster using one shell command:

```bash
alias deploy-webeng-frontend="npm run build && ./push.sh && kubectl delete -f ../webeng-tagger/30_frontend-deploy.yml && kubectl create -f ../webeng-tagger/30_frontend-deploy.yml"
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

<template>
  <div class="fullScreenForm">
    <div class="black-bg"></div>
    <video poster="../assets/yolo.png" id="background-yolo" playsinline autoplay muted loop>
      <source src="../assets/yolo2.webm" type="video/webm"></source>
    </video>
    <div class="aligned">
      <md-whiteframe elevation="2" class="aligned-item">
        <md-toolbar id="orange">
          <h2 class="md-title" style="flex: 1">{{ title }}</h2>
          <router-link v-for="button in buttons" tag="button" :to="button.to" class="md-button">{{button.text}}</router-link>
        </md-toolbar>
        <slot></slot>
      </md-whiteframe>
    </div>
  </div>
</template>

<script>
var state = { "rememberMe": true }
export default {
  name: 'video-dialog',
  props: [
    'title',
    'buttons'
  ],
  data: function () {
    return state;
  },
  methods: {
  },
}
</script>

<style>
#background-yolo {
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background-size: cover;
}

form {
  width: 300px;
  padding: 10px;
  background-color: white;
}

.aligned {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
}

.black-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1000;
  background: black;
}

.aligned-item {
  max-width: 50%;
  padding: 0px;
  opacity: 0.8;
}
</style>

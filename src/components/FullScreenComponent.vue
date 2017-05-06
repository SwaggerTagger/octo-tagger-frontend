<template>
  <md-whiteframe md-elevation="5" class="full-screen-dialog">
  <router-link to="/dashboard">
    <md-button class="md-fab md-accent md-fab-top-right">
        <md-icon class="white">close</md-icon>
    </md-button>
    </router-link>
    <div class="aligned">
      <div class="aligned-item">
      <img src="http://placehold.it/650x450" alt="Classified Image"/>
      </div>
      <div class="aligned-item">
      <div class="tags">
        <md-chip>Person</md-chip>
        <md-chip>Cat</md-chip>
        <md-chip>lel</md-chip>
      </div>
      </div>
    </div>
  </md-whiteframe>
</template>

<script>
export default {
  name: 'fullscreen-image',
  data: function () {
  },
  methods: {
  },
}
</script>

<style>
div.full-screen-dialog {
  position:fixed;
  z-index: 100;
  top: 80px;
  bottom: 80px;
  left:10px;
  right: 10px;
  background-color:white;
}
.white {
  color:white; 
}
.aligned {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 64px);
}

.tags {
  margin-top: 20px;
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

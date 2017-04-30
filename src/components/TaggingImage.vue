<template>
  <md-card md-with-hover>
    <md-card-media>
      <md-image :md-src="image.url"></md-image>
    </md-card-media>

    <md-card-header>
      <div class="md-title">Title goes here</div>
      <div class="md-subhead">Uploaded: {{ image.uploadedAt | moment("dddd, MMMM Do YYYY HH:mm") }}</div>

    </md-card-header>

    <md-card-actions>
      <md-button>Delete</md-button>
    </md-card-actions>

    <md-card-content>
      <md-chips v-model="image.predictions" md-static>
        <template scope="chip">{{ chip.category }}</template>
      </md-chips>
      <div v-if="image.classificationStart">Tagged: {{ image.classificationStart | moment("dddd, MMMM Do YYYY") }}</div>
      <div v-if="image.classificationDuration">Duration: {{ image.classificationDuration }}</div>
    </md-card-content>
  </md-card>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'tagging-image',
  props: {
    image: Object,
  },
}
</script>

<style>
</style>

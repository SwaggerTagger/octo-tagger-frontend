<template>
  <md-card>
    <md-card-media>
      <md-image :md-src="url"></md-image>
    </md-card-media>

    <md-card-header>
      <div class="md-title">Title goes here</div>
      <div class="md-subhead">Uploaded: {{ uploadedAt | moment("dddd, MMMM Do YYYY") }}</div>
      <div class="md-subhead" v-if="classificationStart">Tagged: {{ classificationStart | moment("dddd, MMMM Do YYYY") }}</div>
      <div class="md-subhead" v-if="classificationDuration">Duration: {{ classificationDuration }}</div>
    </md-card-header>

    <md-card-actions>
      <md-button>Delete</md-button>
    </md-card-actions>

    <md-card-content>
      <md-chips v-model="fruits" md-static>
        <template scope="chip">{{ chip.category }} ({{chip.probability}})</template>
      </md-chips>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'image-prediction',
}
</script>

<style>
</style>

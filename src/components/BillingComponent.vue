<template>
<md-table-card>
  <md-toolbar>
    <h1 class="md-title">Billing Overview</h1>
    <md-button class="md-icon-button">
      <md-icon>filter_list</md-icon>
    </md-button>

    <md-button class="md-icon-button">
      <md-icon>search</md-icon>
    </md-button>
  </md-toolbar>

  <md-table-alternate-header md-selected-label="selected">
    <p><i>total selected cost:</i> <code>{{totalCost}} €</code></p>
  </md-table-alternate-header>

  <md-table md-sort="calories" @select="onSelect">
    <md-table-header>
      <md-table-row>
        <md-table-head md-sort-by="filename">Filename</md-table-head>
        <md-table-head md-sort-by="state" width="100px">State</md-table-head>
        <md-table-head md-sort-by="classificationStart" md-numeric md-tooltip="The Date in which you submitted this task">Classification Start</md-table-head>
        <md-table-head md-sort-by="classificationDuration" md-tooltip="The total CPU time for your task" md-numeric>Duration (s)</md-table-head>
        <md-table-head md-sort-by="cost" md-tooltip="The total cost for this task" md-numeric>Cost (ct)</md-table-head>
      </md-table-row>
    </md-table-header>

    <md-table-body>
      <md-table-row v-for="(row, rowIndex) in images" :key="rowIndex" :md-item="row" md-selection>
        <md-table-cell v-for="(column, columnIndex) in row" :key="columnIndex" :md-numeric="columnIndex !== 'dessert' && columnIndex !== 'comment' && columnIndex !== 'type'">
          <span v-if="columnIndex === 'filename'"><a target="_blank" :href="images[rowIndex]['url']">{{column}}</a></span>
          <span v-if="columnIndex === 'state'">
            <md-icon v-if="column === 'completed'">check_circle</md-icon>
            <md-icon v-if="column === 'pending'">settings_ethernet</md-icon>
          </span>
          <span v-if="columnIndex === 'classificationStart'">{{column | moment("DD.MM.YY hh:mm") }}</span>
          <span v-if="columnIndex === 'classificationDuration'">{{column}}</span>
          <span v-if="columnIndex === 'cost'">{{column}}</span>
          <!--<span v-if="columnIndex !== 'state' && columnIndex !== 'comment'">{{ column }}</span>-->
        </md-table-cell>
      </md-table-row>
    </md-table-body>
  </md-table>
</md-table-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'billing',
  data: () => ({
    totalCost: 0
  }),
  methods: {
    ...mapGetters(['getImages']),

    toState(duration) {
        return duration? 
            'completed'
          : 'pending';
    },

    toCostRaw(duration) {
      return (duration / 7500)
    },

    toCost(duration) {
      return this.toCostRaw(duration).toFixed(3)
    },

    onSelect(selections) {
      this.$data.totalCost = 0
      for (var key in selections) {
        this.$data.totalCost += this.toCostRaw(selections[key].classificationDuration)
      }
      this.$data.totalCost = this.$data.totalCost.toFixed(3)
    }
  },
  computed: {
    images() {
        const arr = [];
        this.getImages().forEach(x => arr.push(((
            ({filename, classificationStart, classificationDuration, url}) => {
                return {
                    filename, 
                    state: this.toState(classificationDuration),
                    classificationStart,
                    classificationDuration: Math.round(classificationDuration / 1000),
                    cost: this.toCost(classificationDuration)
               }
            })(x)
        )))
        console.log(arr);
        return arr;
    }
  },
}
</script>

<style>
</style>




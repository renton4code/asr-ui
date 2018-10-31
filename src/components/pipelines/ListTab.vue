<template>
  <div
    v-if="isLoading"
    class="mdl-progress mdl-js-progress mdl-progress__indeterminate centered"
  ></div>
  <div v-else class="list-pipelines-layout">
    TODO: implement
  </div>
</template>

<script lang="ts">

import { State, Action, Getter } from 'vuex-class';
import { Component, Prop, Vue } from 'vue-property-decorator';

// removes vue oservers
const nonReactive = (_: any): any => JSON.parse(JSON.stringify(_));

@Component
export default class ListPipelinesTab extends Vue {

  get isLoading() {
    return true;
  }


}
</script>

<style scoped lang="sass">
  .centered
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  .list-pipelines-layout
    display: flex
    flex-direction: column
    align-items: center
    padding: 50px
</style>

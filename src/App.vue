<template>
  <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">ASR TestKit</span>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">ASR TestKit</span>
      <nav class="mdl-navigation">
        <a class="mdl-navigation__link" href="">Create a pipeline</a>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <SettingsTab />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SettingsTab from './components/SettingsTab.vue';

@Component({
  components: {
    SettingsTab,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass">
</style>

<template>
  <div
    v-if="isAsrListLoading"
    class="mdl-progress mdl-js-progress mdl-progress__indeterminate centered"
  ></div>
  <div v-else class="settings-layout">
    <div class="mld-grid">
      <div class="mdl-cell mdl-cell--2-col">
        <span>Choose ASR from list:</span>
      </div>
      <div class="mdl-cell mdl-cell--4-col">
        <select @change="asrSelected($event)">
          <option v-for="asr in asrOptions" :value="asr" >{{ asr }}</option>
        </select>
      </div>
    </div>
    <div class="mld-grid">
      <div class="mdl-cell mdl-cell--2-col">
        <span>Settings for {{currentAsr}}:</span>
      </div>
    </div>
    <div class="mld-grid">
      <div v-for="setting in asrSettings">
        <div class="mdl-cell mdl-cell--4-col">
          <span>{{ setting.title }}: </span>
          <input type="text" v-if="setting.type === 'string'" v-model="setting.defaultValue" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { State, Action, Getter } from 'vuex-class';
import { AsrState, AsrPreset, Setting } from '../store/asr/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

// removes vue oservers
const nonReactive = (_: any): any => JSON.parse(JSON.stringify(_));

@Component
export default class SettingsTab extends Vue {

  public currentAsr: string | null = null;
  public settingsToCommit: Setting[] = [];

  @Action('getAvailableAsrList', { namespace: 'asr' }) public getAvailableAsrList!: any;
  @Getter('asrList', { namespace: 'asr' }) public asrList!: AsrPreset[];
  @Getter('isListLoadng', { namespace: 'asr' }) public isAsrListLoading!: boolean;
  @State('asr') private asr!: AsrState;

  public asrSelected(event: any) {
    this.currentAsr = event.target.value;
    this.settingsToCommit = nonReactive(this.asrList)
      .filter((item: Setting) => item.name === this.currentAsr)[0].settings;

  }

  private mounted() {
    this.getAvailableAsrList()
      .then(() => {
        this.currentAsr = this.asrList[0].name;
        this.settingsToCommit = nonReactive(this.asrList)
          .filter((item: Setting) => item.name === this.currentAsr)[0].settings;
      });
  }

  get asrOptions() {
    return this.asrList.map((item) => item.name);
  }

  get asrSettings() {
    return this.settingsToCommit;
  }


}
</script>

<style scoped lang="sass">
  .centered
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
  .settings-layout
    padding: 50px
</style>

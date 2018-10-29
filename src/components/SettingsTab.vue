<template>
  <div
    v-if="isLoading"
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
          <select v-if="setting.type === 'select'" v-model="setting.defaultValue">
            <option v-for="opt in setting.options" :value="opt" >{{ opt }}</option>
          </select>
          <input v-else :type="setting.type" v-model="setting.defaultValue" />
        </div>
      </div>
    </div>
    <div class="mld-grid">
      <div class="mdl-cell mdl-cell--2-col">
        <span>Choose sound from bank:</span>
      </div>
      <div class="mdl-cell mdl-cell--4-col">
        <select @change="soundSelected($event)">
          <option v-for="sound in soundList" :value="sound.id" >{{ sound.title }}</option>
        </select>
      </div>
    </div>
    <div class="mld-grid">
      <div class="mdl-cell mdl-cell--2-col">
        <button @click="runPipeWithConfig">run</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { State, Action, Getter } from 'vuex-class';
import { AsrState, AsrPreset, Setting } from '../store/asr/types';
import { SoundBankState, Sound } from '../store/sound-bank/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

// removes vue oservers
const nonReactive = (_: any): any => JSON.parse(JSON.stringify(_));

@Component
export default class SettingsTab extends Vue {

  public currentAsr: string | null = null;
  public selectedSound: number | null = null;
  public settingsToCommit: Setting[] = [];

  // asr
  @Action('getAvailableAsrList', { namespace: 'asr' }) public getAvailableAsrList!: any;
  @Getter('asrList', { namespace: 'asr' }) public asrList!: AsrPreset[];
  @Getter('isListLoadng', { namespace: 'asr' }) public isAsrListLoading!: boolean;

  // sound bank
  @Action('getSoundList', { namespace: 'soundBank' }) public getSoundList!: any;
  @Getter('soundList', { namespace: 'soundBank' }) public soundList!: Sound[];
  @Getter('isListLoadng', { namespace: 'soundBank' }) public isSoundListLoading!: boolean;

  @State('asr') private asr!: AsrState;
  @State('soundBank') private soundBank!: SoundBankState;

  public asrSelected(event: any) {
    this.currentAsr = event.target.value;
    this.settingsToCommit = nonReactive(this.asrList)
      .filter((item: Setting) => item.name === this.currentAsr)[0].settings;

  }

  public soundSelected(event: any) {
    this.selectedSound = parseInt(event.target.value, 10);
  }

  public runPipeWithConfig() {
    const config = nonReactive(this.settingsToCommit.map((setting: Setting) => {
      return {
        name: setting.name,
        value: setting.defaultValue,
      };
    }));
    const { selectedSound } = this;

    console.log(config, selectedSound);
    // TODO: implement
  }

  private mounted() {
    this.getAvailableAsrList()
      .then(() => {
        this.currentAsr = this.asrList[0].name;
        this.settingsToCommit = nonReactive(this.asrList)
          .filter((item: Setting) => item.name === this.currentAsr)[0].settings;
      });
    this.getSoundList()
      .then(() => {
        this.selectedSound = this.soundList[0].id;
      });
  }

  get asrOptions() {
    return this.asrList.map((item) => item.name);
  }
  get asrSettings() {
    return this.settingsToCommit;
  }

  get isLoading() {
    return this.isAsrListLoading || this.isSoundListLoading;
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

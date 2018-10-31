<template>
  <div
    v-if="isLoading"
    class="mdl-progress mdl-js-progress mdl-progress__indeterminate centered"
  ></div>
  <div v-else class="create-pipeline-layout">
    <div>
      <h4>Create a pipeline</h4>
      <table class="mdl-data-table mdl-shadow--2dp">
        <tbody>
          <tr>
            <td class="mdl-data-table__cell--non-numeric">Choose ASR from list:</td>
            <td class="mdl-data-table__cell--non-numeric">
              <select @change="asrSelected($event)">
                <option v-for="asr in asrOptions" :value="asr" >{{ asr }}</option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="mdl-data-table__cell--non-numeric">Settings for {{currentAsr}}</td>
            <td></td>
          </tr>
          <tr v-for="setting in asrSettings">
            <td class="mdl-data-table__cell--non-numeric">{{ setting.title }}:</td>
            <td class="mdl-data-table__cell--non-numeric">
              <select v-if="setting.type === 'select'" v-model="setting.defaultValue">
                <option v-for="opt in setting.options" :value="opt" >{{ opt }}</option>
              </select>
              <input
                v-else
                :type="setting.type"
                :class="getStyleForInputByType(setting.type)"
                v-model="setting.defaultValue"
              />
            </td>
          </tr>
          <tr>
            <td class="mdl-data-table__cell--non-numeric">Choose sound from bank:</td>
            <td class="mdl-data-table__cell--non-numeric">
              <select @change="soundSelected($event)">
                <option v-for="sound in soundList" :value="sound.id" >{{ sound.title }}</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mld-grid">
        <button
          class="run-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
          @click="runPipeWithConfig"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { State, Action, Getter } from 'vuex-class';
import { AsrState, AsrPreset, Setting } from '../../store/asr/types';
import { SoundBankState, Sound } from '../../store/sound-bank/types';
import { Component, Prop, Vue } from 'vue-property-decorator';

// removes vue oservers
const nonReactive = (_: any): any => JSON.parse(JSON.stringify(_));

@Component
export default class CreatePipelineTab extends Vue {

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

    console.log({ config, sound: selectedSound });
    // TODO: implement
  }

  public getStyleForInputByType(type: string): string {
    if (type === 'checkbox') { return 'mdl-checkbox__input'; }
    if (type === 'text') { return 'mdl-textfield__input'; }
    return 'mdl-textfield__input';
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
  .create-pipeline-layout
    display: flex
    flex-direction: column
    align-items: center
    padding: 50px
  .run-button
    margin-top: 20px
</style>

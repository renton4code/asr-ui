import { GetterTree } from 'vuex';
import { SoundBankState, Sound } from './types';
import { RootState } from '../types';

export const getters: GetterTree<SoundBankState, RootState> = {
    soundList(state): Sound[] {
        return state.soundList;
    },
    isListLoadng(state): boolean {
      return state.isListLoadng;
    },
};

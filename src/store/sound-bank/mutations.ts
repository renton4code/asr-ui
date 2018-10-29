import { MutationTree } from 'vuex';
import { SoundBankState, Sound } from './types';

export const mutations: MutationTree<SoundBankState> = {
    soundListLoaded(state, payload: Sound[]) {
        state.soundList = payload;
        state.isListLoadng = false;
    },
};

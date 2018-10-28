import { MutationTree } from 'vuex';
import { AsrState, AsrPreset } from './types';

export const mutations: MutationTree<AsrState> = {
    availableAsrListLoaded(state, payload: AsrPreset[]) {
        state.availableAsrList = payload;
        state.isListLoadng = false;
    },
};

import { GetterTree } from 'vuex';
import { AsrState, AsrPreset } from './types';
import { RootState } from '../types';

export const getters: GetterTree<AsrState, RootState> = {
    asrList(state): AsrPreset[] {
        return state.availableAsrList;
    },
    isListLoadng(state): boolean {
      return state.isListLoadng;
    },
};

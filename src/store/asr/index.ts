import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { AsrState } from './types';
import { RootState } from '../types';

export const state: AsrState = {
    availableAsrList: [],
    isListLoadng: true,
};

const namespaced: boolean = true;

export const asr: Module<AsrState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

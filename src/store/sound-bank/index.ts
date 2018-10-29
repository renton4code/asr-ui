import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { SoundBankState } from './types';
import { RootState } from '../types';

export const state: SoundBankState = {
    soundList: [],
    isListLoadng: true,
};

const namespaced: boolean = true;

export const soundBank: Module<SoundBankState, RootState> = {
    namespaced,
    state,
    getters,
    actions,
    mutations,
};

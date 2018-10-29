import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { asr } from './asr/index';
import { soundBank } from './sound-bank/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
      version: '0.1 pre-alpha',
    },
    modules: {
        asr,
        soundBank,
    },
};

export default new Vuex.Store<RootState>(store);

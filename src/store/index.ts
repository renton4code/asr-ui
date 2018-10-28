import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { asr } from './asr/index';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {},
    modules: {
        asr,
    },
};

export default new Vuex.Store<RootState>(store);

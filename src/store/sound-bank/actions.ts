import { ActionTree } from 'vuex';
import axios from 'axios';
import { SoundBankState, Sound } from './types';
import { RootState } from '../types';


export const actions: ActionTree<SoundBankState, RootState> = {
    getSoundList({ commit }): any {
        return axios({
            url: '/api/v1/sound-bank/list/',
        })
          .then((response) => {
              const payload: Sound[] = response && response.data;
              commit('soundListLoaded', payload);
          })
          .catch((error) => {
              commit('soundListLoaded', []);
          });
    },
};

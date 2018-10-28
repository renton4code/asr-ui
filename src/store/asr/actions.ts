import { ActionTree } from 'vuex';
import axios from 'axios';
import { AsrState, AsrPreset } from './types';
import { RootState } from '../types';


export const actions: ActionTree<AsrState, RootState> = {
    getAvailableAsrList({ commit }): any {
        return axios({
            url: '/api/v1/get-available-asr-list/',
        })
          .then((response) => {
              const payload: AsrPreset[] = response && response.data;
              commit('availableAsrListLoaded', payload);
          })
          .catch((error) => {
              commit('availableAsrListLoaded', []);
          });
    },
};

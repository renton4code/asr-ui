import VueRouter from 'vue-router';
import Vue from 'vue';

import CreatePipelineTab from './components/pipelines/CreateTab.vue';
import ListPipelinesTab from './components/pipelines/ListTab.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',

  routes: [
    {
      path: '/pipelines/create',
      component: CreatePipelineTab,
    },
    {
      path: '/pipelines/list',
      component: ListPipelinesTab,
    },
  ],
});

import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { forEach, forIn } from 'lodash';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { KiwiAppInitParams } from '../types';
import store from './supports/store';

/**
 * {kiwi-app}外观模块
 */
export default function kiwiApp(params: KiwiAppInitParams): void {
  // 检查DOM根节点
  const elementId = params.elementId || 'app_container';
  const rootElement = document.getElementById(elementId);
  if (!rootElement) {
    const _rootElement = document.createElement('div');
    _rootElement.id = elementId;
    document.body.appendChild(_rootElement);
  }

  // 主题注册
  themesService.themeRegister(params.themes);

  // 初始化Router
  if (params.router) {
    Vue.use(VueRouter);
  }

  // 配置扩展对象
  params.extends && forIn(params.extends, (value, key) => {
    Vue.prototype[key] = value;
  });

  // 配置插件列表
  params.plugins && forEach(params.plugins, plugin => {
    Vue.use(plugin);
  });

  // 初始化Vue
  new Vue({
    store,
    router: params.router,
    render: params.render,
  }).$mount(`#${elementId}`);
};

import { uniqueId } from 'lodash';
import store from './supports/store';

/**
 * 注册服务
 * @param serviceName 服务名称
 * @description 服务将转化为store的状态，并仅提供该状态的引用
 */
export default function service<T extends object>(modal: T): T {
  const serviceUid = uniqueId('service_');
  store.registerModule(serviceUid, { state: modal });
  return store.state[serviceUid];
}

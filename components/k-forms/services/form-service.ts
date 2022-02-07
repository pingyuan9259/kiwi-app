import service from '@kiwi/kiwi-app/core/service';
import { MapDeep } from '@kiwi/kiwi-app/types/common';
import { forIn } from 'lodash';
import formInstanceService from './form-instance-service';

/**
 * 表单服务
 */
interface FormService<Data = any> {
  /** 表单数据 */
  data: Data;
  /** 校验数据 */
  validateData: MapDeep<Data>;
  /** 重置表单 */
  reset: (path?: string) => void;
}

/**
 * 注册表单服务
 */
const formService = service({
  data: {},
  validateData: {},
  reset: (path: string = 'default') => {
    forIn(formInstanceService.itemResetHandlerMap[path], (handler) => handler && handler());
  }
});

/**
 * 获取表单服务
 */
export default function getFormService<Data = {}>(): FormService<Data> {
  return formService as any;
}

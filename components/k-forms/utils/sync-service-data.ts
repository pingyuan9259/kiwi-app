import { FormInstanceInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { cloneDeep, get, isArray, mergeWith, set } from 'lodash';
import { getFormService } from '../..';
import { getFullPath } from './get-full-path';

/**
 * 同步表单服务中的表单数据
 * @description 这个方法将表单的本地数据更新到对应的表单服务中
 */
export default function syncServiceData(index: number, formInstanceInfo: FormInstanceInfo): void {
  const { dataList, path, formType } = formInstanceInfo;
  const fullPath = getFullPath({ path, prefix: 'data' });
  const formService = getFormService();
  // 深拷贝
  const _formService = cloneDeep(formService);
  // 更新当前表单数据
  if (formType === 'object') {
    const curFormServiceData = get(_formService, fullPath);
    const curData = dataList[index];
    set(
      _formService,
      fullPath,
      mergeWith(curFormServiceData, curData, function (oldVal, newVal) {
        if (isArray(oldVal)) {
          return newVal;
        }
      })
    );
  } else {
    set(_formService, fullPath, dataList);
  }
  // 触发视图更新
  formService.data = _formService.data;
}

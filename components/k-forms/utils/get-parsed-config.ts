import { FormHandlerParams, FormItemInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { FormValueLike } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { assign, cloneDeep, map } from 'lodash';
import formInstanceService from '../services/form-instance-service';

/**
 * 获取解析后的表单项配置
 * @param config
 * @param payload
 * @returns
 */
export default async function getParsedConfig<C extends FormValueLike>(
  formItemConfig: C,
  formItemInfo: FormItemInfo
): Promise<C> {
  const { formUid, formData, formDataIndex, itemKey } = formItemInfo;
  const formInstanceInfo = formInstanceService.instanceInfoMap[formUid];
  const formHandlerParams: FormHandlerParams = {
    context: formInstanceInfo.context,
    data: formData,
    index: formDataIndex,
    key: itemKey
  };

  if (typeof formItemConfig === 'function') {
    // 表单项为动态配置时，代表该表单项会被重置（毕竟配置都变了），那么其所携带的value也就已经失效了，置为undefined
    // 否则他将始终携带着当前的value，在后续获取该配置项的默认值的时候就没有效果了
    formData[itemKey] = undefined;
    return (formItemConfig as Function)(formHandlerParams);
  } else {
    const _config = cloneDeep(formItemConfig);
    await Promise.all(
      map(_config, async (item, key) => {
        return await (async () => {
          if (typeof item === 'function') {
            // 这里要过滤掉handler的用户业务函数
            if (key === 'handler') return;
            const _item = await item(formHandlerParams);
            _config[key] = _item;
          }
        })();
      })
    );
    return _config;
  }
}

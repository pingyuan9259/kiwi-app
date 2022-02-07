import { FormHandlerParams, FormItemInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { FormValueLike } from '@kiwi/kiwi-app/types/components/k-forms/item';
import { FormValidateType, InvalidItem } from '@kiwi/kiwi-app/types/components/k-forms/rule';
import { assign, find, forIn, isArray, isEmpty, isObject } from 'lodash';
import formInstanceService from '../services/form-instance-service';

/**
 * 表单值更新校验
 * @param value
 * @param formItemConfig
 * @param formItemInfo
 */
export default function valueValidate(
  value,
  formItemConfig: FormValueLike,
  formItemInfo: FormItemInfo
): InvalidItem | null {
  const { name, rules, hidden, disabled } = formItemConfig;
  const { formUid, formData, formDataIndex, itemKey } = formItemInfo;
  const formInstanceInfo = formInstanceService.instanceInfoMap[formUid];
  const formHandlerParams: FormHandlerParams = {
    context: formInstanceInfo.context,
    data: assign(formData, { [itemKey]: value }),
    index: formDataIndex,
    key: itemKey
  };

  // 查验当前表单项是否无需校验
  if (isEmpty(rules) || disabled || hidden) {
    return null;
  }

  let invalid: InvalidItem = null;
  forIn(rules, (i, k: FormValidateType) => {
    switch (k) {
      case 'required':
        if (value === undefined || value === '' || (isObject(value) && isEmpty(value))) {
          invalid = {
            rules,
            validateType: k,
            message: `${name || ''}不能为空`
          };
          return false;
        }
        break;

      case 'maxLength':
        if (typeof value === 'string') {
          if (value.length > rules[k]) {
            invalid = {
              rules,
              validateType: k,
              message: `${name || ''}不能超过${rules[k]}个字`
            };
            return false;
          }
        }
        break;

      case 'minLength':
        if (typeof value === 'string') {
          if (value.length < rules[k]) {
            invalid = {
              rules,
              validateType: k,
              message: `${name || ''}不能低于${rules[k]}个字`
            };
            return false;
          }
        }
        break;

      case 'maxValue': {
        let failed = false;
        if (typeof value === 'string') {
          failed = parseInt(value) > rules[k];
        }
        if (typeof value === 'number') {
          failed = value > rules[k];
        }
        if (failed) {
          invalid = {
            rules,
            validateType: k,
            message: `${name || ''}不能超过最大值${rules[k]}`
          };
          return false;
        }
        break;
      }

      case 'minValue': {
        let failed = false;
        if (typeof value === 'string') {
          failed = parseInt(value) < rules[k];
        }
        if (typeof value === 'number') {
          failed = value < rules[k];
        }
        if (failed) {
          invalid = {
            rules,
            validateType: k,
            message: `${name || ''}不能低于最小值${rules[k]}`
          };
          return false;
        }
        break;
      }

      case 'regList': {
        if (!isEmpty(rules.regList) && typeof value === 'string') {
          const failedRes = find(rules.regList, (i) => !i.reg.test(value));
          if (failedRes) {
            invalid = {
              rules,
              validateType: k,
              message: failedRes.message
            };
            return false;
          }
        }
        break;
      }

      case 'handler': {
        const res = rules.handler(formHandlerParams);
        if (res === false || typeof res === 'string') {
          invalid = {
            rules,
            validateType: k,
            message: res || ''
          };
          return false;
        }
        break;
      }
    }
  });
  return invalid;
}

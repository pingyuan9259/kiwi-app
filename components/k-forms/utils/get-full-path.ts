import { FormType } from '@kiwi/kiwi-app/types/components/k-forms';

/**
 * 获取当前表单路径
 * @param params
 * @returns
 */
export function getFullPath(params: {
  path: string;
  formType?: FormType;
  index?: number;
  prefix?: string;
  suffix?: string;
}): string {
  const { path, formType, index, prefix, suffix } = params;
  let _path = '';
  switch (formType) {
    default:
    case 'object':
      _path = `${path || ''}`;
      break;

    case 'collection':
    case 'array':
      _path = `${path || ''}[${index}]`;
      break;
  }
  let _prefix = '';
  let _suffix = '';
  if (prefix) {
    _prefix = _path ? `${prefix}.` : prefix;
  }
  if (suffix) {
    _suffix = _path ? `.${suffix}` : suffix;
  }
  return `${_prefix}${_path}${_suffix}`;
}

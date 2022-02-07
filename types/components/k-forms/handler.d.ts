import { FormHandlerParams } from '@kiwi/kiwi-app/types/components/k-forms';

/**
 * {表单属性}解析器
 *
 * @param params
 */
export type FormPropParser<D, C, P> = (params: FormHandlerParams<D, C>) => P | Promise<P>;

/**
 * {表单数据}处理器
 *
 * @param params
 */
export type FromDataHandler<D, C> = (params: FormHandlerParams<D, C>) => void;

/**
 * {表单校验}处理器
 *
 * @param params
 */
export type FormRuleHandler<D, C, V> = (params: FormHandlerParams<D, C>) => string | boolean | void;

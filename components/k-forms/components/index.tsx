import { KText } from '@kiwi/kiwi-app/components';
import getFormService from '@kiwi/kiwi-app/components/k-forms/services/form-service';
import { difference } from '@kiwi/kiwi-app/components/k-forms/utils';
import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import { propsParser } from '@kiwi/kiwi-app/index';
import { widthParser } from '@kiwi/kiwi-app/styled';
import { FormInstanceInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { assign, forEach, isArray, isEmpty, isString } from 'lodash';
import { Component } from 'vue-property-decorator';
import KBox from '../../k-box';
import { FormItemContainerProps } from '../../k-forms/props';
import getDefaultValue from '../../k-forms/utils/get-default-value';
import getParsedConfig from '../../k-forms/utils/get-parsed-config';
import initialValidate from '../../k-forms/utils/initial-validate';
import formInstanceService from '../services/form-instance-service';
import { getFullPath } from '../utils/get-full-path';
import updateValue from '../utils/update-value';
import FormLabel from '../widgets/form-label';
import FormValidate from '../widgets/form-validate';
import FormButtons from './form-buttons';
import FormComponent from './form-component';
import FormDropdownContent from './form-dropdown-content';
import FormDropdownList from './form-dropdown-list';
import FormInput from './form-input';
import FormSelect from './form-select';
import FormString from './form-string';
import FormSwitch from './form-switch';
import FormTextArea from './form-text-area';
import FormUpload from './form-upload';
import SubForm from './sub-form';

/**
 * 表单项映射表
 */
const formItemMap = {
  buttons: FormButtons,
  component: FormComponent,
  dropdownContent: FormDropdownContent,
  dropdownList: FormDropdownList,
  input: FormInput,
  select: FormSelect,
  switch: FormSwitch,
  string: FormString,
  textArea: FormTextArea,
  upload: FormUpload,
  subForm: SubForm
};

/**
 * 表单项容器组件
 */
@Component({
  props: propsParser(FormItemContainerProps),
  created(this: FormItemContainer) {
    this.init();
  },
  mounted(this: FormItemContainer) {
    const { rootPath } = this.formInstanceInfo;
    formInstanceService.itemResetHandlerMap[rootPath || 'default'] = assign(
      {},
      formInstanceService.itemResetHandlerMap[rootPath || 'default'],
      {
        [this._uid]: async () => {
          await this.configComputed();
          this.defaultValue = '';
          this.$forceUpdate();
        }
      }
    );
  },
  destroyed(this: FormItemContainer) {
    forEach(this.watchers, (unwatch) => unwatch());
    delete formInstanceService.itemResetHandlerMap[this._uid];
  },
  watch: {
    'props.defaultData'(this: FormItemContainer, val, oldVal) {
      difference(val, oldVal) && this.init();
    }
  }
})
export default class FormItemContainer extends Kiwi<FormItemContainerProps> {
  /** 表单服务，用于表单项的listen */
  private formService = getFormService();
  formInstanceInfo: FormInstanceInfo = null;
  parsedItemConfig: any = {};
  defaultValue: any = undefined;
  initialized = false;
  validateInitialized = false;
  type: keyof typeof formItemMap = undefined;
  isInvalid = false;
  curRules = undefined;
  watchers: Function[] = [];

  async init() {
    this.formInstanceInfo = formInstanceService.instanceInfoMap[this.props.formItemInfo.formUid];
    await this.configComputed();
  }

  async configComputed() {
    const { formItemConfig, formItemInfo } = this.props;
    // 解析表单项配置
    this.parsedItemConfig = await getParsedConfig(formItemConfig, formItemInfo);

    // 初始化默认值
    this.defaultValue = getDefaultValue(this.parsedItemConfig, formItemInfo);

    const { rules, hidden, disabled, styledProps } = this.parsedItemConfig;

    if (!this.validateInitialized) {
      initialValidate(this.defaultValue, this.parsedItemConfig, formItemInfo);
      this.validateInitialized = true;
    } else if (this.defaultValue !== undefined && this.defaultValue !== '') {
      updateValue(this.defaultValue, formItemConfig, formItemInfo);
    }

    // 当表单项被架空的时候，让其失去校验干预权，并且需要重新初始化校验
    if (hidden || disabled || (styledProps && styledProps.hidden)) {
      initialValidate(this.defaultValue, this.parsedItemConfig, formItemInfo);
      this.validateInitialized = false;
    }

    // 已经初始化校验，但是rule发生变化时，需要重新初始化校验
    if (difference(rules, this.curRules)) {
      this.curRules = rules;
      if (this.validateInitialized) {
        initialValidate(this.defaultValue, this.parsedItemConfig, formItemInfo);
      }
    }

    if (!this.initialized) {
      const formItemWatcher = (path: string): void => {
        if (path.indexOf('$data') > -1) {
          const watchPath = `formService.data.${path.replace('$data.', '')}`;
          this.watchers.push(this.$watch(watchPath, this.configComputed));
        }
        if (path.indexOf('$context') > -1) {
          const formInstanceInfo = formInstanceService.instanceInfoMap[formItemInfo.formUid];
          const watchPath = `${path.replace('$context.', '')}`;
          this.watchers.push(formInstanceInfo.context.$watch(watchPath, this.configComputed));
        }
      };

      // 初始化表单项监听
      const { listen } = this.parsedItemConfig;
      if (listen) {
        if (isString(listen)) {
          formItemWatcher(listen);
        } else if (isArray(listen)) {
          forEach(listen, (path) => formItemWatcher(path));
        }
      }

      this.initialized = true;
    }
  }

  render(h) {
    const { formItemInfo } = this.props;
    const { formDataIndex, itemKey } = formItemInfo;
    const { hidden, disabled, type, id, styledProps } = this.parsedItemConfig;
    const { path, formType, themeConfig } = this.formInstanceInfo;
    const { labelLayout, labelWidth, boxStyle } = themeConfig;
    const validatePath = getFullPath({
      path,
      formType,
      index: formDataIndex,
      suffix: itemKey
    });

    const FormItemComponent = formItemMap[type];

    if (!FormItemComponent) {
      return <KText.P>...</KText.P>;
    }

    const formItemMarginLeft =
      labelLayout === 'horizontal' && this.parsedItemConfig.name
        ? `${parseInt(labelWidth) + 5}px`
        : '';
    const formItemDefaultWidth = type === 'subForm' ? '100%' : '200px';
    const formItemMaxWidth = formItemMarginLeft
      ? `calc(100% - ${formItemMarginLeft} + ${widthParser('margin1')})`
      : '';

    return (
      <KBox
        id={id}
        styledProps={assign({}, boxStyle, styledProps)}
        hidden={hidden}
        verticalAlign="top"
        wrap={labelLayout === 'vertical'}
        lastChild={{ marginBottom: '0' }}
      >
        {/* 表单项标签 */}
        <FormLabel formItemConfig={this.parsedItemConfig} formItemInfo={formItemInfo} />

        {/* 表单项 */}
        <FormItemComponent
          defaultValue={this.defaultValue}
          formItemConfig={this.parsedItemConfig}
          formItemInfo={formItemInfo}
          isInvalid={this.isInvalid}
          clickThrough={!!disabled}
          opacity={disabled ? '0.6' : '1'}
          marginLeft={formItemMarginLeft}
          width={styledProps && styledProps.width ? '' : formItemDefaultWidth}
          maxWidth={formItemMaxWidth}
        />

        {/* 校验信息 */}
        {type !== 'subForm' && (
          <FormValidate
            path={validatePath}
            invalidHandler={(isInvalid) => (this.isInvalid = isInvalid)}
            marginLeft={formItemMarginLeft}
          />
        )}
      </KBox>
    );
  }
}

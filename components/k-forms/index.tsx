import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import { themesService } from '@kiwi/kiwi-app/styled';
import { FormInstanceInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { cloneDeep, forEach, get, isEmpty, map, merge, set } from 'lodash';
import { Component } from 'vue-property-decorator';
import KBox from '../k-box';
import KButton from '../k-button';
import * as KIcon from '../k-icons';
import FormItemContainer from './components';
import { KFormsProps } from './props';
import formInstanceService from './services/form-instance-service';
import getFormService from './services/form-service';
import { difference } from './utils';
import getFormStyle from './utils/get-form-style';
import { getFullPath } from './utils/get-full-path';
import updateCollection from './utils/update-collection';
import CollectionItemBar from './widgets/collection-item-bar';
import DebugPanel from './widgets/debug-panel';

/**
 * 表单组件
 */
@Component({
  props: propsParser(KFormsProps),
  watch: {
    'props.defaultData': {
      handler(this: KForms) {
        this.init();
      }
    },
    'formService.data': {
      handler(this: KForms) {
        this.updateDataList();
      },
      deep: true
    }
  },
  created(this: KForms) {
    this.init();
  },
  destroyed(this: KForms) {
    this.formService.data = {};
    this.formService.validateData = {};
    this.instanceInfo = undefined;
    delete formInstanceService.instanceInfoMap[this._uid];
  }
})
export default class KForms<Data = any, Ctx = any> extends Kiwi<KFormsProps<Data, Ctx>> {
  private formService = getFormService();
  instanceInfo: FormInstanceInfo = {} as any;

  init() {
    const {
      defaultData,
      context,
      formType,
      subForm,
      path,
      rootPath,
      name,
      maxLength,
      minLength,
      defaultLength,
      themeConfig
    } = this.props;

    // 初始化表单实例信息
    this.$set(this, 'instanceInfo', {
      name,
      uid: this._uid,
      path,
      rootPath: subForm ? rootPath : path,
      formType,
      context: context || this.$vnode.context,
      dataList: [],
      validateDataList: [],
      maxLength,
      minLength,
      themeConfig: merge({}, themesService.themes.form, themeConfig)
    });
    formInstanceService.instanceInfoMap[this._uid] = this.instanceInfo;

    // 初始化当前表单数据数组
    if (isEmpty(defaultData)) {
      if (formType === 'object') {
        this.instanceInfo.dataList = [{}];
        this.instanceInfo.validateDataList = [{}];
      } else {
        this.instanceInfo.dataList = [];
        this.instanceInfo.validateDataList = [];

        if (defaultLength) {
          forEach(new Array(defaultLength), () => {
            updateCollection(
              this.instanceInfo.dataList ? this.instanceInfo.dataList.length : 0,
              'add',
              this.instanceInfo
            );
          });
        }
      }
    } else {
      if (formType === 'object') {
        this.instanceInfo.dataList = [defaultData] as any;
        this.instanceInfo.validateDataList = [{}];
      } else {
        this.instanceInfo.dataList = defaultData as any;
        this.instanceInfo.validateDataList = [];
      }

      // 这里要为表单服务同步上初始的表单数据
      const path = getFullPath({ path: this.props.path, prefix: 'data' });
      const formService = cloneDeep(this.formService);
      const curFormServiceData = get(formService, path);
      if (formType === 'object') {
        if (difference(curFormServiceData, this.instanceInfo.dataList[0])) {
          set(this.formService, path, this.instanceInfo.dataList[0]);
        }
      } else {
        if (difference(curFormServiceData, this.instanceInfo.dataList)) {
          set(this.formService, path, this.instanceInfo.dataList);
        }
      }
    }
  }

  /**
   * 更新当前表单数据数组
   * @description 忘了干什么了，但是很必要，每次表单服务更新的时候要页面中所有的表单都同步一下数据
   */
  updateDataList() {
    const path = getFullPath({ path: this.props.path, prefix: 'data' });
    const validatePath = getFullPath({ path: this.props.path, prefix: 'validateData' });
    if (this.props.formType === 'object') {
      this.instanceInfo.dataList = [get(this.formService, path) || {}];
      this.instanceInfo.validateDataList = [{}];
    } else {
      this.instanceInfo.dataList = get(this.formService, path) || [];
      this.instanceInfo.validateDataList = get(this.formService, validatePath) || [];
    }
  }

  /**
   * 表单项工厂
   */
  formItemRender(h, index?: number) {
    const { configuration, defaultData } = this.props;
    return (
      <KBox wrap>
        {/* 表单项 */}
        {map(configuration as any, (config, key) => {
          const curData = this.instanceInfo.dataList[index];
          if (curData === undefined) return null;
          return (
            <FormItemContainer
              formItemConfig={config}
              formItemInfo={{
                formUid: this._uid,
                formData: curData,
                formDataIndex: index,
                itemKey: key
              }}
              defaultData={defaultData}
            />
          );
        })}
      </KBox>
    );
  }

  /**
   * 表单类型工厂
   */
  formTypeRender(h) {
    const { formType, subForm, maxLength, name, inlineBlock } = this.props;
    switch (formType) {
      default:
      case 'object':
        return <KBox style={getFormStyle(subForm, formType)}>{this.formItemRender(h, 0)}</KBox>;

      case 'collection':
        return (
          <KBox>
            {/* 表单集合 */}
            <KBox>
              {map(this.instanceInfo.dataList, (data, index) => (
                <KBox style={getFormStyle(subForm, formType)}>
                  {/* 表单 */}
                  {this.formItemRender(h, index)}
                  {/* 集合项控制条 */}
                  <CollectionItemBar formDataIndex={index} formInstanceInfo={this.instanceInfo} />
                </KBox>
              ))}
            </KBox>

            {/* 添加按钮 */}
            <KBox hidden={this.instanceInfo.dataList.length >= maxLength}>
              <KButton
                type="link"
                colorType="highlight"
                paddingTop="margin2"
                paddingBottom="margin1"
                onClick={() =>
                  updateCollection(
                    this.instanceInfo.dataList ? this.instanceInfo.dataList.length : 0,
                    'add',
                    this.instanceInfo
                  )
                }
              >
                <KIcon.Plus />
                {` 添加${name ? name.replace(/列表|数组/g, '') : ''}`}
              </KButton>
            </KBox>
          </KBox>
        );

      case 'array':
        return (
          <KBox style={getFormStyle(subForm, formType)}>
            {/* 表单数组 */}
            {map(this.instanceInfo.dataList, (data, index) => (
              <KBox inlineBlock={inlineBlock} marginBottom="margin1">
                {/* 表单 */}
                <KBox inlineBlock>{this.formItemRender(h, index)}</KBox>
                {/* 删除按钮 */}
                <KBox right="margin1" inlineBlock verticalAlign="0.9em">
                  <KButton
                    type="link"
                    padding="margin2"
                    colorType="danger"
                    onClick={() => updateCollection(index, 'remove', this.instanceInfo)}
                  >
                    <KIcon.Trash />
                  </KButton>
                </KBox>
              </KBox>
            ))}

            {/* 添加按钮 */}
            <KBox
              hidden={this.instanceInfo.dataList.length >= maxLength}
              verticalAlign={inlineBlock ? '0.9em' : ''}
              inlineBlock={inlineBlock}
              marginBottom="margin1"
            >
              <KButton
                paddingTop="margin2"
                type="link"
                colorType="highlight"
                onClick={() =>
                  updateCollection(
                    this.instanceInfo.dataList ? this.instanceInfo.dataList.length : 0,
                    'add',
                    this.instanceInfo
                  )
                }
              >
                <KIcon.Plus />
                {` 添加${name ? name.replace(/列表|数组/g, '') : ''}`}
              </KButton>
            </KBox>
          </KBox>
        );
    }
  }

  render(h) {
    return (
      <KBox class="k_forms" width="100%" styledProps={this.customStyledProps}>
        {/* 表单类型工厂 */}
        {this.formTypeRender(h)}
        {/* 表单数据调试面板 */}
        <DebugPanel isShow={this.props.debugPanel} />
      </KBox>
    );
  }
}

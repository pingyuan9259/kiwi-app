import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { InvalidItem } from '@kiwi/kiwi-app/types/components/k-forms/rule';
import { get } from 'lodash';
import { Component } from 'vue-property-decorator';
import KAbsoluteBox from '../../k-absolute-box';
import * as KText from '../../k-texts';
import getFormService from '../services/form-service';

/**
 * 表单校验信息展示组件参数
 */
class FormValidateProps {
  /** 表单字段路径 */
  readonly path: string = '';
  /** 表单字段校验失败事件回调 */
  readonly invalidHandler?: (isInvalid?: boolean) => void = undefined;
}

/**
 * 表单校验信息展示组件
 */
@Component({
  props: propsParser(FormValidateProps),
  watch: {
    'formService.validateData': {
      handler(this: FormValidate) {
        this.handleInvalidListChange();
      },
      deep: true
    }
  }
})
export default class FormValidate extends Kiwi<FormValidateProps> {
  /**
   * 表单服务
   */
  private formService = getFormService();

  /**
   * 当前异常信息
   */
  private curInvalid: InvalidItem = undefined;

  /**
   * 异常类表更新事件处理
   */
  private handleInvalidListChange() {
    const { path } = this.props;
    this.curInvalid = get(this.formService.validateData, path);
    this.$forceUpdate();
  }

  protected render(h) {
    const { invalidHandler } = this.props;
    const { message, validateType, initial } = this.curInvalid || {};
    const invalid = validateType && !initial;
    invalidHandler && invalidHandler(invalid);
    return (
      <KAbsoluteBox
        class="form_validate"
        left="5px"
        bottom={`-${parseInt(themesService.themes.textTypes.label.fontSize) + 4}px`}
        hidden={!invalid}
        styledProps={this.customStyledProps}
      >
        <KText.Label color="danger">{`${message || '格式有误'}`}</KText.Label>
      </KAbsoluteBox>
    );
  }
}

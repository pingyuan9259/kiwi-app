import { KText } from '@kiwi/kiwi-app/components';
import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { Component } from 'vue-property-decorator';
import KAbsoluteBox from '../k-absolute-box';
import * as KIcon from '../k-icons';
import { KTextareaProps, KTextareaWidgetType } from './props';
import { KTextareaContainer, KTextareaElement, KTextareaWidget } from './style';

/**
 * 文本区域组件
 */
@Component({
  props: propsParser(KTextareaProps)
})
export default class KTextarea extends Kiwi<KTextareaProps> {
  leftWidgetWidth = 0;
  rightWidgetWidth = 0;
  $textarea = null as HTMLTextAreaElement;
  textareaValue = '';
  textareaInitHeight = '';
  containerWidth = '';
  containerHeight = '';

  get showResize(): boolean {
    const contentHeight = this.$textarea ? this.$textarea.scrollHeight : 0;
    const containerHeight = this.$el ? this.$el.clientHeight : 0;
    return this.props.resize && contentHeight === containerHeight;
  }

  async mounted() {
    const { leftWidget, rightWidget } = this.props;
    if (leftWidget) {
      const $leftWidget = document.getElementById(`k_textarea_left_widget_${this._uid}`);
      this.leftWidgetWidth = $leftWidget ? $leftWidget.offsetWidth : 0;
    }
    if (rightWidget) {
      const $rightWidget = document.getElementById(`k_textarea_right_widget_${this._uid}`);
      this.rightWidgetWidth = $rightWidget ? $rightWidget.offsetWidth : 0;
    }
    this.$textarea = document.getElementById(
      `k_textarea_element_${this._uid}`
    ) as HTMLTextAreaElement;
    this.textareaValue = this.$textarea ? this.$textarea.value : '';
    this.textareaInitHeight = `${this.$textarea.clientHeight}px`;
    this.containerWidth = `${this.$el.clientWidth}px`;
    this.containerHeight = `${this.$el.clientHeight}px`;

    if (this.$textarea.scrollHeight > this.$textarea.clientHeight) {
      await this.timer.skip();
      this.$textarea.style.height = `${this.$textarea.scrollHeight}px`;
    }
  }

  render(h) {
    const {
      leftWidget,
      rightWidget,
      disabled,
      invalid,
      value,
      resize,
      placeholder,
      maxLength,
      handleInput,
      handleFocus,
      handleBlur,
      handleChange
    } = this.props;

    return (
      <KTextareaContainer
        minWidth={resize && this.containerWidth}
        minHeight={resize && this.containerHeight}
        paddingLeft={leftWidget ? `${this.leftWidgetWidth}px` : ''}
        paddingRight={rightWidget ? `${this.rightWidgetWidth}px` : ''}
        disabled={disabled}
        invalid={invalid}
        resize={resize}
        styledProps={this.customStyledProps}
      >
        {this.widgetRender(h, leftWidget, 'left')}

        <KTextareaElement
          id={`k_textarea_element_${this._uid}`}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          onInput={(value) => {
            this.textareaValue = value;
            this.$textarea.style.height = this.textareaInitHeight;
            this.$textarea.style.height = `${this.$textarea.scrollHeight}px`;
            handleInput && handleInput(value);
          }}
          onFocus={(event) => handleFocus && handleFocus(event)}
          onBlur={(event) => handleBlur && handleBlur(event)}
          onChange={(event) => handleChange && handleChange(event)}
        />

        {this.widgetRender(h, rightWidget, 'right')}
      </KTextareaContainer>
    );
  }

  widgetRender(
    h,
    widget: KTextareaWidgetType | undefined,
    position: 'left' | 'right'
  ): JSX.Element | undefined {
    const { handleInput, maxLength } = this.props;

    switch (widget) {
      case undefined:
        return undefined;

      case 'clear': {
        const clearWidgetTheme = themesService.themes.input.widget.clear;
        const ClearIcon = KIcon[clearWidgetTheme.icon];
        return (
          <KAbsoluteBox
            id={`k_textarea_${position}_widget_${this._uid}`}
            left={position === 'left' && '0'}
            right={position === 'right' && '0'}
            cursor="pointer"
            height="100%"
            onClick={() => {
              const $input = document.getElementById(
                `k_textarea_element_${this._uid}`
              ) as HTMLInputElement;
              $input.value = '';
              $input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            }}
          >
            <KTextareaWidget widgetTheme={clearWidgetTheme} position={position}>
              {ClearIcon && <ClearIcon />}
            </KTextareaWidget>
          </KAbsoluteBox>
        );
      }

      case 'count': {
        if (maxLength) {
          return (
            <KAbsoluteBox
              id={`k_textarea_${position}_widget_${this._uid}`}
              left={position === 'left' && 'margin3'}
              right={position === 'right' && 'margin3'}
              bottom="margin3"
              cursor="default"
            >
              <KText.Label>{`${(this.textareaValue || '').length}/${maxLength}`}</KText.Label>
            </KAbsoluteBox>
          );
        } else {
          return undefined;
        }
      }

      default:
        return (
          <KAbsoluteBox
            id={`k_textarea_${position}_widget_${this._uid}`}
            left={position === 'left' && '0'}
            right={position === 'right' && '0'}
          >
            {typeof widget === 'function' ? widget(h) : widget}
          </KAbsoluteBox>
        );
    }
  }
}

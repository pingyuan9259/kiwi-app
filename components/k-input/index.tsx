import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { Component } from 'vue-property-decorator';
import KAbsoluteBox from '../k-absolute-box';
import * as KIcon from '../k-icons';
import { KInputProps, KInputWidgetType } from './props';
import { KInputContainer, KInputElement, KInputWidget } from './style';

/**
 * 输入框组件
 */
@Component({
  props: propsParser(KInputProps)
})
export default class KInput extends Kiwi<KInputProps> {
  leftWidgetWidth = 0;
  rightWidgetWidth = 0;

  mounted() {
    const { leftWidget, rightWidget } = this.props;
    if (leftWidget) {
      this.leftWidgetWidth = document.getElementById(
        `k_input_left_widget_${this._uid}`
      ).offsetWidth;
    }
    if (rightWidget) {
      this.rightWidgetWidth = document.getElementById(
        `k_input_right_widget_${this._uid}`
      ).offsetWidth;
    }
  }

  render(h) {
    const {
      leftWidget,
      rightWidget,
      round,
      disabled,
      invalid,
      value,
      placeholder,
      type,
      autocomplete,
      readonly,
      maxLength,
      handleInput,
      handleFocus,
      handleBlur,
      handleChange,
      handleKeydown,
      handleKeyup,
      handleKeypress
    } = this.props;

    return (
      <KInputContainer
        paddingLeft={leftWidget ? `${this.leftWidgetWidth}px` : ''}
        paddingRight={rightWidget ? `${this.rightWidgetWidth}px` : ''}
        round={round}
        disabled={disabled}
        invalid={invalid}
        styledProps={this.customStyledProps}
      >
        {this.widgetRender(h, leftWidget, 'left')}

        <KInputElement
          id={`k_input_element_${this._uid}`}
          value={value}
          type={type}
          cursor={readonly ? 'default' : 'text'}
          readonly={readonly}
          placeholder={placeholder}
          maxLength={maxLength}
          autocomplete={autocomplete === 'off' ? 'off' : ''}
          onInput={(value) => handleInput && handleInput(value)}
          onFocus={(event) => handleFocus && handleFocus(event)}
          onBlur={(event) => handleBlur && handleBlur(event)}
          onChange={(event) => handleChange && handleChange(event)}
          onKeydown={(event) => handleKeydown && handleKeydown(event)}
          onKeyup={(event) => handleKeyup && handleKeyup(event)}
          onKeypress={(event) => handleKeypress && handleKeypress(event)}
        />

        {this.widgetRender(h, rightWidget, 'right')}
      </KInputContainer>
    );
  }

  widgetRender(
    h,
    widget: KInputWidgetType | undefined,
    position: 'left' | 'right'
  ): JSX.Element | undefined {
    switch (widget) {
      case undefined:
        return undefined;

      case 'clear': {
        const clearWidgetTheme = themesService.themes.input.widget.clear;
        const ClearIcon = KIcon[clearWidgetTheme.icon];
        return (
          <KAbsoluteBox
            id={`k_input_${position}_widget_${this._uid}`}
            left={position === 'left' && '0'}
            right={position === 'right' && '0'}
            cursor="pointer"
            height="100%"
            onMousedown={() => {
              const $input = document.getElementById(
                `k_input_element_${this._uid}`
              ) as HTMLInputElement;
              $input.value = '';
              $input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            }}
          >
            <KInputWidget widgetTheme={clearWidgetTheme} position={position}>
              {ClearIcon && <ClearIcon />}
            </KInputWidget>
          </KAbsoluteBox>
        );
      }

      case 'step': {
        if (this.props.type !== 'number') {
          return undefined;
        }
        const stepWidgetTheme = themesService.themes.input.widget.step;
        const UpIcon = KIcon[stepWidgetTheme.upIcon];
        const DownIcon = KIcon[stepWidgetTheme.downIcon];
        return (
          <KAbsoluteBox
            id={`k_input_${position}_widget_${this._uid}`}
            left={position === 'left' && '0'}
            right={position === 'right' && '0'}
            cursor="pointer"
            height="100%"
          >
            <KInputWidget
              widgetTheme={stepWidgetTheme}
              position={position}
              onClick={() => {
                const $input = document.getElementById(
                  `k_input_element_${this._uid}`
                ) as HTMLInputElement;
                let curValue = parseInt($input.value || '0') + 1;
                if (this.props.maxValue !== undefined && curValue > this.props.maxValue) {
                  curValue = this.props.maxValue;
                }
                $input.value = String(curValue);
                $input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                $input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
              }}
            >
              {UpIcon && <UpIcon />}
            </KInputWidget>

            <KInputWidget
              widgetTheme={stepWidgetTheme}
              position={position}
              onClick={() => {
                const $input = document.getElementById(
                  `k_input_element_${this._uid}`
                ) as HTMLInputElement;
                let curValue = parseInt($input.value || '0') - 1;
                if (this.props.minValue !== undefined && curValue < this.props.minValue) {
                  curValue = this.props.minValue;
                }
                $input.value = String(curValue);
                $input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                $input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
              }}
            >
              {DownIcon && <DownIcon />}
            </KInputWidget>
          </KAbsoluteBox>
        );
      }

      default:
        return (
          <KAbsoluteBox
            id={`k_input_${position}_widget_${this._uid}`}
            left={position === 'left' && '0'}
            right={position === 'right' && '0'}
          >
            {typeof widget === 'function' ? widget(h) : widget}
          </KAbsoluteBox>
        );
    }
  }
}

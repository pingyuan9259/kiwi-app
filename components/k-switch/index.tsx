import { KIcon, KText } from '@kiwi/kiwi-app/components';
import KAbsoluteBox from '@kiwi/kiwi-app/components/k-absolute-box';
import KBox from '@kiwi/kiwi-app/components/k-box';
import KListItem from '@kiwi/kiwi-app/components/k-list-item';
import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import styled, {
  colorParser,
  styleMapParser,
  themesService,
  widthParser
} from '@kiwi/kiwi-app/styled';
import { findIndex } from 'lodash';
import { Component } from 'vue-property-decorator';
import KSwitchProps from './props';

/**
 * 开关组件
 */
const Switch = styled(
  'div',
  class SwitchProps {
    active?: boolean = null;
    disabled?: boolean = null;
  }
)`
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 32px;
  height: 16px;
  border-radius: 100px;
  cursor: pointer;
  ${(props) => {
    const themes = props.themes;
    const colorTypes = themes.colorTypes;
    const colorStr = props.active
      ? colorParser(colorTypes.highlight)
      : `${colorParser(colorTypes.default)}55`;
    return styleMapParser({
      left: props.active ? '' : '0',
      right: props.active ? '0' : '',
      backgroundColor: colorStr,
      opacity: props.disabled ? '0.5' : '1',
      pointerEvents: props.disabled ? 'none' : ''
    });
  }}
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 100%;
    transition: all 0.15s ease;
    ${(props) => {
      const themes = props.themes;
      const colorTypes = themes.colorTypes;
      const colorStr = props.active
        ? colorParser(colorTypes.highlight)
        : `${colorParser(colorTypes.default)}55`;
      return styleMapParser({
        left: props.active ? '' : '0',
        right: props.active ? '0' : '',
        backgroundColor: colorParser(colorTypes.background),
        border: `1px solid ${colorStr}`
      });
    }}
  }
`;

/**
 * 开关组件
 * @author yuan.ping
 */
@Component({
  props: propsParser(KSwitchProps),
  watch: {
    'props.defaultValue'(this: KSwitch) {
      this.init();
    }
  },
  created(this: KSwitch) {
    this.init();
  }
})
export default class KSwitch<Val = any> extends Kiwi<KSwitchProps<Val>> {
  curSelectIndex: number = 0;
  curValueConfig: [any, any] = [false, true];

  init() {
    const { defaultValue, valueConfig } = this.props;
    if (valueConfig) {
      this.curValueConfig = valueConfig;
    }
    const curSelectIndex = findIndex(this.curValueConfig, (i) => i === defaultValue);
    this.curSelectIndex = curSelectIndex === -1 ? 0 : curSelectIndex;
  }

  handleClickSwitch() {
    const { handleSwitch } = this.props;
    this.curSelectIndex = this.curSelectIndex ? 0 : 1;
    handleSwitch && handleSwitch(this.curValueConfig[this.curSelectIndex]);
  }

  private statusIconRender(h, active: boolean) {
    const listType = this.props.type || 'select';
    const listItemsThemes = themesService.themes.listItems[listType];
    const icon = active ? listItemsThemes.active.icon : listItemsThemes.icon;
    if (icon) {
      const Icon = KIcon[icon];
      switch (listType) {
        case 'checkBox':
          return <Icon marginRight="5px" />;

        case 'select':
          return (
            <KAbsoluteBox right="margin1">
              <Icon />
            </KAbsoluteBox>
          );

        default:
          return null;
      }
    } else {
      return null;
    }
  }

  render(h) {
    const { type, placeholder, disabled } = this.props;
    const active = this.curSelectIndex === 1;

    switch (type) {
      case 'switch':
        return (
          <KBox styledProps={this.customStyledProps} padding="margin3 0">
            <KText.P marginRight={placeholder ? 'margin3' : ''}>{placeholder}</KText.P>
            <Switch active={active} disabled={disabled} onClick={this.handleClickSwitch} />
          </KBox>
        );

      case 'checkBox':
        return (
          <KListItem
            styledProps={this.customStyledProps}
            padding="margin2 0"
            type="checkBox"
            active={active}
            disabled={disabled}
            onClick={this.handleClickSwitch}
          >
            {this.statusIconRender(h, active)}
            {placeholder}
          </KListItem>
        );
    }
  }
}

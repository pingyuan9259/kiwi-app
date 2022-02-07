import KiwiPure from '@kiwi/kiwi-app/core/kiwi-class-pure';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import { styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { Component } from 'vue-property-decorator';
import KAbsoluteBox from '../k-absolute-box';
import * as KText from '../k-texts';
import KCardProps from './props';
import { Card, Content } from './style';

/**
 * 卡片组件
 */
@Component({
  props: propsParser(KCardProps),
  mounted(this: KCard) {
    this.init();
  }
})
export default class KCard extends KiwiPure<KCardProps> {
  private computing = false;
  private computedPaddingTop = '0';
  private computedPaddingBottom = '0';

  private init() {
    const { header, footer } = this.props;
    if (header) {
      this.computing = true;
      const timer = setInterval(() => {
        const $header = document.getElementById(`k_card_header_${this._uid}`);
        if ($header && $header.clientHeight) {
          this.computedPaddingTop = `${$header.clientHeight}px`;
          this.computing = false;
          clearInterval(timer);
        }
      }, 10);
    }
    if (footer) {
      this.computing = true;
      const timer = setInterval(() => {
        const $footer = document.getElementById(`k_card_footer_${this._uid}`);
        if ($footer && $footer.clientHeight) {
          this.computedPaddingBottom = `${$footer.clientHeight}px`;
          this.computing = false;
          clearInterval(timer);
        }
      }, 10);
    }
  }

  private headerRender(h) {
    const { header } = this.props;
    if (header) {
      const headerStyleStr = styleMapParser(styledPropsParser(themesService.themes.card.header));
      return (
        <KAbsoluteBox
          id={`k_card_header_${this._uid}`}
          place="top"
          width="100%"
          backgroundColor="background"
          zIndex="widget"
          style="pointer-events: auto"
        >
          {typeof header === 'string' && <KText.H3 style={headerStyleStr}>{header}</KText.H3>}
          {typeof header !== 'string' && header}
        </KAbsoluteBox>
      );
    }
    return null;
  }

  private footerRender(h) {
    const { footer } = this.props;
    if (footer) {
      const footerStyleStr = styleMapParser(styledPropsParser(themesService.themes.card.footer));
      return (
        <KAbsoluteBox
          id={`k_card_footer_${this._uid}`}
          place="bottom"
          width="100%"
          backgroundColor="background"
          zIndex="widget"
          style="pointer-events: auto"
        >
          {typeof footer === 'string' && <KText.P style={footerStyleStr}>{footer}</KText.P>}
          {typeof footer !== 'string' && footer}
        </KAbsoluteBox>
      );
    }
    return null;
  }

  protected render(h) {
    return (
      <Card class="k_card" width="100%" styledProps={this.customStyledProps}>
        {this.headerRender(h)}
        {this.footerRender(h)}
        <Content
          class="k_card_content"
          width={this.customStyledProps.width}
          height={this.customStyledProps.height}
          max-width={this.customStyledProps.maxWidth}
          min-width={this.customStyledProps.minWidth}
          max-height={this.customStyledProps.maxHeight}
          min-height={this.customStyledProps.minHeight}
          computedPaddingTop={this.computedPaddingTop}
          computedPaddingBottom={this.computedPaddingBottom}
          cardPadding={this.customStyledProps.padding}
          cardPaddingTop={this.customStyledProps.paddingTop}
          cardPaddingRight={this.customStyledProps.paddingRight}
          cardPaddingBottom={this.customStyledProps.paddingBottom}
          cardPaddingLeft={this.customStyledProps.paddingLeft}
          opacity={this.computing ? '0' : '1'}
          overflow={this.customStyledProps.overflow || 'scroll'}
        >
          {this.$slots.default}
        </Content>
      </Card>
    );
  }
}

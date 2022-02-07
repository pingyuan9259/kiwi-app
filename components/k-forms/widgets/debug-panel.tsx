import Kiwi from '@kiwi/kiwi-app/core/kiwi-class';
import propsParser from '@kiwi/kiwi-app/core/supports/props-parser';
import { Component } from 'vue-property-decorator';
import { getFormService } from '../..';
import KBox from '../../k-box';
import KCard from '../../k-card';
import KFixedBox from '../../k-fixed-box';
import KFlexBox from '../../k-flex-box';
import KSwitch from '../../k-switch';
import * as KText from '../../k-texts';

/**
 * 表单调试面板组件参数
 */
class DebugPanelProps {
  /** 是否展示调试面板 */
  readonly isShow: boolean = false;
}

/**
 * 表单调试面板组件
 */
@Component({
  props: propsParser(DebugPanelProps),
  created(this: DebugPanel) {
    this.init();
  }
})
export default class DebugPanel extends Kiwi<DebugPanelProps> {
  /**
   * 表单服务
   */
  private formService = getFormService();

  /**
   * 是否激活表单数据调试面板
   */
  private debugPanelActive = false;

  /**
   * 否展在表单数据调试面板上展示校验数据
   */
  private showDebugPanelValidate = false;

  /**
   * 初始化
   */
  private init() {
    if (this.props.isShow) {
      window.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.code === 'MetaLeft') {
          this.debugPanelActive = true;
        }
      });
      window.addEventListener('keyup', (event: KeyboardEvent) => {
        if (event.code === 'MetaLeft') {
          this.debugPanelActive = false;
        }
      });
    }
  }

  protected render(h) {
    return (
      <KBox class="debug_panel">
        {/* 表单数据调试面板 */}
        {this.props.isShow && (
          <KFixedBox
            place="top-right"
            width="50%"
            height="100%"
            opacity={this.debugPanelActive ? '1' : '0.5'}
            clickThrough={!this.debugPanelActive}
            transition
            zIndex="panel"
          >
            <KCard
              header={
                <KFlexBox
                  marginBottom="margin1"
                  padding="margin1"
                  horizontal="space-between"
                  borderBottom
                >
                  <KBox>
                    <KText.H3 inlineBlock>当前表单数据</KText.H3>
                    <KText.Comment inlineBlock>（按住Command开启滚动）</KText.Comment>
                  </KBox>

                  <KFlexBox>
                    <KText.P inlineBlock marginRight="margin2">
                      显示校验
                    </KText.P>

                    <KSwitch
                      active={this.showDebugPanelValidate}
                      handleSwitch={(value) => (this.showDebugPanelValidate = value)}
                    />
                  </KFlexBox>
                </KFlexBox>
              }
              width="100%"
              height="100%"
            >
              {this.showDebugPanelValidate ? (
                <pre>{JSON.stringify(this.formService.validateData, null, '  ')}</pre>
              ) : (
                <pre>{JSON.stringify(this.formService.data, null, '  ')}</pre>
              )}
            </KCard>
          </KFixedBox>
        )}
      </KBox>
    );
  }
}

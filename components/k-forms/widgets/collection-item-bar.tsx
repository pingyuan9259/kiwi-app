import { Kiwi, propsParser } from '@kiwi/kiwi-app/index';
import { styledPropsParser, styleMapParser } from '@kiwi/kiwi-app/styled';
import themesService from '@kiwi/kiwi-app/styled/themes/themes-service';
import { FormInstanceInfo } from '@kiwi/kiwi-app/types/components/k-forms';
import { Component } from 'vue-property-decorator';
import { KIcon } from '../..';
import KAbsoluteBox from '../../k-absolute-box';
import KBox from '../../k-box';
import KButton from '../../k-button';
import KFlexBox from '../../k-flex-box';
import * as KText from '../../k-texts';
import updateCollection from '../utils/update-collection';

/**
 * 集合控项制条组件参数
 */
class CollectionItemBarProps {
  /** 表单信息 */
  formInstanceInfo: FormInstanceInfo = undefined;
  /** 集合下标 */
  formDataIndex: number = undefined;
}

/**
 * 集合控项制条组件
 */
@Component({
  props: propsParser(CollectionItemBarProps)
})
export default class FormLabel extends Kiwi<CollectionItemBarProps> {
  render(h) {
    const { formDataIndex, formInstanceInfo } = this.props;
    const { name, maxLength, minLength } = formInstanceInfo;
    const {
      itemBar: barTheme,
      index: indexTheme,
      insertButton: insertButtonTheme,
      removeButton: removeButtonTheme
    } = themesService.themes.form.collection;
    const keyName = (name || '').replace(/列表|数组/g, '');
    const getName = (temp) => temp.replace('$', keyName).replace('*', String(formDataIndex + 1));
    const leftOrRight = barTheme.position === 'left' || barTheme.position === 'right';
    const InsertButtonIcon = KIcon[insertButtonTheme.icon];
    const RemoveButtonIcon = KIcon[removeButtonTheme.icon];

    return (
      <KAbsoluteBox
        class="collection_item_bar"
        place={barTheme.position}
        width={barTheme.width}
        height={barTheme.height}
        style={styleMapParser(styledPropsParser(barTheme))}
      >
        <KFlexBox
          width="100%"
          height="100%"
          horizontal={barTheme.layout}
          direction={
            (leftOrRight
              ? `column${barTheme.reverse ? '-reverse' : ''}`
              : `row${barTheme.reverse ? '-reverse' : ''}`) as any
          }
        >
          <KText.P
            hidden={indexTheme.hidden}
            margin="0 10px"
            width={leftOrRight ? '100%' : ''}
            color={indexTheme.color}
            bold={indexTheme.bold}
            align="center"
          >
            {getName(indexTheme.name)}
          </KText.P>

          <KBox margin="0 10px" width={leftOrRight ? '100%' : ''} align="center">
            <KButton
              type="link"
              hidden={formInstanceInfo.dataList.length >= maxLength}
              block={leftOrRight}
              inlineBlock={!leftOrRight}
              marginRight={leftOrRight ? '' : '20px'}
              colorType={insertButtonTheme.type}
              size={insertButtonTheme.size}
              onClick={() => updateCollection(formDataIndex, 'add', formInstanceInfo)}
            >
              {InsertButtonIcon && <InsertButtonIcon marginRight="5px" />}
              {getName(insertButtonTheme.name)}
            </KButton>

            <KButton
              type="link"
              hidden={formInstanceInfo.dataList.length <= minLength}
              block={leftOrRight}
              inlineBlock={!leftOrRight}
              colorType={removeButtonTheme.type}
              size={removeButtonTheme.size}
              onClick={() => updateCollection(formDataIndex, 'remove', formInstanceInfo)}
            >
              {RemoveButtonIcon && <RemoveButtonIcon marginRight="5px" />}
              {getName(removeButtonTheme.name)}
            </KButton>
          </KBox>
        </KFlexBox>
      </KAbsoluteBox>
    );
  }
}

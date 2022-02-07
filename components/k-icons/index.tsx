import styled, { styleMapParser } from '@kiwi/kiwi-app/styled';
import { FunctionComponent } from '@kiwi/kiwi-app/types';
import { StyledProps } from '@kiwi/kiwi-app/types/styled-props.js';
import './resource/iconfont.js';

/**
 * {图标}样式组件
 */
const Icon = styled('svg')`
  display: inline-block;
  color: inherit;
  fill: currentColor;
  overflow: hidden;
  ${(props) => {
    const iconfontTheme = props.themes.iconfont;
    return styleMapParser({
      width: iconfontTheme.width || '1em',
      height: iconfontTheme.height || '1em',
      verticalAlign: iconfontTheme.offsetY
    });
  }}
`;

/**
 * {copy}图标组件
 * @author yuan.ping
 */
export const Copy: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_copy"></use>
    </Icon>
  );
};

/**
 * {export}图标组件
 * @author yuan.ping
 */
export const Export: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_export"></use>
    </Icon>
  );
};

/**
 * {lock}图标组件
 * @author yuan.ping
 */
export const Lock: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_lock"></use>
    </Icon>
  );
};

/**
 * {phone2}图标组件
 * @author yuan.ping
 */
export const Phone2: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_phone2"></use>
    </Icon>
  );
};

/**
 * {resize_bottom_right}图标组件
 * @author yuan.ping
 */
export const ResizeBottomRight: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_resize_bottom_right"></use>
    </Icon>
  );
};

/**
 * {arrow_fill_down}图标组件
 * @author yuan.ping
 */
export const ArrowFillDown: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_fill_down"></use>
    </Icon>
  );
};

/**
 * {arrow_fill_left}图标组件
 * @author yuan.ping
 */
export const ArrowFillLeft: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_fill_left"></use>
    </Icon>
  );
};

/**
 * {arrow_fill_up}图标组件
 * @author yuan.ping
 */
export const ArrowFillUp: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_fill_up"></use>
    </Icon>
  );
};

/**
 * {arrow_fill_right}图标组件
 * @author yuan.ping
 */
export const ArrowFillRight: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_fill_right"></use>
    </Icon>
  );
};

/**
 * {user2}图标组件
 * @author yuan.ping
 */
export const User2: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_user2"></use>
    </Icon>
  );
};

/**
 * {search}图标组件
 * @author yuan.ping
 */
export const Search: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_search"></use>
    </Icon>
  );
};

/**
 * {eye}图标组件
 * @author yuan.ping
 */
export const Eye: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_eye"></use>
    </Icon>
  );
};

/**
 * {eye_close}图标组件
 * @author yuan.ping
 */
export const EyeClose: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_eye_close"></use>
    </Icon>
  );
};

/**
 * {minus}图标组件
 * @author yuan.ping
 */
export const Minus: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_minus"></use>
    </Icon>
  );
};

/**
 * {fullscreen_exit}图标组件
 * @author yuan.ping
 */
export const FullscreenExit: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_fullscreen_exit"></use>
    </Icon>
  );
};

/**
 * {chevron_up_down}图标组件
 * @author yuan.ping
 */
export const ChevronUpDown: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_up_down"></use>
    </Icon>
  );
};

/**
 * {radio_checked}图标组件
 * @author yuan.ping
 */
export const RadioChecked: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_radio_checked"></use>
    </Icon>
  );
};

/**
 * {edit}图标组件
 * @author yuan.ping
 */
export const Edit: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_edit"></use>
    </Icon>
  );
};

/**
 * {options}图标组件
 * @author yuan.ping
 */
export const Options: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_options"></use>
    </Icon>
  );
};

/**
 * {cart}图标组件
 * @author yuan.ping
 */
export const Cart: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_cart"></use>
    </Icon>
  );
};

/**
 * {cart_remove}图标组件
 * @author yuan.ping
 */
export const CartRemove: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_cart_remove"></use>
    </Icon>
  );
};

/**
 * {cart_add}图标组件
 * @author yuan.ping
 */
export const CartAdd: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_cart_add"></use>
    </Icon>
  );
};

/**
 * {checked_squire_fill}图标组件
 * @author yuan.ping
 */
export const CheckedSquireFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_checked_squire_fill"></use>
    </Icon>
  );
};

/**
 * {checked_squire}图标组件
 * @author yuan.ping
 */
export const CheckedSquire: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_checked_squire"></use>
    </Icon>
  );
};

/**
 * {list}图标组件
 * @author yuan.ping
 */
export const List: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_list"></use>
    </Icon>
  );
};

/**
 * {mic}图标组件
 * @author yuan.ping
 */
export const Mic: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_mic"></use>
    </Icon>
  );
};

/**
 * {mic_fill_disabled}图标组件
 * @author yuan.ping
 */
export const MicFillDisabled: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_mic_fill_disabled"></use>
    </Icon>
  );
};

/**
 * {navigation_fill}图标组件
 * @author yuan.ping
 */
export const NavigationFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_navigation_fill"></use>
    </Icon>
  );
};

/**
 * {navigation}图标组件
 * @author yuan.ping
 */
export const Navigation: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_navigation"></use>
    </Icon>
  );
};

/**
 * {qrcode_scan}图标组件
 * @author yuan.ping
 */
export const QrcodeScan: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_qrcode_scan"></use>
    </Icon>
  );
};

/**
 * {check_squire}图标组件
 * @author yuan.ping
 */
export const CheckSquire: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_check_squire"></use>
    </Icon>
  );
};

/**
 * {fullscreen}图标组件
 * @author yuan.ping
 */
export const Fullscreen: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_fullscreen"></use>
    </Icon>
  );
};

/**
 * {computed}图标组件
 * @author yuan.ping
 */
export const Computed: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_computed"></use>
    </Icon>
  );
};

/**
 * {qrcode}图标组件
 * @author yuan.ping
 */
export const Qrcode: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_qrcode"></use>
    </Icon>
  );
};

/**
 * {film}图标组件
 * @author yuan.ping
 */
export const Film: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_film"></use>
    </Icon>
  );
};

/**
 * {brush}图标组件
 * @author yuan.ping
 */
export const Brush: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_brush"></use>
    </Icon>
  );
};

/**
 * {check_circle}图标组件
 * @author yuan.ping
 */
export const CheckCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_check_circle"></use>
    </Icon>
  );
};

/**
 * {check_circle_fill}图标组件
 * @author yuan.ping
 */
export const CheckCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_check_circle_fill"></use>
    </Icon>
  );
};

/**
 * {chevron_left_circle_fill}图标组件
 * @author yuan.ping
 */
export const ChevronLeftCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_left_circle_fill"></use>
    </Icon>
  );
};

/**
 * {doc_on_clipboard}图标组件
 * @author yuan.ping
 */
export const DocOnClipboard: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_doc_on_clipboard"></use>
    </Icon>
  );
};

/**
 * {radio}图标组件
 * @author yuan.ping
 */
export const Radio: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_radio"></use>
    </Icon>
  );
};

/**
 * {question_circle}图标组件
 * @author yuan.ping
 */
export const QuestionCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_question_circle"></use>
    </Icon>
  );
};

/**
 * {question_circle_fill}图标组件
 * @author yuan.ping
 */
export const QuestionCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_question_circle_fill"></use>
    </Icon>
  );
};

/**
 * {refresh}图标组件
 * @author yuan.ping
 */
export const Refresh: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_refresh"></use>
    </Icon>
  );
};

/**
 * {rotate_right}图标组件
 * @author yuan.ping
 */
export const RotateRight: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_rotate_right"></use>
    </Icon>
  );
};

/**
 * {rotate_left}图标组件
 * @author yuan.ping
 */
export const RotateLeft: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_rotate_left"></use>
    </Icon>
  );
};

/**
 * {arrow_down}图标组件
 * @author yuan.ping
 */
export const ArrowDown: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_down"></use>
    </Icon>
  );
};

/**
 * {arrow_left}图标组件
 * @author yuan.ping
 */
export const ArrowLeft: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_left"></use>
    </Icon>
  );
};

/**
 * {arrow_download}图标组件
 * @author yuan.ping
 */
export const ArrowDownload: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_download"></use>
    </Icon>
  );
};

/**
 * {arrow_right}图标组件
 * @author yuan.ping
 */
export const ArrowRight: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_right"></use>
    </Icon>
  );
};

/**
 * {arrow_up}图标组件
 * @author yuan.ping
 */
export const ArrowUp: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_up"></use>
    </Icon>
  );
};

/**
 * {arrow_up_down}图标组件
 * @author yuan.ping
 */
export const ArrowUpDown: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_up_down"></use>
    </Icon>
  );
};

/**
 * {arrow_upload}图标组件
 * @author yuan.ping
 */
export const ArrowUpload: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_arrow_upload"></use>
    </Icon>
  );
};

/**
 * {media_play}图标组件
 * @author yuan.ping
 */
export const MediaPlay: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_play"></use>
    </Icon>
  );
};

/**
 * {media_backward_end}图标组件
 * @author yuan.ping
 */
export const MediaBackwardEnd: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_backward_end"></use>
    </Icon>
  );
};

/**
 * {bell}图标组件
 * @author yuan.ping
 */
export const Bell: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_bell"></use>
    </Icon>
  );
};

/**
 * {bell_fill}图标组件
 * @author yuan.ping
 */
export const BellFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_bell_fill"></use>
    </Icon>
  );
};

/**
 * {bell_disabled}图标组件
 * @author yuan.ping
 */
export const BellDisabled: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_bell_disabled"></use>
    </Icon>
  );
};

/**
 * {bubble_fill}图标组件
 * @author yuan.ping
 */
export const BubbleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_bubble_fill"></use>
    </Icon>
  );
};

/**
 * {bubble}图标组件
 * @author yuan.ping
 */
export const Bubble: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_bubble"></use>
    </Icon>
  );
};

/**
 * {chart_fill}图标组件
 * @author yuan.ping
 */
export const ChartFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chart_fill"></use>
    </Icon>
  );
};

/**
 * {calendar}图标组件
 * @author yuan.ping
 */
export const Calendar: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_calendar"></use>
    </Icon>
  );
};

/**
 * {chevron_down}图标组件
 * @author yuan.ping
 */
export const ChevronDown: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_down"></use>
    </Icon>
  );
};

/**
 * {chevron_left_circle}图标组件
 * @author yuan.ping
 */
export const ChevronLeftCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_left_circle"></use>
    </Icon>
  );
};

/**
 * {code}图标组件
 * @author yuan.ping
 */
export const Code: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_code"></use>
    </Icon>
  );
};

/**
 * {chevron_left}图标组件
 * @author yuan.ping
 */
export const ChevronLeft: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_left"></use>
    </Icon>
  );
};

/**
 * {chevron_up}图标组件
 * @author yuan.ping
 */
export const ChevronUp: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_up"></use>
    </Icon>
  );
};

/**
 * {clock}图标组件
 * @author yuan.ping
 */
export const Clock: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_clock"></use>
    </Icon>
  );
};

/**
 * {cloud}图标组件
 * @author yuan.ping
 */
export const Cloud: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_cloud"></use>
    </Icon>
  );
};

/**
 * {pc_book}图标组件
 * @author yuan.ping
 */
export const PcBook: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_pc_book"></use>
    </Icon>
  );
};

/**
 * {delete_fill}图标组件
 * @author yuan.ping
 */
export const DeleteFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_delete_fill"></use>
    </Icon>
  );
};

/**
 * {delete}图标组件
 * @author yuan.ping
 */
export const Delete: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_delete"></use>
    </Icon>
  );
};

/**
 * {pc}图标组件
 * @author yuan.ping
 */
export const Pc: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_pc"></use>
    </Icon>
  );
};

/**
 * {mobile_landscape}图标组件
 * @author yuan.ping
 */
export const MobileLandscape: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_mobile_landscape"></use>
    </Icon>
  );
};

/**
 * {pad_landscape}图标组件
 * @author yuan.ping
 */
export const PadLandscape: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_pad_landscape"></use>
    </Icon>
  );
};

/**
 * {pad}图标组件
 * @author yuan.ping
 */
export const Pad: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_pad"></use>
    </Icon>
  );
};

/**
 * {mobile}图标组件
 * @author yuan.ping
 */
export const Mobile: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_mobile"></use>
    </Icon>
  );
};

/**
 * {chevron_down_circle}图标组件
 * @author yuan.ping
 */
export const ChevronDownCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_down_circle"></use>
    </Icon>
  );
};

/**
 * {doc_on_doc_fill}图标组件
 * @author yuan.ping
 */
export const DocOnDocFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_doc_on_doc_fill"></use>
    </Icon>
  );
};

/**
 * {doc_on_clipboard_fill}图标组件
 * @author yuan.ping
 */
export const DocOnClipboardFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_doc_on_clipboard_fill"></use>
    </Icon>
  );
};

/**
 * {chevron_up_circle}图标组件
 * @author yuan.ping
 */
export const ChevronUpCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_up_circle"></use>
    </Icon>
  );
};

/**
 * {doc_on_doc}图标组件
 * @author yuan.ping
 */
export const DocOnDoc: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_doc_on_doc"></use>
    </Icon>
  );
};

/**
 * {doc_text}图标组件
 * @author yuan.ping
 */
export const DocText: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_doc_text"></use>
    </Icon>
  );
};

/**
 * {doc_text_fill}图标组件
 * @author yuan.ping
 */
export const DocTextFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_doc_text_fill"></use>
    </Icon>
  );
};

/**
 * {cloud_download}图标组件
 * @author yuan.ping
 */
export const CloudDownload: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_cloud_download"></use>
    </Icon>
  );
};

/**
 * {ellipsis_circle_fill}图标组件
 * @author yuan.ping
 */
export const EllipsisCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_ellipsis_circle_fill"></use>
    </Icon>
  );
};

/**
 * {ellipsis}图标组件
 * @author yuan.ping
 */
export const Ellipsis: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_ellipsis"></use>
    </Icon>
  );
};

/**
 * {ellipsis_circle}图标组件
 * @author yuan.ping
 */
export const EllipsisCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_ellipsis_circle"></use>
    </Icon>
  );
};

/**
 * {warning_circle}图标组件
 * @author yuan.ping
 */
export const WarningCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_warning_circle"></use>
    </Icon>
  );
};

/**
 * {warning_circle_fill}图标组件
 * @author yuan.ping
 */
export const WarningCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_warning_circle_fill"></use>
    </Icon>
  );
};

/**
 * {media_forward}图标组件
 * @author yuan.ping
 */
export const MediaForward: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_forward"></use>
    </Icon>
  );
};

/**
 * {chevron_right}图标组件
 * @author yuan.ping
 */
export const ChevronRight: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_right"></use>
    </Icon>
  );
};

/**
 * {gift}图标组件
 * @author yuan.ping
 */
export const Gift: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_gift"></use>
    </Icon>
  );
};

/**
 * {setting_fill}图标组件
 * @author yuan.ping
 */
export const SettingFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_setting_fill"></use>
    </Icon>
  );
};

/**
 * {chevron_right_circle}图标组件
 * @author yuan.ping
 */
export const ChevronRightCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_right_circle"></use>
    </Icon>
  );
};

/**
 * {loop}图标组件
 * @author yuan.ping
 */
export const Loop: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_loop"></use>
    </Icon>
  );
};

/**
 * {hand_fill}图标组件
 * @author yuan.ping
 */
export const HandFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_hand_fill"></use>
    </Icon>
  );
};

/**
 * {hand}图标组件
 * @author yuan.ping
 */
export const Hand: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_hand"></use>
    </Icon>
  );
};

/**
 * {hand_disabled}图标组件
 * @author yuan.ping
 */
export const HandDisabled: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_hand_disabled"></use>
    </Icon>
  );
};

/**
 * {chevron_right_circle_fill}图标组件
 * @author yuan.ping
 */
export const ChevronRightCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_right_circle_fill"></use>
    </Icon>
  );
};

/**
 * {setting}图标组件
 * @author yuan.ping
 */
export const Setting: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_setting"></use>
    </Icon>
  );
};

/**
 * {home}图标组件
 * @author yuan.ping
 */
export const Home: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_home"></use>
    </Icon>
  );
};

/**
 * {home_fill}图标组件
 * @author yuan.ping
 */
export const HomeFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_home_fill"></use>
    </Icon>
  );
};

/**
 * {light_fill}图标组件
 * @author yuan.ping
 */
export const LightFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_light_fill"></use>
    </Icon>
  );
};

/**
 * {light}图标组件
 * @author yuan.ping
 */
export const Light: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_light"></use>
    </Icon>
  );
};

/**
 * {light_disabled}图标组件
 * @author yuan.ping
 */
export const LightDisabled: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_light_disabled"></use>
    </Icon>
  );
};

/**
 * {lock_fill}图标组件
 * @author yuan.ping
 */
export const LockFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_lock_fill"></use>
    </Icon>
  );
};

/**
 * {lock_fill_open}图标组件
 * @author yuan.ping
 */
export const LockFillOpen: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_lock_fill_open"></use>
    </Icon>
  );
};

/**
 * {minus_circle}图标组件
 * @author yuan.ping
 */
export const MinusCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_minus_circle"></use>
    </Icon>
  );
};

/**
 * {moon}图标组件
 * @author yuan.ping
 */
export const Moon: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_moon"></use>
    </Icon>
  );
};

/**
 * {keyboard}图标组件
 * @author yuan.ping
 */
export const Keyboard: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_keyboard"></use>
    </Icon>
  );
};

/**
 * {close_circle}图标组件
 * @author yuan.ping
 */
export const CloseCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_close_circle"></use>
    </Icon>
  );
};

/**
 * {close}图标组件
 * @author yuan.ping
 */
export const Close: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_close"></use>
    </Icon>
  );
};

/**
 * {close_circle_fill}图标组件
 * @author yuan.ping
 */
export const CloseCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_close_circle_fill"></use>
    </Icon>
  );
};

/**
 * {music}图标组件
 * @author yuan.ping
 */
export const Music: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_music"></use>
    </Icon>
  );
};

/**
 * {disabled}图标组件
 * @author yuan.ping
 */
export const Disabled: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_disabled"></use>
    </Icon>
  );
};

/**
 * {brush_fill}图标组件
 * @author yuan.ping
 */
export const BrushFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_brush_fill"></use>
    </Icon>
  );
};

/**
 * {media_pause}图标组件
 * @author yuan.ping
 */
export const MediaPause: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_pause"></use>
    </Icon>
  );
};

/**
 * {photo}图标组件
 * @author yuan.ping
 */
export const Photo: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_photo"></use>
    </Icon>
  );
};

/**
 * {phone_fill}图标组件
 * @author yuan.ping
 */
export const PhoneFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_phone_fill"></use>
    </Icon>
  );
};

/**
 * {photos}图标组件
 * @author yuan.ping
 */
export const Photos: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_photos"></use>
    </Icon>
  );
};

/**
 * {pin}图标组件
 * @author yuan.ping
 */
export const Pin: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_pin"></use>
    </Icon>
  );
};

/**
 * {pin_fill}图标组件
 * @author yuan.ping
 */
export const PinFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_pin_fill"></use>
    </Icon>
  );
};

/**
 * {photos_fill}图标组件
 * @author yuan.ping
 */
export const PhotosFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_photos_fill"></use>
    </Icon>
  );
};

/**
 * {pin_disabled}图标组件
 * @author yuan.ping
 */
export const PinDisabled: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_pin_disabled"></use>
    </Icon>
  );
};

/**
 * {users}图标组件
 * @author yuan.ping
 */
export const Users: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_users"></use>
    </Icon>
  );
};

/**
 * {plus}图标组件
 * @author yuan.ping
 */
export const Plus: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_plus"></use>
    </Icon>
  );
};

/**
 * {media_play_pause}图标组件
 * @author yuan.ping
 */
export const MediaPlayPause: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_play_pause"></use>
    </Icon>
  );
};

/**
 * {plus_circle}图标组件
 * @author yuan.ping
 */
export const PlusCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_plus_circle"></use>
    </Icon>
  );
};

/**
 * {plus_circle_fill}图标组件
 * @author yuan.ping
 */
export const PlusCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_plus_circle_fill"></use>
    </Icon>
  );
};

/**
 * {user}图标组件
 * @author yuan.ping
 */
export const User: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_user"></use>
    </Icon>
  );
};

/**
 * {user_circle}图标组件
 * @author yuan.ping
 */
export const UserCircle: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_user_circle"></use>
    </Icon>
  );
};

/**
 * {user_circle_fill}图标组件
 * @author yuan.ping
 */
export const UserCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_user_circle_fill"></use>
    </Icon>
  );
};

/**
 * {power}图标组件
 * @author yuan.ping
 */
export const Power: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_power"></use>
    </Icon>
  );
};

/**
 * {configuration}图标组件
 * @author yuan.ping
 */
export const Configuration: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_configuration"></use>
    </Icon>
  );
};

/**
 * {radio_checked_fill}图标组件
 * @author yuan.ping
 */
export const RadioCheckedFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_radio_checked_fill"></use>
    </Icon>
  );
};

/**
 * {sort_down}图标组件
 * @author yuan.ping
 */
export const SortDown: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_sort_down"></use>
    </Icon>
  );
};

/**
 * {sort_up}图标组件
 * @author yuan.ping
 */
export const SortUp: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_sort_up"></use>
    </Icon>
  );
};

/**
 * {speaker}图标组件
 * @author yuan.ping
 */
export const Speaker: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_speaker"></use>
    </Icon>
  );
};

/**
 * {speaker_fill}图标组件
 * @author yuan.ping
 */
export const SpeakerFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_speaker_fill"></use>
    </Icon>
  );
};

/**
 * {speaker_disabled}图标组件
 * @author yuan.ping
 */
export const SpeakerDisabled: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_speaker_disabled"></use>
    </Icon>
  );
};

/**
 * {star}图标组件
 * @author yuan.ping
 */
export const Star: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_star"></use>
    </Icon>
  );
};

/**
 * {media_stop}图标组件
 * @author yuan.ping
 */
export const MediaStop: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_stop"></use>
    </Icon>
  );
};

/**
 * {star_fill}图标组件
 * @author yuan.ping
 */
export const StarFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_star_fill"></use>
    </Icon>
  );
};

/**
 * {heart}图标组件
 * @author yuan.ping
 */
export const Heart: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_heart"></use>
    </Icon>
  );
};

/**
 * {heart_fill}图标组件
 * @author yuan.ping
 */
export const HeartFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_heart_fill"></use>
    </Icon>
  );
};

/**
 * {align_right}图标组件
 * @author yuan.ping
 */
export const AlignRight: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_align_right"></use>
    </Icon>
  );
};

/**
 * {align_center}图标组件
 * @author yuan.ping
 */
export const AlignCenter: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_align_center"></use>
    </Icon>
  );
};

/**
 * {align_left}图标组件
 * @author yuan.ping
 */
export const AlignLeft: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_align_left"></use>
    </Icon>
  );
};

/**
 * {ticket_fill}图标组件
 * @author yuan.ping
 */
export const TicketFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_ticket_fill"></use>
    </Icon>
  );
};

/**
 * {timer}图标组件
 * @author yuan.ping
 */
export const Timer: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_timer"></use>
    </Icon>
  );
};

/**
 * {ticket}图标组件
 * @author yuan.ping
 */
export const Ticket: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_ticket"></use>
    </Icon>
  );
};

/**
 * {media_record}图标组件
 * @author yuan.ping
 */
export const MediaRecord: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_record"></use>
    </Icon>
  );
};

/**
 * {trash}图标组件
 * @author yuan.ping
 */
export const Trash: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_trash"></use>
    </Icon>
  );
};

/**
 * {trash_fill}图标组件
 * @author yuan.ping
 */
export const TrashFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_trash_fill"></use>
    </Icon>
  );
};

/**
 * {airplane}图标组件
 * @author yuan.ping
 */
export const Airplane: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_airplane"></use>
    </Icon>
  );
};

/**
 * {check}图标组件
 * @author yuan.ping
 */
export const Check: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_check"></use>
    </Icon>
  );
};

/**
 * {chevron_down_circle_fill}图标组件
 * @author yuan.ping
 */
export const ChevronDownCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_down_circle_fill"></use>
    </Icon>
  );
};

/**
 * {chevron_up_circle_fill}图标组件
 * @author yuan.ping
 */
export const ChevronUpCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_chevron_up_circle_fill"></use>
    </Icon>
  );
};

/**
 * {crop}图标组件
 * @author yuan.ping
 */
export const Crop: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_crop"></use>
    </Icon>
  );
};

/**
 * {folder}图标组件
 * @author yuan.ping
 */
export const Folder: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_folder"></use>
    </Icon>
  );
};

/**
 * {cloud_upload}图标组件
 * @author yuan.ping
 */
export const CloudUpload: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_cloud_upload"></use>
    </Icon>
  );
};

/**
 * {media_forward_end}图标组件
 * @author yuan.ping
 */
export const MediaForwardEnd: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_forward_end"></use>
    </Icon>
  );
};

/**
 * {film_fill}图标组件
 * @author yuan.ping
 */
export const FilmFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_film_fill"></use>
    </Icon>
  );
};

/**
 * {minus_circle_fill}图标组件
 * @author yuan.ping
 */
export const MinusCircleFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_minus_circle_fill"></use>
    </Icon>
  );
};

/**
 * {moon_fill}图标组件
 * @author yuan.ping
 */
export const MoonFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_moon_fill"></use>
    </Icon>
  );
};

/**
 * {phone}图标组件
 * @author yuan.ping
 */
export const Phone: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_phone"></use>
    </Icon>
  );
};

/**
 * {photo_fill}图标组件
 * @author yuan.ping
 */
export const PhotoFill: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_photo_fill"></use>
    </Icon>
  );
};

/**
 * {media_backward}图标组件
 * @author yuan.ping
 */
export const MediaBackward: FunctionComponent<StyledProps> = ({ props }) => {
  return (
    <Icon aria-hidden="true" styledProps={props}>
      <use xlinkHref="#icon_media_backward"></use>
    </Icon>
  );
};

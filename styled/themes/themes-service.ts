import service from '@kiwi/kiwi-app/core/service';
import { cloneDeep, find, merge } from 'lodash';
import { ThemesConfig } from '../../types/themes';
import colorParser from '../parsers/color-parser';
import { defaultThemes } from './default-themes';

/**
 * 样式主题数据服务
 */
const themesService = service({
  /**
   * 当前主题
   */
  themes: cloneDeep(defaultThemes) as ThemesConfig,

  /**
   * 适配缩放
   */
  fittingZoom: 1,

  /**
   * 主题注册
   * @param themes
   */
  themeRegister(themes: Partial<ThemesConfig>[] = [defaultThemes]): void {
    const defaultThemesCopy = cloneDeep(defaultThemes);
    const mergedTheme = merge(defaultThemesCopy, ...themes);

    const htmlHeadZoomMeta = find(
      document.head.getElementsByTagName('meta'),
      (i) => i.name === 'viewport-fit-zoom'
    );

    // 初始化适配缩放比例、设备类型
    if (htmlHeadZoomMeta) {
      const fittingZoom = parseInt(htmlHeadZoomMeta.content);
      themesService.fittingZoom = fittingZoom;
      mergedTheme.fittingRatio = 1 / fittingZoom;
      if (!mergedTheme.deviceType) {
        mergedTheme.deviceType = 'mobile';
      }
    } else {
      themesService.fittingZoom = 1;
      mergedTheme.fittingRatio = 1;
      mergedTheme.deviceType = 'pc';
    }

    document.body.style.backgroundColor = colorParser(mergedTheme.colorTypes.shading, mergedTheme);
    themesService.themes = mergedTheme;
  },

  /**
   * 主题热更新
   * @param themes
   * @returns
   */
  hotUpdate(...themes: Partial<ThemesConfig>[]): ThemesConfig {
    const themesCopy = cloneDeep(themesService.themes);
    const newTheme = merge(themesCopy, ...themes);
    themesService.themes = newTheme;
    document.body.style.backgroundColor = colorParser(newTheme.colorTypes.shading, newTheme);
    return newTheme;
  }
});

export default themesService;

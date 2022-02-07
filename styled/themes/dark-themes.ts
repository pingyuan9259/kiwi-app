import { ThemesConfig } from '@kiwi/kiwi-app/types/themes';

/**
 * 默认深色主题
 */
export const darkThemes: Partial<ThemesConfig> = {
  colors: {
    lightGray: '#dddddd',
    lightGray2: '#cccccc',
    gray: '#999999',
    gray2: '#888888',
    deepGray: '#444444',
    deepGray2: '#383838',
    black: '#333333',
    black2: '#222222',
    blue: '#7395f7',
    blue2: '#6684d8'
  },

  colorTypes: {
    default: 'lightGray2',
    highlight: 'blue',
    comment: 'gray2',
    background: 'black',
    shading: 'black2',
    border: 'deepGray',
    hover: 'deepGray2',
    shadow: 'black2'
  },

  card: {
    backgroundColor: 'background'
  },

  listItems: {
    menu: {
      borderLeft: ['2px', 'solid', 'transparent'],
      active: {
        color: 'highlight',
        borderLeft: ['2px', 'solid', 'highlight']
      },
      hover: {
        color: 'highlight',
        backgroundColor: 'hover'
      }
    },
    subMenu: {
      borderLeft: ['2px', 'solid', 'transparent'],
      active: {
        color: 'highlight',
        borderLeft: ['2px', 'solid', 'highlight']
      },
      hover: {
        color: 'highlight',
        backgroundColor: 'hover'
      }
    }
  },

  input: {
    backgroundColor: 'deepGray'
  },

  table: {
    head: {
      backgroundColor: 'deepGray'
    }
  },

  form: {
    collection: {
      itemBar: {
        backgroundColor: 'hover'
      }
    }
  }
};

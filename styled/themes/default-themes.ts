import { ThemesConfig } from '@kiwi/kiwi-app/types/themes';

/**
 * 默认主题
 */
export const defaultThemes: Partial<ThemesConfig> = {
  colors: {
    transparent: 'transparent',
    inherit: 'inherit',
    white: '#ffffff',
    white2: '#f5f6fa',
    lightGray: '#f1f1f1',
    lightGray2: '#e6e6e6',
    gray: '#aaaaaa',
    gray2: '#999999',
    deepGray: '#666666',
    deepGray2: '#555555',
    black: '#333333',
    black2: '#000000',
    lightRed: '#fef0f0',
    lightRed2: '#fbc4c4',
    red: '#f56c6c',
    red2: '#d76363',
    lightOrange: '#fef6eb',
    lightOrange2: '#f5dab1',
    orange: '#e6a23c',
    orange2: '#ffc717',
    yellow: 'yellow',
    yellow2: '#ffc717',
    lightGreen: '#f0f9eb',
    lightGreen2: '#c2e7b0',
    green: '#67c23a',
    green2: '#569d33',
    lightBlue: '#ebf7ff',
    lightBlue2: '#e4edf3',
    blue: '#019dff',
    blue2: '#0779CA',
    deepBlue: '#282f3b',
    deepBlue2: '#232a35',
    cyan: '#5cebf6',
    cyan2: '#52cfd9',
    brown: '#aa4721',
    brown2: '#a3411b',
    pink: '#e281ff',
    pink2: '#d282eb'
  },

  colorTypes: {
    default: 'black',
    highlight: 'blue',
    success: 'green',
    warning: 'orange',
    danger: 'red',
    comment: 'gray2',
    background: 'white',
    shading: 'lightGray',
    hover: 'lightBlue',
    border: 'lightGray2',
    shadow: 'gray'
  },

  widthTypes: {
    margin1: '20px',
    margin2: '10px',
    margin3: '8px',
    margin4: '5px',
    borderRadius1: '4px',
    borderRadius2: '2px',
    shadowWidth1: '4px',
    shadowWidth2: '2px'
  },

  zIndex: {
    base: '1',
    content: '10',
    widget: '20',
    panel: '30',
    angle: '100'
  },

  textTypes: {
    header1: {
      fontSize: '26px',
      lineHeight: '26px',
      color: 'default',
      bold: true
    },
    header2: {
      fontSize: '20px',
      lineHeight: '20px',
      color: 'default',
      bold: true
    },
    header3: {
      fontSize: '16px',
      lineHeight: '16px',
      color: 'default',
      bold: true
    },
    header4: {
      fontSize: '16px',
      lineHeight: '16px',
      color: 'default'
    },
    header5: {
      fontSize: '14px',
      lineHeight: '14px',
      color: 'default',
      bold: true
    },
    paragraph: {
      fontSize: '14px',
      lineHeight: '14px',
      color: 'default'
    },
    comment: {
      fontSize: '13px',
      lineHeight: '13px',
      color: 'comment'
    },
    label: {
      fontSize: '12px',
      lineHeight: '12px',
      color: 'comment'
    }
  },

  card: {
    padding: 'margin1',
    text: 'paragraph',
    border: true,
    borderRadius: 'borderRadius1',
    backgroundColor: 'background',
    header: {
      padding: 'margin1',
      borderBottom: true,
      text: 'header3'
    },
    footer: {
      padding: 'margin1',
      borderTop: true,
      text: 'comment'
    }
  },

  buttons: {
    standard: {
      boxes: {
        backgroundColor: '$props.colorType',
        color: 'white',
        border: true,
        borderColor: '$props.colorType',
        borderRadius: 'borderRadius1',
        hover: {
          backgroundColor: ['$props.colorType', 0.8]
        },
        disabled: {
          opacity: '0.5'
        }
      },
      sizes: {
        small: {
          padding: '6px 12px',
          text: 'label'
        },
        medium: {
          padding: '9px 15px',
          text: 'paragraph'
        },
        large: {
          padding: '12px 24px',
          text: 'paragraph'
        }
      },
      colorTypes: {
        default: {
          backgroundColor: 'background',
          color: 'default',
          border: true,
          borderColor: 'border',
          hover: {
            backgroundColor: 'shading'
          }
        }
      }
    },
    hollow: {
      boxes: {
        backgroundColor: ['$props.colorType', 0.2],
        color: '$props.colorType',
        border: true,
        borderColor: '$props.colorType',
        borderRadius: 'borderRadius1',
        hover: {
          backgroundColor: ['$props.colorType', 0.8],
          color: 'white'
        },
        disabled: {
          opacity: '0.5'
        }
      },
      sizes: {
        small: {
          padding: '6px 12px',
          text: 'label'
        },
        medium: {
          padding: '9px 15px',
          text: 'paragraph'
        },
        large: {
          padding: '12px 24px',
          text: 'paragraph'
        }
      },
      colorTypes: {
        default: {
          backgroundColor: 'background',
          border: true,
          borderColor: 'border',
          hover: {
            backgroundColor: 'shading',
            color: 'default'
          }
        }
      }
    },
    link: {
      boxes: {
        backgroundColor: 'transparent',
        color: '$props.colorType',
        border: false,
        hover: {
          color: ['$props.colorType', 0.8]
        },
        disabled: {
          opacity: '0.5'
        }
      },
      sizes: {
        small: {
          padding: '6px 0',
          text: 'label'
        },
        medium: {
          padding: 'margin2 0',
          text: 'paragraph'
        },
        large: {
          padding: '12px 0',
          text: 'paragraph'
        }
      }
    },
    tag: {
      boxes: {
        backgroundColor: ['$props.colorType', 0.2],
        color: '$props.colorType',
        border: true,
        borderColor: '$props.colorType',
        borderRadius: 'borderRadius1',
        disabled: {
          opacity: '0.5'
        }
      },
      sizes: {
        small: {
          padding: '3px 6px',
          text: 'label'
        },
        medium: {
          padding: '3px 6px',
          text: 'paragraph'
        },
        large: {
          padding: '3px 6px',
          text: 'paragraph'
        }
      },
      colorTypes: {
        default: {
          backgroundColor: 'background',
          color: 'default',
          border: true,
          borderColor: 'border',
          hover: {
            backgroundColor: 'shading'
          }
        }
      }
    }
  },

  listItems: {
    menu: {
      padding: '15px margin1',
      text: 'paragraph',
      borderRadius: '0',
      active: {
        color: 'highlight',
        backgroundColor: 'hover'
      },
      hover: {
        color: 'highlight',
        backgroundColor: 'hover'
      }
    },
    subMenu: {
      padding: '15px 30px',
      text: 'comment',
      borderRadius: '0',
      active: {
        color: 'highlight',
        backgroundColor: 'hover'
      },
      hover: {
        color: 'highlight',
        backgroundColor: 'hover'
      }
    },
    tab: {
      padding: 'margin1',
      text: 'paragraph',
      borderRadius: '0',
      borderBottom: ['2px', 'solid', 'transparent'],
      active: {
        color: 'highlight',
        borderBottom: ['2px', 'solid', 'highlight']
      },
      hover: {
        color: 'highlight'
      }
    },
    select: {
      padding: '10px margin1',
      text: 'paragraph',
      borderRadius: '0',
      align: 'left',
      active: {
        color: 'highlight',
        backgroundColor: 'hover'
      },
      hover: {
        backgroundColor: 'hover'
      }
    },
    checkBox: {
      padding: '10px margin2',
      text: 'paragraph',
      borderRadius: '0',
      icon: 'CheckSquire',
      active: {
        color: 'highlight',
        icon: 'CheckedSquireFill'
      }
    },
    radio: {
      padding: '10px margin2',
      text: 'paragraph',
      borderRadius: '0',
      icon: 'Radio',
      active: {
        color: 'highlight',
        icon: 'RadioChecked'
      }
    }
  },

  input: {
    padding: 'margin2',
    text: 'paragraph',
    backgroundColor: 'background',
    border: true,
    borderRadius: 'borderRadius1',
    overflow: 'hidden',
    transition: true,
    focus: {
      border: ['1px', 'solid', 'highlight']
    },
    invalid: {
      border: ['1px', 'solid', 'danger']
    },
    disabled: {
      opacity: '0.5'
    },
    widget: {
      clear: {
        icon: 'Close',
        height: '100%',
        padding: 'margin3',
        text: 'comment'
      },
      step: {
        upIcon: 'ChevronUp',
        downIcon: 'ChevronDown',
        height: '50%',
        padding: 'margin4',
        text: 'comment',
        fontSize: '12px'
      }
    }
  },

  table: {
    head: {
      padding: '15px 10px',
      color: 'comment',
      backgroundColor: 'border',
      borderRadius: '0'
    },
    cell: {
      padding: '15px 10px',
      text: 'paragraph',
      borderRadius: '0',
      borderBottom: true
    },
    pagination: {
      button: 'Button',
      activeButtonType: 'highlight'
    }
  },

  form: {
    labelLayout: 'horizontal',
    labelWidth: '80px',
    labelMarginBottom: 'margin3',
    labelFontSize: '14px',
    labelColor: 'default',
    labelColon: true,
    boxStyle: {
      marginBottom: 'margin1',
      marginRight: 'margin1'
    },
    subFormBoxStyle: {
      padding: '0 margin1',
      collectionPadding: '60px margin1 margin1 margin1',
      backgroundColor: 'background',
      borderLeft: true
    },
    collection: {
      itemBar: {
        position: 'top',
        width: 'calc(100% - 40px)',
        height: '40px',
        backgroundColor: 'shading',
        borderRadius: 'borderRadius1',
        layout: 'space-between'
      },
      index: {
        name: '$ 第*项',
        color: 'comment'
      },
      addButton: {
        name: '添加$',
        icon: 'Plus',
        type: 'highlight'
      },
      insertButton: {
        name: '插入$',
        icon: 'ChevronLeft',
        type: 'highlight'
      },
      removeButton: {
        name: '删除',
        icon: 'Delete',
        type: 'danger'
      }
    }
  },

  modal: {
    toast: {
      position: ['6%', '', '', ''],
      padding: ['15px', 'margin1', '15px', 'margin1']
    },
    confirm: {
      position: ['25%', '', '', ''],
      width: '360px',
      button: 'Button',
      buttonPlace: 'right',
      buttonSize: 'medium'
    }
  },

  iconfont: {
    width: '1em',
    height: '1em',
    offsetY: '-0.15em'
  }
};

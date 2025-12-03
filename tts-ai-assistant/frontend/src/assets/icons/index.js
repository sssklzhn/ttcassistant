// icons/index.js - только экспорт компонентов React

import React from 'react';

// Иконка щита (безопасность)
export const ShieldIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  }, 
    React.createElement('path', {
      d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M9 12l2 2 4-4",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка молнии (производительность)
export const LightningIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка глобуса
export const GlobeIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('circle', {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "2"
    }),
    React.createElement('path', {
      d: "M2 12h20",
      stroke: "currentColor",
      strokeWidth: "2"
    }),
    React.createElement('path', {
      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
      stroke: "currentColor",
      strokeWidth: "2"
    })
  );
};

// Иконка почты
export const EmailIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('rect', {
      x: "2",
      y: "4",
      width: "20",
      height: "16",
      rx: "2",
      stroke: "currentColor",
      strokeWidth: "2"
    }),
    React.createElement('path', {
      d: "m2 6 10 7 10-7",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка замка
export const LockIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('rect', {
      x: "3",
      y: "11",
      width: "18",
      height: "11",
      rx: "2",
      stroke: "currentColor",
      strokeWidth: "2"
    }),
    React.createElement('path', {
      d: "M7 11V7a5 5 0 0 1 10 0v4",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }),
    React.createElement('circle', {
      cx: "12",
      cy: "16",
      r: "1",
      fill: "currentColor"
    })
  );
};

// Иконка открытого глаза
export const EyeIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('circle', {
      cx: "12",
      cy: "12",
      r: "3",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка закрытого глаза
export const EyeOffIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "m1 1 22 22",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка ракеты
export const RocketIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M12 15l-3-3m3 3a22 22 0 0 1-4-2m4 2l5-5m-5 5h3",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M9 12H4l.5-2.5L12 3l7.5 6.5L20 12h-5",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M12 15v6",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка галочки
export const CheckIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M20 6L9 17l-5-5",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка предупреждения
export const AlertIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M12 9v4",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M12 17h.01",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка закрытия
export const CloseIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M18 6L6 18",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M6 6l12 12",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка пользователя
export const UserCircleIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('circle', {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      strokeWidth: "2"
    }),
    React.createElement('circle', {
      cx: "12",
      cy: "9",
      r: "3",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }),
    React.createElement('path', {
      d: "M5 19.5c.67-1.33 2.17-2 4-2h6c1.83 0 3.33.67 4 2",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    })
  );
};

// Иконка блеска/искры
export const SparklesIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M9.5 3l.5 4.5L14 8l-4 3.5.5 4.5-4-3-4 3 .5-4.5L2 8l4-.5L9.5 3zM20 7l-1.5 6L20 19l-6-1.5L13 20l-1.5-6L7 13l6-1.5L13 7l1.5 6L20 7z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Остальные иконки можно сделать по аналогии...

// Иконка пользователя (простая)
export const UserIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('circle', {
      cx: "12",
      cy: "8",
      r: "4",
      stroke: "currentColor",
      strokeWidth: "2"
    }),
    React.createElement('path', {
      d: "M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    })
  );
};

// Иконка сообщения
export const MessageSquareIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Иконка плюса
export const PlusIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('path', {
      d: "M12 5v14",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    }),
    React.createElement('path', {
      d: "M5 12h14",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round"
    })
  );
};

// Базовые иконки для быстрого решения
export const TrashIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '🗑️');
};

export const BotIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '🤖');
};

export const ChevronLeftIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '◀');
};

export const ChevronRightIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '▶');
};

export const SendIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '📤');
};

export const ClockIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '🕐');
};

export const HistoryIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '📜');
};

export const SearchIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '🔍');
};

export const SettingsIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '⚙️');
};

export const DownloadIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '📥');
};

export const CopyIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '📋');
};

export const ThumbsUpIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '👍');
};

export const ThumbsDownIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '👎');
};

export const StarIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '⭐');
};

export const FilterIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '🔧');
};

export const MenuIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '☰');
};

export const XIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '✕');
};

export const DocumentIcon = ({ className = "" }) => {
  return React.createElement('span', { className: className }, '📄');
};

// Экспортируем все остальные как простые эмодзи для быстрого решения
export const HomeIcon = ({ className = "" }) => React.createElement('span', { className }, '🏠');
export const BarChartIcon = ({ className = "" }) => React.createElement('span', { className }, '📊');
export const PaletteIcon = ({ className = "" }) => React.createElement('span', { className }, '🎨');
export const TrendingUpIcon = ({ className = "" }) => React.createElement('span', { className }, '📈');
export const TerminalIcon = ({ className = "" }) => React.createElement('span', { className }, '💻');
export const BellIcon = ({ className = "" }) => React.createElement('span', { className }, '🔔');
export const LogOutIcon = ({ className = "" }) => React.createElement('span', { className }, '🚪');
export const ActivityIcon = ({ className = "" }) => React.createElement('span', { className }, '⚡');
export const ServerIcon = ({ className = "" }) => React.createElement('span', { className }, '🖥️');
export const NetworkIcon = ({ className = "" }) => React.createElement('span', { className }, '🌐');
export const CpuIcon = ({ className = "" }) => React.createElement('span', { className }, '🖥️');
export const CloudIcon = ({ className = "" }) => React.createElement('span', { className }, '☁️');
export const MonitorIcon = ({ className = "" }) => React.createElement('span', { className }, '🖥️');

export const DatabaseIcon = ({ className = "" }) => {
  return React.createElement('svg', {
    className: className,
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none"
  },
    React.createElement('ellipse', {
      cx: "12",
      cy: "5",
      rx: "9",
      ry: "3",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M3 5v14a9 3 0 0 0 18 0V5",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }),
    React.createElement('path', {
      d: "M3 12a9 3 0 0 0 18 0",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  );
};

// Дополнительные простые иконки, используемые в компонентах
export const MailIcon = ({ className = "" }) => React.createElement('span', { className }, '✉️');
export const BuildingIcon = ({ className = "" }) => React.createElement('span', { className }, '🏢');
export const SaveIcon = ({ className = "" }) => React.createElement('span', { className }, '💾');
export const KeyIcon = ({ className = "" }) => React.createElement('span', { className }, '🔑');
export const CheckCircleIcon = ({ className = "" }) => React.createElement('span', { className }, '✅');
export const XCircleIcon = ({ className = "" }) => React.createElement('span', { className }, '❌');
export const CrownIcon = ({ className = "" }) => React.createElement('span', { className }, '👑');
export const EditIcon = ({ className = "" }) => React.createElement('span', { className }, '✏️');
export const VerifiedIcon = ({ className = "" }) => React.createElement('span', { className }, '✔️');
export const UploadIcon = ({ className = "" }) => React.createElement('span', { className }, '⬆️');

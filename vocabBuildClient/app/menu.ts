import { Menu } from 'electron';
import { platform } from 'os';

const isMac = process.platform === 'darwin';

const template = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'close' },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [isMac ? { role: 'close' } : { role: 'quit' }],
  },

  {
    label: 'View',
    submenu: [
      { role: 'resetZoom' },
      { role: 'zoomIn', accelerator: null },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [{ role: 'minimize' }],
  },
  {
    label: 'About',
    submenu: [
      {
        role: 'help',
        label: 'Check Me Out!',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal(
            'https://github.com/anomaly-fr/Vocabulary-Build'
          );
        },
      },
    ],
  },
  // {
  //   role: 'About',
  //   submenu: [

  //     {
  //       role: 'Check me out',
  //       click: async () => {
  //         const { shell } = require('electron');
  //         await shell.openExternal('https://github.com/anomaly-fr/Vocabulary-Build');
  //       },
  //     },
  //   ],
  // },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

export default {
  global: {
    tabSetEnableTabStrip: false,
  },
  borders: [
  ],
  layout: {
    type: 'row',
    id: 'root',
    children: [
      {
        type: 'tabset',
        weight: 100,
        id: 'centralPanel',
        children: [
          {
            type: 'tab',
            name: 'emptyCanvas',
            config: {
              id: 'empty',
              component: 'emptyCanvas',
            },
          },
        ],
        active: true,
      },
    ],
  },
};

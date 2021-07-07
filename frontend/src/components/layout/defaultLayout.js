export default {
  global: {
    tabSetEnableTabStrip: false,
  },
  borders: [
  ],
  layout: {
    type: 'row',
    children: [
      {
        type: 'tabset',
        weight: 100,
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

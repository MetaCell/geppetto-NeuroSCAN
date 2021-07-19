export const VIEWS = {
  promoterDB: { title: 'Promoter DB', linkTo: 'NeuroSCAN', linkToRoute: '/' },
  neuroScan: { title: 'NeuroSCAN', linkTo: 'Promoter DB', linkToRoute: '/promoter' },
};

export const VIEWERS = Object.freeze({
  MorphologyViewer: 'MorphologyViewer',
  CphateViewer: 'CphateViewer',
});

// todo: replace this with environment variable? also change on apiClient
export const backendURL = 'http://localhost:1337';

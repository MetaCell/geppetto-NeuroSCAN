export const VIEWS = {
  promoterDB: { title: 'Promoter DB', linkTo: 'NeuroSCAN', linkToRoute: '/' },
  neuroScan: { title: 'NeuroSCAN', linkTo: 'Promoter DB', linkToRoute: '/promoter' },
};

export const VIEWERS = Object.freeze({
  InstanceViewer: 'InstanceViewer',
});

export const backendURL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:1337';

export const ABOUT_CONTENT = `is an initiative from the Yale University for Neurosciences, in partnership
with MetaCell.`;

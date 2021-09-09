export const VIEWS = {
  promoterDB: { title: 'Promoter DB', linkTo: 'NeuroSCAN', linkToRoute: '/' },
  neuroScan: { title: 'NeuroSCAN', linkTo: 'Promoter DB', linkToRoute: '/promoter' },
};

export const VIEWERS = Object.freeze({
  InstanceViewer: 'InstanceViewer',
});

export const backendURL = process.env.REACT_APP_BACKEND_URL || '';
console.log(`backend url: ${backendURL}`);

export const ABOUT_CONTENT = `is an initiative from the Yale University for Neurosciences, in partnership
with MetaCell.`;

export const maxRecordsPerFetch = 30;

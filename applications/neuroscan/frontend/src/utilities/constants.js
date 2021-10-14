import axios from 'axios';

export const VIEWS = {
  promoterDB: { title: 'Promoter DB', linkTo: 'NeuroSCAN', linkToRoute: '/' },
  neuroScan: { title: 'NeuroSCAN', linkTo: 'Promoter DB', linkToRoute: '/promoter' },
};

export const VIEWERS = Object.freeze({
  InstanceViewer: 'InstanceViewer',
});

export const ABOUT_CONTENT = `is an initiative from the Yale University for Neurosciences, in partnership
with MetaCell.`;

export const maxRecordsPerFetch = 30;

export const backendURL = process.env.REACT_APP_BACKEND_URL || '';
export const backendClient = axios.create({
  baseURL: backendURL,
});

export const VIEWER_MENU = {
  devStage: 'devStages',
  layers: 'layers',
  download: 'download',
  colorPicker: 'colorPicker',
};

export const filesURL = `${backendURL}/files`;

export const NEURON_TYPE = 'neuron';
export const CONTACT_TYPE = 'contact';
export const SYNAPSE_TYPE = 'synapse';
export const CPHATE_TYPE = 'cphate';

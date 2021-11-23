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

export const CANVAS_BACKGROUND_COLOR_LIGHT = 0xFFFFFF;
export const CANVAS_BACKGROUND_COLOR_DARK = 0x2C2C2C;

export const DOWNLOAD_SCREENSHOT = 'screenshot';
export const DOWNLOAD_OBJS = 'objects';

export const PROMOTER_MEDIA_TYPES = {
  video: 'video',
};

export const MAIL_SUGGEST_PROMOTER_TO = 'noelle.koonce@yale.edu';
export const MAIL_SUGGEST_PROMOTER_SUBJECT = 'New promoter';
export const MAIL_SUGGEST_PROMOTER_BODY = 'Suggest Promoter Mail Body';

export const MAIL_CONTACT_TO = 'noelle.koonce@yale.edu';
export const MAIL_CONTACT_SUBJECT = 'Contact';
export const MAIL_CONTACT_BODY = 'Contact Mail Body';

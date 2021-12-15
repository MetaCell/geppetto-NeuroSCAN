import axios from 'axios';

export const VIEWS = {
  promoterDB: { title: 'Promoter DB', linkTo: 'NeuroSCAN', linkToRoute: '/' },
  neuroScan: { title: 'NeuroSCAN', linkTo: 'Promoter DB', linkToRoute: '/promoter' },
};

export const VIEWERS = Object.freeze({
  InstanceViewer: 'Viewer',
  CphateViewer: 'Cphate',
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
export const CPHATE_TYPE = 'cluster';

export const CANVAS_BACKGROUND_COLOR_LIGHT = 0xFFFFFF;
export const CANVAS_BACKGROUND_COLOR_DARK = 0x2C2C2C;

export const DOWNLOAD_SCREENSHOT = 'screenshot';
export const DOWNLOAD_OBJS = 'objects';

export const PROMOTER_MEDIA_TYPES = {
  video: 'video',
};

export const MAIL_SUGGEST_PROMOTER_TO = 'postmaster@wormguides.org';
export const MAIL_SUGGEST_PROMOTER_SUBJECT = 'Suggest a promoter';
export const MAIL_SUGGEST_PROMOTER_BODY = 'Hi WormGUIDES team,\nOur group has found this promoter useful in our studies. We call the promoter (promoter name) and the strain name and/or primers for the promoter are as follows: The promoter has expression from (starting timepoint) to (ending timepoint). We see expression in these cells: \n We\'ve attached an image of the promoter. \n\nThank you';

export const MAIL_CONTACT_TO = 'support@wormguides.org';
export const MAIL_CONTACT_SUBJECT = '';
export const MAIL_CONTACT_BODY = '';

export const CANVAS_STARTED = 'STARTED';
export const CANVAS_FINISHED = 'FINISHED';

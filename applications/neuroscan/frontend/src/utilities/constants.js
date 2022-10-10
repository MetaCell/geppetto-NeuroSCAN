import axios from 'axios';

export const VIEWS = {
  promoterDB: { title: 'Promoter DB', linkTo: 'NeuroSCAN', linkToRoute: 'https://neuroscan.net' },
  neuroScan: { title: 'NeuroSCAN', linkTo: 'Promoter DB', linkToRoute: 'https://promoters.wormguides.org/' },
};

export const VIEWERS = Object.freeze({
  InstanceViewer: 'Viewer',
  CphateViewer: 'Cphate',
});

export const ABOUT_CONTENT = `is an initiative from the Yale University for Neurosciences, in partnership
with MetaCell.`;

export const NEUROSCAN_ABOUT = [`NeuroSCAN is a resource for exploring the structure of the C. elegans nerve ring. We
have compiled segmented electron microscopy datasets to enable exploration through
3D renderings. We developed these tools to look at neuron morphologies, neuron-
neuron contact sites, synaptic sites and CPHATE contact profile visualizations.
Learn more about how we developed the neuron-neuron contacts and a more in depth
tutorial of the website at:`,
'Koonce et al, 2021',

'Also see these papers that discuss CPHATE:',

`Moyle MW, Barnes KM, Kuchroo M, Gonopolskiy A, Duncan LH, Sengupta T, Shao L,
Guo M, Santella A, Christensen R, Kumar A, Wu Y, Moon KR, Wolf G, Krishnaswamy
S, Bao Z, Shroff H, Mohler WA, Colón-Ramos DA. Structural and developmental
principles of neuropil assembly in C. elegans. Nature. 2021 Mar;591(7848):99-104. doi:
10.1038/s41586-020-03169-5. Epub 2021 Feb 24. PMID: 33627875; PMCID:
PMC8385650.`,

`Brugnone N, Gonopolskiy A, Moyle MW, et al. Coarse Graining of Data via
Inhomogeneous Diffusion Condensation. Proc IEEE Int Conf Big Data. 2019;2019:2624-
2633. doi:10.1109/BigData47090.2019.9006013`,

`Find more information about the EM preparation and segmentation of L1, L2, L3, and
adult (45) datasets at:`,

`Witvliet D, Mulcahy B, Mitchell JK, Meirovitch Y, Berger DR, Wu Y, Liu Y, Koh WX,
Parvathala R, Holmyard D, Schalek RL, Shavit N, Chisholm AD, Lichtman JW, Samuel
ADT, Zhen M. Connectomes across development reveal principles of brain maturation.
Nature. 2021 Aug;596(7871):257-261. doi: 10.1038/s41586-021-03778-8. Epub 2021
Aug 4. PMID: 34349261.`,

'Find more information about the L4 and adult (48) preparation and segmentation at:',

`White John Graham , Southgate Eileen , Thomson J. N. and Brenner Sydney 1986The
structure of the nervous system of the nematode Caenorhabditis elegansPhil. Trans. R.
Soc. Lond. B3141–340. http://doi.org/10.1098/rstb.1986.0056
Cook SJ, Jarrell TA, Brittin CA, Wang Y, Bloniarz AE, Yakovlev MA, Nguyen KCQ, Tang
LT, Bayer EA, Duerr JS, Bülow HE, Hobert O, Hall DH, Emmons SW. Whole-animal
connectomes of both Caenorhabditis elegans sexes. Nature. 2019 Jul;571(7763):63-71.
doi: 10.1038/s41586-019-1352-7. Epub 2019 Jul 3. PMID: 31270481; PMCID:
PMC6889226.`];

export const PROMOTERDB_ABOUT = [`The promoter database aims to share promoter expression data to visualize all C.
elegans neurons as they develop in the embryo. We use fluorescent membrane labels
driven by sparsely expressed promoters to see details of neural development, usually at
subcellular resolution. After imaging expression details on the diSPIM, we characterize
the expression with cell lineaging to identify cells that are labeled.`,
`We invite the community to submit promoters for characterization using the “Suggest a
promoter” button in the top right. Promoters submitted to the WormGUIDES consortium
will be imaged using diSPIM, lineaged and the expression identity will be shared with
the community via our promoter database.`,
'See resources about the data acquisition at:',
`Duncan, L. H., Moyle, M. W., Shao, L., Sengupta, T., Ikegami, R., Kumar, A., Guo, M.,
Christensen, R., Santella, A., Bao, Z., Shroff, H., Mohler, W., Colón-Ramos, D. A.
Isotropic Light-Sheet Microscopy and Automated Cell Lineage Analyses to Catalogue
Caenorhabditis elegans Embryogenesis with Subcellular Resolution. &lt;em&gt;J. Vis.
Exp.&lt;/em&gt; (148), e59533, doi:10.3791/59533 (2019).`,
`Kumar A, Wu Y, Christensen R, et al. Dual-view plane illumination microscopy for rapid
and spatially isotropic imaging. Nat Protoc. 2014;9(11):2555-2573.
doi:10.1038/nprot.2014.172`,
`Also see our neurodevelopmental atlas for exploration of segmented neurons at:
wormguides.org`];

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

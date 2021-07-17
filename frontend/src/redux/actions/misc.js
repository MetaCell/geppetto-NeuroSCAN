export const WAIT_DATA = 'WAIT_DATA';
export const RAISE_ERROR = 'RAISE_ERROR';
export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';

export const waitData = (message, offAction) => ({ type: WAIT_DATA, data: { message, offAction } });

export const raiseError = (error) => ({
  error,
  type: RAISE_ERROR,
});

export const downloadFile = ((data) => ({
  type: DOWNLOAD_FILE,
  data,
}));

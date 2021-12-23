export const LOADING = 'LOADING';
export const RAISE_ERROR = 'RAISE_ERROR';
export const LOADING_SUCCESS = 'LOADING_SUCCESS';
export const DOWNLOAD_FILE = 'DOWNLOAD_FILE';
export const CANVAS_UPDATE_STARTED = 'CANVAS_UPDATE_STARTED';
export const CANVAS_UPDATE_ENDED = 'CANVAS_UPDATE_ENDED';

export const loading = (message, offAction) => ({
  type: LOADING,
  data: {
    message,
    offAction,
  },
});

export const loadingSuccess = (message, offAction) => ({
  type: LOADING_SUCCESS,
  data: {
    message,
    offAction,
  },
});

export const raiseError = (error) => ({
  error,
  type: RAISE_ERROR,
});

export const downloadFile = ((data) => ({
  type: DOWNLOAD_FILE,
  data,
}));

export const canvasUpdateStarted = () => ({
  type: CANVAS_UPDATE_STARTED,
  data: {},
});

export const canvasUpdateEnded = () => ({
  type: CANVAS_UPDATE_ENDED,
  data: {},
});

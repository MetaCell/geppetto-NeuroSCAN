// import * as search from './actions/search';

const searchMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    default:
      next(action);
  }
};

export default searchMiddleware;

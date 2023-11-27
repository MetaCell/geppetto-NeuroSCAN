import neuronService from './NeuronService';
import contactService from './ContactService';
import synapseService from './SynapseService';
import * as search from '../redux/actions/search';
import { loading, loadingSuccess } from '../redux/actions/misc';
import { SET_ALL } from '../redux/actions/search';

const checkSearchState = (searchState) => {
  const { filters } = searchState;
  if (filters.searchTerms.length > 0) {
    return true;
  }
  if (filters.synapsesFilter.chemical !== false
    || filters.synapsesFilter.electrical !== false
    || filters.synapsesFilter.preNeuron !== null
    || filters.synapsesFilter.postNeuron !== null) {
    return true;
  }
  return false;
};

const doGetAllNeurons = async (dispatch, searchState) => {
  dispatch(loading('Adding all instances', SET_ALL));
  const items = [];
  const counter = await neuronService.totalCount(searchState);
  const maxLimit = checkSearchState(searchState) ? 100 : 500;
  let start = 0;
  let end = counter < maxLimit ? counter : maxLimit;

  while (end <= counter) {
    // eslint-disable-next-line no-await-in-loop
    const neurons = await neuronService.getAll({ ...searchState, start, limit: maxLimit });
    items.push(...neurons);
    start = end;
    if (start < counter && start + maxLimit > counter) {
      end = counter;
    } else {
      end += maxLimit;
    }
  }
  dispatch(
    search.updateCounters({
      neurons: counter,
    }),
  );
  dispatch(
    search.setAll({
      neurons: {
        items,
      },
    }),
  );
  dispatch(loadingSuccess('Adding all instances', SET_ALL));
};

const doGetAllSynapses = async (dispatch, searchState) => {
  dispatch(loading('Adding all instances', SET_ALL));
  const items = [];
  const counter = await synapseService.totalCount(searchState);
  const maxLimit = checkSearchState(searchState) ? 100 : 500;
  let start = 0;
  let end = counter < maxLimit ? counter : maxLimit;

  while (end <= counter) {
    // eslint-disable-next-line no-await-in-loop
    const synapses = await synapseService.getAll({ ...searchState, start, limit: maxLimit });
    items.push(...synapses);
    start = end;
    if (start < counter && start + maxLimit > counter) {
      end = counter;
    } else {
      end += maxLimit;
    }
  }
  dispatch(
    search.updateCounters({
      synapses: counter,
    }),
  );
  dispatch(
    search.setAll({
      synapses: {
        items,
      },
    }),
  );
  dispatch(loadingSuccess('Adding all instances', SET_ALL));
};

const doGetAllContacts = async (dispatch, searchState) => {
  dispatch(loading('Adding all instances', SET_ALL));
  const items = [];
  const counter = await contactService.totalCount(searchState);
  const maxLimit = checkSearchState(searchState) ? 100 : 500;
  let start = 0;
  let end = counter < maxLimit ? counter : maxLimit;

  while (end <= counter) {
    // eslint-disable-next-line no-await-in-loop
    const contacts = await contactService.getAll({ ...searchState, start, limit: maxLimit });
    items.push(...contacts);
    start = end;
    if (start < counter && start + maxLimit > counter) {
      end = counter;
    } else {
      end += maxLimit;
    }
  }
  dispatch(
    search.updateCounters({
      contacts: counter,
    }),
  );
  dispatch(
    search.setAll({
      contacts: {
        items,
      },
    }),
  );
  dispatch(loadingSuccess('Adding all instances', SET_ALL));
};

export default async (dispatch, searchState, entities = ['neurons', 'contacts', 'synapses']) => {
  entities.forEach((entity) => {
    switch (entity) {
      case 'neurons': {
        doGetAllNeurons(dispatch, searchState);
        break;
      }
      case 'contacts': {
        doGetAllContacts(dispatch, searchState);
        break;
      }
      case 'synapses': {
        doGetAllSynapses(dispatch, searchState);
        break;
      }

      default:
        break;
    }
  });
};

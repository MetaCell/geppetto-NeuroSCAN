import neuronService from './NeuronService';
import contactService from './ContactService';
import synapseService from './SynapseService';
import * as search from '../redux/actions/search';
//

const doGetAllNeurons = async (dispatch, searchState) => {
  neuronService.totalCount(searchState).then((count) => {
    dispatch(
      search.updateCounters({
        neurons: count,
      }),
    );
  });
  neuronService.getAll(searchState).then((data) => {
    dispatch(
      search.setAll({
        neurons: {
          ...searchState.allItems.neurons.items,
          items: data,
        },
      }),
    );
  });
};

const doGetAllSynapses = async (dispatch, searchState) => {
  synapseService.totalCount(searchState).then((count) => {
    dispatch(
      search.updateCounters({
        synapses: count,
      }),
    );
  });
  synapseService.getAll(searchState).then((data) => {
    dispatch(
      search.setAll({
        synapses: {
          ...searchState.results.synapses.items,
          items: data,
        },
      }),
    );
  });
};

const doGetAllContacts = async (dispatch, searchState) => {
  contactService.totalCount(searchState).then((count) => {
    dispatch(
      search.updateCounters({
        contacts: count,
      }),
    );
  });
  contactService.getAll(searchState).then((data) => {
    dispatch(
      search.setAll({
        contacts: {
          ...searchState.results.contacts.items,
          items: data,
        },
      }),
    );
  });
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

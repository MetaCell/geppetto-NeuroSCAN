import { UPDATE_FILTERS, UPDATE_RESULTS, UPDATE_TOTALS } from '../actions/search';
// eslint-disable-next-line import/no-cycle
import { doSearch } from '../../services/helpers';

export const SEARCH_DEFAULT_STATUS = {
  search: {
    filters: {
      searchTerms: [],
      developmentalStage: 0,
      synapses: {
        chemical: false,
        electrical: false,
      },
    },
    counters: {
      neurons: 0,
      contacts: 0,
      synapses: 0,
    },
    searchesCount: 0,
    results: {
      neurons: {
        items: [],
      },
      contacts: {
        items: [],
      },
      synapses: {
        items: [],
      },
    },
  },
};

export default (state = SEARCH_DEFAULT_STATUS, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
    {
      const newState = {
        ...state,
        filters: {
          ...state.filters,
          searchTerms: action.searchTerms,
          ddevelopmentalStage: action.developmentalStage,
        },
        searchesCount: state.searchesCount + 3, // neurons, contacts, synapses
        results: {
          neurons: {
            items: [],
          },
          contacts: {
            items: [],
          },
          synapses: {
            items: [],
          },
        },
      };
      doSearch(newState.filters);
      return newState;
    }

    case UPDATE_RESULTS:
    {
      return {
        ...state,
        searchesCount: state.searchesCount - 1,
        results: {
          ...state.results,
          ...action.data,
        },
      };
    }

    case UPDATE_TOTALS:
    {
      return {
        ...state,
        counters: {
          neurons: 123,
          contacts: 120.450,
          synapses: 2.201,
        },
      };
    }

    default:
      return state;
  }
};

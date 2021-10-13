import * as search from '../actions/search';

export const SEARCH_DEFAULT_STATUS = {
  search: {
    filters: {
      searchTerms: [],
      developmentalStage: 0,
      timePoint: 0,
      synapsesFilter: {
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
    case search.UPDATE_FILTERS:
    {
      return {
        ...state,
        filters: {
          ...state.filters,
          searchTerms: action.searchTerms || state.filters.searchTerms,
          timePoint: action.timePoint,
          ...action.synapsesFilter,
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
    }

    case search.UPDATE_RESULTS:
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

    case search.LOAD_MORE:
    {
      return {
        ...state,
        searchesCount: state.searchesCount + 1,
      };
    }

    case search.UPDATE_COUNTERS: {
      return {
        ...state,
        counters: {
          ...state.counters,
          ...action.counters,
        },
      };
    }

    default:
      return state;
  }
};

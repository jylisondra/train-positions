import { HANDLE_SEARCH, CLEAR_FILTER } from './actions';

import { initialState } from './AppContext';

const reducer = (state, action) => {
  switch (action.type) {
    case HANDLE_SEARCH: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case CLEAR_FILTER: {
      return {
        direction: '',
        lineColor: '',
        serviceType: '',
      };
    }

    default:
      return state;
  }
};

export default reducer;

import { createContext, useContext, useReducer } from 'react';
import reducer from './reducers';
import { HANDLE_SEARCH, CLEAR_FILTER } from './actions';

const initialState = {
  isLoading: false,
  destination: 'B11',
  direction: '',
  lineColor: '',
  serviceType: '',
  carCount: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = ({ name, value }) => {
    dispatch({ type: HANDLE_SEARCH, payload: { name, value } });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <AppContext.Provider value={{ ...state, handleSearch, clearFilter }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

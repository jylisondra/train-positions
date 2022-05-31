import './App.css';
import { SearchContainer } from './components/searchContainer/SearchContainer';
import { TrainsContainer } from './components/trainsContainer/TrainsContainer';

function App() {
  return (
    <div className="App">
      <SearchContainer />
      <TrainsContainer />
    </div>
  );
}

export default App;

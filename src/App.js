import './App.css';

import UseAxios from './hooks/useAxios';
import Header from './components/Header';
import Graph from './components/Graph';

function App() {
  const {data, isLoading, error} = UseAxios("https://api.punkapi.com/v2/beers?per_page=80")
   
  return (
    <div className="container">
      <Header />
      <Graph data={data} />
    </div>
  )
}

export default App;

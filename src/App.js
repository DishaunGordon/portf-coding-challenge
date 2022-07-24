import './App.css';
import UseAxios from './hooks/useAxios';

function App() {
  const {data, isLoading, error} = UseAxios("https://api.punkapi.com/v2/beers?per_page=80")
   
  return (
    <>
      <h1>test</h1>
      <ul>
      {data.map(beer => {
        return (
          <li key={beer.id}>{beer.id}</li>
        )
      })}
      </ul>
    </>
  );
}

export default App;

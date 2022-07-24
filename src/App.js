import React, { useState } from 'react';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import UseAxios from './hooks/useAxios';
import Header from './components/Header';
import Graph from './components/Graph';

function App() {
  const {data, isLoading, error} = UseAxios("https://api.punkapi.com/v2/beers?per_page=80");
  const {startDate, setStartDate} = useState(new Date("April, 2007"));
  const {endDate, setEndDate} = useState(new Date());
  const {abvFilter, setAbvFilter} = useState(10);

  const handleSetStartDate = (newStartDate) => {
    setStartDate(newStartDate);
  }
  const handleSetEndDate = (newEndDate) => {
    setEndDate(newEndDate);
  }
  const handleSetAbvFilter = (newAbvFilter) => {
    setAbvFilter(newAbvFilter);
  }
   
  return (
    <div className="container">
      <Header 
        StartDate={startDate} handleSetStartDate={handleSetStartDate}
        EndDate={endDate} handleSetEndDate={handleSetEndDate}
        AbvFilter={abvFilter} handleSetAbvFilter={handleSetAbvFilter}
      />
      <Graph data={data} />
    </div>
  )
}

export default App;

//TODO -- Fix - Says setStartDate isn't a function when datepicker in <Header /> tries to update it 
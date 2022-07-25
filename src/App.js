import React, { useState } from 'react';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import UseAxios from './hooks/useAxios';
import Header from './components/Header';
import Graph from './components/Graph';

function App() {
  // States
  const {data, isLoading, error} = UseAxios("https://api.punkapi.com/v2/beers?per_page=80");
  const [startDate, setStartDate] = useState(new Date("April, 2007"));
  const [endDate, setEndDate] = useState(new Date());
  const [abvFilter, setAbvFilter] = useState(10);

  // Handles logic that changes state
  const handleSetStartDate = (newStartDate) => {
    setStartDate(newStartDate);
  }
  const handleSetEndDate = (newEndDate) => {
    setEndDate(newEndDate);
  }
  const handleSetAbvFilter = (newAbvFilter) => {
    setAbvFilter(newAbvFilter);
  }
  
  // JSX
  return (
    <div className="container">
      <Header 
        startDate={startDate} handleSetStartDate={handleSetStartDate}
        endDate={endDate} handleSetEndDate={handleSetEndDate}
        abvFilter={abvFilter} handleSetAbvFilter={handleSetAbvFilter}
      />
      <Graph data={data} />
    </div>
  )
}

export default App;

//TODO -- Fix - Says setStartDate isn't a function when datepicker in <Header /> tries to update it 
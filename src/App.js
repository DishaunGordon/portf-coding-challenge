import React, { useState } from 'react';

import './App.css';
import "react-datepicker/dist/react-datepicker.css";

import { formatGraphData } from './util/formatGraphData';

import UseAxios from './hooks/useAxios';
import Header from './components/Header';
import MainBody from './components/MainBody';

function App() {
  // States
  const {data, isLoading, error} = UseAxios("https://api.punkapi.com/v2/beers?per_page=80");
  const [startDate, setStartDate] = useState(new Date("April, 2007"));
  const [endDate, setEndDate] = useState(new Date("April, 2008"));
  const [abvFilter, setAbvFilter] = useState("");

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
    <div className="app-container">
      <Header 
        startDate={startDate} handleSetStartDate={handleSetStartDate}
        endDate={endDate} handleSetEndDate={handleSetEndDate}
        abvFilter={abvFilter} handleSetAbvFilter={handleSetAbvFilter}
      />
      <MainBody
        data={formatGraphData(startDate, endDate, abvFilter, data)}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}

export default App;

//TODO -- Include logic for abv filter
//TODO -- Make it look good
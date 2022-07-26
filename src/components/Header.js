import React from 'react';

import DatePicker from 'react-datepicker';

function Header({ startDate, handleSetStartDate, endDate, handleSetEndDate, abvFilter, handleSetAbvFilter }) {

    // Handles logic that changes state in <App />
    const onStartDateChange = (newDate) => {
        handleSetStartDate(newDate);
    };
    const onEndDateChange = (newDate) => {
        handleSetEndDate(newDate);
    };
    const onAbvFilterChange = (e) => {
        handleSetAbvFilter(e.target.value);
    };

    // JSX
    return ( 
        <div className="header">
            <div className="header__date">
                <div className="header__date--title">Date</div>
                <div className="header__date--inputContainer">
                <DatePicker className="header__date--picker header__date--pickerStart"
                    selected={startDate}
                    onChange={onStartDateChange}
                    dateFormat="MM/yyyy"
                    minDate={new Date("April, 2007")}
                    maxDate={endDate}
                    showMonthYearPicker
                    showFullMonthYearPicker
                />
                <DatePicker className="header__date--picker header__date--pickerEnd"
                    selected={endDate}
                    onChange={onEndDateChange}
                    dateFormat="MM/yyyy"
                    minDate={startDate}
                    maxDate={new Date()}
                    showMonthYearPicker
                    showFullMonthYearPicker
                />
                </div>
            </div>
            <div className="header__abv">
                <div className="header__abv--title">abv</div>
                <div className="header__abv--inputContainer">
                    <input 
                        type="number"
                        className="header__abv--input"
                        value={abvFilter}
                        onChange={onAbvFilterChange}
                        step="0.1"
                        min="0"
                        max="100"
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;

//TODO Make it so there are always at least 6 months
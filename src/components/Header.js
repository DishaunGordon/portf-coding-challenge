import React from 'react';
function Header() {
    return ( 
        <div className="header">
            <div className="header__date">
                <div className="header__date--title"></div>
                <div className="header__date--input"></div>
            </div>
            <div className="header__abv">
                <div className="header__abv--title"></div>
                <div className="header__abv--input"></div>
            </div>
        </div>
    );
}

export default Header;
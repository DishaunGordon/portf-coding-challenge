import React from 'react';
function Graph({ data }) {
    return ( 
        <div>
            <ul>
                {console.log(data)}
                {data.map(beer => {
                    return(
                    <li key={beer.id}>Name is {beer.name}</li>
                    )
                })}
            </ul>
        </div>
     );
}

export default Graph;
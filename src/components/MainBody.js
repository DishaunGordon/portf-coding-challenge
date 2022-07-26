import React from 'react';
import { BallTriangle } from  'react-loader-spinner'

import ErrorHandler from './ErrorHandler';
import Graph from './Graph';


function MainBody({ data, isLoading, error }) {

    const handleRender = () => {
        if (error) return <ErrorHandler error={error} />
        if (isLoading) return <BallTriangle />
        return <Graph data={data} />
    }

    return (
        <div className="main-body">
            {handleRender()}
        </div>
    )
}

export default MainBody;
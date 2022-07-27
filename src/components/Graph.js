import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

function Graph({ data }) {

    // Functions
    const formatBottomAxis = (v) => { // Decides if ticks at bottom should skip a month (Not enough space to display all months)
        const generateValuesToShow = () => {
            if (data?.length >= 50) return data?.map((v,i)=>i % 2 === 1 ? '' : v)
            return data;
        }
        const valuesToShow = generateValuesToShow()
        return valuesToShow.find(vts => vts.month === v) ? v : ""
    }
    const formatLeftAxis = (numberBrewed) => { // Removes floating point numbers from y axis
        return Math.floor(numberBrewed) === numberBrewed && numberBrewed
    }

    return ( 
        <>
            <ResponsiveBar
        data={data}
        keys={[
            'totalBrewed'
        ]}
        indexBy="month"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            format: formatBottomAxis,
            tickCount: 10,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            tickValues: 20,
            legend: 'Month',
            legendPosition: 'middle',
            legendOffset: 45
        }}
        axisLeft={{
            format: formatLeftAxis,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // tickValues: 20,
            legend: 'Total brewed at start of month',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        role="application"
        ariaLabel="Bar Chart showing number of beers brewed at the start of each month"
    />
        </>
     );
}

export default Graph;
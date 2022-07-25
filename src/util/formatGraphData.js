export const formatGraphData = (startDate, endDate, data = null) => {
    if (data == null) {return []}
    // Returns date as two variables: month and year
    const getDate = (date) => {
        const month = date.getMonth();
        const year = date.getFullYear();
        return [month, year];
    }

    // Returns an array of all the needed months to generate a bar graph
    const generateNeededMonths = (startDate, endDate) => {
        const [startMonth, startYear] = getDate(startDate)
        const [endMonth, endYear] = getDate(endDate)
        const yearDifference = endYear - startYear
        const monthDifference = endMonth - startMonth
        const totalMonthlyDifference = (12 * yearDifference) + monthDifference;
    
        const neededMonthsArray = [];
        for (let i = 0; i <= totalMonthlyDifference; i++) {
            const month = (startMonth + i) % 12; 
            const yearsToAdd = Math.floor((startMonth + i) / 12)
            neededMonthsArray.push(`${month + 1}/${startYear + yearsToAdd}`);
        }
        return neededMonthsArray;
    }

    // Returns the data only containing: id, abv and first_brewed date
    const extractNeededData = (data) => {
        const neededData = data.map(brewed => {
            const beer = {
                id: brewed?.id,
                abv: brewed?.abv,
                first_brewed: brewed?.first_brewed
            }
            return beer;
        })
        return neededData;
    }

    // Returns data which all have the same month format with no leading '0's
    const formatMonths = (neededData) => {
        const monthFormattedData = neededData.map((beer) => {
            let firstBrewed = beer?.first_brewed;
            if (/^\d\d\d\d$/.test(firstBrewed)) { // Using regex to check if format just displays a year
                firstBrewed = `01/${firstBrewed}`
            }
            firstBrewed.replace(/^0/, "");
            beer.first_brewed = firstBrewed;
            return beer;
        })
        return monthFormattedData;
    }

    // Returns data that will be given to generate a bar graph
    const generateGraphData = (data) => {
        const graphData = [];
        const formattedObject = {};
        neededMonthsArr.forEach(month => {
            formattedObject.month = month;
            formattedObject.totalBrewed = 0;
            
            data.forEach(beer => {
                if (beer.first_brewed === month) {
                    formattedObject.totalBrewed++;
                }
            })
            graphData.push({...formattedObject});
        })

        return graphData;
    }

    const neededMonthsArr = generateNeededMonths(startDate, endDate);
    const neededData = extractNeededData(data);
    const monthFormattedData = formatMonths(neededData);
    return generateGraphData(monthFormattedData)
}
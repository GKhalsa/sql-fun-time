const checkThatAllValuesExist = (obj1, obj2) => {
    return Object.keys(obj1).every(key => {
        return obj1[key] === obj2[key]
    })
}

const areObjectsEqual = (obj1, obj2) => {

    const a = checkThatAllValuesExist(obj1, obj2);
    const b = checkThatAllValuesExist(obj2, obj1);

    return a && b;
}

const checkThatEveryColumnExists = (trialColumns, matchColumns) => {
    return trialColumns.every((trialColumn) => {
        return matchColumns.some((matchColumn) => {
            return trialColumn.accessor === matchColumn.accessor;
        })
    });
}

const checkThatEveryRowExists = (trialRows, matchRows) => {
    return trialRows.every((trialRow) => {
        return matchRows.some((matchRow) => {
            return areObjectsEqual(trialRow, matchRow)
        })
    });
}


export const checkForMatch = (queryColumns, queryValues, expectedColumns, expectedValues) => {


    const a = checkThatEveryColumnExists(expectedColumns, queryColumns);
    const b = checkThatEveryColumnExists(queryColumns, expectedColumns);
    const c = checkThatEveryRowExists(expectedValues, queryValues)
    const d = checkThatEveryRowExists(queryValues, expectedValues)

    return a && b && c && d;

};

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const determineGlow = (isMatch, currentGlow) => {
    if (!isMatch) {
        return currentGlow === "incorrect1" ? "incorrect2" : "incorrect1"
    }
    return currentGlow === "correct1"? "correct2" : "correct1";
};

export const formatColumns = (columns) => {
    let formattedColumns = [];

    columns.forEach((column) => {
        const duplication = formattedColumns.some(formattedColumn => {
            return Object.values(formattedColumn).includes(column)
        });

        if (duplication) {
            formattedColumns.push({Header: capitalize(column), accessor: column + 1});
        } else {
            formattedColumns.push({Header: capitalize(column), accessor: column});
        }
    });

    return formattedColumns;
}

export const formatValues = (columns, values) => {
    return values.map((valueSet) => {
        return valueSet.reduce((acc, value, index) => {
            if (acc.hasOwnProperty(columns[index])) {
                acc[columns[index] + 1] = value;
            } else {
                acc[columns[index]] = value;
            }
            return acc;
        }, {})
    });
}

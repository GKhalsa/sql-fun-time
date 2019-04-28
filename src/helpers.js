const checkThatAllValuesExist = (obj1, obj2) => {
    return Object.keys(obj1).every(keyCheck => {
        for (let key in obj1) {
            let temp;
            if (obj1.hasOwnProperty(key)) {
                temp = obj1[key];
                delete obj1[key];
                let lowerCaseKey = key.toLowerCase();
                obj1[lowerCaseKey] = temp;
                // obj1[key.charAt(0).toUpperCase() + key.substring(1)] = temp;
            }
        }

        for (let key in obj2) {
            let temp;
            if (obj2.hasOwnProperty(key)) {
                temp = obj2[key];
                delete obj2[key];
                let lowerCaseKey = key.toLowerCase();
                obj2[lowerCaseKey] = temp;
                // obj2[key.charAt(0).toUpperCase() + key.substring(1)] = temp;
            }
        }
        return obj1[keyCheck.toLowerCase()] === obj2[keyCheck.toLowerCase()]
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
            return trialColumn.accessor.toLowerCase() === matchColumn.accessor.toLowerCase();
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

export const levels = {
    1: "SELECT pt.1",
    2: "SELECT pt.2",
    3: "SELECT pt.3",
    4: "WHERE pt.1",
    5: "WHERE pt.2",
    6: "WHERE pt.3",
    7: "LIKE",
    8: "AGGREGATE pt.1",
    9: "AGGREGATE pt.2",
    10: "AGGREGATE pt.3",
    11: "ORDER BY",
    12: "GROUP BY pt.1",
    13: "GROUP BY pt.2",
    14: "GROUP BY pt.3",
    15: "INNER JOIN pt.1",
    16: "INNER JOIN pt.2",
    17: "INNER JOIN pt.3",
    18: "MULTIPLE TABLES",
    19: "LEFT JOIN",
    20: "CHALLENGE LEVEL 1",
    21: "CHALLENGE LEVEL 2"
};

export const sortedLevels = (levels) => {
    const midPoint = Math.ceil(Object.keys(levels).length / 2);
    let sorted = [];
    for(let i = 0; i < midPoint; i++) {
        if ((i + 1) !== midPoint) {
            sorted.push((i + 1));
        }
        sorted.push((i + midPoint));
    }
    return sorted;
};

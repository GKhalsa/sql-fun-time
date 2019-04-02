const areObjectsEqual = (obj1, obj2) => {

    const a = checkThatAllValuesExist(obj1, obj2);
    const b = checkThatAllValuesExist(obj2, obj1);

    return a && b;
}

const checkThatAllValuesExist = (obj1, obj2) => {
    return Object.keys(obj1).every(key => {
        return obj1[key] === obj2[key]
    })
}


export const checkForMatch = (queryColumns, queryValues, expectedColumns , expectedValues) => {

    const a = expectedColumns.every((expectedColumn) => {
        return queryColumns.some((queryColumn) => {
            return expectedColumn.accessor === queryColumn.accessor;
        })
    });

    const b = queryColumns.every((queryColumn) => {
        return expectedColumns.some((expectedColumn) => {
            return expectedColumn.accessor === queryColumn.accessor;
        })
    });

    const c = expectedValues.every((expectedValue) => {
        return queryValues.some((queryValue) => {
            return areObjectsEqual(expectedValue, queryValue)
        })
    });

    const d = queryValues.every((queryValue) => {
        return expectedValues.some((expectedValue) => {
            return areObjectsEqual(expectedValue, queryValue)
        })
    });

    return a && b && c && d;

};

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
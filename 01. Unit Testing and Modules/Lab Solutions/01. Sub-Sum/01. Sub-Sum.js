  
function solution(array, startIndex, endIndex) {
    if (!Array.isArray(array)) {
        return NaN;
    }

    if (array.length === 0) {
        return 0;
    }

    if (startIndex < 0) {
        startIndex = 0;
    }

    if (endIndex >= array.length) {
        endIndex = array.length - 1;
    }

    if (!array.every(Number)) {
        return NaN;
    }

    return array
        .slice(startIndex, endIndex + 1)
        .map(Number)
        .reduce((a, b) => a + b);
}

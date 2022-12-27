const database =
    [
        {name: "John", country: "Israel", age: 19, isMarried: true},
        {name: "Hanna", country: "France", age: 9, isMarried: false},
        {name: "Mary", country: "Israel", age: 29, isMarried: false},
        {name: "George", country: "Israel", age: 80, isMarried: true},
        {name: "Bill", country: "Belgium", age: 10, isMarried: false},
        {name: "Jane", country: "France", age: 30, isMarried: true}
    ];

// Display entries
const dataOutput = document.getElementById('database')

function displayArrayEntries(arr) {
    return arr.map(function (value) {
        return JSON.stringify(value) + '<br>';
    });
}

dataOutput.innerHTML = displayArrayEntries(database);

// Define output fields
const queryOutput = document.getElementById('query');
const resOutput = document.getElementById('result');

// Task 1
function filterMarried(arr, status) {
    return arr.filter(function (value) {
        if (status === 'true')
            return value['isMarried'];
        if (status === 'false')
            return !value['isMarried']
    })
}

function task1() {
    queryOutput.textContent = 'Select and print all married person. (filter)';
    resOutput.innerHTML = displayArrayEntries(filterMarried(database, 'false'));
}

// Task 2
function sortByProperty(arr, prop, direction) {
    return arr.sort(function (a, b) {
        if (direction === 'ascending')
            return (b[prop] < a[prop]) - (a[prop] < b[prop]);
        if (direction === 'descending')
            return (a[prop] < b[prop]) - (b[prop] < a[prop]);
    })
}

function task2() {
    queryOutput.textContent = 'Print database sorted by age ASC. (min->max) (sort)';
    resOutput.innerHTML = displayArrayEntries(sortByProperty(database, 'age', 'ascending'));
}

// Task 3
function calcAvgProperty(array, prop) {
    return array.reduce(function (acc, value, index, arr) {
        acc += value[prop]
        if (index === arr.length - 1) {  // usage of index and array
            return acc / arr.length;
        }
        return acc;
    }, 0)
}

function task3() {
    queryOutput.textContent = 'Calculate average age. (reduce)';
    resOutput.innerHTML = 'Average age is: ' + calcAvgProperty(database, 'age');
}

// Task 4
function statisticsByProperty(array, prop) {
    return array.reduce(function (acc, value) {
        // option 1
        if (acc[value[prop]])
            acc[value[prop]]++;

        else
            acc[value[prop]] = 1;
        return acc;
        // option 2
        // acc[value[prop] = (acc[value[prop] || 0) + 1;
        // return acc;
    }, {})
}

function task4() {
    queryOutput.textContent = 'Print statistic by country. {\'Israel\':3, ...}';
    resOutput.innerHTML = JSON.stringify(statisticsByProperty(database, 'country'));
}

// Task 5
const mapped = database.map(function (value, index, array) {
    return value
})
const marriedSorted = sortByProperty(filterMarried(mapped, 'true'), 'name', 'ascending');
const notMarriedSorted = sortByProperty(filterMarried(mapped, 'false'), 'age', 'descending');
const avdAgeOfMarried = calcAvgProperty(marriedSorted, 'age');

function task5() {
    queryOutput.textContent =
        'Print married person sorted ASC by name,' +
        ' not married DESC by age and average age of married person.';

    resOutput.innerHTML =
        `<h5> Married sorted by name </h5><p>${displayArrayEntries(marriedSorted)}</p>` +
        `<h5> Not married sorted by age </h5><p>${displayArrayEntries(notMarriedSorted)}</p>` +
        `<h5> Average age of married </h5><p>${avdAgeOfMarried}</p>`;
}


// Task 6
const inputPosition = document.getElementById('positionInput');

function removeUser(array, position) {
    array.splice(position, 1);
    return array;
}

function task6() {
    queryOutput.textContent = 'Remove user by position.';
    if ((inputPosition.value === '') || isNaN(+inputPosition.value))
        return resOutput.innerHTML = 'Enter a number';
    else if (database.length === 0)
        return resOutput.innerHTML = 'You deleted all entries';
    else if (inputPosition.value > (database.length - 1))
        return resOutput.innerHTML =
            'Maximum position is from 0 to ' + `${database.length - 1}` + '. Try another number';
    else
        console.log(database)
    return resOutput.innerHTML = displayArrayEntries(removeUser(database, inputPosition.value));
}



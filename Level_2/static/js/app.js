// from data.js
var tableData = data;

// get table references with d3.select()
var tbody = d3.select("tbody");

// define a function called buildTable that takes an argument called data
// the job of this function is to parse out the data and create an html table
function buildTable(data) {
  // clear out any existing data in tbody by setting the .html() to an empty string
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // .append() a table row “tr” to the tbody
    var row = tbody.append("tr");

    // Loop through forEach val in the Object.values(dataRow)
    Object.values(dataRow).forEach((val) => {
      var cell = row.append("td");
      // set the .text of cell to the val
      cell.text(val);
    });
  });
}

// Keep Track of all filters
var filterData = {};

function updateFilters() {

  // Save the changes in element, value, and id of the filter
  var modifiedElement = d3.select(this).select("input");
  var changedValue = modifiedElement.property("value");
  var filteredId = modifiedElement.attr("id");

  // If the value of an item in updateFilters is entered append the filteredId and value
  // Else, delete that filter from the updatefilters
  if (changedValue) {
    filterData[filteredId] = changedValue;
  }
  else {
    delete filterData[filteredId];
  }

  filteredTable();

}

function filteredTable() {

  // Equate the filteredData to the tableData
  let filteredData = tableData;

  // iterate through filters and keep any data that correspond to filtered values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value);
  });

  // Make a new table with the filtered Data
  buildTable(filteredData);
}

// Set up an event listener
d3.selectAll(".filter").on("change", updateFilters);

// Build the table when the page loads
buildTable(tableData);

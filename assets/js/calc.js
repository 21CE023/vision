document
  .getElementById("calculate-blocks")
  .addEventListener("click", function () {
    var plotLength = parseInt(document.getElementById("plot-length").value);
    var plotWidth = parseInt(document.getElementById("plot-width").value);
    var wallHeight = parseInt(document.getElementById("wall-height").value);
    var totalBlocks = 0;

    // Calculate blocks for outer walls (4 walls)
    var plotPerimeter = (plotLength + plotWidth) * 2; // Perimeter in feet
    totalBlocks += calculateBlocks(plotPerimeter, wallHeight);

    // Calculate blocks for inner walls
    var wallCount = parseInt(document.getElementById("wall-count").value);
    for (var i = 1; i <= wallCount; i++) {
      var wallLength = parseInt(
        document.getElementById("wall-length-" + i).value
      );
      totalBlocks += calculateBlocks(wallLength , wallHeight); // Assume all walls have same height
    }

    // Display the result
    var resultElement = document.getElementById("result");
    resultElement.innerHTML = ""; // Clear previous result

    // Create the table structure
    var tableHTML = "<h2>Total number of blocks required</h2>";
    tableHTML += "<table>";
    tableHTML +=
      "<thead><tr><th>Wall</th><th>Blocks Required</th></tr></thead><tbody>";

    // Add rows for outer walls and inner walls
    tableHTML +=
      "<tr><td>Outer walls (4 walls)</td><td>" +
      calculateBlocks(plotPerimeter, wallHeight) +
      "</td></tr>";
    for (var i = 1; i <= wallCount; i++) {
      var wallLength = parseInt(
        document.getElementById("wall-length-" + i).value
      );
      tableHTML +=
        "<tr><td>Inner Wall " +
        i +
        " (" +
        wallLength +
        " feet)</td><td>" +
        calculateBlocks(wallLength , wallHeight) +
        "</td></tr>";
    }

    // Add total blocks row
    tableHTML +=
      "<tr><td><strong>Total Blocks</strong></td><td><strong>" +
      totalBlocks +
      "</strong></td></tr>";

    // Close the table structure
    tableHTML += "</tbody></table>";

    // Set the table HTML to the result element
    resultElement.innerHTML = tableHTML;
  });

// Function to calculate blocks for a single wall
function calculateBlocks(wallPerimeter, wallHeight) {
  var wallArea = wallPerimeter * wallHeight; // Area of each wall in square feet

  // Number of blocks required for a single wall
  var blockArea = (24 / 12) * (8 / 12); // Area of each block in square feet
  var blocksForSingleWall = Math.ceil(wallArea / blockArea);

  return blocksForSingleWall;
}

// Add input fields for inner walls dynamically
document.getElementById("wall-count").addEventListener("change", function () {
  var wallCount = parseInt(document.getElementById("wall-count").value);
  var innerWallDetails = document.querySelector("#inner-wall-details tbody");
  innerWallDetails.innerHTML = ""; // Clear previous input fields

  for (var i = 1; i <= wallCount; i++) {
    var row = document.createElement("tr");
    row.innerHTML = `
            <td>Inner Wall ${i}</td>
            <td><input type="number" id="wall-length-${i}" /></td>
        `;
    innerWallDetails.appendChild(row);
  }
});

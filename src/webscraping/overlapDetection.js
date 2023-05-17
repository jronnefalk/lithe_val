const fs = require("fs");

// Read the JSON file
fs.readFile("database.json", "utf8", (err, jsonData) => {
  if (err) {
    console.error("An error occurred while reading the file:", err);
    return;
  }

  let data;
  try {
    data = JSON.parse(jsonData);
  } catch (parseError) {
    console.error("An error occurred while parsing the JSON:", parseError);
    return;
  }

  // Update the data
  for (let i = 0; i < data.length; i++) {
    const currentCourse = data[i];
    const currentCourseCode = currentCourse.kurskod;

    for (let j = 0; j < data.length; j++) {
      if (i !== j) {
        const comparedCourse = data[j];
        const comparedCourseOverlaps = comparedCourse.overlappning || [];

        if (comparedCourseOverlaps.includes(currentCourseCode)) {
          if (!currentCourse.overlappning) {
            currentCourse.overlappning = [];
          }

          if (!currentCourse.overlappning.includes(comparedCourse.kurskod)) {
            currentCourse.overlappning.push(comparedCourse.kurskod);
          }
        }
      }
    }
  }

  // Write the updated data back to the file
  const updatedData = JSON.stringify(data, null, 2);

  fs.writeFile("database.json", updatedData, "utf8", (writeErr) => {
    if (writeErr) {
      console.error("An error occurred while writing the file:", writeErr);
    } else {
      console.log("The file has been successfully updated.");
    }
  });
});

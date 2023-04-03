import kurser from "../webscraping/database.json";

export default function getData(key) {
  const results = [];

  for (let i = 0; i < kurser.length; i++) {
    if (kurser[i].kurskod === key) {
      results.push(kurser[i]);

      // create elements to display the course info
      const courseTitle = document.createElement("h2");
      courseTitle.textContent = kurser[i].kursnamn;
      document.body.appendChild(courseTitle);

      const courseCode = document.createElement("p");
      courseCode.textContent = `Kurskod: ${kurser[i].kurskod}`;
      document.body.appendChild(courseCode);

      const courseCredits = document.createElement("p");
      courseCredits.textContent = `HP: ${kurser[i].hp}`;
      document.body.appendChild(courseCredits);

      const courseArea = document.createElement("p");
      courseArea.textContent = `Huvudområde: ${kurser[i].huvudomrade}`;
      document.body.appendChild(courseArea);

      const courseLevel = document.createElement("p");
      courseLevel.textContent = `Utbildningsnivå: ${kurser[i].utbildningsniva}`;
      document.body.appendChild(courseLevel);

      // you can create more elements for additional course info
    }
  }

  return results;
}

import kurser from "../webscraping/database.json";

function getData(key) {
  const results = [];

  for (let i = 0; i < kurser.length; i++) {
    if (kurser[i].kurskod === key) {
      results.push(kurser[i]);
      console.log(results);
    }
  }
  return results;
}

export default getData;

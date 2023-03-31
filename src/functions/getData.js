import kurser from "../webscraping/database.json";

export default function getData(key) {
  const results = [];

  for (let i = 0; i < kurser.length; i++) {
    if (kurser[i].kurskod === key) {
      results.push(kurser[i]);
    }
  }
  return results;
}

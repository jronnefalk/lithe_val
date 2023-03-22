//import Filters from "./Filters";

function filterKurser(kurser, query) {
  return kurser
    .sort(function (a, b) {
      if (a.kursnamn.toLowerCase() < b.kursnamn.toLowerCase()) return -1;
      if (a.kursnamn.toLowerCase() > b.kursnamn.toLowerCase()) return 1;
      return 0;
    })
    .filter((kurs) => {
      if (query === "") {
        return kurs;
      } else if (kurs.kursnamn.toLowerCase().includes(query.toLowerCase())) {
        return kurs;
      } else if (kurs.kurskod.toLowerCase().includes(query.toLowerCase())) {
        return kurs;
      } else {
        return null;
      }
    });
}

export default filterKurser;

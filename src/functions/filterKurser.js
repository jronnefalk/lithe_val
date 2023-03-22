//import Filters from "./Filters";

function filterKurser(kurser, query, activeFilters) {
  return kurser
    .sort(function (a, b) {
      // Sortera kurserna efter kursnamn (A-Ö)
      if (a.kursnamn.toLowerCase() < b.kursnamn.toLowerCase()) return -1;
      if (a.kursnamn.toLowerCase() > b.kursnamn.toLowerCase()) return 1;
      return 0;
    })
    .filter((kurs) => {
      if (query === "") {
        // Om sökfältet är tomt, visa alla kurser
        return true;
      } else if (
        kurs.kursnamn.toLowerCase().includes(query.toLowerCase()) ||
        kurs.kurskod.toLowerCase().includes(query.toLowerCase())
      ) {
        // Om sökfältet innehåller något, visa kurser som matchar sökningen
        return true;
      } else {
        // Sökningen matchar inte någon kurs
        return false;
      }
    })
    .filter((kurs) => {
      if (activeFilters.length === 0) {
        // Om inga filter är aktiva, visa alla kurser
        return true;
      } else {
        // Om filter är aktiva, visa kurser som matchar filter
        for (const filter of activeFilters) {
          if (kurs[filter.key].includes(filter.value)) {
            return true;
          }
        }
        // Om ingen kurs matchar filter, visa inte kursen
        return false;
      }
    });
}

export default filterKurser;

function filterKurser(kurser, query, activeFilters) {
  return kurser
    .sort(function (a, b) {
      // Sortera kurserna efter kursnamn (A-Ö)
      if (a.kursnamn.toLowerCase() < b.kursnamn.toLowerCase()) return -1;
      if (a.kursnamn.toLowerCase() > b.kursnamn.toLowerCase()) return 1;
      return 0;
    })
    .filter((kurs) => {
      // Filtrera bort kurser som inte matchar sökfrasen
      if (
        query &&
        !kurs.kursnamn.toLowerCase().includes(query.toLowerCase()) &&
        !kurs.kurskod.toLowerCase().includes(query.toLowerCase())
      ) {
        return false;
      }

      // Filtrera kurser som inte matchar aktiva filter
      return activeFilters.every(
        (filter) => kurs[filter.key].toString() === filter.value
      );
    });
}

export default filterKurser;

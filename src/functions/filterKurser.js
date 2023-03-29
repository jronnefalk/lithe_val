function filterKurser(kurser, query, activeFilters) {
  return kurser
    .sort(function (a, b) {
      // Sortera kurserna efter kursnamn (A-Ö)
      if (a.kursnamn.toLowerCase() < b.kursnamn.toLowerCase()) return -1;
      if (a.kursnamn.toLowerCase() > b.kursnamn.toLowerCase()) return 1;
      return 0;
    })
    .filter((kurs) => {
      // Om sökfältet är tomt eller om sökfältet innehåller något som matchar kursen
      const matchQuery =
        query === "" ||
        kurs.kursnamn.toLowerCase().includes(query.toLowerCase()) ||
        kurs.kurskod.toLowerCase().includes(query.toLowerCase());

      // Om inga filter är aktiva eller om något filter är aktivt matchar kursen
      const matchFilters =
        activeFilters.length === 0 ||
        activeFilters.every((filter) =>
          kurs[filter.key].includes(filter.value)
        );

      // Visa kursen om den matchar med både sökning och filtren
      return matchQuery && matchFilters;
    });
}

export default filterKurser;

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
      // kolla filter för examination
      const matchexamination =
        !activeFilters.some((filter) => filter.key === "examination") ||
        kurs.examination.some((f) =>
          f.benamning.toLowerCase().includes("tentamen")
        );
      console.log(matchexamination);

      // Check if the kurs matches any of the helfart or halvfart filters or both
      const matchHalvHelFart =
        ((!activeFilters.some((filter) => filter.key === "helfart") ||
          (kurs.period.includes("1") && !kurs.period.includes("2")) ||
          (!kurs.period.includes("1") && kurs.period.includes("2"))) &&
          (!activeFilters.some((filter) => filter.key === "halvfart") ||
            (kurs.period.includes("1") && kurs.period.includes("2")))) ||
        (activeFilters.some((filter) => filter.key === "halvfart") &&
          activeFilters.some((filter) => filter.key === "helfart") &&
          (kurs.period.includes("1") || kurs.period.includes("2")));

      // lägger alla filter med samma key i en group-array
      const filtersByKeys = activeFilters.reduce((groups, filter) => {
        if (!groups[filter.key]) {
          groups[filter.key] = [];
        }
        groups[filter.key].push(filter);
        return groups;
      }, {});

      // Check if the kurs matches any of the other filters
      const matchFilters =
        activeFilters.length === 0 ||
        Object.entries(filtersByKeys).every(([key, filters]) => {
          if (
            key === "helfart" ||
            key === "halvfart" ||
            key === "examination"
          ) {
            // Skip helfart and halvfart filters as they have already been checked
            return true;
          }
          if (kurs.hasOwnProperty(key)) {
            const values = kurs[key];
            if (Array.isArray(values)) {
              // Combine filters within a group with "or" operator
              return filters.some((filter) =>
                values.some((value) => value.includes(filter.value))
              );
            } else {
              // Combine filters within a group with "and" operator
              return filters.every((filter) => values.includes(filter.value));
            }
          }
          return false;
        });
      // Visa kursen om den matchar med både sökning, filtren, och halv-/helfart
      return matchQuery && matchHalvHelFart && matchFilters && matchexamination;
    });
}

export default filterKurser;

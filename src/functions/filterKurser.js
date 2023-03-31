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
      const matchQuery =
        query === "" ||
        kurs.kursnamn.toLowerCase().includes(query.toLowerCase()) ||
        kurs.kurskod.toLowerCase().includes(query.toLowerCase());

      // Group the filters by key
      const filtersByKeys = activeFilters.reduce((groups, filter) => {
        if (!groups[filter.key]) {
          groups[filter.key] = [];
        }
        groups[filter.key].push(filter);
        return groups;
      }, {});

      // Check if the kurs matches any of the filter groups
      const matchFilters =
        activeFilters.length === 0 ||
        Object.entries(filtersByKeys).every(([key, filters]) => {
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

      // Visa kursen om den matchar med både sökning och filtren
      return matchQuery && matchFilters;
    });
}

export default filterKurser;

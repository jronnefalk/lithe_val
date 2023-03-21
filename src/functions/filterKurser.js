export default function filterKurser(kurser, query, filters) {
  return kurser.filter((el) => {
    // Sökning
    if (
      el.kursnamn.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      el.kurskod.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      el.huvudomrade[0].toLowerCase().indexOf(query.toLowerCase()) !== -1
    ) {
      // Filter

      for (let i = 0; i < filters.length; i++) {
        const filter = filters[i];
        if (
          filter.name === "period" &&
          el.period.indexOf(filter.value) === -1
        ) {
          return false;
        }
      }
      return true;
    }
    return false;
  });
}

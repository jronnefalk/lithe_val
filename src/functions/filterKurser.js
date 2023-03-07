function filterKurser(kurser, query) {
  return kurser.filter((kurs) => {
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

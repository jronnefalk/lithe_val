//import Filters from "./Filters";

function filterKurser(kurser, query) {
  return kurser.filter((kur) => {
    if (query === "") {
      return kur;
    } else if (kur.kursnamn.toLowerCase().includes(query.toLowerCase())) {
      return kur;
    } else if (kur.kurskod.toLowerCase().includes(query.toLowerCase())) {
      return kur;
    } else {
      return null;
    }
  });
}

export default filterKurser;

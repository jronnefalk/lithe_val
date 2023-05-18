import kurser from "../webscraping/database.json";

export default function getData(key) {
  const result = kurser.find((kurs) => kurs.kurskod === key);

  if (!result) {
    console.error(`Course ${key} not found`);
    return null;
  }

  return {
    kursnamn: result.kursnamn,
    kurskod: result.kurskod,
    block: result.block,
    utbildningsniva: result.utbildningsniva,
    hp: result.hp,
    huvudomrade: result.huvudomrade,
    termin: result.termin,
    period: result.period,
    overlappning: result.overlappning,
    ort: result.ort,
    url: result.url,
    examination: result.examination,
    studietakt: result.studietakt,
  };
}

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
  };
}

const puppeteer = require("puppeteer");
const fs = require("fs");

// Ett kursobjekt som innehåller all information om varje kurs
class Kurs {
  constructor(
    kursnamn,
    hp,
    kurskod,
    huvudomrade,
    utbildningsniva,
    termin,
    period,
    block,
    ort,
    url,
    forkunskaper,
    overlappning,
    studietakt,
    examination
  ) {
    this.kursnamn = kursnamn;
    this.hp = hp;
    this.kurskod = kurskod;
    this.huvudomrade = huvudomrade;
    this.utbildningsniva = utbildningsniva;
    this.termin = termin;
    this.period = period;
    this.block = block;
    this.ort = ort;
    this.url = url;
    this.forkunskaper = forkunskaper;
    this.overlappning = overlappning;
    this.studietakt = studietakt;
    this.examination = examination;
  }
}

/*
  README
  1. Kör scrapeCourses.js för att skapa en fil med alla kurser
  2. Kör scrapeCourseInformation.js för att skrapa information om kurserna
  
  Notera att skriptet skrapar 99% rätt. Vissa kurser kan bli "null".
  Kontrollera detta i databasfilen. Just nu är kurser som har värden "null" borttagna
  från databasen. Detta kan ändras i framtiden.
*/

// Läser filen kurser.txt och påbörjar "scraping". OBS! justera för datateknik (kurserData) eller medieteknik (kurserMedia)
fs.readFile("kurser.txt", "utf8", (err, data) => {
  if (err) throw err;
  const lines = data.split("\n");
  const addresses = lines.map((line) => line.replace("\r", ""));
  scrape(addresses);
});

// Scrape-funktion
async function scrape(addresses) {
  let kurser = [];

  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  // går igenom alla addresser i kurser.txt
  for (let i = 0; i < addresses.length; i++) {
    // Kopplar upp sig

    await page.goto(addresses[i]);

    // hämtar kursnamn och hp
    let [kursnamn, hp] = await page.evaluate(() => {
      const kursnamnOchHp = document.querySelector("h1").textContent;
      const lastCommaIndex = kursnamnOchHp.lastIndexOf(",");
      const kursnamn = kursnamnOchHp.substring(0, lastCommaIndex);
      const hp = kursnamnOchHp.substring(
        lastCommaIndex + 2,
        kursnamnOchHp.length - 3
      );
      return [kursnamn, hp];
    });

    // hämtar kurskod
    const kurskod = await page.evaluate(() => {
      const subtitles = document.querySelectorAll("p.subtitle");
      return subtitles[subtitles.length - 1].textContent;
    });

    // hämtar huvudområde
    const huvudomrade = await page.evaluate(() => {
      const h2 = Array.from(document.querySelectorAll(".overview-label")).find(
        (el) => el.textContent.includes("Huvudområde")
      );

      let str = h2.nextSibling.textContent.trim();

      if (str === "Inget huvudområde") {
        return [];
      }

      // delar upp strängen i med avseende på stor bokstav
      const result = str.split(/(?=[A-Z])/);

      // tar bort mellanslag
      for (let i = 0; i < result.length; i++) {
        result[i] = result[i].trim();
      }

      return result;
    });

    // hämtar utbildningsnivå
    const utbildningsniva = await page.evaluate(() => {
      const h2 = Array.from(document.querySelectorAll(".overview-label")).find(
        (el) => el.textContent.includes("Utbildningsnivå")
      );
      return h2.nextSibling.textContent.trim();
    });

    // hämtar termin, period, block och ort
    const [termin, period, block, ort] = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tr");

      // letar igenom tabell i botten av hemsidan. OBS! 6CMEN är för medieteknik och 6CDDD är för datateknik
      for (const row of rows) {
        const program = row.querySelector("td:first-child");
        const programCode = program && program.textContent.trim();

        if (
          programCode &&
          (programCode === "6CDDD" || programCode === "6CMEN")
        ) {
          const termin = row.querySelector("td:nth-child(3)");
          const period = row.querySelector("td:nth-child(4)");
          const block = row.querySelector("td:nth-child(5)");
          const ort = row.querySelector("td:nth-child(7)");

          let terminer = [];

          // om terminen är 7 eller 9 läggs motsatt termin till
          if (termin.textContent.charAt(0) === "7") {
            terminer.push("7");
            terminer.push("9");
          } else if (termin.textContent.charAt(0) === "8") {
            terminer.push("8");
          } else {
            terminer.push("7");
            terminer.push("9");
          }

          return [
            terminer,
            period.textContent.split(", "),
            block.textContent.split(", "),
            ort.textContent.trim(),
          ];
        }
      }

      // om kursen inte finns i tabellen
      return [null, null, null, null];
    });

    // Bestämmer studietakt utifrån antal perioder
    let studietakt = "null";

    try {
      if (period.length === 2) {
        studietakt = "Halvfart";
      } else {
        studietakt = "Helfart";
      }
    } catch (error) {}

    // hämtar alla examinationer
    const table = await page.$("table.table-striped.examinations-codes-table");
    const examination = await table.$$eval("tr:not(:first-child)", (rows) => {
      return rows.map((row) => {
        const cells = row.querySelectorAll("td");
        return {
          kod: cells[0].textContent,
          benamning: cells[1].textContent,
          omfattning: cells[2].querySelector("span").textContent.trim(),
          betygsskala: cells[3].textContent,
        };
      });
    });

    // hämtar förkunskaper om det finns några
    const forkunskaperElement = await page.evaluateHandle(() => {
      // Letar efter rubriken "Rekommenderade förkunskaper"
      const h2 = Array.from(document.querySelectorAll("h2")).find(
        (el) => el.textContent === "Rekommenderade förkunskaper"
      );

      let forkunskaper = "Inga rekommenderade förkunskaper";

      // Om det finns förkunskaper
      if (h2) {
        let el = h2.nextSibling;

        // letar efter nästa element som är en <p>
        while (el.nodeType !== 1) {
          el = el.nextSibling;
        }

        // Om nästa element är "Lärandemål" så backa ett steg
        if (el.textContent.trim() === "Lärandemål") {
          el = el.previousSibling;
        }
        forkunskaper = el.textContent.trim();
      }

      return forkunskaper;
    });
    const forkunskaperText = await forkunskaperElement.jsonValue();

    // hämtar overlappningkurser om det finns några
    const overlappning = await page.evaluate(() => {
      // letar efter texten "Kursen får ej ingå i examen tillsammans med"
      const p = Array.from(document.querySelectorAll("p")).find((el) =>
        el.textContent
          .toLowerCase()
          .includes("får ej ingå i examen tillsammans med")
      );

      if (p) {
        const text = p.textContent;
        // returnerar all text efter "med" och tar bort punkt
        return text
          .slice(text.indexOf("med") + 4)
          .trim()
          .replace(/\.$/, "");
      } else {
        return "Ingen överlappning";
      }
    });

    // lägg till all information i en kurs
    let tempKurs = new Kurs(
      kursnamn,
      hp,
      kurskod,
      huvudomrade,
      utbildningsniva,
      termin,
      period,
      block,
      ort,
      addresses[i],
      forkunskaperText,
      overlappning,
      studietakt,
      examination
    );

    // lägg till kursen i arrayen med alla kurser
    kurser.push(tempKurs);

    // skriv ut kursens som skrapats i terminalen
    try {
      console.log(
        "\x1b[1m" + tempKurs.kurskod + "\x1b[0m: " + tempKurs.overlappning
      );
    } catch (error) {}
  }
  await browser.close();

  // skriv till databas. OBS! skriv om till rätt databas
  fs.writeFile("database.json", JSON.stringify(kurser, null, 2), (err) => {
    if (err) throw err;
    console.log("Kurser är skrivna till database.json\n");
  });

  console.log("\nAntal kurser samlade: " + kurser.length + "\n");
}

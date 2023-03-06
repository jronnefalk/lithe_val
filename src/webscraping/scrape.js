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
    url
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
  }
}

// Läser filen kurser.txt och påbörjar "scraping"
fs.readFile("kurser.txt", "utf8", (err, data) => {
  if (err) throw err;
  const lines = data.split("\n");
  const addresses = lines.map((line) => line.replace("\r", ""));
  scrape(addresses);
});

// Scrape-funktion
async function scrape(addresses) {
  // Array där alla kurser läggs till
  let kurser = [];

  // Går igenom alla addresser i kurser.txt
  for (let i = 0; i < addresses.length; i++) {
    // Kopplar upp sig
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(addresses[i]);

    let [kursnamn, hp] = await page.evaluate(() => {
      const kursnamnOchHp = document.querySelector("h1").textContent;
      return kursnamnOchHp.split(", ");
    });
    hp = hp.charAt(0); // tar bort texten hp

    const kurskod = await page.evaluate(() => {
      const subtitles = document.querySelectorAll("p.subtitle");
      return subtitles[subtitles.length - 1].textContent;
    });

    const huvudomrade = await page.evaluate(() => {
      const h2 = Array.from(document.querySelectorAll(".overview-label")).find(
        (el) => el.textContent.includes("Huvudområde")
      );
      return h2.nextSibling.textContent.trim().split(" ");
    });

    const utbildningsniva = await page.evaluate(() => {
      const h2 = Array.from(document.querySelectorAll(".overview-label")).find(
        (el) => el.textContent.includes("Utbildningsnivå")
      );
      return h2.nextSibling.textContent.trim();
    });

    const [termin, period, block, ort] = await page.evaluate(() => {
      const rows = document.querySelectorAll("table tr");

      // letar igenom tabell i botten av hemsidan
      for (const row of rows) {
        const program = row.querySelector("td:first-child");
        if (program && program.textContent.trim() === "6CMEN") {
          const termin = row.querySelector("td:nth-child(3)");
          const period = row.querySelector("td:nth-child(4)");
          const block = row.querySelector("td:nth-child(5)");
          const ort = row.querySelector("td:nth-child(7)");

          result = [
            termin.textContent.charAt(0),
            period.textContent.split(", "),
            block.textContent.split(", "),
            ort.textContent.trim(),
          ];
          break;
        }
      }
      return result;
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
      addresses[i]
    );
    kurser.push(tempKurs);
    console.log(tempKurs);

    await browser.close();
  }

  // Write to database.json
  fs.writeFile("database.json", JSON.stringify(kurser, null, 2), (err) => {
    if (err) throw err;
    console.log("Kurser written to database.json");
  });

  console.log("Antal kurser samlade: " + kurser.length + "\n");
}

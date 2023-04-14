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
    this.examination = examination;
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
  // array där alla kurser läggs till
  let kurser = [];

  // går igenom alla addresser i kurser.txt
  for (let i = 0; i < addresses.length; i++) {
    // Kopplar upp sig
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(addresses[i]);

    // hämtar kursnamn och hp
    let [kursnamn, hp] = await page.evaluate(() => {
      const kursnamnOchHp = document.querySelector("h1").textContent;
      return kursnamnOchHp.split(", ");
    });
    hp = hp.charAt(0); // tar bort texten hp

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
      return h2.nextSibling.textContent.trim().split(" ");
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

      // letar igenom tabell i botten av hemsidan
      for (const row of rows) {
        const program = row.querySelector("td:first-child");
        if (program && program.textContent.trim() === "6CMEN") {
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

          return (result = [
            terminer,
            period.textContent.split(", "),
            block.textContent.split(", "),
            ort.textContent.trim(),
          ]);
        }
      }
    });

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
    const forkunskaper = await page.evaluate(() => {
      // Letar efter rubriken "Rekommenderade förkunskaper"
      const h2 = Array.from(document.querySelectorAll("h2")).find(
        (el) => el.textContent === "Rekommenderade förkunskaper"
      );

      let forkunskaper = "Inga rekommenderade förkunskaper";

      // Om det finns förkunskaper
      if (h2) {
        // hämtar nästa element
        const element = h2.nextSibling;

        // Avgör typ av element
        if (element.nodeName == "#text") {
          forkunskaper = element.textContent.trim();
        }
        // Om element är en p-tagg
        else {
          while (element.nodeName !== "P") {
            element = element.nextSibling;
          }
          forkunskaper = element.textContent.trim();
        }
      }

      return forkunskaper;
    });

    // hämtar overlappningkurser om det finns några
    const overlappning = await page.evaluate(() => {
      // letar efter texten "Kursen får ej ingå i examen tillsammans med"
      const p = Array.from(document.querySelectorAll("p")).find((el) =>
        el.textContent.includes("Kursen får ej ingå i examen tillsammans med")
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
      forkunskaper,
      overlappning,
      examination
    );

    // lägg till kursen i arrayen med alla kurser
    kurser.push(tempKurs);

    console.log(tempKurs.kurskod + ": " + tempKurs.forkunskaper);

    await browser.close();
  }

  // skriv till database.json
  fs.writeFile("database.json", JSON.stringify(kurser, null, 2), (err) => {
    if (err) throw err;
    console.log("Kurser är skrivna till database.json\n");
  });

  console.log("\nAntal kurser samlade: " + kurser.length + "\n");
}

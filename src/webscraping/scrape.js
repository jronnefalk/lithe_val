const puppeteer = require("puppeteer");

async function scrape() {
  // Starta en ny webbläsarinstans
  const browser = await puppeteer.launch({ headless: "new" });

  // Öppna en ny sida
  const page = await browser.newPage();

  // Gå till den webbsida du vill skrapa
  await page.goto("https://www.example.com");

  // Hitta rubriken genom att använda en "CSS-selektor"
  const titleElement = await page.$("h1");

  // Extrahera texten från rubrik-elementet
  const title = await page.evaluate(
    (element) => element.textContent,
    titleElement
  );

  // Skriv ut rubriken
  console.log("\nRubrik:", title, "\n");

  // Stäng webbläsaren
  await browser.close();
}

// Anropa funktionen för att starta skrapningen
scrape();

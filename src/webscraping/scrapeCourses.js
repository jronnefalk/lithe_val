const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // Kopplar upp sig
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://studieinfo.liu.se/program/6CMEN/4641");

  const links = [];

  // Går igenom termin 7, 8 och 9
  for (let i = 7; i <= 9; i++) {
    // Hämtar alla länkar i varje termin
    const linkElements = await page.$x(
      `//*[@id="curriculum"]/div/section[${i}]//a`
    );

    // Går igenom alla länkar i varje termin och lägger till dom i arrayen
    for (let i = 0; i < linkElements.length; i++) {
      const link = await (
        await linkElements[i].getProperty("href")
      ).jsonValue();

      // ta bort "/ht-2023" från länken
      const cleanLink = link.replace("/ht-2023", "");
      links.push(cleanLink);
    }
  }

  const uniqueLinks = [...new Set(links)]; // skapa en ny array utan dubbletter

  console.log(uniqueLinks);

  // Skriver alla länkar till kurser.txt
  fs.writeFile("kurser.txt", uniqueLinks.join("\n"), (err) => {
    if (err) throw err;
    console.log("Länkar sparade till kurser.txt filen.\n");
  });

  console.log("\nAntal kurser samlade: " + uniqueLinks.length + "\n");

  await browser.close();
})();

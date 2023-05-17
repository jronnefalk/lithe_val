const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // Kopplar upp sig
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  // Länkar till civilingenjörsprogrammen
  const MSclinks = [
    "https://studieinfo.liu.se/program/6CMEN/4641",
    "https://studieinfo.liu.se/program/6CDDD/5440",
  ];

  const courseLinks = [];
  let uniqueCourseLinks = [];

  for (let i = 0; i < MSclinks.length; i++) {
    await page.goto(MSclinks[i]);

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
        courseLinks.push(cleanLink);
      }
    }

    uniqueCourseLinks = [...new Set(courseLinks)]; // skapa en ny array utan dubbletter
  }

  console.log(uniqueCourseLinks);

  // Skriver alla länkar till kurser.txt
  fs.writeFile("kurser.txt", uniqueCourseLinks.join("\n"), (err) => {
    if (err) throw err;
    console.log("Länkar sparade till kurser.txt filen.\n");
  });

  console.log("\nAntal kurser samlade: " + uniqueCourseLinks.length + "\n");
  await browser.close();
})();

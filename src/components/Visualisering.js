import React from "react";

//Style
import { Progressbar } from "../styles/Visualiseringar.styled";
import { RubrikProgressbar as InfoTitel } from "../styles/Text.styled";
import { Progressbarochrubrik } from "../styles/Visualiseringar.styled";
import { Cirkel } from "../styles/Visualiseringar.styled";
//import { Cirkelochrubrik } from "../styles/Visualiseringar.styled";
//import { CirkelRubrikMinakurser } from "../styles/Visualiseringar.styled";

export default function Schema(props) {
  // Count how many courses have utbildningsniva set to 'grundnivå' and 'avancerad'
  const initialCounts = {
    grundniva: 0,
    avancerad: 0,
    hp: 0,
    medieteknik: 0,
    datateknik: 0,
  };

  // Visualisering beräkning
  const counts = Object.values(props.courseData).reduce((acc, curr) => {
    acc.hp += parseInt(curr.hp);

    if (curr.utbildningsniva === "Grundnivå") {
      acc.grundniva++;
    } else if (curr.utbildningsniva === "Avancerad nivå") {
      acc.avancerad++;
    }
    const countMedieteknik =
      (curr.huvudomrade &&
        curr.huvudomrade.filter((item) => item === "Medieteknik").length) ||
      0;
    acc.medieteknik += countMedieteknik;
    const countDatateknik =
      (curr.huvudomrade &&
        curr.huvudomrade.filter((item) => item === "Datateknik").length) ||
      0;
    acc.datateknik += countDatateknik;

    return acc;
  }, initialCounts);
  //const totalStudents = counts.grundniva + counts.avancerad;
  const avanceradPercent = Math.round(counts.avancerad);
  const medieteknikPercent = Math.round(counts.medieteknik);
  const datateknikPercent = Math.round(counts.datateknik);
  const hpPercent = Math.round(counts.hp);
  return (
    <>
      <h1>Visualisering</h1>
      <Progressbarochrubrik>
        <InfoTitel>
          Poäng inom avancerade kurser: {counts.avancerad * 6} hp
        </InfoTitel>
        <Progressbar value={avanceradPercent} max="10"></Progressbar>
        <InfoTitel>
          Poäng inom medieteknik: {counts.medieteknik * 6} hp
        </InfoTitel>
        <Progressbar value={medieteknikPercent} max="6"></Progressbar>
        <InfoTitel>Poäng inom datateknik: {counts.datateknik * 6} hp</InfoTitel>
        <Progressbar value={datateknikPercent} max="6"></Progressbar>
      </Progressbarochrubrik>

      <InfoTitel>Totalt antal hp: {counts.hp}</InfoTitel>
      <Cirkel value={hpPercent} max="90"></Cirkel>
    </>
  );
}

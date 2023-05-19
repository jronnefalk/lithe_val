import React from "react";
import Circle from ".//Circle.js";

//Style
import {
  Progressbar,
  Visualiseringar,
  CirkelWrapper,
  Progressbarochrubrik,
  Bubble,
  OmsluterBubble,
  SpeechBubble,
} from "../styles/Visualiseringar.styled";
import { BubbleText, Titel, TitelSOchV } from "../styles/Text.styled";

//import { Cirkel } from "../styles/Visualiseringar.styled";
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
      curr.huvudomrade &&
      curr.utbildningsniva === "Avancerad nivå" &&
      (curr.huvudomrade.filter((item) => item === "Medieteknik").length || 0);
    acc.medieteknik += countMedieteknik;
    const countDatateknik =
      (curr.huvudomrade &&
        curr.utbildningsniva === "Avancerad nivå" &&
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
      <TitelSOchV>Min sida</TitelSOchV>
      <Visualiseringar>
        <Progressbarochrubrik>
          <Bubble>
            <Titel>
              Poäng inom avancerade kurser: {counts.avancerad * 6}/60 hp
            </Titel>
            <OmsluterBubble>
              <Progressbar value={avanceradPercent} max="12"></Progressbar>
              <SpeechBubble data-id="n1">
                <BubbleText>Minimumkrav</BubbleText>
              </SpeechBubble>
            </OmsluterBubble>

            <Titel>
              Poäng inom avancerade kurser i Medieteknik:{" "}
              {counts.medieteknik * 6}/30 hp
            </Titel>
            <OmsluterBubble>
              <Progressbar value={medieteknikPercent} max="6"></Progressbar>
              <SpeechBubble data-id="n2">
                <BubbleText>Minimumkrav</BubbleText>
              </SpeechBubble>
            </OmsluterBubble>

            <Titel>
              Poäng inom avancerade kurser i Datateknik: {counts.datateknik * 6}
              /30 hp
            </Titel>
            <OmsluterBubble>
              <Progressbar value={datateknikPercent} max="6"></Progressbar>
              <SpeechBubble data-id="n3">
                <BubbleText>Minimumkrav</BubbleText>
              </SpeechBubble>
            </OmsluterBubble>
          </Bubble>
        </Progressbarochrubrik>{" "}
        <CirkelWrapper>
          <Titel>Totalpoäng: {counts.hp}/90 hp</Titel>
          <Circle hp={hpPercent}></Circle>
        </CirkelWrapper>
      </Visualiseringar>
    </>
  );
}

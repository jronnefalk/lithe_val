import React from "react";
import getData from "../functions/getData";
//Iconer
import { BsTrash3 } from "react-icons/bs";

//Style
import {
  SchemaKursInfoCont,
  SchemaKurserCont,
  FirstInfoCont,
  SecondInfoCont,
} from "../styles/Container.styled";
import { InfoText, InfoText2, InfoTitel } from "../styles/Text.styled";
import { TaBort } from "../styles/Knappar.styled";

export default function Schema(props) {
  console.log(props.FireBaseData);

  return (
    <>
      {props.FireBaseData.length > 0 &&
        [7, 8, 9].map((termin) => (
          <div key={termin}>
            <h2 style={{ color: "blue" }}>Termin {termin}</h2>
            {[1, 2].map((period) => (
              <SchemaKurserCont key={period}>
                <InfoTitel>Period {period}</InfoTitel>
                {props.FireBaseData.filter(
                  (kurs) =>
                    props.courseData[kurs.kurskod]?.termin === String(termin) &&
                    (String(props.courseData[kurs.kurskod]?.period[0]) ===
                      String(period) ||
                      String(props.courseData[kurs.kurskod]?.period[1]) ===
                        String(period))
                ).map((kurs) => (
                  <SchemaKursInfoCont>
                    <InfoTitel>
                      {props.courseData[kurs.kurskod]?.kursnamn}
                    </InfoTitel>
                    <FirstInfoCont key={kurs.kurskod}>
                      <InfoText> |{kurs.kurskod}</InfoText>
                      <InfoText>
                        {" "}
                        | Block: {props.courseData[kurs.kurskod]?.block}
                      </InfoText>
                      <InfoText>|</InfoText>
                    </FirstInfoCont>
                    <SecondInfoCont>
                      <InfoText2>
                        {" "}
                        {props.courseData[kurs.kurskod]?.utbildningsniva}
                      </InfoText2>
                      {props.courseData[kurs.kurskod]?.huvudomrade.map(
                        (prop) => {
                          return <InfoText2> {prop}</InfoText2>;
                        }
                      )}

                      <TaBort // delete knapp
                        onClick={() => props.handleDelete(kurs)}
                      >
                        {" "}
                        <BsTrash3 size={20} />
                        <InfoText>Ta bort kurs</InfoText>
                      </TaBort>
                      {termin !== 8 && (
                        <button // om terminen inte är 8 visas flytta-knappen
                          onClick={() => props.handleMove(kurs)}
                        >
                          Flytta kurs från termin{" "}
                          {props.courseData[kurs.kurskod]?.termin} till termin
                          {Object.values(getData(kurs.kurskod).termin)
                            .filter(
                              (term) =>
                                term !== props.courseData[kurs.kurskod]?.termin
                            )
                            .map((term) => (
                              <span key={term}>{term} </span>
                            ))}
                        </button>
                      )}
                    </SecondInfoCont>
                  </SchemaKursInfoCont>
                ))}
              </SchemaKurserCont>
            ))}
          </div>
        ))}
    </>
  );
}

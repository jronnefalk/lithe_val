import getData from "../functions/getData";
import { v4 as uuidv4 } from "uuid";
import React, { useState, useEffect } from "react";

//Iconer
import { BsTrash3Fill } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";

//Style
import {
  FirstInfoCont,
  SecondInfoCont,
  TitelKnappCont,
  SchemaMerInfo,
} from "../styles/Container.styled";
import {
  FlyttaSchemaText,
  SchemaTextUtbildningsnivå,
  SchemaLäsMerText,
  SchemaTextInfo,
  SchemaTitelKurs,
} from "../styles/Text.styled";
import { FlyttaKnappSchema, TaBortSchema } from "../styles/Knappar.styled";

export default function KursSchema(props) {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  // Avgör om en överlappningskurs ska skrivas ut eller inte i kurs-komponent
  const [hasOverlappning, setHasOverlappning] = useState(false);
  useEffect(() => {
    if (props.courseData.overlappning.length !== 0) {
      setHasOverlappning(true);
    }
  }, [props.courseData.overlappning]);

  return (
    <>
      <TitelKnappCont>
        <SchemaTitelKurs>
          {props.courseData.kursnamn}{" "}
          {hasOverlappning && (
            <span
              style={{
                color: "rgb(255, 92, 100)",
                paddingLeft: "15px",
                fontSize: "22px",
              }}
            >
              !
            </span>
          )}
        </SchemaTitelKurs>

        <TaBortSchema // delete knapp
          onClick={() => props.handleDelete(props.kurs)}
        >
          {" "}
          <BsTrash3Fill size={13} />
        </TaBortSchema>
      </TitelKnappCont>
      <FirstInfoCont key={props.courseData.kurskod}>
        <SchemaTextInfo> |{props.courseData.kurskod}</SchemaTextInfo>
        {props.courseData.block.length > 1 && props.period === 2 ? (
          <SchemaTextInfo> | Block: {props.courseData.block[1]}</SchemaTextInfo>
        ) : (
          <SchemaTextInfo> | Block: {props.courseData.block[0]}</SchemaTextInfo>
        )}
        <SchemaTextInfo>|</SchemaTextInfo>
      </FirstInfoCont>
      <SecondInfoCont>
        <SchemaTextUtbildningsnivå>
          {" "}
          {props.courseData.utbildningsniva}
        </SchemaTextUtbildningsnivå>
      </SecondInfoCont>
      <SchemaMerInfo>
        <span onClick={toggleReadMore}>
          {isReadMore ? (
            <SchemaLäsMerText>
              Läs mindre <AiOutlineUp />{" "}
            </SchemaLäsMerText>
          ) : (
            <SchemaLäsMerText>
              Läs mer <AiOutlineDown />{" "}
            </SchemaLäsMerText>
          )}
        </span>

        {isReadMore && (
          <SchemaTextInfo>
            <span style={{ fontWeight: "bold" }}>Huvudområde:</span>{" "}
            {props.courseData.huvudomrade.join(", ")}
          </SchemaTextInfo>
        )}

        {isReadMore && (
          <SchemaTextInfo>
            <span style={{ fontWeight: "bold" }}>Studietakt:</span>{" "}
            {props.courseData.studietakt}
          </SchemaTextInfo>
        )}

        {isReadMore && (
          <SchemaTextInfo>
            {" "}
            <span style={{ fontWeight: "bold" }}>Antal hp:</span>{" "}
            {props.courseData.hp}
          </SchemaTextInfo>
        )}
        {isReadMore && hasOverlappning && (
          <SchemaTextInfo>
            <span style={{ fontWeight: "bold", color: "rgb(255, 92, 100)" }}>
              Kursen får ej ingå i examen med:
            </span>{" "}
            <span style={{ color: "rgb(255, 92, 100)" }}>
              {" "}
              {props.courseData.overlappning.join(", ")}{" "}
            </span>
          </SchemaTextInfo>
        )}

        {isReadMore && (
          <SchemaTextInfo>
            {" "}
            <span style={{ fontWeight: "bold" }}>Plats:</span>{" "}
            {props.courseData.ort}
          </SchemaTextInfo>
        )}
        {isReadMore && (
          <SchemaTextInfo>
            <span style={{ fontWeight: "bold" }}> Examination: </span>
            {props.courseData.examination.map((prop) => {
              return <span key={uuidv4()}>{prop.benamning}, </span>;
            })}
          </SchemaTextInfo>
        )}
        {isReadMore && (
          <a href={props.courseData.url}>
            {" "}
            <SchemaTextInfo>
              Linköpings univeristet- Läs mer om kurser <BsBoxArrowUpRight />
            </SchemaTextInfo>
          </a>
        )}

        {props.courseData.termin != 8 && isReadMore && (
          <FlyttaKnappSchema // om terminen inte är 8 visas flytta-knappen
            onClick={() => props.handleMove(props.kurs)}
          >
            <FlyttaSchemaText>
              Flytta kurs från Termin {props.courseData.termin} till Termin{" "}
              {Object.values(getData(props.courseData.kurskod).termin)
                .filter((term) => term !== props.courseData.termin)
                .map((term) => (
                  <span key={uuidv4()}>{term}</span>
                ))}
            </FlyttaSchemaText>
          </FlyttaKnappSchema>
        )}
      </SchemaMerInfo>
    </>
  );
}

import getData from "../functions/getData";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

//Iconer
import { BsTrash3 } from "react-icons/bs";
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
  SchemaInfoText2,
  InfoTextKnapp,
  SchemaLäsMerText,
  SchemaTextInfo,
  SchemaTitelKurs,
} from "../styles/Text.styled";
import { FlyttaKnappSchema, TaBort } from "../styles/Knappar.styled";

export default function KursSchema(props) {
  const [isReadMore, setIsReadMore] = useState(false);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      <TitelKnappCont>
        <SchemaTitelKurs>{props.courseData.kursnamn}</SchemaTitelKurs>
        <TaBort // delete knapp
          onClick={() => props.handleDelete(props.courseData.kurskod)}
        >
          {" "}
          <BsTrash3 size={13} />
        </TaBort>
      </TitelKnappCont>
      <FirstInfoCont key={props.courseData.kurskod}>
        <SchemaTextInfo> |{props.courseData.kurskod}</SchemaTextInfo>
        <SchemaTextInfo> | Block: {props.courseData.block}</SchemaTextInfo>
        <SchemaTextInfo>|</SchemaTextInfo>
      </FirstInfoCont>
      <SecondInfoCont>
        <SchemaInfoText2> {props.courseData.utbildningsniva}</SchemaInfoText2>
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
          <SchemaTextInfo>HP: {props.courseData.hp}</SchemaTextInfo>
        )}

        {isReadMore && (
          <SchemaTextInfo>Ort: {props.courseData.ort}</SchemaTextInfo>
        )}

        {isReadMore && (
          <SchemaTextInfo>
            Huvudområde:
            {props.courseData.huvudomrade.map((prop) => {
              return <span key={uuidv4()}> {prop} </span>;
            })}
          </SchemaTextInfo>
        )}
        {isReadMore && (
          <SchemaTextInfo>
            Examination:{" "}
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
              Flytta kurs från termin {props.courseData.termin} till termin
              {Object.values(getData(props.courseData.kurskod).termin)
                .filter((term) => term !== props.courseData.termin)
                .map((term) => (
                  <span key={term}>{term}</span>
                ))}
            </FlyttaSchemaText>
          </FlyttaKnappSchema>
        )}
      </SchemaMerInfo>
    </>
  );
}

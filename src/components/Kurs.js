import React, { useState, useEffect } from "react";
import {
  saveKurs,
  deleteKurs,
  getUserData,
} from "../firebase_setup/firebase.js";
import "firebase/compat/database";
import { v4 as uuidv4 } from "uuid";
//import Dropdown from "react-bootstrap/Dropdown";
import OverlappningPopup from "./OverlappningPopup";

//style
import {
  Text,
  TextHuvudnivå,
  Titel,
  InfoTextKnapp,
  LäsMerText,
  TextUnderLäsMer,
  TextUtbildningsnivå,
} from "../styles/Text.styled.js";
import {
  FirstInfoCont,
  TitelKnappCont,
  SecondInfoCont,
} from "../styles/Container.styled.js";

import {
  TaBort,
  DropdownB,
  DropdownItem,
  DropdownMenu,
  Dropdown,
} from "../styles/Knappar.styled.js";

//ikoner
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";

export default function Kurs(props) {
  const kurs = props.kursdata;

  // Sparar info om "lägg till kurs" och "radera kurs" mha localstorage
  const [addkurs, setAddKurs] = useState(
    localStorage.getItem(kurs.kurskod) === "true"
  );
  const [isReadMore, setIsReadMore] = useState(false);
  const [showOverlapping, setShowOverlapping] = useState(false);

  useEffect(() => {
    localStorage.setItem(kurs.kurskod, addkurs);
  }, [addkurs, kurs.kurskod]);
  //sparar om man väljer termin 7 eller 8
  function handleClick1() {
    let nr = 0;
    saveKurs(kurs, nr);
    setAddKurs(true);
    handleOverlappningPopup();
  }

  //sparar om man väljer termin 9
  function handleClick2() {
    let nr = 1;
    saveKurs(kurs, nr);
    setAddKurs(true);
    handleOverlappningPopup();
  }

  function handleDelete() {
    deleteKurs(kurs);
    setAddKurs(false);
  }

  // Hanterar popupen ifall en överlappning noteras WIP
  async function handleOverlappningPopup() {
    const kurs = await props.kursdata; // Wait for props.kursdata to be retrieved

    try {
      const userCourseCodes = await getUserData();

      for (const courseCode of userCourseCodes) {
        if (kurs.overlappning === courseCode) {
          setShowOverlapping(true);
          return; // Avbryter loopen om en överlappning hittas
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Avgör om en överlappningskurs ska skrivas ut eller inte i kurs-komponent
  const [hasOverlappning, setHasOverlappning] = useState(false);
  useEffect(() => {
    if (kurs.overlappning !== "Ingen överlappning") {
      setHasOverlappning(true);
    }
  }, [kurs.overlappning]);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <TitelKnappCont>
        <Titel>{kurs.kursnamn}</Titel>

        {!addkurs && (
          <Dropdown>
            <DropdownB>
              <BsFolderPlus size={20} />
            </DropdownB>

            <DropdownMenu>
              <DropdownItem
                onClick={handleClick1}
                style={{ textDecoration: "none" }}
              >
                {" "}
                <InfoTextKnapp>Termin: {kurs.termin[0]}</InfoTextKnapp>
              </DropdownItem>
              {kurs.termin.length === 2 && (
                <>
                  <DropdownItem
                    onClick={handleClick2}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    <InfoTextKnapp>Termin: {kurs.termin[1]}</InfoTextKnapp>
                  </DropdownItem>
                </>
              )}
            </DropdownMenu>
          </Dropdown>
        )}

        {addkurs && (
          <TaBort onClick={handleDelete}>
            {" "}
            <BsTrash3 size={20} />
          </TaBort>
        )}
      </TitelKnappCont>

      <FirstInfoCont>
        <Text>| {kurs.kurskod} </Text>

        {kurs.termin.map((prop) => {
          return (
            <Text key={uuidv4()}>
              {" "}
              | Termin <span>{prop}</span>{" "}
            </Text>
          );
        })}

        {kurs.period.map((prop) => {
          return (
            <Text key={uuidv4()}>
              {" "}
              | Period <span>{prop}</span>{" "}
            </Text>
          );
        })}

        {kurs.block.map((prop) => {
          return (
            <Text key={uuidv4()}>
              {" "}
              | Block <span>{prop}</span>{" "}
            </Text>
          );
        })}

        <Text>|</Text>
      </FirstInfoCont>
      <SecondInfoCont>
        <TextUtbildningsnivå>{kurs.utbildningsniva}</TextUtbildningsnivå>{" "}
        {kurs.huvudomrade !== undefined &&
          kurs.huvudomrade !== null &&
          kurs.huvudomrade.map((prop) => {
            return <TextHuvudnivå key={uuidv4()}>{prop}</TextHuvudnivå>;
          })}
      </SecondInfoCont>

      <span onClick={toggleReadMore}>
        {isReadMore ? (
          <LäsMerText>
            Läs mindre <AiOutlineUp />{" "}
          </LäsMerText>
        ) : (
          <LäsMerText>
            Läs mer <AiOutlineDown />{" "}
          </LäsMerText>
        )}
      </span>

      {isReadMore && (
        <TextUnderLäsMer>
          <span style={{ fontWeight: "bold" }}>Studietakt:</span>{" "}
          {kurs.studietakt}
        </TextUnderLäsMer>
      )}
      {isReadMore && (
        <TextUnderLäsMer>
          <span style={{ fontWeight: "bold" }}>Antal hp:</span> {kurs.hp}
        </TextUnderLäsMer>
      )}
      {isReadMore && hasOverlappning && (
        <TextUnderLäsMer>
          <span style={{ fontWeight: "bold" }}>
            Kursen får ej ingå i examen tillsammans med
          </span>{" "}
          {kurs.overlappning}
        </TextUnderLäsMer>
      )}
      {isReadMore && (
        <TextUnderLäsMer>
          <span style={{ fontWeight: "bold" }}>Plats:</span> {kurs.ort}
        </TextUnderLäsMer>
      )}
      {isReadMore && (
        <TextUnderLäsMer>
          <span style={{ fontWeight: "bold" }}>Examination:</span>{" "}
          {kurs.examination.map((prop) => {
            return <span key={uuidv4()}>{prop.benamning}, </span>;
          })}
        </TextUnderLäsMer>
      )}

      {isReadMore && (
        <a href={kurs.url}>
          {" "}
          <TextUnderLäsMer>
            Linköpings univeristet- Läs mer om kurser <BsBoxArrowUpRight />
          </TextUnderLäsMer>
        </a>
      )}

      {showOverlapping && (
        <OverlappningPopup setShowOverlapping={setShowOverlapping} />
      )}
    </>
  );
}

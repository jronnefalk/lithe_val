import React, { useState, useEffect } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import OverlappningPopup from "./OverlappningPopup";

//style
import {
  InfoText,
  InfoText2,
  InfoTitel,
  InfoTextKnapp,
} from "../styles/Text.styled.js";
import { FirstInfoCont, SecondInfoCont } from "../styles/Container.styled.js";

import { LäggaTill, LäggaTillDroppD } from "../styles/Knappar.styled.js";

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
  }

  //sparar om man väljer termin 9
  function handleClick2() {
    let nr = 1;
    saveKurs(kurs, nr);
    setAddKurs(true);
  }

  function handleDelete() {
    deleteKurs(kurs);
    setAddKurs(false);
  }

  function handleOverlappningPopup() {
    if (kurs.kurskod === "THEN09") {
      setShowOverlapping(true);
    }
  }

  // Kollar ifall en kurs har en överlappningkurs eller ej
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
      <InfoTitel>{kurs.kursnamn}</InfoTitel>
      <FirstInfoCont>
        <InfoText>| {kurs.kurskod} </InfoText>

        {kurs.termin.map((prop) => {
          return (
            <InfoText key={uuidv4()}>
              {" "}
              | Termin <span>{prop}</span>{" "}
            </InfoText>
          );
        })}

        {kurs.period.map((prop) => {
          return (
            <InfoText key={uuidv4()}>
              {" "}
              | Period <span>{prop}</span>{" "}
            </InfoText>
          );
        })}

        {kurs.block.map((prop) => {
          return (
            <InfoText key={uuidv4()}>
              {" "}
              | Block <span>{prop}</span>{" "}
            </InfoText>
          );
        })}

        <InfoText>|</InfoText>
      </FirstInfoCont>
      <SecondInfoCont>
        <InfoText2>{kurs.utbildningsniva}</InfoText2>{" "}
        {kurs.huvudomrade.map((prop) => {
          return <InfoText2 key={uuidv4()}>{prop}</InfoText2>;
        })}
      </SecondInfoCont>

      {!addkurs && (
        <Dropdown onClick={handleOverlappningPopup}>
          <LäggaTillDroppD>
            <BsFolderPlus size={20} />
            <InfoTextKnapp>Lägg till</InfoTextKnapp>
          </LäggaTillDroppD>
          <Dropdown.Menu>
            <Dropdown.Item className="Lägg-till-text" onClick={handleClick1}>
              {" "}
              <InfoTextKnapp>Termin: {kurs.termin[0]}</InfoTextKnapp>
            </Dropdown.Item>
            {kurs.termin.length === 2 && (
              <>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="Lägg-till-text"
                  onClick={handleClick2}
                >
                  {" "}
                  <InfoTextKnapp>Termin: {kurs.termin[1]}</InfoTextKnapp>
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}

      {addkurs && (
        <LäggaTill onClick={handleDelete}>
          {" "}
          <BsTrash3 size={20} />
          <p>Ta bort kurs</p>
        </LäggaTill>
      )}

      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? (
          <InfoText>
            Läs mindre <AiOutlineUp />{" "}
          </InfoText>
        ) : (
          <InfoText>
            Läs mer <AiOutlineDown />{" "}
          </InfoText>
        )}
      </span>

      {isReadMore && <InfoText>HP: {kurs.hp}</InfoText>}
      {isReadMore && <InfoText>Ort: {kurs.ort}</InfoText>}
      {isReadMore && hasOverlappning && (
        <InfoText>
          Kursen får ej ingå i examen tillsammans med {kurs.overlappning}
        </InfoText>
      )}

      {isReadMore && (
        <InfoText>
          Examination:{" "}
          {kurs.examination.map((prop) => {
            return <span key={uuidv4()}>{prop.benamning}</span>;
          })}
        </InfoText>
      )}
      {isReadMore && (
        <a href={kurs.url}>
          {" "}
          <InfoText>
            Linköpings univeristet- Läs mer om kurser <BsBoxArrowUpRight />
          </InfoText>
        </a>
      )}

      {showOverlapping && (
        <OverlappningPopup setShowOverlapping={setShowOverlapping} />
      )}
    </>
  );
}

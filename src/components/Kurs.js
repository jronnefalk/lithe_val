import React, { useState, useEffect } from "react";
import { saveKurs, deleteKurs, getKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";

//style
import {
  InfoText,
  InfoText2,
  InfoTitel,
  InfoTextKnapp,
  LäsMerText,
} from "../styles/Text.styled.js";
import { FirstInfoCont, SecondInfoCont } from "../styles/Container.styled.js";

import { LäggaTillDroppD, TaBort } from "../styles/Knappar.styled.js";

//ikoner
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";

export default function Kurs(props) {
  // Creates variables for the course data and course code by
  // extracting them from the props passed down to the component.
  const kurs = props.kursdata;
  const kurskod = kurs.kurskod;

  // Creates state variables for toggling the
  // read more/less feature in the course description.
  const [isReadMore, setIsReadMore] = useState(false);

  // Creates a state variable for checking if the course is already saved in Firebase.
  const [isInFirebase, setIsInFirebase] = useState(false);

  // Creates a state variable for keeping track of whether the course has been
  // added to the user's list of saved courses in localStorage, with an initial
  // value of "0". If the course code is already in localStorage, it sets the
  // initial value to the existing value in localStorage.
  const [addedKurs, setAddedKurs] = useState(
    localStorage.getItem(kurskod) || "0"
  );

  // Effect hook that runs when the course code changes, and checks if the
  // course data is already saved in Firebase. If the course data exists
  // in Firebase, it sets the state variable isInFirebase to true.
  useEffect(() => {
    async function checkKurs() {
      const kursData = await getKurs(kurskod);
      setIsInFirebase(kursData !== null);
    }
    checkKurs();
  }, [kurskod]);

  // Effect hook that runs whenever the addedKurs or kurskod variables change.
  // It saves the current addedKurs value to localStorage under the kurskod key.
  useEffect(() => {
    localStorage.setItem(kurskod, addedKurs);
  }, [addedKurs, kurskod]);

  // Event handlers for clicking the "Add course" and "Remove course" buttons.
  // handleClick1() and handleClick2() add the course to localStorage with the
  // value "1", while handleDelete() removes the course from localStorage
  // with the value "0".
  function handleClick1() {
    setAddedKurs("1");
    let nr = 0;
    saveKurs(kurs, nr);
  }

  function handleClick2() {
    setAddedKurs("1");
    let nr = 1;
    saveKurs(kurs, nr);
  }

  function handleDelete() {
    setAddedKurs("0");
    deleteKurs(kurs);
  }

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

      {isInFirebase || addedKurs === "1" ? (
        <TaBort onClick={handleDelete}>
          <BsTrash3 size={20} />
          <p>Ta bort kurs</p>
        </TaBort>
      ) : (
        <Dropdown>
          <LäggaTillDroppD>
            <BsFolderPlus size={20} />
          </LäggaTillDroppD>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={handleClick1}
              style={{ textDecoration: "none" }}
            >
              {" "}
              <InfoTextKnapp>Termin: {kurs.termin[0]}</InfoTextKnapp>
            </Dropdown.Item>
            {kurs.termin.length === 2 && (
              <>
                <Dropdown.Item
                  onClick={handleClick2}
                  style={{ textDecoration: "none" }}
                >
                  <InfoTextKnapp>Termin: {kurs.termin[1]}</InfoTextKnapp>
                </Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}

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

      {isReadMore && <InfoText>HP: {kurs.hp}</InfoText>}
      {isReadMore && <InfoText>Ort: {kurs.ort}</InfoText>}
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
            Linköpings universitet - Läs mer om kurser <BsBoxArrowUpRight />
          </InfoText>
        </a>
      )}
    </>
  );
}

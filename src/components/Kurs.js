import React, { useState, useEffect } from "react";
import { saveKurs, deleteKurs, database } from "../firebase_setup/firebase.js";
import { ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
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
  const { kursdata, FireBaseData } = props;
  const { currentUser } = getAuth();

  const kurs = props.kursdata;
  const kurskod = kurs.kurskod;

  const [isReadMore, setIsReadMore] = useState(false);
  const [isInFirebase, setIsInFirebase] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const kursRef = ref(
        database,
        `users/${currentUser.uid}/Kurser/${kurskod}`
      );
      const unsubscribe = onValue(kursRef, (snapshot) => {
        setIsInFirebase(snapshot.exists());
      });

      return () => unsubscribe();
    }
  }, [currentUser, kurskod]);

  useEffect(() => {
    if (FireBaseData && Array.isArray(FireBaseData)) {
      const courseInFirebase = FireBaseData.find(
        (course) => course.kurskod === kurskod
      );
      console.log("courseInFirebase:", courseInFirebase);
      setIsInFirebase(!!courseInFirebase);
    }
  }, [kurskod, FireBaseData]);

  async function handleClick(nr) {
    await saveKurs(kursdata, nr);
    setIsInFirebase(true);
  }

  async function handleDelete() {
    await deleteKurs(kursdata);
    setIsInFirebase(false);

    if (props.onDelete) {
      props.onDelete(kurs);
    }
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

      {isInFirebase ? (
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
              onClick={() => handleClick(0)}
              style={{ textDecoration: "none" }}
            >
              <InfoTextKnapp>Termin: {kurs.termin[0]}</InfoTextKnapp>
            </Dropdown.Item>
            {kurs.termin.length === 2 && (
              <Dropdown.Item
                onClick={() => handleClick(1)}
                style={{ textDecoration: "none" }}
              >
                <InfoTextKnapp>Termin: {kurs.termin[1]}</InfoTextKnapp>
              </Dropdown.Item>
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

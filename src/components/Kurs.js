import React, { useState } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
//import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";

<<<<<<< Updated upstream
=======
//style
import {
  InfoText,
  InfoText2,
  InfoTitel,
  InfoTextKnapp,
} from "../styles/Text.styled.js";
import { FirstInfoCont, SecondInfoCont } from "../styles/Container.styled.js";
import { LäggaTill, LäggaTillDroppD } from "../styles/Knappar.styled.js";

>>>>>>> Stashed changes
//ikoner
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";

export default function Kurs(props) {
  const kurs = props.kursdata;

  const [addkurs, exists] = useState(false);

  function handleClick() {
    saveKurs(kurs);
    exists(true);
  }

  function handleDelete() {
    deleteKurs(kurs);
    exists(false);
  }

  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <h1 className="kursnamn">{kurs.kursnamn}</h1>
      <div className="kursinfo">
        <div className="firstheader">
          <div>|</div>
          <div>{kurs.kurskod}</div>

<<<<<<< Updated upstream
          {kurs.termin.map((prop) => {
            return (
              <div key={uuidv4()}>
                {" "}
                | Termin <span>{prop}</span>{" "}
              </div>
            );
=======
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
        <Dropdown>
          <LäggaTillDroppD>
            {" "}
            <BsFolderPlus size={20} />
            <InfoTextKnapp>Lägg till</InfoTextKnapp>
          </LäggaTillDroppD>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleClick}>
              {" "}
              <InfoTextKnapp>Termin: {kurs.termin}</InfoTextKnapp>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      {addkurs && (
        <LäggaTill onClick={handleDelete}>
          {""}
          <BsTrash3 size={20} />
          <InfoTextKnapp>Ta bort kurs</InfoTextKnapp>
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
      {isReadMore && (
        <InfoText>
          Examination:{" "}
          {kurs.examination.map((prop) => {
            return <span key={uuidv4()}>{prop.benamning}</span>;
>>>>>>> Stashed changes
          })}

          {kurs.period.map((prop) => {
            return (
              <div key={uuidv4()}>
                {" "}
                | Period <span>{prop}</span>{" "}
              </div>
            );
          })}

          {kurs.block.map((prop) => {
            return (
              <div key={uuidv4()}>
                {" "}
                | Block <span>{prop}</span>{" "}
              </div>
            );
          })}

          <div>|</div>
        </div>
        <div className="secondheader">
          <span>{kurs.utbildningsniva}</span>{" "}
          {kurs.huvudomrade.map((prop) => {
            return <span key={uuidv4()}>{prop}</span>;
          })}
        </div>

        {!addkurs && (
          <div>
            <Dropdown>
              <Dropdown.Toggle className="Lägg-till-knapp">
                <BsFolderPlus size={20} />
                <p>Lägg till</p>
              </Dropdown.Toggle>
              <Dropdown.Menu className="Menu-droppdown" variant="dark">
                {kurs.termin.map((prop) => {
                  return (
                    <Dropdown.Item
                      className="Lägg-till-text"
                      key={uuidv4()}
                      onClick={handleClick}
                      active
                    >
                      {" "}
                      Termin: {prop}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {addkurs && (
          <button className="Lägg-till-knapp" onClick={handleDelete}>
            {" "}
            <BsTrash3 size={20} />
            <p>Ta bort</p>
          </button>
        )}

        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? (
            <p className="readless">
              Läs mindre <AiOutlineUp />{" "}
            </p>
          ) : (
            <p className="readmore">
              Läs mer <AiOutlineDown />{" "}
            </p>
          )}
        </span>

        {isReadMore && <p>HP: {kurs.hp}</p>}
        {isReadMore && <p>Ort: {kurs.ort}</p>}
        {isReadMore && (
          <p>
            Examination:{" "}
            {kurs.examination.map((prop) => {
              return <span key={uuidv4()}>{prop.benamning}</span>;
            })}
          </p>
        )}
        {isReadMore && (
          <a href={kurs.url}>
            {" "}
            Linköpings univeristet- Läs mer om kurser <BsBoxArrowUpRight />
          </a>
        )}
      </div>
    </>
  );
}

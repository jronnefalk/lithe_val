import React, { useState } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
//import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";

//style
import { Text } from "../styles/Text.styled.js";

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

          {kurs.termin.map((prop) => {
            return (
              <div key={uuidv4()}>
                {" "}
                | Termin <span>{prop}</span>{" "}
              </div>
            );
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
          <Dropdown>
            <Dropdown.Toggle className="Lägg-till-knapp">
              <BsFolderPlus size={20} />
              <Text>Lägg till</Text>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="Lägg-till-text" onClick={handleClick}>
                {" "}
                <Text>Termin: {kurs.termin}</Text>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {addkurs && (
          <button className="Lägg-till-knapp" onClick={handleDelete}>
            {" "}
            <BsTrash3 size={20} />
            <Text>Ta bort kurs</Text>
          </button>
        )}

        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? (
            <Text>
              Läs mindre <AiOutlineUp />{" "}
            </Text>
          ) : (
            <Text>
              Läs mer <AiOutlineDown />{" "}
            </Text>
          )}
        </span>

        {isReadMore && <Text>HP: {kurs.hp}</Text>}
        {isReadMore && <Text>Ort: {kurs.ort}</Text>}
        {isReadMore && (
          <Text>
            Examination:{" "}
            {kurs.examination.map((prop) => {
              return <span key={uuidv4()}>{prop.benamning}</span>;
            })}
          </Text>
        )}
        {isReadMore && (
          <a href={kurs.url}>
            {" "}
            <Text>
              Linköpings univeristet- Läs mer om kurser <BsBoxArrowUpRight />
            </Text>
          </a>
        )}
      </div>
    </>
  );
}

import React, { useState } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
//import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
      <p className="kursinfo">
        <p class="firstheader">
          <p>|</p>
          <p>{kurs.kurskod}</p>
          <p>|</p>
          <p>Termin {kurs.termin}</p>
          <p>|</p>
          <p>
            Period{" "}
            {kurs.period.map((prop) => {
              return <span>{prop}</span>;
            })}
          </p>
          <p>|</p>
          <p>
            Block{" "}
            {kurs.block.map((prop) => {
              return <span>{prop}</span>;
            })}
          </p>
          <p>|</p>
        </p>
        <p class="secondheader">
          <span>{kurs.utbildningsniva}</span>
          <p>
            {" "}
            {kurs.huvudomrade.map((prop) => {
              return <span>{prop}</span>;
            })}
          </p>
        </p>

        {!addkurs && (
          <Dropdown>
            <Dropdown.Toggle className="Lägg-till-knapp">
              <BsFolderPlus size={20} />
              <p>Lägg till</p>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="Lägg-till-text" onClick={handleClick}>
                {" "}
                Termin: {kurs.termin}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {addkurs && (
          <button className="Lägg-till-knapp" onClick={handleDelete}>
            {" "}
            <BsTrash3 size={20} />
            <p>Ta bort kurs</p>
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
          <a href={kurs.url}>
            {" "}
            Linköpings univeristet- Läs mer om kurser <BsBoxArrowUpRight />
          </a>
        )}
      </p>
    </>
  );
}

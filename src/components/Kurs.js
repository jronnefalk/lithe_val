import React, { useState, useEffect } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
//import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";

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

  useEffect(() => {
    localStorage.setItem(kurs.kurskod, addkurs);
  }, [addkurs, kurs.kurskod]);

  function handleClick1() {
    let nr = 0;
    saveKurs(kurs, nr);
    setAddKurs(true);
  }
  function handleClick2() {
    let nr = 1;
    saveKurs(kurs, nr);
    setAddKurs(true);
  }

  function handleDelete() {
    deleteKurs(kurs);
    setAddKurs(false);
  }

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
              <p>Lägg till</p>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="Lägg-till-text" onClick={handleClick1}>
                {" "}
                Termin: {kurs.termin[0]}
              </Dropdown.Item>
              {kurs.termin.length === 2 && (
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="Lägg-till-text"
                    onClick={handleClick2}
                  >
                    {" "}
                    Termin: {kurs.termin[1]}
                  </Dropdown.Item>
                </>
              )}
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

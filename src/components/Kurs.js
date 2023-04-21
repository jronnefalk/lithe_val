import React, { useState, useEffect } from "react";
import { saveKurs, deleteKurs, getKurs } from "../firebase_setup/firebase.js";
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
  const kurskod = kurs.kurskod;

  const [isReadMore, setIsReadMore] = useState(false);
  const [isInFirebase, setIsInFirebase] = useState(false);

  useEffect(() => {
    const getKursFromFirebase = async () => {
      const kursData = await getKurs(kurskod);
      if (kursData) {
        setIsInFirebase(true);
      }
    };

    const isInLocalStorage = localStorage.getItem(kurskod);
    if (isInLocalStorage === "true") {
      setIsInFirebase(true);
    }

    getKursFromFirebase();
  }, [kurskod]);

  function handleClick() {
    saveKurs(kurs);
    localStorage.setItem(kurs, "true");
    setIsInFirebase(true);
  }

  function handleDelete() {
    deleteKurs(kurs);
    localStorage.removeItem(kurskod);
    setIsInFirebase(false);
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

        {isInFirebase ? (
          <button className="Lägg-till-knapp" onClick={handleDelete}>
            <BsTrash3 size={20} />
            <p>Ta bort kurs</p>
          </button>
        ) : (
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

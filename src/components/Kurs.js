import React from "react";

export default function Kurs(props) {
  const kurs = props.kursdata;

  const handleAddToCart = () => {
    props.onAddToCart(kurs);
  };
  
  const handleRemoveFromCart = () => {
    props.onRemoveFromCart(kurs);
  };

  return (
    <>
      <h1>{kurs.kursnamn}</h1>
      <p>Kurskod: {kurs.kurskod}</p>
      <p>HP: {kurs.hp}</p>
      <p>Huvudområde: {kurs.huvudomrade[0]}</p>
      <p>Utbildningsnivå: {kurs.utbildningsniva}</p>
      <p>Termin: {kurs.termin}</p>
      <p>Period: {kurs.period[0]}</p>
      <p>Block: {kurs.block[0]}</p>
      <p>Ort: {kurs.ort}</p>
      <a href={kurs.url}>Kurshemsida</a>
      <button onClick={handleAddToCart}>Lägg till kurs</button>
      <button onClick={handleRemoveFromCart}>Ta bort kurs</button>
      <p>Antal valda kurser: {props.cart.length}</p> {/* Display the number of courses in cart */}

    </>
  );
}

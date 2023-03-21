import { useState } from "react";
import React from "react";

import { Link, Route, Routes } from "react-router-dom";
// Data
import kurser from "../webscraping/database.json";
// Funktioner
import filterKurser from "../functions/filterKurser";
// Komponenter
import Kurs from "../components/Kurs";
import Filters from "../components/Filters";
import MinSida from "./MinSida";


export function Start() {

    const [query, setQuery] = useState("");
    const [cart, setCart] = useState([]);

    const addToCart = (kurs) => {
      if (!cart.includes(kurs)) {
        setCart([...cart, kurs]);
      }
    };
  
    const removeFromCart = (kurs) => {
      setCart(cart.filter((c) => c !== kurs));
    };

    
    const filteredKurser = filterKurser(kurser, query);

    return (
    <div className="App">
      <div>
        <input
          placeholder="Sök"
          onChange={(event) => setQuery(event.target.value)}
        />
        <div>
          <Filters />
        </div>
      </div>

      {filteredKurser.map((el) => (
        <Kurs
        key={el.kurskod}
        kursdata={el}
        cart={cart} // Pass the cart state as a prop
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
      />
))}


      <Link to="/minasidor"><button>Gå till Mina Sidor</button></Link>
        <Routes>
        <Route path="/minasidor" element={<MinSida cart={cart} onRemoveFromCart={removeFromCart} onAddToCart={addToCart} />} />
        </Routes>

    </div>
  );
}
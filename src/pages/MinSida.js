import React from "react";
import Kurs from "../components/Kurs";

export function MinSida(props) {

  const cart = props.cart;
  const removeFromCart = props.onRemoveFromCart;
  console.log(cart)

return (
    <div>
      <h2>Mina valda kurser</h2>
      {cart.length > 0 ? (
        cart.map((kurs) => (
          <div key={kurs.kurskod}>
            <Kurs kursdata={kurs} />
            <button onClick={() => removeFromCart(kurs)}>Ta bort</button>
          </div>
        ))
      ) : (
        <p>Du har inte valt några kurser än.</p>
      )}
    </div>
);
}

export default MinSida;
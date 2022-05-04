import {useState } from "react";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart"
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown,setCartIsShown]= useState(false);

  const ShowCartHandler=()=>
  {
    setCartIsShown(true);
  }
  const HideCartHandler=()=>{
    setCartIsShown(false);
  }
  return (
    <CartProvider>
     <Header OnShowCart={ShowCartHandler} />
     {cartIsShown &&  <Cart onClose={HideCartHandler}/>}
     <main>
       <Meals/>
     </main>
    </CartProvider>
  );
}

export default App;

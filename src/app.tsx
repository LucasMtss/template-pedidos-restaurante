import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import ItemDetails from "./pages/item-details";
import Cart from "./pages/cart";

export function App() {
  return (
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/cart" element={<Cart />}/>
    <Route path="/product/:id" element={<ItemDetails />}/>
   </Routes>
  )
}
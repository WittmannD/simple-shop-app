import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ShopPage} from "./pages/shop/ShopPage.tsx";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.tsx";

function App() {

  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route index element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

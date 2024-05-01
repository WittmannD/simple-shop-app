import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ShopPage} from "./pages/shop/ShopPage.tsx";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.tsx";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/useAppState.ts";
import {fetchCurrentUser} from "./app/features/users/users.thunk.ts";

function App() {
  const currentUser = useAppSelector(store => store.users.currentUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!currentUser)
      dispatch(fetchCurrentUser())

    console.log(currentUser)
  }, [])

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

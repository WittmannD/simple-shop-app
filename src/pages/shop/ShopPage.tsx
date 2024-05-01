import {Topbar} from "../../components/topbar/Topbar.tsx";
import {ItemCardGrid} from "../../components/item/ItemCardGrid.tsx";

export const ShopPage = () => {
  return (
    <>
      <Topbar/>
      <main>
        <ItemCardGrid />
      </main>
    </>
  )
}
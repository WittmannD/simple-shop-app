import {RootState} from "../../store.ts";

export const selectProducts = (state: RootState) => state.products.items

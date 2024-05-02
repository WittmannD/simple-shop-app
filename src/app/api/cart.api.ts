import { getDoc, updateDoc } from '@firebase/firestore'
import db from './firestore';
import {RootState} from "../store.ts";
import {CartDocument} from "./types/cart.type.ts";
import {selectProductById} from "../features/products/products.selectors.ts";
import productsApi from "./products.api.ts";
import {ProductType} from "./types/product.type.ts";

export const unwrapCartProducts = async (
  state: RootState,
  items: CartDocument['items']
) => {
  return await Promise.all(
    items.map(async (item) => {
      let product = selectProductById(state, item.product.id)

      if (!product) {
        const productDoc = await productsApi.getProduct(item.product.id)
        product = { id: productDoc.id, ...productDoc.data() } as ProductType
      }

      return { ...item, product }
    })
  )
}

export default ({
  async getCart(id: string) {
    const cartDocRef = db.doc.cart(id);

    return await getDoc(cartDocRef);
  },

  async addItem(cartId: string, productId: string) {
    // adds the product to the cart and returns all items
    const cartDocRef = db.doc.cart(cartId);
    const cartDoc = await getDoc(cartDocRef)
    const data = cartDoc.data()

    const items = data?.items ? [...data.items] : [];
    const existed = items.find((o) => o.product.id === productId)

    if (existed) {
      existed.quantity += 1
      await updateDoc(cartDocRef, { items })
      return items
    }

    items.push({
      product: db.doc.product(productId),
      quantity: 1,
    })

    await updateDoc(cartDocRef, { items })
    return items;
  },

  async removeItem(cartId: string, productId: string) {
    // removes product from the cart and returns all items
    const cartDocRef = db.doc.cart(cartId);
    const cartDoc = await getDoc(cartDocRef)
    const data = cartDoc.data()

    if (!data)
      return []

    const items = data.items || [];
    const existedIndex = items.findIndex((o) => o.product.id === productId)

    if (!~existedIndex) return items

    if (items[existedIndex].quantity <= 1) {
      items.splice(existedIndex, 1)
      await updateDoc(cartDocRef, { items })
      return items
    }

    items[existedIndex].quantity -= 1
    await updateDoc(cartDocRef, { items })
    return items
  },

  async setItemQuantity(cartId: string, productId: string, quantity: number) {
    // set exact quantity of the product and returns all items
    const cartDocRef = db.doc.cart(cartId);
    const cartDoc = await getDoc(cartDocRef)
    const data = cartDoc.data()

    if (!data || !data.items)
      return []

    const items = data?.items || [];
    const existedIndex = items.findIndex((o) => o.product.id === productId)

    if (!~existedIndex) return items

    if (quantity === 0) {
      items.splice(existedIndex, 1)
      await updateDoc(cartDocRef, { items })
      return items
    }

    await updateDoc(cartDocRef, { items })
    items[existedIndex].quantity = quantity
    return items
  },

  async emptyCart(cartId: string) {
    const cartDocRef = db.doc.cart(cartId);
    await updateDoc(cartDocRef, { items: [] })
  }
})
import { getDoc, updateDoc } from '@firebase/firestore'
import db from './firestore';

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

    console.log('api', data)

    const items = data?.items ? [...data.items] : [];
    const existed = items.find((o) => o.product.id === productId)

    console.log(cartDoc, items, existed)

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
  }
})
import { addDoc, getDoc } from '@firebase/firestore'
import db from './firestore.ts'
import { ProductType } from './types/product.type.ts'

export default {
  async createOrder(
    userId: string,
    items: { quantity: number; product: ProductType }[],
    orderInformation: Record<string, string>
  ) {
    const userDocRef = db.doc.user(userId)

    return await addDoc(db.order, {
      information: orderInformation,
      user: userDocRef,
      total: {
        cost: items.reduce(
          (accumulator, currentValue) =>
            accumulator +
            Number(currentValue.product.price) * currentValue.quantity,
          Number(0)
        ),
        quantity: items.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          Number(0)
        ),
      },
      items,
    })
  },

  async getOrder(id: string) {
    const orderDocRef = db.doc.order(id)
    return await getDoc(orderDocRef)
  },
}

import {
  getDocs,
  getDoc,
  query,
  startAfter,
  orderBy,
  limit,
  QueryConstraint,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import db from './firestore.ts'

export default {
  async getProducts(take: number = 25, lastVisible?: QueryDocumentSnapshot) {
    const productsRef = db.products
    const queries: QueryConstraint[] = [
      orderBy('createdAt'),
      limit(take)
    ]

    if (lastVisible) queries.push(startAfter(lastVisible))

    return await getDocs(
      query(
        productsRef,
        ...queries,
      )
    )
  },

  async getSingleProduct(id: string) {
    const productRef = db.product(id)

    return await getDoc(productRef)
  },
}

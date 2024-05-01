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

  async getProduct(id: string) {
    const productRef = db.doc.product(id)

    return await getDoc(productRef)
  },
}

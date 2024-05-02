import { DocumentReference } from '../firestore.ts'
import { ProductType } from './product.type.ts'

export type OrderDocument = {
  user: DocumentReference<'user'>
  items: Array<{
    quantity: number
    product: ProductType
  }>
  total: {
    quantity: number
    cost: number
  }
  information: Record<string, string>
}

export type OrderType = OrderDocument & { id: string }

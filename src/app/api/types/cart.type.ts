import {DocumentReference} from '../firestore.ts'


export type CartDocument = {
  items: Array<{
    quantity: number
    product: DocumentReference<'product'>
  }>
}

export type CartType = CartDocument & { id: string }

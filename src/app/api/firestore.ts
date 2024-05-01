import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getFirestore,
  QueryDocumentSnapshot,
  WithFieldValue,
} from 'firebase/firestore'
import { ProductDocument } from './types/product.type.ts'
import {UserDocument} from "./types/user.type.ts";
import {CartDocument} from "./types/cart.type.ts";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBT5BfQMkxcQN7JAz0DPDn70H_TSkGfgAA',
  authDomain: 'test-tasks-ef8b2.firebaseapp.com',
  projectId: 'test-tasks-ef8b2',
  storageBucket: 'test-tasks-ef8b2.appspot.com',
  messagingSenderId: '752353983349',
  appId: '1:752353983349:web:ca6a7b6a821666fada713c',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<Partial<T>>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
})

const dataPoint = <T>(collectionPath: string) =>
  collection(firestore, collectionPath).withConverter(converter<T>())
const docPoint = <T>(collectionPath: string, ...paths: string[]) =>
  doc(firestore, collectionPath, ...paths).withConverter(converter<T>())

const db = {
  products: dataPoint<ProductDocument>('products'),
  users: dataPoint<UserDocument>('users'),
  cart: dataPoint<CartDocument>('cart'),
  doc: {
    product: (id: string) => docPoint<ProductDocument>('products', id),
    user: (id: string) => docPoint<UserDocument>('users', id),
    cart: (id: string) => docPoint<CartDocument>('cart', id)
  }
}

export type DocumentReference<T extends keyof typeof db['doc']> = ReturnType<typeof db['doc'][T]>

export default db;


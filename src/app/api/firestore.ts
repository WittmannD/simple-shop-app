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
import {OrderDocument} from "./types/order.type.ts";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'AIzaSyBT5BfQMkxcQN7JAz0DPDn70H_TSkGfgAA',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'test-tasks-ef8b2.firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'test-tasks-ef8b2',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'test-tasks-ef8b2.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '752353983349',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '1:752353983349:web:ca6a7b6a821666fada713c',
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
  order: dataPoint<OrderDocument>('order'),
  doc: {
    product: (id: string) => docPoint<ProductDocument>('products', id),
    user: (id: string) => docPoint<UserDocument>('users', id),
    cart: (id: string) => docPoint<CartDocument>('cart', id),
    order: (id: string) => docPoint<OrderDocument>('order', id)
  }
}

export type DocumentReference<T extends keyof typeof db['doc']> = ReturnType<typeof db['doc'][T]>

export default db;


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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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


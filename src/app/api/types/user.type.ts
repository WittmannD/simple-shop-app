import {DocumentReference} from '../firestore.ts'


export type UserDocument = {
  cart: DocumentReference<'cart'>
};

export type UserType = UserDocument & { id: string }

import { addDoc, getDoc } from '@firebase/firestore'
import db from './firestore';

export default ({
  async createUser() {
    const usersCollectionRef = db.users;
    const cartCollectionRef = db.cart;

    return await addDoc(usersCollectionRef, {
      cart: await addDoc(cartCollectionRef, {
        items: []
      })
    })
  },

  async getUser(id: string) {
    const userRef = db.doc.user(id);

    return await getDoc(userRef);
  }
})
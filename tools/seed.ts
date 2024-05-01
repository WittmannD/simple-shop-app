import * as admin from 'firebase-admin/app'
import * as firestore from 'firebase-admin/firestore'
import productsData from './products.seed.json' assert { type: "json" };

const app = admin.initializeApp({
  credential: admin.applicationDefault(),
  projectId: 'test-tasks-ef8b2',
})
const db = firestore.getFirestore(app)

async function seed() {
  const batch = db.batch()
  const productsRef = db.collection('products')

  for (const item of productsData) {
    await productsRef.add({
      ...item,
    })
  }

  await batch.commit()
}

seed().then()

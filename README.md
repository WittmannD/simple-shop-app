# Simple Shop App
A simple online store application built with React, Redux, and Firebase  
Preview: https://test-tasks-ef8b2.web.app/  

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![NextUI](https://img.shields.io/badge/NextUI-20232B?style=for-the-badge&logo=nextui&logoColor=007ACC)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)


---
### Firestore data structure
There are 4 collections on firestore

- users: contains only one field with reference to user cart
- cart: stores all items that the user placed in his cart. Item has reference to product document
- products: a collection that stores all products
- order: stores the user's placed orders. Contains items field which contains array of quantity and copy of the product document

```txt
users {
    cart: DocumentReference<cart>
}

cart {
    items: {
        qunatity: number
        product: DocumentReference<product>
    }[]
}

products {
    title: string
    description: string
    price: string
    image: string
    createdAt: string
    updatedAT: string
}

order {
    information: {
        firstNmae: string
        lastName: string
        address: string
        phoneNumber: string
    }
    total: {
        qunatity: number
        cost: string
    }
    items: {
        qunatity: number
        product: {
            title: string
            description: string
            price: string
            image: string
            createdAt: string
            updatedAT: string
        }
    }[]
}
```

Firestore access rules

```txt
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access, but only content owners can write
    match /products/{document} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.author_uid;
      allow update, delete: if false;
    }
    
    match /users/{document} {
      allow read, create: if true;
      allow update, delete: if false;
    }
    
    match /cart/{document} {
      allow read, update, create: if true;
      allow delete: if false;
    }
    
    match /order/{document} {
      allow read, create: if true;
      allow update, delete: if false;
    }
  }
}
```

### Installation and run
First you should set up env variables in .env.development (see .env.example).
```bash
cd ./simple-shop-app
npm install
npm run dev
```

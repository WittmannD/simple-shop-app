import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './main.css'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import getStore from './app/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = getStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NextUIProvider>
          <App />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)

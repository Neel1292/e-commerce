import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './redux/userSlice.jsx';
import { Provider } from 'react-redux';
import itemSlice from './redux/itemSlice.jsx';
import cartSlice from './redux/cartSlice.jsx';
import bannerSlice from './redux/bannerSlice.jsx';

const store = configureStore({
    reducer: {
        users: userSlice, 
        items: itemSlice,
        carts: cartSlice,
        banners: bannerSlice
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

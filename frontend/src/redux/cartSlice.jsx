import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialCartState = {
    cartItems: [],
    total: 0,
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItemCart: (state, action) => {
            let { id, item } = action.payload;

            let sameItem = state.cartItems.find(cart => cart.id === id);

            if (item) {
                if(sameItem) {
                    sameItem.quantity += 1;
                    state.total += item.item_price; 
                } else {
                state.cartItems.push({
                    id: item.id,
                    name: item.item_name,
                    image: item.item_image,
                    price: item.item_price,
                    description: item.item_description,
                    quantity: 1,
                });

                state.total = state.total + item.item_price;
                toast.success('Item added')
            }
            }              
        },
        incrementItem: (state, action) => {
            let id = action.payload;
            const item = state.cartItems.find((item) => item.id == id);
            if(item) {
                item.quantity += 1;
                state.total += item.price;
            }
        },        
        decrementItem: (state, action) => {
            let id = action.payload;
            const item = state.cartItems.find((item) => item.id == id);
            if(item) {
                if(item.quantity == 1) {
                    state.cartItems.splice(state.cartItems.indexOf(item), 1);
                    toast.error('Item removed');
                }
                item.quantity -= 1;
                state.total -= item.price;
            }
        },  
        removeItemCart: (state, action) => {
            let  { id, price }  = action.payload;

            state.cartItems.splice(state.cartItems.findIndex(cart => cart.id === id), 1);   
            state.total -= price; 
            toast.error('Item removed');        
        },      
    }
})

export const { addItemCart, incrementItem, decrementItem, removeItemCart } = cartSlice.actions;

export default cartSlice.reducer;
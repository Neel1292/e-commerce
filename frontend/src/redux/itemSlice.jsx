import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getToken from '../utils/getToken';

const items = {
    item: [],
    oneItem: [],
    editItem: [],
    token: null,
    error: null
}

const itemSlice = createSlice({
    name: 'item',
    initialState: items,
    reducers: {
        getItems: (state, action) => {
            state.item = action.payload;            
        },
        getOneItem: (state, action) => {
            let item = action.payload
            state.oneItem.push(item);
        },
        getSelectedItem: (state, action) => {
            let id = action.payload;
            let index = state.item.findIndex(item => item.id === id);
            state.editItem = state.item[index];
        },
        deleteSelectedItem: (state, action) => {
            state.editItem = [];
        },
        getItemsFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        addItem: (state, action) => {
            console.log("Adding to Redux")
            let newItem = action.payload;
            let items = state.item;
            let updateItem = [
                newItem,
                ...items,
            ];
            state.item = updateItem;
        },
        updateItem: (state, action) => {
            console.log("Updating to Redux")
            let updatedItem = action.payload.item;
            let id = action.payload.id;
            let index = state.item.findIndex(item => item.id === id);
            state.item[index] = updatedItem;
        },
        deleteItem: (state, action) => {
            console.log("Deleting from Redux")
            let updatedItem = action.payload.item;
            let id = action.payload.id;
            let index = state.item.findIndex(item => item.id === id);
            state.item[index] = updatedItem;
        },
        clearOneItem: (state) => {
            state.oneItem = [];
        },        
    }
})

export const getItemsAsync = () => async dispatch => {
    try {
        const token = getToken();
        const response = await axios.get('http://localhost:5000/item');
        if (response.status === 200) {
            dispatch(getItems(response.data.item));
        }
    } catch (error) {
        dispatch(getItemsFailure(error.response?.data?.error || 'Error during fetching items'));
    }
};

export const getOneItemAsync = id => async(dispatch) => {
    dispatch(clearOneItem());
    try {
        const token = getToken();
        const response = await axios.get(`http://localhost:5000/item/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        dispatch(getOneItem(response.data))

    } catch (error) {
        console.error('Error fetching single item:', error);
    }
};

export const addOneItemAsync = item => async(dispatch) => {
    try{
        const token = getToken();
              
        console.log("Sending request with header..", item);
        const response = await axios.post('http://localhost:5000/item/add', item, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if(response.status === 201) {
            console.log("response Received");
            dispatch(addItem(response.data.item));
            return true;
        }
        
    } catch (error) {
        console.error('Error updating item:', error);
        return false;
    }
}

export const updateOneItemAsync = (id, item) => async(dispatch) => {
    
    try{
        const token = getToken();
        const response = await axios.post(`http://localhost:5000/item/edit/${id}`, item, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        if(response.status === 200) {
            console.log("Response Received");
            dispatch(updateItem(response.data.item, id));
        }
    } catch (error) {
        console.error('Error updating item:', error);
    }
}

export const deleteOneItemAsync = (id) => async(dispatch) => {

    console.log("2. Delete Request ", id);
    
    try{
        const token = getToken();

        console.log("3. Sending Delete Request wiht header");

        const response = await axios.delete(`http://localhost:5000/item/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("4. Deleted Successful ..", response.data.id);

        if(response.status === 200) {
            console.log("Response Received");
            dispatch(deleteItem(response.data.id));
        }
    } catch (error) {
        console.error('Error deleteing item:', error);
    }
}

export const { getItems, addItem, updateItem, deleteItem, getOneItem } = itemSlice.actions;
export const { getItemsFailure } = itemSlice.actions;
export const { getSelectedItem, deleteSelectedItem } = itemSlice.actions;
export const { clearOneItem } = itemSlice.actions;

export default itemSlice.reducer;
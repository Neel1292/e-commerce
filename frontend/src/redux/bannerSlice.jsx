import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    bannerImg: ['/banner1.jpg', '/banner2.jpg', '/banner3.jpg', '/banner4.jpg', '/banner5.jpg']
};

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        setBanners: (state, action) => {
            state.bannerImg.push(action.payload);
        }
    }
})

export const { setBanners } = bannerSlice.actions;

export default  bannerSlice.reducer;
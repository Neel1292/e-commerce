const selectCartItemCount = (state) => {
    return state.carts.cartItems.length;
};

export default selectCartItemCount;
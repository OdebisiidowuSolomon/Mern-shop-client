import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;

      const isExists = state.products.find(e => e.title === action.payload.title)

      if(isExists) {
        console.log(isExists);
        isExists.quantity++
      } else {
        state.products.push(action.payload);
      }

      // state.total += action.payload.price * action.payload.quantity;

      state.total += action.payload.price;
    },

    removeProduct: (state, action) => {
      state.quantity -= 1;

      const isExists = state.products.find(e => e._id === action.payload._id)

      if(isExists) {
        isExists.quantity--
      } else {
        return
      }

      // console.log(state.products.find(e => e.title === action.payload.title));

      state.total -= action.payload.price;
    },
    emptyCart: (state, action) => {
        state = {
          products: [],
          total: 0,
          quantity: 0,
        }
    },
    fillCart: (state, action) => {
      // console.log(action);
        state.products = action.payload.cart[0]?.products || [];
        state.quantity = action.payload.cart[0]?.quantity || 0;
        state.total = action.payload.cart[0]?.total || 0;
        // state = {
        //   ...action.payload.cart[0]
        // }
    },
  },
});

export const {addProduct, removeProduct, emptyCart,fillCart} = cartSlice.actions
export default cartSlice.reducer
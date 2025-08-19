import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value:0,
};

const counterSlice = createSlice ({
  name: "counter",
  initialState,

  reducers :{
    increase: (state)=> {
        state.value++;
    },
    decrease: (state) => {
      state.value--;
    }
  }
});

export const {increase, decrease} = counterSlice.actions;
export default counterSlice.reducer;

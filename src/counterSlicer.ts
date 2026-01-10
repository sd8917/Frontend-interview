import { createSlice } from "@reduxjs/toolkit";


const InitailCounterState = {
    value: 0
}
// manageing the state
const counterSlice = createSlice({
    name: 'counter',
    initialState: InitailCounterState,
    reducers: {
        increasement: (state) => {
            state.value += 1;
        },
        decreasment: (state) => {
            state.value -= 1;
        },
        reset : (state) => {
            state.value = 0;
        }
    }
});

export const {increasement , decreasment, reset} = counterSlice.actions;

export default counterSlice.reducer;
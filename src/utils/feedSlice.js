import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:"",
    reducers:{
        addFeed:(state, action)=>{
            return action.payload
        },
        removeFeed: ()=>null
    }
})


export default feedSlice.reducer
export const {addFeed} = feedSlice.actions
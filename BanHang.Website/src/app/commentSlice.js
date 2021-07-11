import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentApi from "../api/commentApi";
// import commentApi from "../api/commentApi";

export const getAllCommentByProductId = createAsyncThunk(
  "comment/getall",
  async (productId) => {
    const response = await commentApi.getAllCommentByProductId(productId);
    return response;
  }
);
export const createComment = createAsyncThunk(
  "comment/create",
async ( {productId, content, rate}) => {
    const response = await commentApi.createComment( productId, content, rate);
    return response;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    //commentResult: [],
    loading: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    // [getAllCommentByProductId.pending]: (state) => {
      // state.loading = true;
    // },
    // [getAllCommentByProductId.rejected]: (state, action) => {
      // state.loading = false;
      // state.errorMessage = action.error;
    // },
    // [getAllCommentByProductId.fulfilled]: (state, action) => {
      // state.loading = false;
      // state.commentResult = action.payload.result;
    // },
  },
});

const { reducer: commentReducer } = commentSlice;
export default commentReducer;
// export const cartSelector = (state) => state.cart;

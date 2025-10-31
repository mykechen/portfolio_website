import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    askedQuestions: [],
  },
  reducers: {
    addAskedQuestion: (state, action) => {
      const question = action.payload;
      if (!state.askedQuestions.includes(question)) {
        state.askedQuestions.push(question);
      }
    },
    resetAskedQuestions: (state) => {
      state.askedQuestions = [];
    },
  },
});

export const { addAskedQuestion, resetAskedQuestions } = messagesSlice.actions;
export default messagesSlice.reducer;

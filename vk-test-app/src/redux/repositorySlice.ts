import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Repository from "../types/repository";

type repositorySliceType = {
  items: Repository[];
  totalCount: number,
};

const initialState: repositorySliceType = {
  items: [],
  totalCount: 0,
};

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    repositoryReceved: (state, action: PayloadAction<repositorySliceType>) => {
      state.items = action.payload.items;
      if (state.totalCount === initialState.totalCount) {
        state.totalCount = action.payload.totalCount;
      }
    },
    repositoryEdit: (state, action: PayloadAction<{ repository: Repository }>) => {
      const id = action.payload.repository.id
      const modifiedArray = state.items.map((element) => {
        if (element.id === id) {
          return action.payload.repository;
        }
        return element;
      });
      state.items = modifiedArray
    },
    repositoryRemoved: (state, action: PayloadAction<{ repositoryId: number }>) => {
      state.items = state.items.filter(elem => elem.id !== action.payload.repositoryId);
      state.totalCount = state.totalCount - 1
    },
  },
});

export const repositoryRequested = createAction("repository/requested");
export const repositoryRequestFailed = createAction("repository/requestFailed");

const { actions, reducer: repositoryReduser } = repositorySlice;
export const { repositoryReceved, repositoryRemoved, repositoryEdit } = actions;

export default repositoryReduser;

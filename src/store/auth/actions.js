import { authSlice } from "./slice";
const { actions: slice } = authSlice;

export const LogedIn = (token) => (dispatch) => {
    dispatch(slice.LogedIn(token))
}
  
export const LogedOut = () => (dispatch) => {
    dispatch(slice.LogedOut())
}
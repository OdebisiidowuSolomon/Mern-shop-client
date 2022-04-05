import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = (dispatch, user) => {
    dispatch(loginStart());
    publicRequest.post('/auth/login', user)
    .then(({data}) => {
        dispatch(loginSuccess(data));
        console.log(data)
    })
    .catch(err => {
        console.log(err.response)
        dispatch(loginFailure(err.response.data.message || err.message));
    })
    
}
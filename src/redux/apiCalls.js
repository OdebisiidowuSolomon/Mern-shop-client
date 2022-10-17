import { publicRequest } from "../requestMethods";
import { emptyCart } from "./cartRedux";
import { clearState, loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = (dispatch, user) => {
    dispatch(loginStart());
    publicRequest.post('/auth/login', user)
    .then(({data}) => {
        dispatch(loginSuccess(data));
        console.log(data)
    })
    .catch(err => {
        console.log(err.response, 'here')
        dispatch(loginFailure(err.response.data.message || err.message));
    })

}

export const register = (dispatch, newUser) => {
    dispatch(clearState());
    publicRequest.post('/auth/register', newUser)
    .then(({data}) => {
        dispatch(loginSuccess(data));
        console.log(data)
    })
    .catch(err => {
        console.log(err.response)
        dispatch(loginFailure(err.response.data.message || err.message));
    })
}

export const saveProduct = (props,cb) => {
    console.log(props);
    publicRequest.post('/auth/cart', props)
    .then(({data}) => {
        cb()
        console.log(data.cart[0].quantity)
        console.log(data.cart[0].total)
    })
    .catch(err => {
        console.log(err.response)
    })
}

export const getCart = (dispatch, username) => {
    return publicRequest.get('/auth/cart', {
        headers: {
            username
        }
    })
    .then(({data}) => {
        return data
    })
    .catch(err => {
        console.log(err.response)
    })
}


export const logout = (dispatch) => {
    dispatch(clearState());
    dispatch(emptyCart());
}
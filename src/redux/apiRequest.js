import axios from "axios";
import { loginStart, loginFailed, loginSuccess } from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(process.env.REACT_APP_LOGIN_URL, user);
        dispatch(loginSuccess(res.data));
        navigate("/partner");
    } catch (error) {
        console.log("LOGIN ERROR: " + error);
        dispatch(loginFailed());
    }
};

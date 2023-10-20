import React, {  useRef, useState, useEffect } from "react";
import "./LoginSignUp.css"
import Loader from "../../Layout/Loader/Loader"
import {useDispatch,useSelector} from "react-redux"
import { login, register } from "../../../actions/userAction";
import {useNavigate} from "react-router-dom"
import { useAlert } from "react-alert";

const LoginSignUp = () => {
    const {loading,error ,isAuthenticated} = useSelector((state)=> state.user)
    const alert = useAlert()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const { name, email, password } = user

    const registerSubmit =  (e) => {
        e.preventDefault()
         dispatch(register(user))
    }

    function registerDataChange(e) {
        const { name, value } = e.target

        setUser((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const loginSubmit = (e) => {
        e.preventDefault()
       dispatch(login(loginEmail,loginPassword))

    }

    useEffect(() => {
        if (error) {
          alert.error(error)
        }
        if(isAuthenticated){
            navigate("/")
        }
        return () => {
          dispatch({ type: "CLEAR_ERRORS" });
        };
      }, [dispatch, error,isAuthenticated,alert,navigate]);
      


    const switchTabs = (tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };
    return <>
        {loading ? (
            <Loader />
        ) : (
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div>
                        <div className="login_signUp_toggle">
                            <p onClick={() => switchTabs("login")}>LOGIN</p>
                            <p onClick={() => switchTabs("register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <i class="bi bi-envelope"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <i class="bi bi-key"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={registerSubmit}
                    >
                        <div className="signUpName">
                            <i class="bi bi-person"></i>
                            <input
                                type="text"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpEmail">
                            <i class="bi bi-envelope"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signUpPassword">
                            <i class="bi bi-key"></i>
                            <input
                                minLength="8"
                                type="password"
                                placeholder="Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <input type="submit" value="Register" className="signUpBtn" />
                    </form>
                </div>
            </div>
        )
        }
    </>
}
export default LoginSignUp
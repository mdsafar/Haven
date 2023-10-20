import axios from "axios";


const Url = "http://localhost:4000"

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: "REGISTER_USER_REQUEST" })

        const config = { headers: { "Content-Type": "application/json"}, withCredentials: true };

        await axios.post(`${Url}/api/v1/register`, userData, config).then((response) => {

            localStorage.setItem('user',JSON.stringify(response.data.user))

            dispatch({ type: "REGISTER_USER_SUCCESS", payload: response.data.user })

        })
    } catch (err) {
        console.log(err)
        dispatch({ type: "REGISTER_USER_FAIL", payload: err.response.data.message })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "LOGIN_REQUEST" });
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        await axios.post(`${Url}/api/v1/login`, { email, password }, config,).then((response) => {

             localStorage.setItem('user',JSON.stringify(response.data.user))

            dispatch({ type: "LOGIN_SUCCESS", payload: response.data.user });
        })
    } catch (err) {
        console.log(err)
        dispatch({ type: "LOGIN_FAIL", payload: err.response.data.message });
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${Url}/api/v1/logout`,{withCredentials:true}).then(() => {
            localStorage.removeItem('user')
            dispatch({ type: "LOGOUT_SUCCESS" })
        })
    } catch (err) {
        console.log(err)
        dispatch({ type: "LOGOUT_FAIL", payload: err.response.data.message })
    }
}


export const loadUser = ()=> async (dispatch)=>{
    try {
        dispatch({type:"LOAD_USER_REQUEST"})

        await axios.get(`${Url}/api/v1/me`,{withCredentials:true}).then((response) => {
              localStorage.setItem('user',JSON.stringify(response.data.user))
            dispatch({ type: "LOAD_USER_SUCCESS", payload:response.data.user })

        })
    } catch (err) {
        console.log(err)
        dispatch({ type: "LOAD_USER_FAIL", payload: err.response.data.message })
    }

}


export const updateProfile = (userData) => async (dispatch) =>{
    try {
        console.log(userData)
        dispatch({ type: "UPDATE_PROFILE_REQUEST" });
    
        const config = { headers: { "Content-Type": "application/json" },withCredentials:true};

      await axios.put(`${Url}/api/v1/me/update`, userData, config).then((response)=>{

        dispatch({ type: "UPDATE_PROFILE_SUCCESS", payload: response.data.success });
      })

      } catch (err) {
        console.log(err)
        dispatch({
          type: "UPDATE_PROFILE_FAIL",
          payload: err.response.data.message,
        });
      }
}
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: "ALL_USERS_REQUEST" });

      await axios.get(`${Url}/api/v1/admin/users`,{withCredentials:true}).then((response)=>{

        dispatch({ type: "ALL_USERS_SUCCESS", payload: response.data.users });
      })
  
    } catch (err) {
        console.log(err)
      dispatch({ type: "ALL_USERS_FAIL", payload: err.response.data.message });
    }
  };

  export const deleteUser = (id)=> async (dispatch)=> {
     try{
        dispatch({type:"DELETE_USER_REQUEST"})

        await axios.delete(`${Url}/api/v1/admin/user/${id}`,{withCredentials:true}).then((response)=>{

            dispatch({type:"DELETE_USER_SUCCESS",payload:response.data})
        })

     }catch(err){
        console.log(err)
        dispatch({type:"DELETE_USER_FAIL",payload:err.response.data.message})
     }
  }
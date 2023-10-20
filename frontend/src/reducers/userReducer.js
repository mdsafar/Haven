const userFromLocalStorage = localStorage.getItem('user');
let parsedUser = null;

if (userFromLocalStorage !== null) {
  try {
    parsedUser = JSON.parse(userFromLocalStorage);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
}

const initial_state = {
  user: parsedUser,
  isAuthenticated: !!parsedUser,
  loading: false,
}


export const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_USER_REQUEST":
    case "LOAD_USER_REQUEST":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_USER_SUCCESS":
    case "LOAD_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case "LOGOUT_SUCCESS":
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case "LOGIN_FAIL":
    case "REGISTER_USER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOAD_USER_FAIL":
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "LOGOUT_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_PROFILE_REQUEST":
    case "DELETE_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case "UPDATE_PROFILE_FAIL":
    case "DELETE_USER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_PROFILE_RESET":
    case "UPDATE_USER_RESET":
      return {
        ...state,
        isUpdated: false,
      };

    case "DELETE_USER_RESET":
      return {
        ...state,
        isDeleted: false,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "ALL_USERS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ALL_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case "ALL_USERS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
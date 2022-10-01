import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  general: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, general } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      general,
    };
  },
  LOGIN: (state, action) => {
    const { user, general } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      general,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user, general } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      general,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          setSession(accessToken);

          const response = await axios.get('/user/dashboard');
          const { user } = response.data.data;
          const { general } = response.data.data;
          console.log(response.data.data);

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              general,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const response = await axios.post('/login', {
      username,
      password,
    });
    const { accessToken, user, general } = response.data.data;
    console.log('Login Process');
    console.log(response.data);
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        general,
      },
    });
  };

  const register = async (email, password, firstname, username, mobile, lastname) => {
    const response = await axios.post('/register', {
      email,
      password,
      firstname,
      lastname,
      username,
      mobile,
    });
    const { accessToken, user, general } = response.data.data;
    console.log('Register Process');
    console.log(response.data);
    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
        general,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

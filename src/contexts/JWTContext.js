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
  host: null,
  image: null,
  avatar: null,
  sitelogo: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user, general,host,image, avatar,sitelogo } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      host,
      image,
      general,
      avatar,
      sitelogo,
    };
  },
  LOGIN: (state, action) => {
    const { user, general,sitelogo,host,image } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      general,
      sitelogo,
      host,
      image,
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
          const { user,host,general,image, avatar,sitelogo } = response.data.data;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
              general,
              image,
              host,
              avatar,
              sitelogo
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
    const { accessToken, user, general, image, host,sitelogo } = response.data.data;
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        general,
        image,
        host,
        sitelogo,
      },
    });
  };

  const register = async (email, password, firstname, username, mobile, lastname,reference) => {
    const response = await axios.post('/register', {
      email,
      password,
      firstname,
      lastname,
      username,
      mobile,
      reference,
    });
    const { accessToken, user, general } = response.data.data;
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

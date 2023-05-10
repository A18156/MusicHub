/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

const AppContext = React.createContext({});

const createAPI = () => {
  const request = ({ url = "", params, body, method }) => {
    while (url.startsWith("/")) {
      url = url.substring(1);
    }
    var absoluteUrl = "http://localhost:8080/" + url;
    if (params) {
      absoluteUrl += "?" + new URLSearchParams(params).toString();
    }
    // console.log("[client]", method, absoluteUrl, body);
    return fetch(absoluteUrl, {
      method: method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throwError(res.status, res.statusText);
      })
      .then((res) => {
        const { status, message, data } = res;
        // console.log("[client] res", res);
        if (status == 200 || status == 201) {
          return data;
        }
        throwError(status, message);
      });
  };

  const throwError = (code, message) => {
    console.error("[client]", code, message)
    var error = new Error(message);
    error.code = code;
    throw error;
  };
  return {
    get: ({ url, params }) => request({ url, params, method: "GET" }),
    put: ({ url, body }) => request({ url, body, method: "PUT" }),
    post: ({ url, body }) => request({ url, body, method: "POST" }),
    delete: ({ url, params }) => request({ url, params, method: "DELETE" }),
  };
};

const API = createAPI();

const initState = () => {
  const [state, setState] = React.useState({
    isLogin: false,
    isInitialized: false,
    user: null,
  });

  React.useEffect(() => {
    // call api check login?? /user/me
    fetch("http://localhost:8080/api/auth/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("cannot get current user info");
      })
      .then((data) => {
        setState((prev) => ({
          ...prev,
          isInitialized: true,
          isLogin: true,
          user: data,
        }));
      })
      .catch((e) => {
        setState((prev) => ({
          ...prev,
          isInitialized: true,
          isLogin: false,
          user: null,
        }));
      });

    setTimeout(() => {}, 3_000);
  }, []);

  const signIn = ({ username, password }) => {
    return fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error("Login failed");
      })
      .then((data) => {
        console.log("login success");
        setState((prev) => ({ ...prev, isLogin: true, user: data }));
        return data;
      });
  };

  const signOut = () => {
    return fetch("http://localhost:8080/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).finally(() => {
      setState((prev) => ({
        ...prev,
        isInitialized: true,
        isLogin: false,
        user: null,
      }));
    });
  };

  return {
    ...state,
    signIn,
    signOut,
    api: API,
  };
};

const LoadingComponent = ({ loading, title, children }) => {
  return loading ? <div>{title}</div> : children;
};

export const AppContextProvider = ({ children }) => {
  const state = initState();
  return (
    <AppContext.Provider value={state}>
      <LoadingComponent
        loading={!state.isInitialized}
        title={"Init application..."}
      >
        {children}
      </LoadingComponent>
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);

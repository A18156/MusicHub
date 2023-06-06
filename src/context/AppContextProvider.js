/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {useNavigate} from "react-router-dom";

const AppContext = React.createContext({});
const createAPI = () => {
    const request = ({
                         url = "",
                         params,
                         body,
                         method,
                         headers = {
                             "Content-Type": "application/json",
                         }
                     }) => {
        while (url.startsWith("/")) {
            url = url.substring(1);
        }
        let absoluteUrl =  url;
        if (params) {
            absoluteUrl += "?" + new URLSearchParams(params).toString();
        }
        // console.log("[client]", method, absoluteUrl, body);
        return fetch(absoluteUrl, {
            method: method,
            headers: headers,
            credentials: "include",
            body: body ? JSON.stringify(body) : undefined,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return res.json().then(data => {
                    throwError(res.status, data?.message || res.statusText);
                })
            });
    };

    const throwError = (code, message) => {
        console.error("[client]", code, message)
        const error = new Error(message);
        error.code = code;
        throw error;
    };
    return {
        get: ({url, params}) => request({url, params, method: "GET"}),
        put: ({url, body}) => request({url, body, method: "PUT"}),
        post: ({url, body, headers}) => request({url, body, method: "POST", headers}),
        delete: ({url, params}) => request({url, params, method: "DELETE"}),
        upload: (file) => {
            const formData = new FormData();
            formData.append("file", file)
            return fetch("/api/file/upload", {
                method: 'POST',
                body: formData,
                credentials: "include",
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return res.json().then(data => {
                        throwError(res.status, data?.message || res.statusText);
                    })
                });
        }
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
        fetch("/api/auth/me", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
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

        setTimeout(() => {
        }, 3_000);
    }, []);

    const signIn = ({username, password}) => {
        return fetch("/api/auth/signin", {
            method: "POST",
            body: JSON.stringify({username, password}),
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
                // console.log("login success");
                setState((prev) => ({...prev, isLogin: true, user: data}));
                return data;
            });
    };

    const signOut = () => {
        return fetch("/api/auth/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .catch()
            .finally(() => {
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

const LoadingComponent = ({loading, title, children}) => {
    return loading ? <div>{title}</div> : children;
};

export const AppContextProvider = ({children}) => {
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

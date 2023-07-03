import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const getStorageObject = (user) => {
  try {
    return JSON.parse(localStorage.getItem(user));
  } catch (error) {}
};

export function AuthProvider({ children }) {
  let [user, setUser] = useState(() => localStorage.getItem("user"));
  let [token, setToken] = useState(() => localStorage.getItem("token"));

  const navigate = useNavigate();

  const isAuthorized = Boolean(token);
  console.log(
    "token = ",
    localStorage.getItem("token"),
    token,
    "user = ",
    localStorage.getItem("user"),
    user
  );

  const saveUser = useCallback(
    async ({ token, userId }) => {
      setUser(userId);
      setToken(token);

      localStorage.setItem("token", token);
      localStorage.setItem("user", userId);

      navigate("/notes");
    },
    [navigate]
  );
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(undefined);
    setUser(undefined);
    navigate("/login");

    // fetch(`${url}/logout`, {
    //     methos:"POST",
    //     headers: {
    //         "Content-type": "application/json",
    //         Authorization: token,
    //       },
    // })
    // .then((res) => res.json())
    // .then((res) => {
    //     localStorage.removeItem('token')
    //     localStorage.removeItem('user')
    //     navigate.push("/login")
    // })
  }, [navigate]);

  const value = useMemo(
    () => ({
      token,
      user,
      saveUser,
      logout,
      isAuthorized,
    }),
    [isAuthorized, saveUser, logout, token, user]
  );

  console.log(children);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// alias for the useContext
export function useAuth() {
  return useContext(AuthContext);
}

import React, { createContext, useState, ReactNode, useContext } from "react";

//state variables
interface userState {
  firstName: string;
  lastName: string;
  userName: string;
  location: string;
  profileImage: string;
  coverImage: string;
  email: string;
  password: string;
  userPosts: string;
  userFollowers: string;
  userFollows: string;
}

//user context
const UserContext = createContext<
  | {
      state: userState;
      setState: (state: userState) => void;
    }
  | undefined
>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

//user context provider
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, setState] = useState<userState>({
    firstName: "",
    lastName: "",
    userName: "",
    location: "",
    profileImage: "",
    coverImage: "",
    email: "",
    password: "",
    userPosts: "",
    userFollowers: "",
    userFollows: "",
  });

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

//custom hook
export const userData = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};

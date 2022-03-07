import React from "react";
import { createContextAndProvider } from "./context";
import {createValues, deleteValues, retrieveValues} from "../helpers/localStorage";

export type Session = {
    isAuthenticated: boolean;
    token: string;
    userType: string;
    username: string;
    email: string;
    userId: string;
};

type HandleSession = (session?: Session) => void;
type Context = [Session, HandleSession];

const sessionHookAndProvider = createContextAndProvider<Context>();
const [useSession, SessionContextProvider] = sessionHookAndProvider;

const SessionProvider: React.FC = ({ children }) => {
    const defaultValues = {
        isAuthenticated: false,
        token: "",
        userType: "",
        username: "",
        email: "",
        userId: ""
    };
    const initialState = retrieveValues() ||  defaultValues

    const [session, setSession] = React.useState<Session>(initialState);

    const handleSession: HandleSession = (session) => {
        if (session === undefined) {
            deleteValues();
            setSession({
                ...defaultValues
            });
            return;
        }

        session.isAuthenticated = true;
        createValues(session);
        setSession(session);
    };
    return <SessionContextProvider value={[session, handleSession]}>{children}</SessionContextProvider>;
};

export { useSession, SessionProvider };

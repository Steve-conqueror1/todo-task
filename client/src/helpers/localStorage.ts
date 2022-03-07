import { Session } from "./../context/session.context";

export function createValues(session: Session): void {
    const { userType, username, token, userId } = session;
    localStorage.setItem("userType", userType);
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("email", token);
    localStorage.setItem("userId", userId);
}

export function retrieveValues(): Session {
    const userType = localStorage.getItem("userType") || "";
    const token = localStorage.getItem("token") || "";
    const username = localStorage.getItem("username") || "";
    const email = localStorage.getItem("email") || "";
    const userId = localStorage.getItem("userId") || "";

    return {
        isAuthenticated: Boolean(token),
        username,
        userType,
        token,
        email,
        userId
    };
}

export function deleteValues(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
}

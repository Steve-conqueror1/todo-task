import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {SessionProvider} from "./context/session.context";

ReactDOM.render(
    <SessionProvider>
        <App />
    </SessionProvider>,
    document.getElementById("root"),
);
reportWebVitals();

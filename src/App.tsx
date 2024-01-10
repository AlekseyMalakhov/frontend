import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import Loading from "./components/Loading";

function App() {
    return (
        <React.Fragment>
            <RouterProvider router={router} />
            <Loading />
        </React.Fragment>
    );
}

export default App;

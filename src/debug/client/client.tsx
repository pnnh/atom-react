import * as React from "react";
import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import {StrictMode} from "react";
import {ButtonPage} from "./button";

export function DevApp() {
    return (
        <div style={{width: '48rem'}}>

        </div>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (<DevApp/>),
    },
    {
        path: "/button",
        element: (<ButtonPage/>),
    },
]);

const rootElement = document.getElementById("root")
if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);

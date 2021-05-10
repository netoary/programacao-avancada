import React from "react";
import useTitle from "../hooks/use-title";

export default function Dashboard() {
    useTitle("Dashboard");

    return (
        <div>
            <h1>Dashboard</h1>
            <button type="button">Exportar para Excel</button>
        </div>
    );
}

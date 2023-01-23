import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState();

    const urlWithProxy = "/api/v1";

    const getDataFromServer = () => {
        axios
            .get(urlWithProxy)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log("error");
            });
    };

    useEffect(() => {
        getDataFromServer();
    }, [data]);

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{data}</p>
        </div>
    );
}

export default App;

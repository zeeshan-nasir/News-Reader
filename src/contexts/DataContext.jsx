import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
    const [news, setNews] = useState([]);

    const getData = (data) => {
        setNews(data);
    };

    return (
        <DataContext.Provider value={{ news, getData }}>
            {children}
        </DataContext.Provider>
    );
};

import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
    const [generalSettings, setGeneralSettings] = useState({
            token: 'empty',
            username: 'user',
            role: 'user', 
            isLoggedIn: false,
    });

    const [industrySettings, setIndustrySettings] = useState({  
        periodName: 'empty',
        year: 2020,
        month: 1,
        biweekly: 1,
        startDate: "2024-02-01",
        endDate: "2024-02-07",
        limitDate: "2024-02-15",
        status: 'undefined',
        industryOptions: ['option1'],
        availableYears: [2022, 2023, 2024],
    });

    const [themeMode, setThemeMode] = useState('light');

    const updateGeneralSettings = (newSettings) => {
        setGeneralSettings({...generalSettings, ...newSettings});
    };

    const updateIndustrySettings = (newSettings) => {
        setIndustrySettings({...industrySettings, ...newSettings});
    };

    const toggleTheme = () => {
        setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ApiContext.Provider value={{ generalSettings, updateGeneralSettings,
            industrySettings, updateIndustrySettings, themeMode, toggleTheme}}>
            {children}
        </ApiContext.Provider>
    );
};

const useApiContext = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApiContext must be used within an ApiProvider');
    }
    return context
};

export { ApiProvider, useApiContext };

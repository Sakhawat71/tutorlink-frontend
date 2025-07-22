"use client";

import { createContext, useContext } from "react";

export const TutorContext = createContext(null);

export const TutorProvider = ({ tutor, children }: any) => {
    return (
        <TutorContext.Provider value={tutor}>
            {children}
        </TutorContext.Provider>
    );
};

export const useTutor = () => useContext(TutorContext);

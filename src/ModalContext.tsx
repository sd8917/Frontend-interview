import React, { createContext, useContext, useState } from "react";

export type Modal = {
 id: string;
 content : React.ReactNode;
}

export type ModalContextType = {
    openModel : (content : React.ReactNode) => void;
    closeModel: (id: string) => void;
}


export const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => useContext(ModalContext)!;

import { createContext } from "react";
import {
    SmoothEditInputConfig,
    SmoothEditNavBarConfig,
    SmoothEditScrollAreaConfig,
} from "./config";

type SmoothEditContext = {
    editMode: boolean;
    editTrigger: string | null;
    activateEditMode: (id?: string) => void;
    deactivateEditMode: () => void;
    setNavBarRootElement: (node: HTMLElement | null) => void;
    setScrollAreaRootElement: (node: HTMLElement | null) => void;
    setTopBufferRootElement: (node: HTMLElement | null) => void;
    setBottomBufferRootElement: (node: HTMLElement | null) => void;
    setInputRootElement: (id: string, node: HTMLElement | null) => void;
    setInputContentElement: (id: string, node: HTMLElement | null) => void;
    setNavBarConfig: (config: SmoothEditNavBarConfig | null) => void;
    setScrollAreaConfig: (config: SmoothEditScrollAreaConfig | null) => void;
    setInputConfig: (id: string, config: SmoothEditInputConfig | null) => void;
};

export const SmoothEditContext = createContext<SmoothEditContext>({
    editMode: false,
    editTrigger: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    activateEditMode: (id?: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    deactivateEditMode: () => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setNavBarRootElement: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setScrollAreaRootElement: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setTopBufferRootElement: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setBottomBufferRootElement: (node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setInputRootElement: (id: string, node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setInputContentElement: (id: string, node: HTMLElement | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setNavBarConfig: (config: SmoothEditNavBarConfig | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setScrollAreaConfig: (config: SmoothEditScrollAreaConfig | null) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setInputConfig: (id: string, config: SmoothEditInputConfig | null) => {},
});

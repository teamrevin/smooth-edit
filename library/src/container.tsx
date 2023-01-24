import React, {
    useCallback,
    useMemo,
    useState,
    useRef,
    ReactNode,
} from "react";
import { SmoothEditInputConfig } from "./config";
import { SmoothEditContext } from "./context";
import { detectCssTransitionEnd } from "./utils/css-transition";
import { fixElementContentPosition } from "./utils/fix-element";

export function SmoothEditContainer({
    children,
}: {
    children: ReactNode;
}): JSX.Element {
    // edit mode transition management
    const transition = useRef(false);

    const handleTransition = useCallback((id: string) => {
        // skip if already in transition
        if (transition.current) {
            return;
        }

        // get refs to elements
        const inputContent = refs.current.inputContent.get(id);
        const { scrollAreaRoot, topBufferRoot, bottomBufferRoot } =
            refs.current;

        if (
            !inputContent ||
            !scrollAreaRoot ||
            !topBufferRoot ||
            !bottomBufferRoot
        ) {
            console.error("edit mode transition: could not find element refs");
            return;
        }

        // mark transition as active
        transition.current = true;

        // fix element content position
        const stopFixation = fixElementContentPosition(
            inputContent,
            scrollAreaRoot,
            topBufferRoot,
            bottomBufferRoot
        );

        // detect end of transition
        detectCssTransitionEnd(scrollAreaRoot, 250, () => {
            // stop fixation
            stopFixation();

            // mark transition as inactive
            transition.current = false;

            // print debug info
            console.log("edit mode transition: finished");
        });
    }, []);

    // edit mode management
    const [editMode, setEditMode] = useState(false);

    const activateEditMode = useCallback(
        (id?: string) => {
            if (!editMode) {
                if (id) {
                    handleTransition(id);
                }
                setEditMode(true);
            }
        },
        [editMode, handleTransition]
    );

    const deactivateEditMode = useCallback(() => {
        setEditMode(false);
    }, []);

    // reference handling
    const refs = useRef<{
        navBarRoot: HTMLElement | null;
        scrollAreaRoot: HTMLElement | null;
        topBufferRoot: HTMLElement | null;
        bottomBufferRoot: HTMLElement | null;
        inputContent: Map<string, HTMLElement>;
    }>({
        navBarRoot: null,
        scrollAreaRoot: null,
        topBufferRoot: null,
        bottomBufferRoot: null,
        inputContent: new Map(),
    });

    const setNavBarRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.navBarRoot = node;
    }, []);

    const setScrollAreaRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.scrollAreaRoot = node;
    }, []);

    const setTopBufferRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.topBufferRoot = node;
    }, []);

    const setBottomBufferRootRef = useCallback((node: HTMLElement | null) => {
        refs.current.bottomBufferRoot = node;
    }, []);

    const setInputContentRef = useCallback(
        (id: string, node: HTMLElement | null) => {
            if (node) {
                refs.current.inputContent.set(id, node);
            } else {
                refs.current.inputContent.delete(id);
            }
        },
        []
    );

    // input config handling
    const inputConfig = useRef(new Map<string, SmoothEditInputConfig>());

    const setInputConfig = useCallback(
        (id: string, config: SmoothEditInputConfig) => {
            inputConfig.current.set(id, config);
        },
        []
    );

    // create context value
    const context = useMemo(
        () => ({
            editMode,
            activateEditMode,
            deactivateEditMode,
            setNavBarRootRef,
            setScrollAreaRootRef,
            setTopBufferRootRef,
            setBottomBufferRootRef,
            setInputContentRef,
            setInputConfig,
        }),
        [
            editMode,
            activateEditMode,
            deactivateEditMode,
            setNavBarRootRef,
            setScrollAreaRootRef,
            setTopBufferRootRef,
            setBottomBufferRootRef,
            setInputContentRef,
            setInputConfig,
        ]
    );

    // render context
    return (
        <SmoothEditContext.Provider value={context}>
            {children}
        </SmoothEditContext.Provider>
    );
}

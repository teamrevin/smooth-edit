import { CreateTransitionTracker, transitionTrackerFactory } from "./factory";

export const createCssAnimationTracker: CreateTransitionTracker =
    transitionTrackerFactory(function ({
        addActiveTransition,
        removeActiveTransition,
    }) {
        function registerEventListener(element: HTMLElement): void {
            element.addEventListener("animationstart", onAnimationStart);
            element.addEventListener("animationiteration", onAnimationStart);
            element.addEventListener("animationend", onAnimationStop);
            element.addEventListener("animationcancel", onAnimationStop);
        }

        function unregisterEventListener(element: HTMLElement): void {
            element.removeEventListener("animationstart", onAnimationStart);
            element.removeEventListener("animationiteration", onAnimationStart);
            element.removeEventListener("animationend", onAnimationStop);
            element.removeEventListener("animationcancel", onAnimationStop);
        }

        function onAnimationStart({ target, animationName }: AnimationEvent) {
            if (target) {
                addActiveTransition(target, animationName);
            }
        }

        function onAnimationStop({ target, animationName }: AnimationEvent) {
            if (target) {
                removeActiveTransition(target, animationName);
            }
        }

        return {
            registerEventListener,
            unregisterEventListener,
        };
    });

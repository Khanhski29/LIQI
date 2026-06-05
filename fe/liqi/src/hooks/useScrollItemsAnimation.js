import { animate, createScope, stagger } from "utils/anime";
import { useCallback, useEffect, useRef } from "react";

export function useScrollItemsAnimation(containerRef, itemsKey = "", itemSelector = ".product-item") {
    const scopeRef = useRef(null);
    const inViewRef = useRef(false);

    const playAnimation = useCallback(() => {
        if (!containerRef.current?.querySelector(itemSelector)) return;

        scopeRef.current?.revert();
        scopeRef.current = createScope({ root: containerRef }).add(() => {
            animate(itemSelector, {
                opacity: [0, 1],
                translateY: [32, 0],
                delay: stagger(80, { start: 80 }),
                duration: 550,
                ease: "out(3)",
            });
        });
    }, [containerRef, itemSelector, itemsKey]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (inViewRef.current) return;
                    inViewRef.current = true;
                    playAnimation();
                    return;
                }

                if (!inViewRef.current) return;
                inViewRef.current = false;
                scopeRef.current?.revert();
                scopeRef.current = null;
            },
            { threshold: 0.15 }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            scopeRef.current?.revert();
            scopeRef.current = null;
            inViewRef.current = false;
        };
    }, [containerRef, playAnimation]);

    useEffect(() => {
        if (!inViewRef.current) {
            scopeRef.current?.revert();
            scopeRef.current = null;
            return;
        }

        playAnimation();
    }, [itemsKey, playAnimation]);
}

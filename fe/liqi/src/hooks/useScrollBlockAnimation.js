import { animate, createScope, stagger } from "utils/anime";
import { useCallback, useEffect, useRef } from "react";

const LAYOUT = {
    textLeft: {
        titleFrom: -48,
        lineFrom: -32,
        pictureFrom: 56,
    },
    textRight: {
        titleFrom: 48,
        lineFrom: 32,
        pictureFrom: -56,
    },
};

const clearFloating = (blockRef) => {
    blockRef.current?.querySelectorAll(".home-block__picture--floating").forEach((el) => {
        el.classList.remove("home-block__picture--floating");
    });
};

export function useScrollBlockAnimation(blockRef, layout = "textLeft") {
    const scopeRef = useRef(null);
    const inViewRef = useRef(false);

    const playAnimation = useCallback(() => {
        const { titleFrom, lineFrom, pictureFrom } = LAYOUT[layout] ?? LAYOUT.textLeft;

        clearFloating(blockRef);
        scopeRef.current?.revert();
        scopeRef.current = createScope({ root: blockRef }).add(() => {
            animate(".home-block__title", {
                opacity: [0, 1],
                translateX: [titleFrom, 0],
                duration: 850,
                ease: "out(3)",
            });

            animate(".home-block__line", {
                opacity: [0, 1],
                translateX: [lineFrom, 0],
                delay: stagger(110, { start: 280 }),
                duration: 650,
                ease: "out(3)",
            });

            animate(".home-block__cta", {
                opacity: [0, 1],
                scale: [0.9, 1],
                delay: 720,
                duration: 550,
                ease: "out(3)",
            });

            animate(".home-block__picture img", {
                opacity: [0, 1],
                translateX: [pictureFrom, 0],
                duration: 950,
                ease: "out(3)",
                onComplete: () => {
                    blockRef.current
                        ?.querySelectorAll(".home-block__picture")
                        .forEach((picture) => picture.classList.add("home-block__picture--floating"));
                },
            });
        });
    }, [blockRef, layout]);

    useEffect(() => {
        const block = blockRef.current;
        if (!block) return;

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
                clearFloating(blockRef);
                scopeRef.current?.revert();
                scopeRef.current = null;
            },
            { threshold: 0.2 }
        );

        observer.observe(block);

        return () => {
            observer.disconnect();
            clearFloating(blockRef);
            scopeRef.current?.revert();
            scopeRef.current = null;
            inViewRef.current = false;
        };
    }, [blockRef, playAnimation]);
}

import { createScope } from "animejs";
import { useEffect, useRef } from "react";

/**
 * Gắn anime.js vào một vùng DOM trong component React.
 * Tự cleanup khi unmount.
 *
 * @example
 * const { rootRef, scopeRef } = useAnimeScope((self) => {
 *   animate(".card", { opacity: [0, 1], delay: stagger(100) });
 *   self.add("replay", () => animate(".card", { translateY: [-20, 0] }));
 * });
 *
 * return <div ref={rootRef}>...</div>;
 */
export function useAnimeScope(setup, deps = []) {
    const rootRef = useRef(null);
    const scopeRef = useRef(null);

    useEffect(() => {
        if (!rootRef.current) return;

        scopeRef.current = createScope({ root: rootRef }).add(setup);

        return () => {
            scopeRef.current?.revert();
            scopeRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return { rootRef, scopeRef };
}

import { useState, useEffect, useRef } from "react";

export const useInView = (options = {}) => {
    const { rootMargin = "250px" } = options;
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element || typeof IntersectionObserver === "undefined") {
            setIsInView(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, { rootMargin });

        observer.observe(element);
        return () => observer.disconnect();
    }, [rootMargin]);

    return [ref, isInView];
};

export default useInView;

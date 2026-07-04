import { useEffect, useRef } from "react";

export function useInfiniteScroll(callback: () => void) {

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {

            if (entry.isIntersecting) {
                callback();
            }
        }, { threshold: 1 });

        const element = ref.current;
        // console.log('element == ', element);

        if (element) {
            observer.observe(element);
        }

        //cleanup 
        return () => {
            if (element) observer.unobserve(element);
            observer.disconnect();
        }
    }, [callback])

    return ref;
}
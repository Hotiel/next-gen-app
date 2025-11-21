import { useEffect, useRef } from 'react'

export function useOutsideClick(handler) {
    const ref = useRef(null);

    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
        handler(event);
        };
        window.addEventListener('mousedown', listener);
        window.addEventListener('touchstart', listener);
        return () => {
        window.removeEventListener('mousedown', listener);
        window.removeEventListener('touchstart', listener);
        };
        }, [handler]);
    
    return ref;
}

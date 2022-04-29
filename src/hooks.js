import { useState, useEffect } from 'react';

// hook that binds intersection observer
export const useOnScreen = options => {
      
    const [ref, setRef] = useState(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {

        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
        }, options);

        if(ref){
            observer.observe(ref);
        };

        return () => {
            if(ref){
                observer.unobserve(ref);
            }
        }
    }, [options, ref]);

    return [visible, setRef, ref];
};
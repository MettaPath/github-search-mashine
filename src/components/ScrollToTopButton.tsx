import React, { useState, useEffect } from "react";

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        });
    };

    return (
        <>
            {isVisible &&
                <button
                    className="fixed right-5 bottom-5 z-50 text-sm px-5 py-2 mb-1 h-fit bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all shadow-md"
                    onClick={() => scrollToTop()}
                >
                    &#8593;
                </button>
            }
        </>
    );
};

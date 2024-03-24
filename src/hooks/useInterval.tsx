import { useEffect, useState } from "react";

export const useInterval = (callback, delay: number) => {
    useEffect(() => {
        const timer = setInterval(callback, delay);
        return () => clearInterval(timer);
    }, [delay]);
};

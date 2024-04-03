import { useEffect, useState } from "react";
import { Logo, Logos } from "./Logo";

export const LoadingScreen = (props: { ready: boolean; logo?: Logos }) => {
    const { ready = false, logo = Logos.bigAnimated } = props;
    const [temp, setTemp] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setTemp(ready);
        }, 500);
    }, [ready]);

    return (
        <div
            className={`absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 z-10 loading-screen overflow-hidden ${
                temp ? "done" : ""
            }`}
        >
            <div className="loader-splitter bg-black h-1/2 w-full absolute top-0" />
            <div className="loader-splitter bg-black h-1/2 w-full absolute bottom-0" />
            <Logo variant={logo} className="absolute logo bottom-3 right-3" />
        </div>
    );
};

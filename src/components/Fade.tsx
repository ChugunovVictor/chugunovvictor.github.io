import React, { useState } from 'react'
import { NavigateFunction } from "react-router-dom";
import { on, off } from '../utils/events';
import { delay } from '../utils/other';

export const navigateWithFade = (route: string, navigate: NavigateFunction) => {
    const fadeIn = new CustomEvent("fadeIn", {});
    document.dispatchEvent(fadeIn);

    delay(125).then(() => {
        navigate(route)

        const fadeOut = new CustomEvent("fadeOut", {});
        document.dispatchEvent(fadeOut);
    });
}

const Fade = () => {
    // -1 => fade out
    //  0 => idle
    //  1 => fade in 

    const [show, setShow] = useState(0)

    React.useEffect(() => {
        on("fadeIn", () => setShow(1));
        on("fadeOut", () => setShow(-1));

        return () => {
            off("fadeIn", () => setShow(1));
            off("fadeOut", () => setShow(-1));
        }
    }, []);

    const classList = `Fade ${(show > 0) ? 'animation-fade-in visible' : ((show < 0) ? 'animation-fade-out invisible' : 'idle')}`

    return (
        <div className={classList}></div>
    );
}

export default Fade
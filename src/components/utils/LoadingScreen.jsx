import { useEffect, useState } from "react";

export function LoadingScreen() {

    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);
    
    useEffect (() => {
        const timer = setTimeout(() => setFading(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleFadeEnd = () => {
        if (fading) setVisible(false);
    };

    if (!visible) return null;


    return (
    <>
    <div className={`loadingScreen ${fading ? 'fadeout' : ''}`} onClick={() => setVisible(false)}>
        <img src="../../logopng.png" className="loadingLogo" alt="logo Next Gen" />
    </div>
    </>

)
}

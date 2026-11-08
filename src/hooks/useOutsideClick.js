import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
    const ref = useRef();
    useEffect(
        function() {
            function handleClick(e) {
                // ref.current nam je uvek <StyledModal ref={ref}> jer smo u njega ubacili ref
                // ref.current je undefined kada god mozemo da kliknemo na Add new cabin jer tada Modal.Window ne postoji u DOM-u
                // Gasi se Modal.Window milisekundu nakon otvaranja kada kliknemo Add new cabin dugme ako je bubbling(sto ovde nije slucaj)
                if(ref.current && !ref.current.contains(e.target)) {
                console.log('click outside detected');
                handler();
                }
            }
            document.addEventListener('click', handleClick, listenCapturing);
            return () => document.removeEventListener('click', handleClick, listenCapturing);
        },
        [handler, listenCapturing]
    )
    return ref;
}
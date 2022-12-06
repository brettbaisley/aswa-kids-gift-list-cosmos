import React, {useState} from "react";

const Modal = ( {openText, children} ) => {
    const [shouldShow, setShouldShow] = useState(false);

    return (
        <>
        <button onClick={() => setShouldShow(true)}>{openText}</button>
            {shouldShow && (
                <div className="modal-background" onClick={() => setShouldShow(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShouldShow(false)}>Hide</button>
                        {children} 
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;
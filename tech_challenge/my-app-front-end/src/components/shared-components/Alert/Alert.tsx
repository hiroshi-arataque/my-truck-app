import { SetStateAction } from 'react';
import './Style.css';

interface AlertProps {
    setIsAlertVisible: React.Dispatch<SetStateAction<boolean>>;
    setConfirmation: React.Dispatch<SetStateAction<boolean>>;
    modalCalledFrom: string;
}

function Alert({ setConfirmation, setIsAlertVisible, modalCalledFrom }: AlertProps) {

    return (
        <div className="Alert-container">
            <div className={modalCalledFrom === 'update' ? "Table-cell-modal-update" : "Table-cell-modal-delete"}>
                <div className="Modal-button-close" onClick={() => setIsAlertVisible(false)} />
                <h1>Please confirm your action.</h1>
                <button className={'Form-element Form-button'} onClick={() => { setConfirmation(true); setIsAlertVisible(false) }}>Confirm</button>
                <button className={'Form-element Form-button'} onClick={() => setIsAlertVisible(false)}>Cancel</button>
            </div>
        </div >
    );
}

export default Alert;

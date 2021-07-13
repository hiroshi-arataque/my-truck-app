import { SetStateAction } from 'react';
import './Style.css';

interface MessageModalProps {
    title: string;
    message: string;
    setIsMessageModalVisible: React.Dispatch<SetStateAction<boolean>>;
}

function MessageModal({ title, message, setIsMessageModalVisible }: MessageModalProps) {

    return (
        <div className="Alert-container">
            <div className="Table-cell-modal-message">
                <div className="Modal-button-close" onClick={() => setIsMessageModalVisible(false)} />
                <h1>{title}</h1>
                <p>{message}</p>
                <button className={'Form-element Form-button'} onClick={() => setIsMessageModalVisible(false)}>Ok</button>
            </div>
        </div >
    );
}

export default MessageModal;

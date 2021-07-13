import './Style.css';
import deleteIcon from '../../../assets/delete-icon.svg';
import editIcon from '../../../assets/edit-icon.svg';
import { SetStateAction, useEffect, useState } from 'react';
import Truck from 'interfaces/Truck';
import TruckListService from 'services/truckListService';
import fetchTruckList from 'shared-functions/fetchTruckList';
import Alert from '../Alert/Alert';
import MessageModal from '../MessageModal/MessageModal';

interface props {
    row: Truck;
    header: string | number;
    cell: string | number;
    index: string | number;
    setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
    cellStyle: string;
    setAction: React.Dispatch<SetStateAction<string>>;
    setTruck: React.Dispatch<SetStateAction<Truck>>;
    setTruckList: React.Dispatch<SetStateAction<Array<Truck>>>;
}

function Cell({ row, header, cell, index, setIsFormVisible, cellStyle, setAction, setTruck, setTruckList }: props) {
    const [confirmation, setConfirmation] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [messageModalVisible, setIsMessageModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [modalCalledFrom, setModalCalledFrom] = useState('');

    const editTruckBtnEvent = () => {
        setTruck(row);
        setAction('update');
        setIsFormVisible(true);
    }

    useEffect(() => {
        if (confirmation) deleteTruckBtnEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmation]);

    const deleteTruckBtnEvent = () => {
        setIsMessageModalVisible(true);
        setMessageTitle('Row successfully removed from database!');
        setMessage('Your operation was successful!');
        setTimeout(() => {
            TruckListService.removeTruck(row as Truck)
                .then(async () => {
                    const list = await fetchTruckList();
                    setTruckList(list);
                    setIsFormVisible(false);
                })
                .catch(error => {
                    setIsFormVisible(false);
                    setIsMessageModalVisible(true);
                    setMessageTitle('Deletion Failure.');
                    setMessage('Your operation has failed. See the following logs for more details: ' + error);
                });;
        }, 3000)
    }

    const deleteButtonClicked = () => setIsAlertVisible(true);

    return (
        <>
            {messageModalVisible && <MessageModal setIsMessageModalVisible={setIsMessageModalVisible} title={messageTitle} message={message} />}
            {isAlertVisible && <Alert setIsAlertVisible={setIsAlertVisible} setConfirmation={setConfirmation} modalCalledFrom={modalCalledFrom} />}
            {header === 'action' ? (
                <div className={"Table-column " + cellStyle} key={`cell-${header}-${index}`}>
                    <img
                        id={`icon-${header}-${index}`}
                        src={editIcon}
                        className="Table-cell-icon"
                        alt="editIcon"
                        onClick={e => { editTruckBtnEvent(); setModalCalledFrom('update') }} />
                    <img
                        id={`icon-${header}-${index}`}
                        src={deleteIcon}
                        className="Table-cell-icon"
                        alt="deleteIcon"
                        onClick={e => { deleteButtonClicked(); setModalCalledFrom('delete') }} />

                </div>
            ) :
                <div className={"Table-column " + cellStyle} key={`cell-${header}-${index}`}>
                    {cell}
                </div>
            }
        </>
    );
}

export default Cell;

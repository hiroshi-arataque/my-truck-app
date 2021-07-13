import { SetStateAction, useEffect, useState } from 'react';
import './Style.css';
import TruckListService from 'services/truckListService';
import Truck from 'interfaces/Truck';
import fetchTruckList from 'shared-functions/fetchTruckList';
import Form from '../Form';
import Alert from 'components/shared-components/Alert/Alert';
import MessageModal from 'components/shared-components/MessageModal/MessageModal';


interface UpdateFormProps {
  setTruckList: React.Dispatch<SetStateAction<Array<Truck>>>;
  setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
  setTruck: React.Dispatch<SetStateAction<Truck>>;
  truck: Truck;
}

function UpdateForm({ setIsFormVisible, setTruckList, setTruck, truck }: UpdateFormProps) {
  const [title,] = useState('Update Truck ID: ' + truck.id);
  const [confirmation, setConfirmation] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [messageModalVisible, setIsMessageModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [isModelyearValid, setIsModelyearValid] = useState(true);
  const [isProductionyearValid, setIsProductionyearValid] = useState(true);


  useEffect(() => {
    if (confirmation) updateTruck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmation]);

  const updateTruck = async () => {
    if(validateFields) {
      setMessageTitle('Update Successful');
      setMessage('Your change was successfully done!');
      setIsMessageModalVisible(true);
      setTimeout(()=>{
        TruckListService.updateTruck(truck as Truck)
          .then(async () => {
            setTruck({} as Truck);
            const list = await fetchTruckList();
            setTruckList(list);
            setIsFormVisible(false);
            return list;
          })
          .catch(error => {
            setIsFormVisible(false);
            setMessageTitle('Update failure.');
            setMessage('Your operation has failed. See the following logs for more details: ' + error);
          });
      }, 3000)
    }
  }

  const updateButtonClicked = () => setIsAlertVisible(true);

  const validateFields = () => {
    let isValid = true;
    //validate model year
    if ((truck?.modelYear == null) ||
      (Number(truck?.modelYear) >= Number(new Date().getFullYear()))) {
      setIsModelyearValid(false);
      isValid = false;
    } else setIsModelyearValid(true);

    //validate production year
    if ((truck?.productionYear == null) ||
      (Number(truck?.productionYear) !== Number(new Date().getFullYear()))) {
      setIsProductionyearValid(false);
      isValid = false;
    } else setIsProductionyearValid(true);
    return isValid;
  }

  return (
    <div className="Form-container">
      {messageModalVisible && <MessageModal setIsMessageModalVisible={setIsMessageModalVisible} title={messageTitle} message={message}/>}
      <Form setTruck={setTruck} truck={truck} title={title} isModelyearValid={isModelyearValid} isProductionyearValid={isProductionyearValid}/>
      {isAlertVisible && <Alert setIsAlertVisible={setIsAlertVisible} setConfirmation={setConfirmation} modalCalledFrom={'update'}/>}
      <button className={'Form-element Form-button'} onClick={e => updateButtonClicked()}>Update</button>
    </div >
  );
}

export default UpdateForm;

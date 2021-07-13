import { SetStateAction, useState } from 'react';
import './Style.css';
import TruckListService from 'services/truckListService';
import Truck from 'interfaces/Truck';
import fetchTruckList from 'shared-functions/fetchTruckList';
import Form from '../Form';
import MessageModal from 'components/shared-components/MessageModal/MessageModal';


interface RegisterFormProps {
  setTruckList: React.Dispatch<SetStateAction<Array<Truck>>>;
  setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
  setTruck: React.Dispatch<SetStateAction<Truck>>;
  truck: Truck;
}

function RegisterForm({ setIsFormVisible, setTruckList, setTruck, truck }: RegisterFormProps) {
  const [title,] = useState('Truck Registration');
  const [messageModalVisible, setIsMessageModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [isModelyearValid, setIsModelyearValid] = useState(true);
  const [isProductionyearValid, setIsProductionyearValid] = useState(true);

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
  const registerTruck = async () => {
    if (validateFields()){
      setIsMessageModalVisible(true);
      setMessageTitle('Truck data successfully registered!');
      setMessage('Your operation was successful! Go to truck list to see other entries.');
      setTimeout(() => {
        TruckListService.registerTruck(truck as Truck)
          .then(async () => {
            setTruck({} as Truck);
            const list = await fetchTruckList();
            setTruckList(list);
            setIsFormVisible(false);
          })
          .catch(error => {
            setIsFormVisible(false);
            setIsMessageModalVisible(true);
            setMessageTitle('Registration failure.');
            setMessage('Your operation has failed. See the following logs for more details: ' + error);
          });;
      }, 3000)
    }
  }

  return (
    <div className="Form-container">
      {messageModalVisible && <MessageModal setIsMessageModalVisible={setIsMessageModalVisible} title={messageTitle} message={message}/>}
      <Form setTruck={setTruck} truck={truck} title={title} isModelyearValid={isModelyearValid} isProductionyearValid={isProductionyearValid}/>
      <button className={'Form-element Form-button'} onClick={e => registerTruck()}>Register</button>
    </div >
  );
}

export default RegisterForm;

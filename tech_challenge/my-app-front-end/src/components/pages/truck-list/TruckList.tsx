import { useEffect, useState } from 'react';
import './Style.css';
import Table from '../../shared-components/Table/Table';
import Truck from 'interfaces/Truck';
import UpdateForm from '../truck-form/update-form/UpdateForm';
import RegisterForm from '../truck-form/register-form/RegisterForm';
import fetchTruckList from 'shared-functions/fetchTruckList';

function TruckList() {
  const [truckList, setTruckList] = useState([] as Array<Truck>);
  const [truck, setTruck] = useState({} as Truck);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [action, setAction] = useState('');

  useEffect(() => {
    getTruckList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTruckList = async () => setTruckList(await fetchTruckList());

  const newRegistrationBtnEvent = () => {
    setTruck({} as Truck);
    setIsFormVisible(true);
  }

  return (
    <>
      <div className={'Table-list-container'}>
        <h1>Truck List</h1>
        <button
          className={'Table-list-button'}
          onClick={() => newRegistrationBtnEvent()}>New Registration</button>
        <Table
          rows={truckList}
          headerColumns={['id', 'model', 'production Year', 'model Year', 'action']}
          setTruckList={setTruckList}
          setIsFormVisible={setIsFormVisible}
          setAction={setAction}
          setTruck={setTruck}
        />
      </div>
      {isFormVisible && (
        <div className={'Truck-list-modal-container'}>
          <div className={'Truck-list-modal'}>
            <div className="Modal-button-close" onClick={() => setIsFormVisible(false)} />
            {truck?.id && action === 'update' ?
              (
                <UpdateForm setIsFormVisible={setIsFormVisible} setTruckList={setTruckList} setTruck={setTruck} truck={truck}/>
              ) :
              (
                <RegisterForm setIsFormVisible={setIsFormVisible} setTruckList={setTruckList} setTruck={setTruck} truck={truck}/>
              )}
          </div>
        </div>
      )}
    </>
  );
}

export default TruckList;

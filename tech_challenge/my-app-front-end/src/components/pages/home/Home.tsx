import './Style.css';
import RegisterForm from '../truck-form/register-form/RegisterForm';
import { useState } from 'react';
import Truck from 'interfaces/Truck';

function Home() {
  const [, setIsFormVisible] = useState(false);
  const [, setTruckList] = useState([] as Array<Truck>);
  const [truck, setTruck] = useState({} as Truck);
  return (
    <div className="Home">
      <RegisterForm setIsFormVisible={setIsFormVisible} setTruckList={setTruckList} setTruck={setTruck} truck={truck}/>
    </div>
  );
}

export default Home;

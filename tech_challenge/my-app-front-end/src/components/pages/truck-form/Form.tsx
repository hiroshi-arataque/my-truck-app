import { SetStateAction, useEffect, useState } from 'react';
import './Style.css';
import TruckListService from 'services/truckListService';
import Model from 'interfaces/Model';
import Truck from 'interfaces/Truck';

interface FormProps {
    setTruck: React.Dispatch<SetStateAction<Truck>>;
    truck: Truck;
    title: string;
    isModelyearValid: boolean;
    isProductionyearValid: boolean;
}

function Form({ setTruck, truck, title, isModelyearValid, isProductionyearValid }: FormProps) {
  const [modelList, setModelList] = useState([]);

  useEffect(() => {
    TruckListService.getModelList()
      .then(modelList => {
        if (modelList) {
          setModelList(modelList.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
      if(!truck?.id) setTruck({modelId: 1, modelYear: '2021', productionYear: '2021'} as Truck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Form-container">
      <div>
        <h1>{title != null ? title : 'Truck Registration'}</h1>
      </div>
      <div className={'Form-element-container'}>
        <div className={'Form-label-container'}>
          <label className={'Form-element Form-label'}>Model</label>
        </div>
        <select className={'Form-element Form-select'} name="trucks" id="trucks"
          onChange={e => setTruck({ ...truck, modelId: Number(e.target.value) })}
        >
          {modelList.map((item: Model, index: number) => (
            <option label={item?.name} value={item?.id} selected={Number(item?.id) === Number(truck?.id)}>{item?.name}</option>
          ))}
        </select>
      </div>
      <div className={'Form-element-container'}>
        <div className={'Form-label-container'}>
          <label className={'Form-element Form-label'}>Model Year</label>
        </div>
        <input
          title="model-year-input"
          className={'Form-element Form-input'}
          value={truck?.modelYear || ''}
          onChange={e => setTruck({ ...truck, modelYear: e.target.value })}
          type="text"
          pattern="\d*"
          maxLength={4}></input>
          {!isModelyearValid && <div className={'Form-validation'}><span>This field is mandatory and must be greater or same as current year.</span></div>}
      </div>
      <div className={'Form-element-container'}>
        <div className={'Form-label-container'}>
          <label className={'Form-element Form-label'}>Production Year</label>
        </div>
        <input
          title="production-year-input"
          className={'Form-element Form-input'}
          value={truck?.productionYear || ''}
          onChange={e => setTruck({ ...truck, productionYear: e.target.value })}
          type="text"
          pattern="\d*"
          maxLength={4}>
        </input>
        {!isProductionyearValid && <div className={'Form-validation'}><span>This field is mandatory and must be current year.</span></div>}
      </div>
    </div >
  );
}

export default Form;

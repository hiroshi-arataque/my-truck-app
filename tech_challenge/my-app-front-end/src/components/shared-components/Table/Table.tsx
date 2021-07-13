import './Style.css';
import Truck from '../../../interfaces/Truck';
import Row from '../Row/Row';
import Header from '../Header/Header';
import { SetStateAction } from 'react';

interface TableProps{
    rows: Array<Truck>;
    headerColumns: Array<string>;
    setTruckList: React.Dispatch<SetStateAction<Array<Truck>>>;
    setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
    setAction: React.Dispatch<SetStateAction<string>>;
    setTruck: React.Dispatch<SetStateAction<Truck>>;
}

function Table({ rows, headerColumns, setTruckList, setIsFormVisible, setAction, setTruck } : TableProps) {

  return (
    <div className="Table-container">
      <Header
        headerColumns={headerColumns}
        rows={rows}
        setTruckList={setTruckList}
        setIsFormVisible={null}
      />
      {rows.map((row: Truck, index: string | number) => (
        <Row setTruck={setTruck} setTruckList={setTruckList} row={row} index={index} setIsFormVisible={setIsFormVisible} setAction={setAction}/>
      ))}
    </div>
  );
}

export default Table;

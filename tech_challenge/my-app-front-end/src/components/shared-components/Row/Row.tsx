import './Style.css';
import Truck from '../../../interfaces/Truck';
import Cell from '../Cell/Cell';
import { SetStateAction } from 'react';

interface props {
    row: Truck;
    index: string | number;
    setIsFormVisible: React.Dispatch<SetStateAction<boolean>>;
    setAction: React.Dispatch<SetStateAction<string>>;
    setTruck: React.Dispatch<SetStateAction<Truck>>;
    setTruckList: React.Dispatch<SetStateAction<Array<Truck>>>;
}

function Row({ row, index, setIsFormVisible, setAction, setTruck, setTruckList }: props) {

    return (
        <div className="Table-row" key={`row-${index}`}>
            <Cell row={row} setTruck={setTruck} setTruckList={setTruckList} cellStyle={'Table-column-cell'} index={index} header={'id'} cell={row?.id} setIsFormVisible={null} setAction={null} />
            <Cell row={row} setTruck={setTruck} setTruckList={setTruckList} cellStyle={'Table-column-cell'} index={index} header={'model'} cell={row.model?.name} setIsFormVisible={null} setAction={null} />
            <Cell row={row} setTruck={setTruck} setTruckList={setTruckList} cellStyle={'Table-column-cell'} index={index} header={'production-year'} cell={row?.productionYear} setIsFormVisible={null} setAction={null} />
            <Cell row={row} setTruck={setTruck} setTruckList={setTruckList} cellStyle={'Table-column-cell'} index={index} header={'model-year'} cell={row?.modelYear} setIsFormVisible={null} setAction={null} />
            <Cell row={row} setTruck={setTruck} setTruckList={setTruckList} cellStyle={'Table-column-cell-last'} index={index} header={'action'} cell={''} setIsFormVisible={setIsFormVisible} setAction={setAction} />
        </div>
    );
}

export default Row;

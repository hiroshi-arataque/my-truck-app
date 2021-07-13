import './Style.css';
import doubleArrow from '../../../assets/double-arrow.svg';
import sort from '../Sort/Sort';
import TableHeaderProps from '../../../interfaces/TableHeaderProps';

function Header({ headerColumns, rows, setTruckList }: TableHeaderProps) {

    return (
        <div id="Truck-list-table-heading" className="Table-heading">
            {headerColumns.map((header, index) => (
                <div id={`header-${header}-${index}`} data-order={'double'} className={"Table-column"} key={`header-${header}-${index}`} onClick={e => sort(e, rows, setTruckList)}>
                    <span>{header}</span>
                    {header !== 'action' && <img id={`icon-${header}-${index}`} src={doubleArrow} className="Table-header-icon" alt="arrow" />}
                </div>
            ))}
        </div>
    );
}

export default Header;

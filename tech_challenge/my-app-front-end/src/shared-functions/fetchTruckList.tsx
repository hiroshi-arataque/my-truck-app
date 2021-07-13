import TruckListService from 'services/truckListService';

async function fetchTruckList() {
    const truckList = await TruckListService.getTruckList()
        .then(list => {
            if (list) {
                return list.data;
            }
        })
        .catch(error => {
            console.log(error);
        });
    return truckList;
}

export default fetchTruckList;
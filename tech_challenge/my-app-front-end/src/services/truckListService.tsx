import Truck from 'interfaces/Truck';
import Api from 'providers/apiProvider';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getTruckList: async () => {
        try {
          const data = await Api.get(
            `https://localhost:5001/api/trucks`
          );
          return data;
        } catch (error) {
          console.error('HTTP Error: ', error);
        }
      },
      registerTruck: async (truck: Truck) => {
        try {
          const jsonData = await JSON.stringify(truck);
          const data = await Api.post(`https://localhost:5001/api/trucks`, jsonData);
          return data;
        } catch (error) {
          console.error('HTTP Error: ', error);
        }
      },
      updateTruck: async (truck: Truck) => {
        try {
          const jsonData = await JSON.stringify(truck);
          const data = await Api.put(`https://localhost:5001/api/trucks/${truck.id}`, jsonData);
          return data;
        } catch (error) {
          console.error('HTTP Error: ', error);
        }
      },
      removeTruck: async (truck: Truck) => {
        try {
          const data = await Api.delete(`https://localhost:5001/api/trucks/${truck.id}`);
          return data;
        } catch (error) {
          console.error('HTTP Error: ', error);
        }
      },
      getModelList: async () => {
        try {
          const data = await Api.get(
            `https://localhost:5001/api/models`
          );
          return data;
        } catch (error) {
          console.error('HTTP Error: ', error);
        }
      }
};


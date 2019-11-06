
const state = {
    cars : [
        {
            No:1,
            vinNumber: 'MEKCMKS28CSSNUDS',
            model: '320i',
            make:'BMW',
            year:2013,
            MSRP:147000,
            Status:'Ordered',
            Booked:'y',
            Listed:'n',

        },
        {
            No:2,
            vinNumber: 'SSNJ3JN1KNKWCNSK',
            model: 'Camry',
            make:'Toyota',
            year:2014,
            MSRP:120000,
            Status:'in stock',
            Booked:'y',
            Listed:'n',

        },
        {
            No:3,
            vinNumber: 'CMKASLFM4KMSFKSK',
            model: 'Focus',
            make:'Ford',
            year:2016,
            MSRP:130000,
            Status:'Ordered',
            Booked:'n',
            Listed:'y',

        },
        {
            No:4,
            vinNumber: 'SDFMK4MKVCSAMKKSS',
            model: 'Civic',
            make:'Honda',
            year:2016,
            MSRP:140000,
            Status:'sold',
            Booked:'n',
            Listed:'n',

        }
    ]
};

const getters = {
    allCars : (state) => state.cars,

};

const actions ={
    addCar : ({commit}, newCar) =>{
        commit('newCar', newCar);
    },
    editCar : ({commit}, infos) => {
        commit('editedCar',infos);
    },
    deleteCar : ({commit}, car) => {
        commit('deletedCar', car);
    }
};

const mutations = {
    newCar : (state, newCar) => {
        state.cars.unshift(newCar);
    },
    editedCar : (state, infos) => {
        const editedCar = infos[1];
        const index = infos[0];
        Object.assign(state.cars[index], editedCar);
    },
    deletedCar : (state, deletedCar) => {
        const index = state.cars.indexOf(deletedCar);
        state.cars.splice(index, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};

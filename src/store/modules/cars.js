import axios from 'axios';
const state = {
    cars : []
};

const getters = {
    allCars : (state) => state.cars,

};

const actions ={
    async fetchCars({commit}) {
        await axios.get("http://localhost:8000/cars"
            )
                .then(res => {
                    commit('setCars', res.data);
                })
    },
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
    setCars : (state, cars) => {
        Object.assign(state.cars, cars);
    },
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

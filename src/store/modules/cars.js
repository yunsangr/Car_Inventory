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
    async addCar({commit}, newCar) {
        await axios.post("http://localhost:8000/cars", newCar)
            .then(res => {
                console.log(res.data);
                commit('newCar', res.data);

            })
    }
    ,
    async editCar({commit}, editedItem) {
        await axios.put("http://localhost:8000/cars/" + editedItem.No ,
            editedItem)
            .then(res => {
                commit('editedCar', res.data);
            })
            .catch(error => console.log('error!',error));
    }
    ,
    async deleteCar({commit}, car){
        await axios.delete("http://localhost:8000/cars/" + car.No ,
            car)
            .then(res => {
                commit('deletedCar', res.data);
            })
            .catch(error => console.log('error!',error));
    }
};

const mutations = {
    setCars : (state, cars) => {
        Object.assign(state.cars, cars);
    },
    newCar : (state, newCar) => {
        state.cars.unshift(newCar);
    },
    editedCar : (state, editedCar) => {
        const index = state.cars.findIndex(todo => todo.No === editedCar.No);
        if (index !== -1) {
            state.cars.splice(index, 1, editedCar);
        }
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

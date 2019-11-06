
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

const actions ={};

const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};

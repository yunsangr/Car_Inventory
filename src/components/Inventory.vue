<template>
    <v-app>
        <v-container>
            <v-data-table
                    v-model="selected"
                    show-select
                    :single-select="singleSelect"
                    :headers="headers"
                    :items="cars"
                    sort-by="No"
                    class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Inventory</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="dark"  class="mb-2" v-on="on"><v-icon>add</v-icon></v-btn>
                                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="24" sm="12" md="8">
                                                <v-text-field v-model="editedItem.vinNumber" label="VIN#:"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.model" label="Model:"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.make" label="Make:"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.year" label="Year:"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.MSRP" label="MSRP:"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.Status" label="Status:"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.Booked" label="Booked:"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="editedItem.Listed" label="Listed:"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                    >
                        edit
                    </v-icon>
                    <v-icon
                            small
                            @click="deleteItem(item)"
                    >
                        delete
                    </v-icon>
                </template>
            </v-data-table>
        </v-container>
    </v-app>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    const d = new Date();
    export default {
        data: () => ({
            singleSelect: false,
            selected: [],
            dialog: false,
            headers: [
                {
                    text: 'No',
                    align: 'left',
                    sortable: true,
                    value: 'No',
                },
                { text: 'Vin#', value: 'vinNumber' },
                { text: 'Model', value: 'model' },
                { text: 'Make', value: 'make' },
                { text: 'Year', value: 'year' },
                { text: 'MSRP', value: 'MSRP' },
                { text: 'Status', value: 'Status' },
                { text: 'Booked', value: 'Booked' },
                { text: 'Listed', value: 'Listed' },
                { text: 'Actions', value: 'action', sortable: false },
            ],
            cars: [],
            editedIndex: -1,
            editedItem: {
                No:0,
                vinNumber: '',
                model: '',
                make:'',
                year:0,
                MSRP:0,
                Status:'',
                Booked:'',
                Listed:'',
            },
            defaultItem: {
                vinNumber: '',
                model: '',
                make:'',
                year:d.getFullYear(),
                MSRP:0,
                Status:'',
                Booked:'',
                Listed:'',
            },
        }),

        computed: {
            ...mapGetters([
                'allCars'
            ]),
            formTitle: function () {
                return this.editedIndex === -1 ? 'New Car' : 'Edit Item'
            },


        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        async created() {
            const p = await this.fetchCars();
            this.initialize()
        },

        methods: {
            ...mapActions(['addCar', 'editCar','deleteCar', 'fetchCars']),
            initialize () {
                this.cars = this.allCars
            },

            editItem (item) {
                this.editedIndex = this.cars.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                confirm('Are you sure you want to delete this item?') &&
                this.deleteCar(item);
            },

            close () {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },

            save () {
                if (this.editedIndex > -1) {
                    //Editing an existing car
                    this.editCar(this.editedItem);
                } else {
                    // Adding new car
                    this.editedItem.No = this.cars.length + 1;
                    this.addCar(this.editedItem);
                }
                this.close()
            },
        },
    }
</script>

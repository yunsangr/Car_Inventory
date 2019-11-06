<template>
    <nav>
        <v-app-bar app flat dark>
            <router-link to='/'>
                <v-row>
                    <img class="mr-3" :src="require('../assets/myLogo.png')" height="100"/>
                </v-row>
            </router-link>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text>Log In</v-btn>
            </v-toolbar-items>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                dark
                class="darken-3"
                absolute
        >
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>

                <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                >
                    <v-list-item-content>
                        <router-link  v-bind:to=item.to>
                            <v-list-item-title>
                                {{ item.title }}
                            </v-list-item-title>
                        </router-link>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>

</template>

<script>
    export default {
        name: "NavBar",
        data() {
            return{
                drawer: false,
                items: [
                    { title: 'Inventory', to: '/'},
                    { title: 'Commission', to: '/commission'},
                    { title: 'Manage Market', to:'/managemarket'},
                    { title: 'Manage Customer', to:'/managecustomer'},
                    { title: 'Report Setting', to:'/reportsetting'},
                    { title: 'Sign out', to:'/singout'},

                ],
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }

    .router-link-exact-active {
        color: #f4f4f4;
    }
    .router-link{
        color: #9fa44c;
    }

</style>

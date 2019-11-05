<template>
    <nav>
        <v-toolbar flat app dark>
            <v-toolbar-title>Car Inventory</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn text>Log In</v-btn>
            </v-toolbar-items>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        </v-toolbar>
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
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
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
                    { title: 'Inventory'},
                    { title: 'Commission'},
                    { title: 'Manage Market'},
                    { title: 'Manage Customer'},
                    { title: 'Report Setting'},
                    { title: 'Sign out'},

                ],
            }
        }
    }
</script>

<style scoped>

</style>

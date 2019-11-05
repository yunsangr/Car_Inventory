<template>
  <div class="home">
    <h1>Home Page</h1>
    <Inventory />
  </div>
</template>

<script>
// @ is an alias to /src
import Inventory from "../components/Inventory";
export default {

  name: 'home',
  components: {
    Inventory
  }
}
</script>

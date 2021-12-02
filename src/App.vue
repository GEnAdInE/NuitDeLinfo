<template>
  <router-view/>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
$color_main: #5099EE;
* {
  margin: 0;
  border: none;
  font-family: Montserrat, sans-serif;
}
input:focus-visible, select:focus-visible {
  outline: none;
}
a {
  text-decoration: none
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #bed5ff;
}
.page {
  width: 100vw;
  height: 100vh;
}
.button__primary {
  border-radius: 15px;
  background-color: $color_main;
  padding: 0.8rem;
  border: 2px solid darken($color_main, 5);
  cursor: pointer;
}
</style>

<template>
  <div class="index">
    <HeadNav />
    <Left />
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import Left from "../components/Left";
export default {
  name: "index",
  components: {
    HeadNav,
    Left,
  },
};
</script>

<style>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>
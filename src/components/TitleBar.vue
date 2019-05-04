<template>
<transition name="silde-down">
  <div class="title-wrapper animated" v-show="ifshow">
    <div class="left">
      <span class="icon-back icon" @click="goPage"></span>
    </div>
    <div class="right">
      <div class="icon-wrapper">
        <span class="icon-cart icon"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-person icon"></span>
      </div>
      <div class="icon-wrapper">
        <span class="icon-more icon"></span>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    ifshow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods:{
    goPage: function(){
      this.$router.push("element");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/global";

.title-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  z-index: 101;
  height: px2rem(48);
  background-color: white;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);

  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
    }
  }
}
</style>

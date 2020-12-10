<template>
  <div class="lds-dual-ring" ></div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props:{
    loader:{
      type: Boolean,
      require:false
    }
  }
})
</script>


<style >
.lds-dual-ring {
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  width: 80px;
  height: 80px;
  z-index: 99999;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #3faaff;
  border-color: #3faaff transparent #3faaff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

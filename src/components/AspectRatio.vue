<template>
  <div class="aspect-ratio-hack">
    <slot name="img"/>
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'aspect-ratio',
}
</script>
<style>
.aspect-ratio-hack:first-child {
  width: 100%;
  height: auto;
}
.aspect-ratio-hack {
  position: relative;
}
.aspect-ratio-hack > :not(img) {
  position:absolute;
  top:0;
  left:0;
  height:100%;
  width:100%;
}

</style>

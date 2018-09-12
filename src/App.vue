<template>
  <div id="app">
    <keep-alive>      
        <router-view v-if="$route.meta.keepAlive"/>    
    </keep-alive>    
    <router-view v-if="!$route.meta.keepAlive"/>

  </div>
</template>

<style scoped>
  #app{
    width: 100%;
    height: 100%;
  }
</style>

<script>
var curComponent;
export default {
  name: 'App',
  methods: {
    setComponent: function (component) {
        //console.log("setComponent");
        curComponent = component;
    }
  },
}
window["receiveMsgFromNative"] = function (msg) {
  var value = "{action:receiveMsgFromNative}";
  android.getClient(value);
  curComponent.receiveMsgFromParent(msg);
}

</script>

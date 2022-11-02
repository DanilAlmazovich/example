<template>
  <div>
    <div class="checked" v-if="checked">
        <svg fill="#54B257" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 704"><path d="M302.3,672.33c-8.28-7.8-16.43-15.09-24.15-22.8Q157.7,529.23,37.57,408.63c-1.69-1.7-1.81-7.87-.19-9.51Q99.1,336.79,161.67,275.31c1.89-1.85,8.84-1.77,10.76.12,41.19,40.58,81.89,81.66,123.2,122.12,2.44,2.38,11.26,2.45,13.64.09q179.67-178.41,359-357.23c2.46-2.45,11.6-2.39,14.15.08q61.7,59.88,122.17,121c1.66,1.67,1.65,7.89,0,9.56Q556.23,419.74,307.46,668C306,669.48,304.23,670.72,302.3,672.33Z"/></svg>
    </div>
    <div class="not-checked" v-else>

    </div>
  </div>
</template>

<script>
export default {
    props: {
        checked: Boolean
    }
}
</script>

<style>
.not-checked, .checked{
    width: 100%;
    height: 100%;
    border: 2px solid;
    width: 18px;
    height: 18px;
    border-radius: 3px;
}
.checked{
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #54B257;
}
.not-checked{
    border-color: #999999;
}
</style>
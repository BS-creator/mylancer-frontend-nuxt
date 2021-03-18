<template>
  <header id="header-post">
    <NuxtLink to="/">
      <div id="logo-post">
        <div><span>M</span><span>yLancer</span></div>
      </div>
    </NuxtLink>
  </header>
</template>

<script>
import Logo from '@/components/Logo'

export default {
  components: {
    Logo,
  },
}
</script>

<style lang="scss">
#header-post {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 450px;
  background-color: var(--color-primary);

  > a {
    width: 0;
    height: 0;
    display: flex;
  }
}

#logo-post {
  position: relative;
  top: 50px;
  left: 32px;
  width: fit-content;

  > div {
    /* color: var(--color-primary); */
    color: white;
    font-size: 25px;
    font-weight: bold;
    font-family: cursive;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);

    > span:first-child {
      font-size: 45px;
    }
  }
}
</style>

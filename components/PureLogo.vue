<template>
  <NuxtLink to="/">
    <div id="purelogo">
      <div><span>M</span><span>yLancer</span></div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
#purelogo {
  display: inline-block;
  height: 100%;
  vertical-align: top;

  > div {
    color: var(--color-primary);
    font-size: 25px;
    font-weight: bold;
    font-family: cursive;
    position: relative;

    > span:first-child {
      font-size: 45px;
    }
  }
}
</style>

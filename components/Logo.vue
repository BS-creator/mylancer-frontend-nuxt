<template>
  <NuxtLink to="/">
    <div id="logo">
      <div><span>M</span><span>yLancer</span></div>
    </div>
  </NuxtLink>
</template>

<style>
#logo > div {
  color: var(--color-primary);
  font-size: 25px;
  font-weight: bold;
  font-family: cursive;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
}
#logo > div > span:first-child {
  font-size: 45px;
}
</style>

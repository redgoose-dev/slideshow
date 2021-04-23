<template>
<p class="loading-unit">
  <span/>
  <em/>
</p>
</template>

<style lang="scss" scoped>
.loading-unit {
  position: relative;
  margin: 0;
  width: var(--loading-size);
  height: var(--loading-size);
  box-sizing: border-box;
  span {
    display: block;
    width: var(--loading-size);
    height: 5px;
    background-color: rgba(0,0,0,.25);
    position: absolute;
    top: calc(var(--loading-size) + 9px);
    left: 0;
    border-radius: 50%;
    animation: shadow var(--loading-speed) linear infinite;
    @keyframes shadow {
      50% {
        transform: scale(1.2, 1);
      }
    }
  }
  em {
    display: block;
    font-style: normal;
    width: var(--loading-size);
    height: var(--loading-size);
    background-color: var(--color-key);
    animation: animate var(--loading-speed) linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
    @keyframes animate {
      17% { border-bottom-right-radius: 3px; }
      25% { transform: translateY(9px) rotate(22.5deg); }
      50% {
        transform: translateY(18px) scale(1,.9) rotate(45deg);
        border-bottom-right-radius: 40px;
      }
      75% { transform: translateY(9px) rotate(67.5deg); }
      100% { transform: translateY(0) rotate(90deg); }
    }
  }
}
</style>

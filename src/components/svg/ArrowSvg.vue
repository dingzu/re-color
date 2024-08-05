<template>
  <svg
    width="26"
    height="26"
    viewBox="0 0 26 26"
    fill="none"
    xmlns=" http://www.w3.org/2000/svg "
  >
    <rect
      x="0.693359"
      y="0.400024"
      width="25.1644"
      height="25.1644"
      rx="12.5822"
      :fill="backgroundColor"
    />
    <path
      d="M11.7008 17.982L16.1687 13.5141L11.58 8.92538"
      :stroke="arrowColor"
      stroke-width="1.65556"
    />
  </svg>
</template>

<script>
export default {
  name: "ArrowSvg",
  props: {
    backgroundColor: {
      type: String,
      default: "#2898FF",
    },
    arrowColor: {
      type: String,
      default: "white",
    },
  },
};
</script>

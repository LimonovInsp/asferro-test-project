<template>
  <div>
    <button
      class="app_button-create"
      type="button"
      data-toggle="modal"
      data-target="#exampleModal"
      @click="$emit('remove-inputs-data')"
    >
      Create
    </button>
  </div>
</template>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/AppCreateButton.scss";
</style>
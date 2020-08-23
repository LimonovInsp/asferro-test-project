<template>
  <tr>
      <th scope="row">{{index + 1}}</th>
      <td>{{userItem.name}}</td>
      <td>{{userItem.surname}}</td>
      <td>{{userItem.birthday}}</td>
      <td>{{userItem.phone}}</td>
      <td>{{userItem.email}}</td>
      <td>
        <button
          type="button"
          class="app_button app_button-edit"
          data-toggle="modal"
          data-target="#exampleModal"
          @click="$emit('edit-user', index, true)"
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          class="app_button app_button-delete"
          v-on:click="$emit('remove-user', index)"
        >
          delete
        </button>
      </td>
    </tr>
</template>

<script>
  export default {
    props: {
      userItem: {
        type: Object,
        required: true
      },
      index: Number,
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/_variables.scss";
  @import "../styles/AppCellButtons.scss";
</style>
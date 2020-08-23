<template>
  <div>
    <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Surname</th>
      <th scope="col">Date of birthday</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Edit user</th>
      <th scope="col">Delete user</th>
    </tr>
  </thead>
  <tbody>
    <AppCell
      v-for="(userItem, index) of usersList"
      v-bind:userItem="userItem"
      v-bind:key="index"
      v-bind:index="index"
      @remove-user="removeUser"
      @edit-user="editUser"
    />
  </tbody>
</table>
  </div>
</template>

<script>
  import AppCell from './AppCell';
  export default {
    props: ['usersList'],
    components: {
      AppCell
    },
    methods: {
      removeUser(cellIdentifier) {
        this.$emit('remove-user', cellIdentifier);
      },

      editUser(cellIdentifier, isTouched) {
        this.$emit('edit-user', cellIdentifier, isTouched);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
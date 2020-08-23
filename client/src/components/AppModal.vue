<template>
  <div>
    <form
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @submit.prevent="onSubmit"
    >
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">User form</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">
            &times;
          </span>
        </button>
      </div>
      <div class="modal-body">
          <AppModalInput
            v-for="(input, index) of inputs"
            v-bind:key="index"
            v-bind:input="input"
          />
      </div>
      <div class="modal-footer">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="handleValidationCollection < 5"
        >
          Add user's information
        </button>
      </div>
    </div>
  </div>
</form>
  </div>
</template>

<script>
  import axios from 'axios';
  import AppModalInput from './AppModalInput';
  export default {
    props: ['inputs', 'editCellIndex'],
    components: {
      AppModalInput
    },
    methods: {
      onSubmit() {
        const newUser = {
          name: this.inputs[0].model,
          surname: this.inputs[1].model,
          birthday: this.inputs[2].model,
          phone: this.inputs[3].model,
          email: this.inputs[4].model,
          editCellIndex: this.editCellIndex
        }

        this.$emit('add-user', newUser);

        this.inputs.forEach(currentInput => {
          currentInput.model = '';
          currentInput.validated = false;
        });
      },
    },
    computed: {
      handleValidationCollection: function() {
        return this.inputs.filter(input => input.validated === true).length;
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../styles/AppModal.scss";
</style>

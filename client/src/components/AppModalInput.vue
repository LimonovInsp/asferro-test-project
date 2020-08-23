<template>
  <div>
    <input
      :type="input.type"
      v-if="clickedState"
      :class="input.validated 
        ? 'modal-input modal-input-approval' 
        : 'modal-input modal-input-error'"
      :placeholder="input.placeholder"
      :maxlength="input.maxLength"
      v-model="input.model"
      @keydown.space="preventLeadingSpaces"
      @blur="handleValidate"
      @click="handleClicked"
    >
     <input
      :type="input.type"
      v-else
      class="modal-input"
      :placeholder="input.placeholder"
      :maxlength="input.maxLength"
      v-model="input.model"
      @keydown.space="preventLeadingSpaces"
      @blur="handleValidate"
      @click="handleClicked"
    >
    <p 
      v-if="clickedState"
      :class="input.validated 
        ? 'app-validation-approval' 
        : 'app-validation-error'"
    >
        {{input.validated 
        ? `Validated successfully!` 
        : `Please enter a correct ${input.dataName}`}}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clickedState: false,
        textRegex: (/\s|[0-9]/i),
        numberRegex: (/\D/i),
        emailRegex: (/@/),
      }
    },
    props: {
      input: {
        type: Object,
        required: true
      },
      index: Number
    },
    methods: {
      preventLeadingSpaces(event) {
        event.target.value = event.target.value.replace(/^\s/, '');
      },

      handleValidate(event) {
        if(event.target.value === '') {
          this.input.validated = false;
        } else {
           switch(true) {
         case this.input.dataName === 'name'
          || this.input.dataName === 'surname':
           if (!this.textRegex.test(event.target.value)) {
             this.input.validated = true;
           } else {
             this.input.validated = false;
           }
           break;
         case this.input.dataName === 'birthday':
           if(event.target.value !== '') {
             this.input.validated = true;
           } else {
             this.input.validated = false;
           }
           break;
         case this.input.dataName === 'phone':
           if(!this.numberRegex.test(event.target.value)
            && event.target.value.length >= 10) {
             this.input.validated = true;
           } else {
             this.input.validated = false;
           }
           break;
         case this.input.dataName === 'email':
           if(this.emailRegex.test(event.target.value)) {
             this.input.validated = true;
           } else {
             this.input.validated = false;
           }
           break;
        }
        }
      },

      handleClicked(event) {
        this.clickedState = true;
      }
    }
  }
</script>

<style lang="scss" scope>
  @import "../styles/_variables.scss";
  @import "../styles/AppModalInput.scss";
</style>
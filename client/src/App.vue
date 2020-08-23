<template>
  <div id="app">
    <h1 class="app_heading">Asferro Project</h1>
    <AppCreateButton
      @remove-inputs-data="removeInputsData"
    />
    <AppModal
      @add-user="addUser"
      v-bind:inputs="inputs"
      v-bind:editCellIndex="editCellIndex"
    />
    <AppTable
      v-bind:usersList="usersList"
      @remove-user="removeUser"
      @edit-user="editUser"
    />
  </div>
</template>

<script>
import axios from 'axios';
import AppTable from './components/AppTable';
import AppCreateButton from './components/AppCreateButton';
import AppModal from './components/AppModal';
  export default {
    name: 'app',
    data() {
      return {
        touchedEditButton: false,
        editCellIndex: '',
        usersList: [],
        receivedData: [],
        inputs: [
          {
            model: '',
            type: 'text',
            placeholder: "User's name",
            maxLength: '60',
            dataName: 'name',
            validated: false,
          },
          {
            model: '',
            type: 'text',
            placeholder: "User's surname",
            maxLength: '60',
            dataName: 'surname',
            validated: false,
          },
          {
            model: '',
            type: 'date',
            placeholder: "User's birthday",
            maxLength: false,
            dataName: 'birthday',
            validated: false,
          },
          {
            model: '',
            type: 'text',
            placeholder: "User's phone",
            maxLength: '15',
            dataName: 'phone',
            validated: false,
          },
          {
            model: '',
            type: 'email',
            placeholder: "User's email",
            maxLength: '30',
            dataName: 'email',
            validated: false,
          },
        ],
      }
    },
    components: {
      AppTable,
      AppCreateButton,
      AppModal
    },
    methods: {
      addUser(user) {
        if (this.editCellIndex !== '' && this.touchedEditButton) {
          this.usersList.splice(this.editCellIndex, 1, user);
           const getData = () => {
            axios.get('http://localhost:3000/api/records')
            .then((response) => {
              const data = response.data;
              this.receivedData = data;
              const exactDataIdentifier = this.receivedData[this.editCellIndex]._id;

              const putData = async () => {
              await axios({
                method: 'put',
                url: `http://localhost:3000/api/records/${exactDataIdentifier}`,
                 data: {
                  name: user.name,
                  surname: user.surname,
                  birthday: user.birthday,
                  phone: user.phone,
                  email: user.email,
                }
              });

            }
              putData();

              this.editCellIndex = '';
            })
            .catch(() => {
              console.log('error');
            })
        };

          getData();

        } else if (this.usersList.length < 10
          && this.editCellIndex === '') {
          this.usersList.push(user);

          const postData = async () => {
            await axios ({
              url: 'http://localhost:3000/api/records',
              method: 'post',
              data: {
                name: user.name,
                surname: user.surname,
                birthday: user.birthday,
                phone: user.phone,
                email: user.email,
              }
          });
        }

          postData();
        }
      },

      removeUser(cellIdentifier) {
        this.usersList = this.usersList.filter((item, index) => index !== cellIdentifier);

        const getData = () => {
          axios.get('http://localhost:3000/api/records')
            .then((response) => {
              const data = response.data;
              this.receivedData = data;
            const exactDataIdentifier = this.receivedData[cellIdentifier]._id;

            const deleteData = async () => {
            await axios({
              method: 'delete',
              url: `http://localhost:3000/api/records/${exactDataIdentifier}`,
            });

            }
              deleteData();
            })
            .catch(() => {
              console.log('error');
            })
        };

        getData();

      },

      editUser(cellIdentifier, isTouched) {
        const dataList = Object.values(this.usersList[cellIdentifier]);
        this.inputs.forEach((currentInput, index) => currentInput.model = dataList[index]);
        this.editCellIndex = cellIdentifier;

        if(isTouched) {
          this.touchedEditButton = isTouched;
        }
      },

      removeInputsData() {
        this.inputs.forEach(input => input.model = '');
        this.editCellIndex = '';
        this.touchedEditButton = false;
      }
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .app_heading {
    margin-bottom: 30px;
  }
</style>
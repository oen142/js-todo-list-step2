import api from './util/api.js';
import { UserListTemplate, LoadingTemplate } from './util/templates.js';
import { MESSAGE, ERROR_TYPE } from './util/constants.js';

export default class UserList {
  constructor({ username, userArray, $targetUserList, onClickUser }) {
    this.username = username;
    this.userArray = userArray;
    this.$targetUserList = $targetUserList;

    this.$targetUserList.addEventListener(
      'click',
      ({ target: { className, textContent } }) => {
        if (className === 'ripple') {
          onClickUser(textContent);
        }
      },
    );
    this.render();
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    this.render();
  }
  async render() {
    this.$targetUserList.innerHTML = LoadingTemplate;
    try {
      this.userArray = await api.fetchUsers();
      if (this.userArray.length === 0) {
        this.$targetUserList.innerHTML = MESSAGE.REGISTER_USER;
        return;
      }
      this.$targetUserList.innerHTML = UserListTemplate(
        this.username,
        this.userArray,
      );
    } catch (e) {
      this.$targetUserList.innerHTML = '';
      console.error(ERROR_TYPE.CAN_NOT_LOAD_USER_LIST);
    }
  }
}
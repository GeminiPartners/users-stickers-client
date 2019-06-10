$.ajaxSetup({
    xhrFields: {
        origin: 'http://127.0.0.1:8080',
        withCredentials: true
    }
})

const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`

function getHostURL() {
    // if (window.location.host.indexOf('localhost') != -1) {
      return 'http://127.0.0.1:3000';
    // } else {
    //   return 'https://sticker-mania.herokuapp.com';
    // }
  }

  function getUserFromForm () {
    const email = $('#email').val();
    const password = $('#password').val();

    const user = {
        email,
        password
    };

    return user
  }
  
  function showErrorMessage(message) {
    const $errorMessage = $('#errorMessage');
    $errorMessage.text(message);
    $errorMessage.show()
  }
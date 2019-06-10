$.ajaxSetup({
    xhrFields: {
        origin: 'http://127.0.0.1:8080',
        withCredentials: true
    }
})

const API_URL = getHostURL();

function getHostURL() {
    // if (window.location.host.indexOf('localhost') != -1) {
      return 'http://127.0.0.1:3000';
    // } else {
    //   return 'https://sticker-mania.herokuapp.com';
    // }
  }
  
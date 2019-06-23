$(document).ready(function () {
  // get user id from url query
  const params = parseQuery(window.location.search);
  // make a request to the server for the user information
  getUserInfo()
    .then(user => {
      console.log('user is: ', user);
      addUserInfoToPage(user)
    })
    .then(getItems)
    .then(items => {
      addItems(items);
    } )
    .catch(handleError);
  // show user information
  // make a request to server for the stickers for the user with that id
  // show user stickers
});

function parseQuery(query) {
  return query.substr(1).split('&').reduce((params, keyValue) => {
    const parts = keyValue.split('=');
    params[parts[0]] = parts[1];
    return params
  }, {});
}

function getUserInfo() {
  return $.get(`${API_URL}/user`)
}

function getItems() {
  return $.get(`${API_URL}/user/item`)
}

function addUserInfoToPage(user) {
  const headerText = user.username + ' Homepage';
  document.getElementById("header1").innerHTML = headerText;
  let source = $("#user-template").html();
  let template = Handlebars.compile(source);
  let context = user;
  let html = template(context);
  $('.user').html(html);
  return user.id;
}

function addItems(items) {
  let source = $("#item-template").html();
  let template = Handlebars.compile(source);
  // let context = items;
  // yay more variations!! abstraction rocks!
  let context = {items: items};
  let html = template(context);
  $('.items').html(html);
}

function handleError(error) {
  window.location= '/login.html'
  console.log('error: ', error)
};


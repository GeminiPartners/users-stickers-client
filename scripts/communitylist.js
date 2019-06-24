$(document).ready(function () {
  console.log('that worked?');
  
  getCommunities()
  .then(addCommunities)
  .catch(handleError);
// show community information
// make a request to server for the stickers for the community with that id
// show community stickers
});


function getCommunities() {
return $.get(`${API_URL}/user/community/`)
}


function addCommunities(communities) {
  console.log('should have done it', communities)
  let source = $("#community-template").html();
  let template = Handlebars.compile(source);
  let context = {communities: communities};
  let html = template(context);
  $('.communities').html(html);
  
}

function handleError(error) {
  // window.location= '/login.html'
  console.log('error: ', error)
};


$(() => {
  $('form').submit((event) => {
      event.preventDefault();
      const user = getUserFromForm();
      console.log(user); 

      signup(user)
          .then(result => {
              console.log(result);
              window.location = `/login`;
          }).catch(error => {
              console.error(error)
              showErrorMessage(error.responseJSON.message);
          })
  });
});

function signup(user) {
  return $.post(`${AUTH_URL}/signup`, user)
}
  
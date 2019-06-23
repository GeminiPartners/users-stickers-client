$(document).ready(function () {
    // get community id from url query
    const params = parseQuery(window.location.search);
    console.log(params.id);
    // make a request to the server for the community information
    getCommunityInfo(params.id)
      .then(addCommunityInfoToPage)
      .then(getItems)
      .then(addItems)
      .catch(handleError);
    // show community information
    // make a request to server for the stickers for the community with that id
    // show community stickers
  });
  
  function parseQuery(query) {
    return query.substr(1).split('&').reduce((params, keyValue) => {
      const parts = keyValue.split('=');
      params[parts[0]] = parts[1];
      return params
    }, {});
  }
  
  function getCommunityInfo(id) {
    return $.get(`${API_URL}/community/${id}`)
  }
  
  function getItems(id) {
    return $.get(`${API_URL}/community/${id}/item`)
  }
  
  function addCommunityInfoToPage(community) {
    console.log('my community ',community)
    const headerText = community.name + ' Homepage';
    document.getElementById("header1").innerHTML = headerText;
    let source = $("#community-template").html();
    let template = Handlebars.compile(source);
    let context = community;
    let html = template(context);
    $('.community').html(html);
    return community.community_id;
  }
  
  function addItems(items) {
    console.log(items);
    let source = $("#item-template").html();
    let template = Handlebars.compile(source);
    // let context = items;
    // yay more variations!! abstraction rocks!
    let context = {items: items};
    let html = template(context);
    $('.items').html(html);
  }
  
  function handleError(error) {
    // window.location= '/login.html'
    console.log('error: ', error)
  };
  
  
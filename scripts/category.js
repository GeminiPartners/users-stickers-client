$(document).ready(function () {
    // get category id from url query
    const params = parseQuery(window.location.search);
    console.log(params.id);
    // make a request to the server for the category information
    getCategoryInfo(params.id)
      .then(addCategoryInfoToPage)
      .then(getItems)
      .then(addItems)
      .catch(handleError);
    // show category information
    // make a request to server for the stickers for the category with that id
    // show category stickers
  });
  
  function parseQuery(query) {
    return query.substr(1).split('&').reduce((params, keyValue) => {
      const parts = keyValue.split('=');
      params[parts[0]] = parts[1];
      return params
    }, {});
  }
  
  function getCategoryInfo(id) {
    console.log('cat id: ',id)
    return $.get(`${API_URL}/item_category/${id}`)
  }
  
  function getItems(id) {
    console.log('item category id:', id)
    return $.get(`${API_URL}/item_category/${id}/item`)
  }

  
  function addCategoryInfoToPage(category) {
    console.log('my category ',category)
    const headerText = category.name + ':  Items Available';
    document.getElementById("header1").innerHTML = headerText;
    let source = $("#category-template").html();
    let template = Handlebars.compile(source);
    let context = category;
    let html = template(context);
    $('.category').html(html);
    return category.id;
  }


  function addItems(items) {
    console.log('these items: ', items)
    let source = $("#item-template").html();
    let template = Handlebars.compile(source);
    let context = {items: items};
    let html = template(context);
    $('.items').html(html);
  }
  
  function handleError(error) {
    // window.location= '/login.html'
    console.log('error: ', error)
  };
  
  
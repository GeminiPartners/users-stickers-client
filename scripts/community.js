$(document).ready(function () {
    // get community id from url query
    const params = parseQuery(window.location.search);
    console.log(params.id);
    // make a request to the server for the community information
    getCommunityInfo(params.id)
      .then(addCommunityInfoToPage)
      .then(getCategories)
      .then(addCategories)
      .catch(handleError);
    // show community information
    // make a request to server for the stickers for the community with that id
    getCommunities()
    .then(addCommunities)
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
  
  function getCommunities() {
    return $.get(`${API_URL}/user/community/`)
    }
    
    
    function addCommunities(communities) {
      console.log('should have done it', communities)
      var communities_html = "";
      communities.forEach(community => {
          communities_html = communities_html + 
          '<a class="dropdown-item" href="index.html?id=' + community.id +
          '">' + community.name + '</a>';        
        });
        document.getElementById("communitydropdown").innerHTML = communities_html;

      return true
    }

  function getCategories(id) {
    return $.get(`${API_URL}/community/${id}/category`)
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

  function addCategories(categories) {
    categories.forEach(category => {
        category.link = '../category.html?id=' + category.id
    })
    let source = $("#category-template").html();
    console.log('categories source', source)
    let template = Handlebars.compile(source);
    console.log('categories template: ', template)
    let context = {categories: categories};
    let html = template(context);
    $('.categories').html(html);
    return true
  }
  

  
  function handleError(error) {
    // window.location= '/login.html'
    console.log('error: ', error)
  };
  
  
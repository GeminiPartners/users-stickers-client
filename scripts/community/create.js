$(() => {
    console.log('loaded!')
    $('form').submit((event) => {
        event.preventDefault();
        const community = getCommunityFromForm();
        console.log(community); 
        const protoCommunityId = $('#protoCommunityId').val();

        create(community)
            .then(result => {
                console.log(result);
                return addItemCategories(result, protoCommunityId)                
            })
            .then(result => {
                communityPage = 'index.html?id=' + result;
                window.location = communityPage;
            }) 
            .catch(error => {
                console.error(error)
                showErrorMessage(error.responseJSON.message);
            })
    });
});

function getCommunityFromForm () {
    const email = $('#name').val();
    const password = $('#description').val();
    const username = $('#community_type').val();
    const location = $('#location').val();
    const instructions_default = $('#instructions_default').val();
  
    const community = {
        email,
        password,
        username,
        location,
        instructions_default
    };
  
    console.log(community);
  
    return community
  }

function create(community) {
    return $.post(`${API_URL}/community/create`, user)
}
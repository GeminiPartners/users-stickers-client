$(() => {
    console.log('loaded!')
    $('form').submit((event) => {
        event.preventDefault();
        const community = getCommunityFromForm();
        console.log(community); 
        const protoCommunityId = $('#protoCommunityId').val();

        create(community)
            .then(result => {
                console.log('result to this is:', result)
                communityPage = 'index.html?id=' + result.id;
                window.location = communityPage;
            }) 
            .catch(error => {
                console.error(error)
                showErrorMessage(error.responseJSON.message);
            })
    });
});

function getCommunityFromForm () {
    const name = $('#name').val();
    const description = $('#description').val();
    const community_type = 1
    const location = $('#location').val();
  
    const community = {
        name,
        description,
        community_type
    };
  
    console.log(community);
  
    return community
  }

// function create(community) {
//     return $.post(`${API_URL}/community/create`, user)
// }

function create(community) {
  return $.ajax({    
    dataType: 'json',
    data: community,
    type: 'POST',
    url: `${API_URL}/community/create`
  });
}
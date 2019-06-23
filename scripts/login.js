$(() => {
    console.log('loaded!')
    $('form').submit((event) => {
        event.preventDefault();
        const user = getLoginFromForm();


        login(user)
            .then(result => {
                console.log(result);
                // window.location = `/user.html?id=${result.id}`;
                window.location = `/user.html`;
            }).catch(error => {
                console.error(error);
                showErrorMessage(error.responsJSON.message);
            });
    });
});

function login(user) {
    console.log(user);
    return $.post(`${AUTH_URL}/login`, user);
}
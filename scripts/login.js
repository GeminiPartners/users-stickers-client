const AUTH_URL = `${API_URL}/auth`
$(() => {
    $('form').submit((event) => {
        event.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();

        const user = {
            email,
            password
        }

        login(user);
    });
});

function login(user) {
    console.log(`${AUTH_URL}/login`);
    // return $.post('${AUTH_URL}/login')
}
$(document).ready(function() {

    const tokenMe = localStorage.getItem("user");
    
    if (tokenMe) {
        // window.location.href = "/news"
        console.log('token var')
    } else {

        $('body').css({ opacity: 1 })
        let formData = {};

        // register
        $('#login').on("click", async function() {

            formData.email = $('#email').val();
            formData.username = $('#username').val();
            formData.password = $('#password').val();
            formData.rpassword = $('#password-2').val();

            const token = await axios.post("http://localhost:4004/api/register", formData).then(res => res.data);
            if (token.user) {
                localStorage.setItem("user", token.user)
                window.location.href = "/news"
            } else {
                console.log(token)
            }
        })

        // login
        $('#log').on("click", async function() {

            formData.email = $('#email').val();
            formData.password = $('#password').val();

            const token = await axios.post("http://localhost:4004/api/login", formData).then(res => res.data);
            if (token.user) {
                localStorage.setItem("user", token.user)
                window.location.href = "/news"
            } else {
                console.log(token)
            }
        })
    }

});

$('#form-login').submit((e)=> {
    e.preventDefault();
    let email =  $("#email").val();
    let password =  $("#password").val();

    let loginData = {email, password};

    loginSuccess(loginData);

    
});

async function loginSuccess(data) {
    let ft = await fetch('/requestlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    });

    let res = await ft.json();
    if(res.success) {
        window.location.href = '/panel';
    } else {
        alert('Email ou senha inválida!');
    }
}
$('#form-adduser').submit((e)=> {
    e.preventDefault();
    
    const email =  $("#email").val();
    const password =  $("#password").val();
    const confirmPassword =  $("#confirm-password").val();
    const contact =  $("#contact").val();
    const store = $('#store').val();
    const img = '';

    if(password == confirmPassword) {
        const regData = {email, password, contact, store, img};

        addUser(regData);
    } else {
        alert('As senhas não coincidem!');
    }
    
});

async function addUser(data) {
    const ft = await fetch('/adduser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    });

    const res = await ft.json();
    if(res.used) {
        alert('Este email já foi usado!');
    } else {
        alert('Registado com sucesso faça o log in!')
    }
}
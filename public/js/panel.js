async function getUser() {
    const ft = await fetch('/user');
    const res = await ft.json();
    console.log(res);
    const img = res[0].img;
    if(img != '') {
        $('#profile-photo').css({'background-image': `url(upload/${img})`, 'background-size': 'cover'});
    }
}

getUser();


$('#form-update-password').submit((e)=> {
    e.preventDefault();
    const old = $('#old-password').val();
    const pass = $('#new-password').val();
    const  cpass = $('#confirm-new-password').val();
    const data = {old, pass, cpass};
    updatePassword(data);
});

async function getItems() {
    const ft = await fetch('/myitems');

    const res = await ft.json();

    // Put on page
    for (let i = 0; i < res.length; i++) {
        const e = res[i];
        $('.items').append(`
            <div class="item" style="background-image: url(upload/${e.img});">
                <span class="price">${e.price} Mt</span>
                <i class="fa fa-trash-alt" id="${e._id}"></i>
                <span class="txt">${e.title}</span>
            </div>
        `);

        

    }

    // Delete items on onClick
    $('.item > i').click((e)=> {
        const id = e.target.id;
        deleteItem({id});
        $('.items').html('');
        getItems();
    });
}

getItems();

$('#btn-add-item').click(()=> {
    $('.form-container').fadeIn();
});

$('.form-container').click((e)=> {
    if(e.target.className == 'form-container') {
        $('.form-container').fadeOut();
    }
});

async function deleteItem(id) {
    const ft = await fetch('/deleteitem',  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(id)
    });

    const res = await ft.json();
   
}

async function updatePassword(data) {

    if(data.pass == data.cpass) {
        const ft = await fetch('/updatepassword',  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
    
            body: JSON.stringify(data)
        });
    
        const res = await ft.json();

        if(res.success) {
            alert('Senha alterada com sucesso!');
        } else {
            alert('A senha actual não está correcta!');
        }

    } else {
        alert('As novas senhas não coincidem!');
    }
}

// Promote products


// Functionality fency

$('#bar').click(()=> {
    $('.sidebar-container').fadeIn();
    $('.sidebar').animate({left: 0});
});

$('.sidebar-container').click((e)=> {
    if(e.target.className == 'sidebar-container') {
        if(innerWidth <= 414) {
            $('.sidebar').animate({'left': '-90%'});
        } else {    
            $('.sidebar').animate({'left': '-340px'});
        }

        $('.sidebar-container').fadeOut();
    }
});

$(window).scroll((e)=> {
    if(scrollY > 20) {
        $('header').css({"box-shadow": '0 2px 20px #eee'});
    } else {
        $('header').css({"box-shadow": 'none'});
    }
});
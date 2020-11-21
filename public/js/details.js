let param = new URL(window.location.href);
let id = param.searchParams.get('id');

async function getDetails() {
    let ft = await fetch('/details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({id})
    });

    let res = await ft.json();
    
    console.log(res);
    let date = new Date(res.date);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // Put details on page
    $('#item').css({'background-image': `url(upload/${res.img})`});
    $('#details').append(`<li><h3>${res.title}</h3><li>`);
    $('#details').append(`<li>Preço: ${res.price} Mt<li>`);   
    $('#details').append(`<li>Contacto: ${res.contact}<li>`);
    $('#details').append(`<li>Loja: <a href="/store?id=${res.who}">${res.store}</a><li>`);
    
    if(!!res.city) {
        $('#details').append(`<li>Província/cidade: ${getCityName(res.city)}<li>`);
    }

    $('#details').append(`<li>Publicado aos ${day} de ${month} de ${year}<li>`);
    $('#description').text(res.description);

    if(res.views != undefined) {
        $('#details').append(`<li><i class="fa fa-eye"></i>${res.views}<li>`);
    }
}

getDetails();


function getCityName(id) {
    let city;

    switch(parseInt(id)) {
        case 0: city = "Maputo"; break;
        case 1: city = "Matola"; break;
        case 2: city = "Inhambane"; break;
        case 3: city = "Gaza"; break;
        case 4: city = "Chibuto"; break;
        case 5: city = "Nampula"; break;
        case 6: city = "Quelimane"; break;
        case 7: city = "Beira"; break;
        case 8: city = "Tete"; break;
        case 9: city = "Cabo Delgado"; break;
        case 10: city = "Lichinga"; break;
        case 11: city = "Lichinga"; city = "Pemba";
    }

    return city;
}


// Search
$('#form-search').submit((e)=> {
    e.preventDefault();
    let text = $('#search').val();
    window.location.href = `/search?text=${text}`;
});

$(window).scroll((e)=> {
    if(scrollY > 20) {
        $('header').css({"box-shadow": '0 2px 20px #eee'});
    } else {
        $('header').css({"box-shadow": 'none'});
    }
});
let param = new URL(window.location.href);
let text = param.searchParams.get('text');

const res = getItems();

const limit = 1;
let limInf = 0;
let limSup = limit;

putItems(limInf, limSup, res);

function getItems() {

    let res;

    $.ajax({
        url: '/items',
        method: 'GET',
        async: false,
        data: {},
        success: (data)=> {
            res = data;
        }
    });

    let items = [];

    // Put on page
    for (let i = 0; i < res.length; i++) {
        const e = res[i];
        if(e.title.toLowerCase().includes(text.toLowerCase())) {
            items.push(e);
        }
    }


    return items;
    
}

function putItems(_limInf, _limSup, res) {
    let lS = _limSup;

    if(_limSup >= res.length) {
        lS = res.length;
    }

    for (let i = _limInf; i < lS; i++) {
        let e = res[i];
        
        // $('#datalist-search').append(`<option>${e.title}</option>`);

        $('.items').append(`
            <div class="item" style="background-image: url(../upload/${e.img});">
                <span class="price">${e.price} Mt</span>
                <span class="txt">${e.title} </br>
                    <a href="details?id=${e._id}">Detalhes</a><a href="store?id=${e.who}">${e.store}</a>
                </span>
            </div>
        `);
    }
}

// Pageination
if(limSup >= res.length) {
    $('.btn-more').hide();
} else {
    $('.btn-more').show();
}

$('.btn-more').click(()=> {
    $('.btn-more').hide();
    limInf = limSup;
    limSup += limit;
    
    putItems(limInf, limSup, res);
    
    // setTimeout(() => {
        $('body, html').animate({scrollTop: $('html').scrollTop()+40});
    // }, 2000);
    
    if(limSup >= res.length) {
        $('.btn-more').hide();
    } else {
        $('.btn-more').show();
    }
});


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
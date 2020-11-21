let res = getItems();

const limit = 3;
let limInf = 0;
let limSup = limit;


putItems(limInf, limSup, res);

function getItems() {
    let r;

    $.ajax({
        url: '/items',
        method: 'GET',
        async: false,
        data: {},
        success: (data)=> {
            r = data;
        }
    })

    return r;
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

$('.btn-more').click(()=> {
    $('.btn-more').hide();
    limInf = limSup;
    limSup += limit;
    
    putItems(limInf, limSup, res);
    
    $('body, html').animate({scrollTop: $('html').scrollTop()+30});
    
    if(limSup >= res.length) {
        $('.btn-more').hide();
    } else {
        $('.btn-more').show();
    }
});


$('#go-top').click(()=> {
    $('body, html').animate({scrollTop: 0});
});


// Search
$('#form-search').submit((e)=> {
    e.preventDefault();
    let text = $('#search').val();
    window.location.href = `/search?text=${text}`;
});



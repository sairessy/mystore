$('#bar').click(()=> {
    $('aside').animate({'left': '0'});
   
    setTimeout(() => {
        $('body, html').animate({scrollTop: 0})
    }, 1000);
});

$('.category-lock i').click(()=> {
    $('aside').animate({'left': '-100%'});
 
    setTimeout(() => {
        $('body, html').animate({scrollTop: 0})
    }, 1000);
});

$('#search-btn').click(()=>{
    $('.center').css({'display': 'flex'});
    $('#search').focus();
});

$('#search-hide').click(()=> {
    $('.center').css({'display': 'none'});
});
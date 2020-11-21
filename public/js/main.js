 $(window).scroll((e)=> {
    if(scrollY > 20) {
        $('header').css({"box-shadow": '0 2px 20px #eee'});
        $('#go-top').css({'display': 'flex'});
    } else {
        $('header').css({"box-shadow": 'none'});
        $('#go-top').css({'display': 'none'});
    }
});
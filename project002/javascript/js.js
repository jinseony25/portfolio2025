// 장바구니설정1

$('.util li').eq(2).click(function (e) {
    e.preventDefault()

    $('.shop').show();
    $('.shop1').stop().animate({ 'right': 0 }, 800)
})

$('.close').click(function () {

    $('.shop').hide();
    $('.shop1').stop().animate({ 'right': '-30%' }, 800)
})


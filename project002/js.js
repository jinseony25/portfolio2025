$(function () {
    // about
    // li에 마우스 올렸을 때 이미지 교체
    $('.name-list li').on('mouseover', function () {
        const imageUrl = $(this).data('image');
        $('.about .imgBox').css('background-image', `url('${imageUrl}')`);
    });

    // 리스트 영역에서 마우스 벗어나면 이미지 초기화
    $('.name-list').on('mouseleave', function () {
        $('.about .imgBox').css('background-image', 'none');
    });



  

});




(function() {

    hljs.configure({
        tabReplace: '    ' // 4 spaces
    });
    hljs.initHighlightingOnLoad();

    VK.init({apiId: 4501632, onlyWidgets: true});

    BEM.DOM.decl('b-page', {

        onSetMod: {
            js: {
                inited: function() {
                var top = $('.post__head').offset().top - parseInt($('.post__head').css('marginTop')) + 20;
                var tops = [];
                $('h2').each(function(i) {
                    tops.push({elem: $(this), top: $(this).offset().top - parseInt($(this).css('marginTop')) - 15});
                });
                tops.sort(function(a,b) {
                    if(a.top<b.top) return -1;
                    if(a.top>b.top) return +1;
                    else return 0;
                });

                var h1 = 0;
                var old_h2 = -1, h2 = -1;
                window.onscroll = function (event) {
                    console.log('dsf');
                    // toggling H1 position
                    if((h1 == 0) && ($(this).scrollTop() >= top)) {
                        $('.post__head').addClass('fixed');
                        $('.post__body').addClass('header_fixed');
                        h1 = 1;
                    }
                    if((h1 == 1) && ($(this).scrollTop() <= top)) {
                        $('.post__head').removeClass('fixed');
                        $('.post__body').removeClass('header_fixed');
                        h1 = 0;
                    }

                    // adding H2 text to H1
                    old_h2 = h2;
                    h2 = -1;
                    for(i in tops)
                        if ($(this).scrollTop() >= tops[i].top)
                            h2 = i;
                    if(h2 != old_h2)
                    {
                        if(h2>-1)   $('.post__header2').addClass('display').text($(tops[h2].elem).text());
                        else        $('.post__header2').removeClass('display');
                    }
                }

                }
            }
        }

    });

})();
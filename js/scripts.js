//Script banner
$(window).load(function () {
    var numBanner;
    var ultimoBanner;
    var larguraBolinhas;
    var larguraPrimeiroBanner;
    var centralizaBolinhas;
    var slideAtual = 0;
    var slideAtivo = 0;
    var time = 5000;
    var interval = null;
    
    //Pega número de banners
    numBanner = $('#banner #listaBanner li').length;
    ultimoBanner = parseInt(numBanner - 1);

    //Cria bolinhas
    for (var i = 0; i < numBanner; i++) {
        $('#banner #faixaCinza ul').append('<li class="bolinhas" data-target=' + i + '></li>');
        $('#listaBanner > li:eq(' + i + ')').attr('data-target', i);
    };

    //Adiciona a classe a primeira bolinha da lista
    $('#banner #faixaCinza').find('.bolinhas').eq(0).addClass('ativa'); // ativa primero bullet

    //Pega as larguras do banner e das bolinhas para centraliza-las na faixa
    larguraPrimeiroBanner = $('#listaBanner li').outerWidth();
    larguraBolinhas = $('#formataUlBanner').outerWidth();
    centralizaBolinhas = (larguraPrimeiroBanner - larguraBolinhas) / 2;

    //Centraliza as bolinhas
    $('#banner #formataUlBanner').css('margin-left', centralizaBolinhas);
    
    //Atribui clique com base no atributo
    $('#banner #faixaCinza').find('.bolinhas').click(function () {
        //Atribui o valor da data-target a variável
        slideAtual = $(this).attr('data-target');
        if (slideAtivo != slideAtual) {
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtivo).removeClass('ativa');
            $('#banner #listaBanner li:eq(' + slideAtivo + ')').css('display', 'none');
            $('#banner #listaBanner li:eq(' + slideAtual + ')').animate({ opacity: 'show' }, 1000);
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtual).addClass('ativa');
            slideAtivo = $(this).attr('data-target');
            limpaIntervalo();
        }
    });

    //Faz a troca dos banners para esquerda e direita
    $('#setaEsquerda').click(function () {
        if (slideAtivo == 0) {
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtivo).removeClass('ativa');
            $('#banner #listaBanner li:eq(' + slideAtivo + ')').css('display', 'none');
            $('#banner #listaBanner li:eq(' + ultimoBanner + ')').animate({ opacity: 'show' }, 1000);
            $('#banner #faixaCinza').find('.bolinhas').eq(ultimoBanner).addClass('ativa');
            slideAtivo = ultimoBanner;
            slideAtual = ultimoBanner;
            limpaIntervalo();
        }else{
            slideAtual--;
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtivo).removeClass('ativa');
            $('#banner #listaBanner li:eq(' + slideAtivo + ')').css('display', 'none');
            $('#banner #listaBanner li:eq(' + slideAtual + ')').animate({ opacity: 'show' }, 1000);
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtual).addClass('ativa');
            slideAtivo = slideAtual;
            limpaIntervalo();
        }
    });

    $('#setaDireita').click(function () {
        if (slideAtivo == ultimoBanner) {
             $('#banner #faixaCinza').find('.bolinhas').eq(slideAtivo).removeClass('ativa');
             $('#banner #listaBanner li:eq(' + slideAtivo + ')').css('display', 'none');
             $('#banner #listaBanner li:eq(0)').animate({ opacity: 'show' }, 1000);
             $('#banner #faixaCinza').find('.bolinhas').eq(0).addClass('ativa');
             slideAtivo = 0;
             slideAtual = 0;
             limpaIntervalo();
        }else{
            slideAtual++;
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtivo).removeClass('ativa');
            $('#banner #listaBanner li:eq(' + slideAtivo + ')').css('display', 'none');
            $('#banner #listaBanner li:eq(' + slideAtual + ')').animate({ opacity: 'show' }, 1000);
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtual).addClass('ativa');
            slideAtivo = slideAtual;
            limpaIntervalo();
        }
    });

    //Função usada para trocar o banner com tempo
    function animaBanner() {
        if (slideAtual >= 0 && slideAtual < ultimoBanner) {
            slideAtual++;
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtivo).removeClass('ativa');
            $('#banner #listaBanner li:eq(' + slideAtivo + ')').css('display', 'none');
            $('#banner #listaBanner li:eq(' + slideAtual + ')').animate({ opacity: 'show' }, 1000);
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtual).addClass('ativa');
            slideAtivo = slideAtual;
            limpaIntervalo()
        } else if (slideAtivo == ultimoBanner) {
            $('#banner #faixaCinza').find('.bolinhas').eq(slideAtivo).removeClass('ativa');
            $('#banner #listaBanner li:eq(' + slideAtivo + ')').css('display', 'none');
            $('#banner #listaBanner li:eq(0)').animate({ opacity: 'show' }, 1000);
            $('#banner #faixaCinza').find('.bolinhas').eq(0).addClass('ativa');
            slideAtivo = 0;
            slideAtual = 0;
            limpaIntervalo();
        }
    }

    limpaIntervalo();

    //Função para limpar o intervalo de tempo e executar a troca a cada ciclo de tempo
    function limpaIntervalo(){
        if (time) {
            clearInterval(interval);
            interval = setInterval(function () {
                animaBanner();
            }, time);
        }
    }
});

//Mostra-esconde
$(document).ready(function () {
    abreFecha("#boxMostraEsconde");

    function abreFecha(div){
        $(div).children().click(function () {
            if ($(this).children().eq(1).is(":hidden")) {
                    $(this).children().eq(1).slideDown();
                    $(this).children().eq(0).children().addClass("aberto");

            } else{
                    $(this).children().eq(1).slideUp();
                    $(this).children().eq(0).children().removeClass("aberto");
            }        
        });
    }
});
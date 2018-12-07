// ==UserScript==
// @name         RandStuff degenerator
// @namespace    https://github.com/alxbb/RS_degenerator/blob/master/RandStuff%20degenerator.user.js
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://randstuff.ru/number/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var pseudoRand;

    function degenerate(data) {
        var caption = $('#caption');
        var container = $('#number');
        var save = $('#number-save');

        var count = ($('#slider').length) ? $('#slider').slider('value') : 1;
        var from = $('#number-from input[name="from"]:checked').val();
        var start = $('#number-start').val();
        var end = $('#number-end').val();
        var list = $('#number-list').val();
        var unique = $('#number-unique input').is(':checked') ? 1 : 0;
        var tz = new Date().getTimezoneOffset();
        alert(data + " / " + count + " / ");
                if (!data.error) {
                    if (count > 1) {
                        alert('2');
                        caption.text(caption.data('mtxt'));
                        container.attr('class', 'multi').css('min-height', container.height());
                        container.html('<span class="cur"></span>');

                        var i = 1;

                        for (var n in data) {
                            $('<span> ' + data[n] + '</span>,')
                                .css({'opacity': 0})
                                .appendTo(container.find('.cur'))
                                .delay(250/data.length*(i ++))
                                .animate({'opacity': 1}, 200);
                        }

                        setTimeout(function() { container.css('min-height', ''); }, 250);

                        save.html('<span>' + save.data('mtxt') + '</span>');
                        $('#pay-dialog').find('.save-link')
                            .attr('href', 'https://randstuff.ru/number/' + data.save + '/')
                            .text('https://randstuff.ru/number/' + data.save + '/');

                        $('#pay-dialog').find('form').attr('action', '/number/' + data.save + '/');
                    } else {
                        caption.text(caption.data('txt'));
                        container.attr('class', 'single');

                        var number = String(data);
                        number.split('');

                        var html = '<span class="new">';
                        for (var i = 0;  i < number.length; i ++) {
                            html += '<span>' + number.charAt(i) + '</span>';
                        }
                        html += '</span>';

                        container.find('.new').attr('class', 'cur');
                        container.find('.cur').remove();
                        container.append(html);

                        var i = 1;
                        container.find('.new span').each(function() {
                            $(this)
                                .delay(parseInt(200/number.length)*(i ++))
                                .animate({'bottom': 0}, 200, 'easeOutQuint');
                        });

                        save.html('<span>' + save.data('txt') + '</span>');
                        $('#pay-dialog').find('.save-link')
                            .attr('href', 'https://randstuff.ru/number/' + data.save + '/')
                            .text('https://randstuff.ru/number/' + data.save + '/');

                        $('#pay-dialog').find('form').attr('action', '/number/' + data.save + '/');
                    }

                }
     }

    jQuery('document').ready(function(){
        //alert('QQQ');
        jQuery('#button.number').unbind('click');
    });
    jQuery('#caption').click(function(){
        pseudoRand = prompt('Введите псевдослучайные числа',pseudoRand);
    });
    jQuery('#button.number').click(function(){
        //alert(pseudoRand);
        degenerate(pseudoRand.split(" "));
    });

    
})();

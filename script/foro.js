/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $('.participarTema').click(function(){
        $('#temaForo').fadeOut('fast');
        $('#comentariosForo').fadeIn('slow');
    });
    $('.salir').click(function(){
        $('#comentariosForo').fadeOut('fast');
        $('#temaForo').fadeIn('slow');
    });
});


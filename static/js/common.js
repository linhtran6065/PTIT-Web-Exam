//Loader, will be called when the document is ready

$(document).ready(function() {
    console.log('Document is ready, showing loader');
    //Wait 1 second before hiding the loader
    setTimeout(function() {
        console.log('Document is ready, hiding loader');
        $('#loader').addClass('hidden');
        setTimeout(function() {
            $('#loader').remove();
        }, 500);
    }, 500);
});
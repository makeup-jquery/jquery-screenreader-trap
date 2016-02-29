// called by every test suite
function setupSuite(html, options) {
    // setup dom
    $('body').empty().html(html);

    // setup globals
    $body = $('body');
    $trap = $('.trap');
    $hasExistingState = $('.has-existing-state');

    // execute plugin on widget
    $.trapScreenreader($trap, options);
}

// called by every test suite
function setupSuite(html, options) {
    // setup dom
    $('body').empty().html(html);

    // setup globals
    $body = $('body');
    $trap = $('.trap');
    $hasExistingState = $('.has-existing-state');
    trapNotified = [];
    untrapNotified = [];

    $trap.on('screenreaderTrap', function () {
        trapNotified.push(true);
    });

    $trap.on('screenreaderUntrap', function () {
        untrapNotified.push(true);
    });

    // execute plugin on widget
    $.trapScreenreader($trap, options);
}

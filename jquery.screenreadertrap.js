/**
* @name jquery-screenreader-trap
* @function $.trapScreenreader
* @version 0.1.3
* @author Ian McBurnie <ianmcburnie@hotmail.com>
* @desc Restricts virtual cursor to the given element and it's children. This is
* achieved by adding aria-hidden=true to all siblings and ancestor siblings of
* the trapped element. Any elements that have aria-hidden=true state before
* the trap is activated must have their state preserved. Note this plugin does
* not trap regular keyboard focus, use jquery-keyboard-trap instead.
* @fires on.screenreaderTrap
* @fires off.screenreaderTrap
*/
(function ($, window, document, undefined) {

    var $trappedEl,
        $modifiedElements;

    $.trapScreenreader = function trapScreenReader(el) {
        $.untrapScreenreader();

        $trappedEl = $(el);

        var $siblings = $trappedEl.siblings(':not(script, [aria-hidden=true])');
        var $parents = $trappedEl.parents(':not(html, body)');
        var $parentsSiblings = $trappedEl.parents(':not(html, body)').siblings(':not(script, [aria-hidden=true])');

        $trappedEl.attr('aria-hidden', 'false');
        $siblings.attr('aria-hidden', 'true');
        $parents.attr('aria-hidden', 'false');
        $parentsSiblings.attr('aria-hidden', 'true');

        $modifiedElements = $trappedEl.add($siblings).add($parents).add($parentsSiblings);

        $trappedEl.trigger('on.screenreaderTrap');
    };

    $.untrapScreenreader = function untrapScreenReader() {
        if ($trappedEl) {
            $modifiedElements.removeAttr('aria-hidden');
            $trappedEl.trigger('off.screenreaderTrap');
        }
    };

}(jQuery, window, document));

/**
 * @file jQuery singleton traps virtual cursor to the given element and it's children
 * @author Ian McBurnie <ianmcburnie@hotmail.com>
 */

(function($, window, document, undefined) {

    var pluginName = 'jquery-screenreader-trap';

    /**
    * jQuery definition to anchor JsDoc comments.
    *
    * @see http://jquery.com/
    * @name $
    * @class jQuery Library
    */

    /**
    * jQuery 'fn' definition to anchor JsDoc comments.
    *
    *
    * @see http://jquery.com/
    * @name fn
    * @class jQuery Plugin Scope
    * @memberof jQuery
    */

    /**
    * jQuery singleton traps keyboard focus cycle within given element's interactive children
    *
    * @class trapScreenreader
    * @version 0.2.1
    * @fires screenreaderTrap - when trap is activated
    * @fires screenreaderUntrap - when trap is deactivated
    * @return {jQuery} chainable jQuery class
    * @memberof jQuery.fn
    */

    /**
    * keyboardTrap event
    *
    * @event screenreaderTrap
    * @type {object}
    * @property {object} event - event object
    * @memberof jQuery.fn.trapScreenreader
    */

    /**
    * keyboardUntrap event
    *
    * @event screenreaderUntrap
    * @type {object}
    * @property {object} event - event object
    * @memberof jQuery.fn.trapScreenreader
    */

    // the element that will be trapped
    var $trappedEl;

    // collection of elements that will be modified
    var $modifiedElements;

    $.trapScreenreader = function trapScreenReader(el) {
        // ensure current trap is deactivated
        $.untrapScreenreader();

        // store reference to trapped el
        $trappedEl = $(el);

        // find all the elements we need to hide, and all the elements we must keep unhidden
        var $siblings = $trappedEl.siblings(':not(script, [aria-hidden=true])');
        var $parents = $trappedEl.parents(':not(html, body)');
        var $parentsSiblings = $trappedEl.parents(':not(html, body)').siblings(':not(script, [aria-hidden=true])');

        // update DOM
        $trappedEl.attr('aria-hidden', 'false');
        $siblings.attr('aria-hidden', 'true');
        $parents.attr('aria-hidden', 'false');
        $parentsSiblings.attr('aria-hidden', 'true');

        // store reference to collection of elements that have been modified
        $modifiedElements = $trappedEl.add($siblings).add($parents).add($parentsSiblings);

        // notify observers
        $trappedEl.trigger('screenreaderTrap');
    };

    $.untrapScreenreader = function untrapScreenReader() {
        if ($trappedEl) {
            // restore modified elements to their original state
            $modifiedElements.removeAttr('aria-hidden');

            // notify observers
            $trappedEl.trigger('screenreaderUntrap');
        }
    };

}(jQuery, window, document));

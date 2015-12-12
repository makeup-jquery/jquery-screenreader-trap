describe("jquery.screenreadertrap.js", function() {

    var dom = '<div id="grandparent">'
                + '<div class="uncle"></div>'
                + '<div id="parent">'
                    + '<div class="sibling"></div>'
                    + '<div id="trap"></div>'
                    + '<div class="sibling"></div>'
                + '</div>'
                + '<div class="uncle"></div>'
            + '</div>';
    var $body = $('body');
    var $trap;

    beforeEach(function() {
        $body.empty().append($(dom));
        $trap = $('#trap');
    });

    it("should add aria-hidden=false to trapped element", function(){
        $.trapScreenreader($trap);
        expect($trap.attr('aria-hidden')).toEqual("false");
    });

    it("should remove aria-hidden from untrapped element", function(){
        $.trapScreenreader($trap);
        $.untrapScreenreader();
        expect($trap.attr('aria-hidden')).toEqual(undefined);
    });

    it("should add aria-hidden=false to parents of trapped element", function(){
        $.trapScreenreader($trap);
        expect($trap.parents().attr('aria-hidden')).toEqual('false');
    });

    it("should remove aria-hidden from parents of untrapped element", function(){
        $.trapScreenreader($trap);
        $.untrapScreenreader();
        expect($trap.parents().attr('aria-hidden')).toEqual(undefined);
    });

    it("should add aria-hidden=true to sibling elements", function(){
        $.trapScreenreader($trap);
        expect($trap.prev().attr('aria-hidden') === 'true' && $trap.next().attr('aria-hidden') === 'true').toEqual(true);
    });

    it("should remove aria-hidden from sibling elements", function(){
        $.trapScreenreader($trap);
        $.untrapScreenreader();
        expect($trap.prev().attr('aria-hidden') === undefined && $trap.next().attr('aria-hidden') === undefined).toEqual(true);
    });

    it("should add aria-hidden=true to uncle elements when trapped", function(){
        $.trapScreenreader($trap);
        expect($trap.parent().prev().attr('aria-hidden') === 'true' && $trap.parent().next().attr('aria-hidden') === 'true').toEqual(true);
    });

    it("should remove aria-hidden from uncle elements when untrapped", function(){
        $.trapScreenreader($trap);
        $.untrapScreenreader();
        expect($trap.parent().prev().attr('aria-hidden') === undefined && $trap.parent().next().attr('aria-hidden') === undefined).toEqual(true);
    });

    it("should preserve existing aria-hidden state in siblings during trap", function(){
        $.trapScreenreader($trap);
        expect($trap.prev().attr('aria-hidden') === 'true' && $trap.next().attr('aria-hidden') === 'true').toEqual(true);
    });

    it("should preserve existing aria-hidden state in siblings after trap", function(){
        $trap.prev().attr('aria-hidden', 'true');
        $trap.next().attr('aria-hidden', 'true');
        $.trapScreenreader($trap);
        $.untrapScreenreader();
        expect($trap.prev().attr('aria-hidden') === 'true' && $trap.next().attr('aria-hidden') === 'true').toEqual(true);
    });

});

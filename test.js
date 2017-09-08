/* eslint no-undef: 0 */

data.forEach(function(data) {
    describe("when trap is activated", function() {
        beforeAll(function() {
            setupSuite(data);
        });
        it("should add aria-hidden=false to trapped element", function() {
            expect($trap.attr('aria-hidden')).toBe('false');
        });
        it("should add aria-hidden=true to sibling elements", function() {
            expect($trap.prev().attr('aria-hidden')).toBe('true');
            expect($trap.next().attr('aria-hidden')).toBe('true');
        });
        it("should add aria-hidden=false to parents of trapped element", function() {
            expect($trap.parents().attr('aria-hidden')).toBe('false');
        });
        it("should add aria-hidden=true to siblings of parent when trapped", function() {
            expect($trap.parent().prev().attr('aria-hidden')).toBe('true');
            expect($trap.parent().next().attr('aria-hidden')).toBe('true');
        });
        it("should preserve any existing aria-hidden state in siblings", function() {
            expect($hasExistingState.attr('aria-hidden')).toBe('true');
        });
        it("should message about the trap once", function() {
            expect(trapNotified).toEqual([true]);
        });
        it("should not message about the untrap", function() {
            expect(untrapNotified).toEqual([]);
        });
    });
    describe("when trap is deactivated", function() {
        beforeAll(function() {
            setupSuite(data);
            $.untrapScreenreader();
        });
        it("should add aria-hidden=false to trapped element", function() {
            expect($trap.attr('aria-hidden')).toBe(undefined);
        });
        it("should remove aria-hidden from sibling elements", function() {
            expect($trap.prev().attr('aria-hidden')).toBe(undefined);
            expect($trap.next().attr('aria-hidden')).toBe(undefined);
        });
        it("should remove aria-hidden from parents of untrapped element", function() {
            expect($trap.parents().attr('aria-hidden')).toBe(undefined);
        });
        it("should remove aria-hidden from siblings of parent when untrapped", function() {
            expect($trap.parent().prev().attr('aria-hidden')).toBe(undefined);
            expect($trap.parent().next().attr('aria-hidden')).toBe(undefined);
        });
        it("should preserve any existing aria-hidden state in siblings", function() {
            expect($hasExistingState.attr('aria-hidden')).toBe('true');
        });
        it("should message about the trap once", function() {
            expect(trapNotified).toEqual([true]);
        });
        it("should message about the untrap once", function() {
            expect(untrapNotified).toEqual([true]);
        });
        describe("when trap is deactivated again", function() {
            beforeEach(function() {
                $.untrapScreenreader();
            });
            it("should not message about the untrap again", function() {
                expect(untrapNotified).toEqual([true]);
            });
        });
    });
});

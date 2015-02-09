
var assert = chai.assert;
var wrap = ShadowDOMPolyfill.wrap;

var a = document.querySelector('a');
document.write('<script><' + '/script>');
wrap(document).write('<b></b>');
assert.equal(a.nextSibling.localName, 'script');
assert.equal(a.nextSibling.nextSibling.localName, 'script');
assert.equal(a.nextSibling.nextSibling.nextSibling.localName, 'b');

var all = document.querySelectorAll('*');
var last = all[all.length - 1];
assert.equal(last.localName, 'b');

done();

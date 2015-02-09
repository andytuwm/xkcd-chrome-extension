
      var assert = chai.assert;
      function oneMutation(node, options, cb) {
        var o = new MutationObserver(function() {
          cb();
          o.disconnect();
        });
        o.observe(node, options);
      }
      
      document.addEventListener('polymer-ready', function() {
        var xbasic = document.querySelector('x-basic');
        assert.equal(xbasic.nog, undefined, 'property published with `attributes` has correct initial value');
        xbasic.setAttribute('nog', 'hi');
        assert.equal(xbasic.nog, 'hi', 'deserialization of property published via `attributes`');

        var xattrpublish = document.querySelector('x-attr-publish');
        assert.equal(xattrpublish.nog, '', 'property published with `attributes` has correct initial value');
        xattrpublish.setAttribute('nog', 'hi');
        assert.equal(xattrpublish.nog, 'hi', 'deserialization of property published via `attributes`');

        var xcompose = document.querySelector('x-compose');
        var xfoo = document.querySelector('x-foo');
        assert.equal(xfoo.foo, '', 'property published with info object has correct initial value');
        xfoo.foo = 5;
        xfoo.setAttribute('def1', '15');
        xfoo.def2 = 15;
        //
        assert.isFalse(xcompose.$.bar.hasAttribute('zim'), 'attribute bound to property updates when binding is made');
        assert.equal(xfoo.getAttribute('def2'), '15', 'default valued published property reflects to attr');
        assert.equal(xfoo.def1, '15', 'attr updates default valued published property');
        assert.equal(String(xfoo.foo), xfoo.getAttribute('foo'), 'attribute reflects property as string');
        xfoo.setAttribute('foo', '27');
        assert.equal(xfoo.foo, xfoo.getAttribute('foo'), 'property reflects attribute');
        //
        xfoo.baz = 'Hello';
        //
        assert.equal(xfoo.baz, xfoo.getAttribute('baz'), 'attribute reflects property');
        //
        var xbar = document.querySelector('x-bar');
        assert.equal(xbar.zim, false, 'property published with info object has correct initial value');
        assert.equal(xbar.foo, '', 'property published with info object has correct initial value');
        //
        xbar.foo = 'foo!';
        xbar.zot = 27;
        xbar.zim = true;
        xbar.str = 'str!';
        xbar.obj = {hello: 'world'};
        //
        assert.equal(xbar.foo, xbar.getAttribute('foo'), 'inherited published property is reflected');
        assert.equal(String(xbar.zot), xbar.getAttribute('zot'), 'attribute reflects property as number');
        assert.equal(xbar.getAttribute('zim'), '', 'attribute reflects true valued boolean property as having attribute');
        assert.equal(xbar.str, xbar.getAttribute('str'), 'attribute reflects property as published string');
        assert.isFalse(xbar.hasAttribute('obj'), 'attribute does not reflect object property');
        //
        xbar.setAttribute('zim', 'false');
        xbar.setAttribute('foo', 'foo!!');
        xbar.setAttribute('zot', 54);
        xbar.setAttribute('str', 'str!!');
        xbar.setAttribute('obj', "{'hello': 'world'}");
        //
        assert.equal(xbar.foo, xbar.getAttribute('foo'), 'property reflects attribute as string');
        assert.equal(xbar.zot, 54, 'property reflects attribute as number');
        assert.equal(xbar.zim, false, 'property reflects attribute as boolean');
        assert.equal(xbar.str, 'str!!', 'property reflects attribute as published string');
        assert.deepEqual(xbar.obj, {hello: 'world'}, 'property reflects attribute as object');
        //
        xbar.zim = false;
        //
        assert.isFalse(xbar.hasAttribute('zim'), 'attribute reflects false valued boolean property as NOT having attribute');
        //
        var objAttr = xbar.getAttribute('obj');
        oneMutation(xbar, {attributes: true}, function() {  
          assert.equal(xbar.getAttribute('obj'), 'hi', 'reflect property based on current type');
          //assert.isFalse(xbar.hasAttribute('obj'), 'property with default type of object does not serialize');
          done();
        });
        //
        var xzot = document.querySelector('x-zot');
        assert.equal(xzot.str, 'str2');
        xzot.str = 'hello';
        assert.equal(xzot.getAttribute('str'), xzot.str);
        //
        assert.equal(xzot.zot, 2);
        xzot.zot = 5;
        assert.isFalse(xzot.hasAttribute('zot'), 'extendee reflect false not honored');
        //
        xbar.obj = 'hi';
        // trigger a mutation to watch
        xbar.setAttribute('dummy', 'dummy');
        // 
        // don't let observe polyfill wait, flush asap
        Platform.flush();
      });
    
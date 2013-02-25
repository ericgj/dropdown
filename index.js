var Menu = require('menu')
  , event = require('event')

module.exports = Dropdown;

function Dropdown(ref){
  if (!(this instanceof Dropdown)) return new Dropdown(ref);
  Menu.bind(this)();  // call super

  if (ref) this.attachTo(ref); 

  return this;
};

Dropdown.prototype.__proto__ = Menu.prototype;

Dropdown.prototype.attachTo = function(ref){
  
  this.anchor = toElem(ref);

  // position menu below anchor
  this.moveBelow();

  // toggle menu on clicking anchor
  var menu = this;
  event.bind(this.anchor, 'click', function(e){
    e.preventDefault();
    e.stopPropagation();
    menu.toggle();
  });

  return this;
};


/**
 * Move menu below reference element
 *
 * @return {Dropdown}
 * @api public
 */

Dropdown.prototype.moveBelow = function(){
  var ref = this.anchor;
  return this.moveTo(ref.offsetLeft,
                     ref.offsetTop + ref.offsetHeight
                    );
};

/**
 * Move menu to the right of reference element
 *
 * @return {Dropdown}
 * @api public
 */

Dropdown.prototype.moveRight = function(){
  var ref = this.anchor;
  return this.moveTo(ref.offsetLeft + ref.offsetWidth,
                     ref.offsetTop
                    );
};

/**
 * Return element from selector string
 *
 * @param {String|Element} el element or selector string
 * @param {Element} reference element (defaults to document)
 * @return {Element}
 * @api private
 */

function toElem(el,ref) {
  if (!ref) ref = document;
  if ('string'== typeof el) el = ref.querySelector(el);
  return el;
};


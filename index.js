var Menu = require('menu')
  , event = require('event')

module.exports = Dropdown;

function Dropdown(ref){
  if (!(this instanceof Dropdown)) return new Dropdown(ref);
  Menu.bind(this)();  // call super

  this.moveBelow();
  if (ref) this.attachTo(ref); 

  return this;
};

Dropdown.prototype.__proto__ = Menu.prototype;

Dropdown.prototype.attachTo = function(ref){
  
  ref = toElem(ref);
  
  // position menu relative to ref and
  // toggle menu on clicking ref
  var menu = this;
  event.bind(ref, 'click', function(e){
    e.preventDefault();
    e.stopPropagation();
    if (menu.positioning) menu.positioning(ref);
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
  var self = this;
  this.positioning = function(ref){
    return self.moveTo(ref.offsetLeft,
                       ref.offsetTop + ref.offsetHeight
                      );
  };
};

/**
 * Move menu to the right of reference element
 *
 * @return {Dropdown}
 * @api public
 */

Dropdown.prototype.moveRight = function(){
  var self = this;
  this.positioning = function(ref){
    return this.moveTo(ref.offsetLeft + ref.offsetWidth,
                       ref.offsetTop
                      );
  };
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


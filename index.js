var Menu = require('menu')

module.exports = Dropdown;

function Dropdown(ref){
  if (!(this instanceof Dropdown)) return new Dropdown(ref);
  var anchor = toElem(ref);

  // position menu below anchor
  this.moveBelow(anchor);

  // toggle menu on clicking anchor
  var menu = this;
  anchor.onclick = function(e){
    e.preventDefault();
    e.stopPropagation();
    menu.toggle();
  };
  
  // deselect all items on selecting
  this.on('select', this.deselect.bind(this));

  return this;
};


Dropdown.prototype = new Menu;

Dropdown.prototype.load = function(){};

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


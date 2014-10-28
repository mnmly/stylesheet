/**
 * Expose `Sheet`
 */

module.exports = Sheet;

function Sheet() {
  this.el = document.createElement('style');
  this.el.id = 'style-' + Date.now();
  // WebKit hack
  this.el.appendChild(document.createTextNode(''));
  this.append();
}

/**
 * Add rule
 *
 * @param {String} selector
 * @param {String} rules
 * @param {Number} index
 */

Sheet.prototype.addRule = function(selector, rules, index) {
  if('insertRule' in this.sheet) {
    this.sheet.insertRule(selector + '{' + rules + '}', index);
  } else if('addRule' in this.sheet) {
    this.sheet.addRule(selector, rules, index);
  }
};

/**
 * Append rule to the end of rules
 *
 * @param {String} selector
 * @param {String} rules
 *
 * @return {Number} index
 */

Sheet.prototype.appendRule = function(selector, rules) {
  var index = this.sheet.rules.length;
  this.addRule(selector, rules, index);
  return index;
};

/**
 * Delete rule at index
 *
 * @param {Number} index
 */

Sheet.prototype.deleteRule = function(index) {
  this.sheet.deleteRule(index);
};

/**
 * Append to `head`
 */

Sheet.prototype.append = function() {
  document.head.appendChild(this.el);
  this.sheet = this.el.sheet;
};

/**
 * Destroy
 */

Sheet.prototype.destroy = function() {
  this.el.parentElement && this.el.parentElement.removeChild(this.el);
};

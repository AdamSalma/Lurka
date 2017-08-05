/**
 * format - Python's `string.format` ported to javascript
 * @param  {any*} - Any number of args
 * @return {str}  - Formatted String
 *
 * Usage:
 
 bar1 = 'foobar'
 bar2 = 'jumped'
 bar3 = 'dog'
 foo = 'The lazy {0} {} over the {2}'.format(bar3, bar2, bar1); 

 >> 'The lazy dog jumped over the foobar'

 */
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d*)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}



if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    var encountered = -1
    return this.replace(/{((\d+)?)}/g, function(match, number) { 
      encountered++
      if (!number && typeof args[encountered] !== 'undefined') {
        return args[encountered]
      }
      return typeof args[number] !== 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

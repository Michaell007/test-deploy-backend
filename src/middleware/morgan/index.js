// morgan functions (https://github.com/expressjs/morgan/blob/master/index.js)

/**
 * Compile a format string into a function.
 *
 * @param {string} format
 * @return {function}
 * @public
 */
 export function compile (format) {
    if (typeof format !== 'string') {
      throw new TypeError('argument format must be a string')
    }
  
    var fmt = String(JSON.stringify(format))
    var js = '  "use strict"\n  return ' + fmt.replace(/:([-\w]{2,})(?:\[([^\]]+)\])?/g, function (_, name, arg) {
      var tokenArguments = 'req, res'
      var tokenFunction = 'tokens[' + String(JSON.stringify(name)) + ']'
  
      if (arg !== undefined) {
        tokenArguments += ', ' + String(JSON.stringify(arg))
      }
  
      return '" +\n    (' + tokenFunction + '(' + tokenArguments + ') || "-") + "'
    })
  
    // eslint-disable-next-line no-new-func
    return new Function('tokens, req, res', js)
}
  
/**
 * Determine if the response headers have been sent.
 *
 * @param {object} res
 * @returns {boolean}
 * @private
 */
export function headersSent (res) {
return typeof res.headersSent !== 'boolean'
    ? Boolean(res._header)
    : res.headersSent
}
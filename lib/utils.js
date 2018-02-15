'use strict';

const { URL } = require('url');

/**
 * Constructs an absolute content / fallback URI out of a manifest URI
 * and a relative content / fallback URI
 *
 * @param {String} input Relative content URI
 * @param {String} base Absolute manifest URI
 * @param {String} extra Relative path to be appended at the end of the URI
 *
 * @returns {String} an absolute content URI
 */

module.exports.uriBuilder = (input = '', base = '', extra = '') => {
    const uriObj = new URL(base);
    const inputPath = input.split('/').filter(item => item);
    const basePath = uriObj.pathname
        .split('/')
        .filter(item => item && !item.includes('.json'));
    const extraPath = extra.split('/').filter(item => item);

    uriObj.pathname = basePath.concat(inputPath, extraPath).join('/');
    return uriObj.toString();
};

/**
 * Checks if a URI is relative
 *
 * @param {String} uri A URI to check
 *
 * @returns {Boolean}
 */

module.exports.uriIsRelative = uri => uri.substr(0, 4) !== 'http';

/**
 * Check if a content / fallback URI is absolute or not.
 * If relative built an absolute URI.
 *
 * @param {String} input Relative content URI
 * @param {String} base Absolute manifest URI
 * @param {String} extra Relative path to be appended at the end of the URI
 *
 * @returns {String} an absolute content URI
 */

module.exports.uriRelativeToAbsolute = (input = '', base = '', extra = '') => {
    if (this.uriIsRelative(input)) {
        return this.uriBuilder(input, base, extra);
    }
    return input;
};

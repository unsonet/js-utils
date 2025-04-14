import { base64Utf8Module, ImageSSIM, parsePhone } from '@unsonet/external-libs';
export { base64Utf8Module, ImageSSIM, parsePhone };
export declare var regExpPatterns: {
    htmlTags: RegExp;
    firstChar: RegExp;
    jsonParser: RegExp;
    allScripts: RegExp;
    arrayParser: RegExp;
    escapeString: RegExp;
    parseArrayWithEscapedComma: RegExp;
    pseudoSelectors: RegExp;
    findDotInVariable: RegExp;
    parsePropertyPath: RegExp;
    streamSplitter: RegExp;
    wordSplit: RegExp;
    wordSeparators: RegExp;
    capitals: RegExp;
    basicCamel: RegExp;
    fourOrMoreConsecutiveCaps: RegExp;
    allCaps: RegExp;
    regExpTokens: RegExp;
    urlLike: RegExp;
    validUrl: RegExp;
    text: RegExp;
    sentenceSplitter: RegExp;
};
/**
 * Converts a file to a Base64-encoded string.
 *
 * @param {File} file - The file to be converted.
 * @param {boolean} [urlEncoded=false] - Whether to include the full data URL (with MIME type).
 * @param {boolean} [withHeader=false] - Whether to include the Base64 header in the result.
 * @return {Promise<string>} - A promise that resolves to the Base64-encoded string.
 * @tags #converter #string #web
 */
export declare function toBase64(file: any, urlEncoded?: boolean, withHeader?: boolean): Promise<unknown>;
/**
 * Converts a Blob object to a Base64-encoded string.
 *
 * @param {Blob} blob - The Blob object to be converted.
 * @return {Promise<string>} - A promise that resolves to the Base64-encoded string.
 * @tags #converter #string #web
 */
export declare function blobToBase64(blob: any): Promise<unknown>;
/**
 * Converts a Base64-encoded string to a Blob object.
 *
 * @param {string} b64Data - The Base64-encoded string.
 * @param {string} [contentType] - The MIME type of the resulting Blob. If not provided, it is extracted from the Base64 string.
 * @param {number} [sliceSize=512] - The size of each slice when processing the Base64 string.
 * @return {Blob} - The resulting Blob object.
 * @tags #converter #string #web
 */
export declare function base64toBlob(b64Data: any, contentType?: any, sliceSize?: number): Blob;
/**
 * Converts a Base64 Data URI to a binary Uint8Array.
 *
 * @param {string} base64 - The Base64 Data URI to be converted.
 * @return {Uint8Array} - The resulting binary data as a Uint8Array.
 * @tags #converter #string #web
 */
export declare function convertDataURIToBinary(base64: any): Uint8Array<ArrayBuffer>;
/**
 * Calculates the closeness between two numbers as a value between 0 and 1.
 *
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @return {number} - The closeness value, where 1 indicates identical numbers and 0 indicates maximum difference.
 * @tags #math #utility
 */
export declare function calculateCloseness(num1: any, num2: any): number;
/**
 * Clamps a value to the nearest boundary within a specified range.
 *
 * @param {number} value - The value to be clamped.
 * @param {[number, number]} range - An array representing the range [start, end].
 * @return {number} - The clamped value within the range.
 * @tags #math #utility
 */
export declare function clampToRange(value: any, range: any): any;
/**
 * Checks the overlap of two rectangular blocks along a specified axis or axes.
 *
 * @param {Object} block1 - The first block with properties like `x`, `y`, `width`, and `height`.
 * @param {Object} block2 - The second block with properties like `x`, `y`, `width`, and `height`.
 * @param {Object} options - Options for the overlap check.
 * @param {string|string[]} options.axis - The axis or axes to check (`'x'` or `'y'`).
 * @param {boolean} options.strict - Whether to require both intersection and containment for a match.
 * @param {boolean} options.strictIntersecting - Whether to use strict rules for intersection.
 * @param {boolean} options.strictContained - Whether to use strict rules for containment.
 * @param {number} [options.tolerance=0] - The tolerance value for overlap calculations.
 * @return {Object|Object[]} - The overlap results for each axis, or a single result if only one axis is specified.
 * @tags #geometry #utility #dom
 */
export declare function checkRectangleRanges(block1: any, block2: any, options: any): {
    axis: any;
    isContained: any;
    isIntersecting: any;
    inRange: boolean;
    biggestArgument: any;
} | {
    axis: any;
    isContained: any;
    isIntersecting: any;
    inRange: boolean;
    biggestArgument: any;
}[];
/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param {number} n - The number to be rounded.
 * @param {number} [digits=0] - The number of decimal places to round to.
 * @return {number} - The rounded number.
 * @tags #math #utility
 */
export declare function roundTo(n: any, digits: any): number;
/**
 * Returns the correct declension of a word based on a number.
 *
 * @param {number} n - The number to determine the declension for.
 * @param {string[]} titles - An array of three word forms: [singular, few, many].
 * @return {string} - The correct word form based on the number.
 * @tags #string #utility #localization
 */
export declare function declOfNum(n: number, titles: Array<string>): string;
/**
 * Gets the coordinates of an element relative to the document.
 *
 * @param {Element} elem - The DOM element to get the coordinates for.
 * @return {DOMRect} - A DOMRect object containing the element's position and size.
 * @tags #dom #geometry #utility
 */
export declare function getCoordFromDocument(elem: any): DOMRect;
/**
 * Retrieves the line and column number of the code execution point.
 *
 * @return {Object} - An object containing the `line` and `column` numbers of the caller's code location.
 * @tags #debugging #utility
 */
export declare function getCoordFromCode(): string | 0;
/**
 * Generates an array of numbers within a specified range.
 *
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range.
 * @return {number[]} - An array of numbers from `start` to `end` (inclusive).
 * @tags #array #utility #math
 */
export declare function numberRange(start: any, end: any): any[];
/**
 * Opens a new browser window with the specified URL, target, and features.
 *
 * @param {string} url - The URL to open in the new window.
 * @param {string} target - The target for the new window (e.g., `_blank`, `_self`).
 * @param {Object} featuresObject - An object specifying window features (e.g., width, height, resizable).
 * @return {Window|null} - A reference to the newly opened window, or `null` if the operation failed.
 * @tags #web #dom #utility
 */
export declare function openWindow(url: any, target: any, featuresObject: any): Window;
/**
 * Detects the browser name and returns its value and display name.
 *
 * @return {Object} - An object containing the browser's `value` (identifier) and `name` (display name).
 * @tags #browser #utility #web
 * @see https://gist.github.com/code-boxx/3875db284f522cacc375da94150edaf2
 */
export declare function getBrowserName(): {
    value: string;
    name: string;
};
/**
 * Determines the text direction (RTL, LTR, or auto) based on the content of the text.
 *
 * @param {string} text - The text to analyze for directionality.
 * @return {string} - The text direction: `'rtl'`, `'ltr'`, or `'auto'`.
 * @see https://gist.github.com/nekofar/f1f7b4f55e5ea24e49df289b034197a2 - Original source of the implementation.
 * @tags #string #utility #localization
 */
export declare function getTextDirection(text: any): "rtl" | "ltr" | "auto";
/**
 * Evaluates a condition based on a value, a comparison type, and an optional comparison value.
 *
 * @param {string | string[]} value - The value(s) to be checked.
 * @param {string} comparisonType - The type of comparison to perform (e.g., 'empty', 'equalTo', 'inList').
 * @param {string | string[]} [comparisonValue] - The value(s) to compare against.
 * @return {boolean} - The result of the condition evaluation.
 * @tags #utility #comparison #validation
 */
export declare function checkCondition(value: string | Array<string>, comparisonType: string, comparisonValue?: string | Array<string>): boolean;
/**
 * Parses a regular expression string and extracts its pattern and flags.
 *
 * @param {string} pattern - The regular expression string to parse.
 * @return {Array|null} - An array containing the matched parts of the regular expression or `null` if the input is invalid.
 * @tags #regex #string #utility
 */
export declare function parseRegExpString(pattern: any): any;
/**
 * Validates a file name to ensure it does not contain invalid characters.
 *
 * @param {string} fileName - The file name to validate.
 * @return {boolean} - `true` if the file name is valid, otherwise `false`.
 * @tags #validation #string #utility
 */
export declare function validateFileName(fileName: any): boolean;
/**
 * Sanitizes a file name by removing invalid characters and leading dots.
 *
 * @param {string} fileName - The file name to sanitize.
 * @return {string} - A valid file name with invalid characters removed.
 * @tags #string #utility #validation
 */
export declare function getValidFileName(fileName: any): any;
/**
 * Extracts the file extension from a given file name.
 *
 * @param {string} fileName - The file name to extract the extension from.
 * @return {string|undefined} - The file extension, or `undefined` if none is found.
 * @tags #string #utility #file
 */
export declare function getFileExtension(fileName: any): string;
/**
 * Extracts the file extension from a given file name.
 *
 * @param {string} fileName - The file name to extract the extension from.
 * @return {string|undefined} - The file extension, or `undefined` if none is found.
 * @tags #string #utility #file
 * @altname getFilename
 */
export declare function getFileName(fullPath: any, withExtension?: any): any;
/**
 * Injects a script into the DOM, either from a URL or as inline JavaScript.
 *
 * @param {string} str - The script content or URL to inject.
 * @param {Object} [options] - Options for the injection.
 * @param {boolean} [options.isURL=false] - Whether the `str` is a URL.
 * @param {Element} [options.context=document.documentElement] - The DOM context to inject the script into.
 * @param {Object} [options.attributes={}] - Additional attributes to set on the script element.
 * @tags #dom #script #utility #web
 * @altname loadScript
 */
export declare function injectToDOM(str: any, options: any): void;
/**
 * Provides a utility for extracting and cloning properties from objects, including the `window` object, while handling circular references and depth limits.
 *
 * @return {Object} - A utility object with methods for processing and extracting properties.
 * @tags #utility #object #window
 * @see https://stackoverflow.com/questions/31525166/converting-the-javascript-window-object-to-json - Inspiration for handling the `window` object.
 */
export declare var GetLocalProperties: (obj?: any, parent_objects?: any) => {};
/**
 * Retrieves specified global variables from the `window` object or a given document context.
 *
 * @param {string[]} variables - An array of variable names to retrieve.
 * @param {Document} [doc] - An optional document context to use instead of the default `window.document`.
 * @return {Object} - An object containing the retrieved variables and their values.
 * @tags #utility #window #variables #dom
 */
export declare function retrieveWindowVariables(variables: any, doc?: any): {};
/**
 * Extracts variables and their values from a string using a regular expression.
 *
 * @param {string} string - The input string containing variable definitions.
 * @return {Object} - An object where keys are variable names and values are their parsed values.
 * @tags #string #parsing #utility
 */
export declare function extractVariableFromString(string: any): {};
/**
 * Extracts the value(s) of specified variables from a string using a regular expression.
 *
 * @param {string} string - The input string containing variable definitions.
 * @param {string|string[]} variable - The variable name(s) to search for.
 * @param {boolean} [multiple=false] - Whether to extract multiple occurrences of the variable.
 * @param {boolean} [insensitive=false] - Whether the search should be case-insensitive.
 * @return {Object} - An object where keys are variable names and values are their extracted values.
 * @tags #string #parsing #utility
 */
export declare function getVariableFromString(string: any, variable: any, multiple?: any, insensitive?: any): any;
/**
 * Extracts variable values from JavaScript code by parsing it into an abstract syntax tree (AST).
 *
 * @param {string} code - The JavaScript code to analyze.
 * @return {Object} - An object where keys are variable names and values are their parsed values.
 * @tags #parsing #javascript #ast #utility
 */
export declare function extractVariableValues(code: any): {};
/**
 * Executes an HTML string by injecting it into the DOM and optionally delaying its removal.
 *
 * @param {string} htmlString - The HTML string to execute.
 * @param {number} [delayMs=0] - The delay in milliseconds before removing the injected HTML.
 * @return {Promise<string>} - A promise that resolves with the inner HTML of the executed content.
 * @tags #dom #html #utility
 */
export declare function executeHTML(htmlString: any, delayMs?: any): Promise<unknown>;
/**
 * Sets focus on a specified element without changing the current scroll position.
 *
 * @param {Element} elem - The DOM element to focus.
 * @tags #dom #focus #utility
 */
export declare function cursorFocus(elem: any): void;
/**
 * Formats a given date into a string with the format `DD/MM/YYYY HH:mm:ss:ms`.
 *
 * @param {Date} currentDate - The date to format.
 * @return {string} - The formatted date string.
 * @tags #date #formatting #utility
 * @deprecated use new Date().toLocaleString() or better ISODateString()
 */
export declare function printDate(currentDate: any): string;
/**
 * Converts a number to its corresponding spreadsheet column letter (e.g., 1 -> A, 27 -> AA).
 *
 * @param {number} num - The number to convert.
 * @return {string|undefined} - The corresponding column letter, or `undefined` if the input is invalid.
 * @tags #conversion #string #utility
 */
export declare function numToSSColumnLetter(num: any): string;
/**
 * Converts a multiline string into an array of trimmed, non-empty lines.
 *
 * @param {string} str - The input string to process.
 * @return {string[]} - An array of trimmed lines from the input string.
 * @tags #string #array #utility
 */
export declare function inputStringToArray(str: any): any;
/**
 * Converts an array of strings into a single multiline string.
 *
 * @param {string[]} arr - The array of strings to join.
 * @return {string} - A multiline string created by joining the array elements with newline characters.
 * @tags #array #string #utility
 */
export declare function inputArrayToString(arr: any): any;
/**
 * Serializes an object into a query string format.
 *
 * @param {Object} obj - The object to serialize.
 * @param {string} [prefix] - An optional prefix for nested keys.
 * @param {boolean} [encode=false] - Whether to URL-encode the keys and values.
 * @return {string} - The serialized query string.
 * @tags #object #serialization #utility
 */
export declare function serialize(obj: any, prefix?: any, encode?: any): string;
/**
 * Deserializes a query string into an object, optionally typing the values.
 *
 * @param {string} str - The query string to deserialize.
 * @param {boolean} [typed=false] - Whether to automatically typecast values (e.g., numbers, booleans, null).
 * @return {Object} - The deserialized object.
 * @tags #string #deserialization #utility
 * @altname getQueryParamsObject
 */
export declare function deserialize(str: any, typed?: any): {};
/**
 * Converts a query string into an object, supporting nested structures and optional typecasting.
 *
 * @param {string} query - The query string to convert.
 * @param {boolean} [nested=false] - Whether to parse nested structures (e.g., `key.subkey=value`).
 * @param {boolean} [typed=false] - Whether to automatically typecast values (e.g., numbers, booleans, null).
 * @return {Object} - The resulting object with parsed query parameters.
 * @tags #string #parsing #utility
 */
export declare function paramsToObject(query: any, nested?: any, typed?: any): {};
/**
 * Parses a cookie string into an array of key-value pairs.
 *
 * @param {string} str - The cookie string to parse.
 * @return {Array<Array<string>>} - An array of key-value pairs representing the cookies.
 * @tags #string #parsing #cookie #utility
 */
export declare function parseCookieString(str: any): any;
/**
 * Retrieves cookie values from a cookie string.
 * Can return a specific cookie value by name or all cookies as an array of key-value pairs.
 *
 * @param {string} strParam - The cookie string to parse (e.g., `document.cookie`).
 * @param {string} [sParam] - The name of the specific cookie to retrieve. If not provided, returns all cookies.
 * @returns {string|boolean|Array<Array<string>>} The value of the specified cookie, `true` if the cookie exists but has no value, or an array of all cookies as key-value pairs.
 * @tags #cookies #string #utility
 * @deprecated parseCookieString
 */
export declare function getCookies(strParam: any, sParam?: any): any;
/**
 * Converts an array of cookie objects into a cookie string.
 *
 * @param {Array<Object>} cookies - An array of cookie objects, each with `name` and `value` properties.
 * @return {string} - A formatted cookie string.
 * @tags #cookie #string #utility
 */
export declare function getCookieString(cookies: any): any;
/**
 * Retrieves the value of a specific cookie by name.
 *
 * @param {string} name - The name of the cookie to retrieve.
 * @return {string|null} - The value of the cookie, or `null` if not found.
 * @tags #cookie #utility #web
 */
export declare function getCookie(name: any): string;
/**
 * Sets a cookie with the specified name, value, and options.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {Object} [options] - Additional options for the cookie (e.g., `path`, `expires`, `secure`).
 * @tags #cookie #utility #web
 */
export declare function setCookie(name: any, value: any, options?: any): void;
/**
 * Deletes a cookie by setting its `max-age` to -1.
 *
 * @param {string} name - The name of the cookie to delete.
 * @tags #cookie #utility #web
 */
export declare function deleteCookie(name: any): void;
/**
 * Encodes a URI component with additional encoding for specific characters.
 *
 * @param {string} str - The string to encode.
 * @return {string} - The encoded URI component.
 * @tags #uri #encoding #utility
 */
export declare function fixedEncodeURIComponent(str: any): string;
/**
 * Escapes special characters in a string for use in regular expressions or other contexts.
 *
 * @param {string} str - The string to escape.
 * @param {number} [slashLength=2] - The number of backslashes to prepend to special characters.
 * @return {string} - The escaped string.
 * @tags #string #escaping #utility
 */
export declare function escapeString(str: any, slashLength?: number): any;
/**
 * Escapes special characters in a string to safely use it in a regular expression.
 *
 * @param {string} string - The string to escape.
 * @return {string} - The escaped string.
 * @tags #regex #escaping #utility
 */
export declare function escapeRegExp(string: any): any;
/**
 * Splits a string into two parts at the first occurrence of a specified substring or regular expression.
 *
 * @param {string} string - The string to split.
 * @param {string | RegExp} regexpOrSubstr - The substring or regular expression to split on.
 * @return {string[]} - An array containing the two parts of the string.
 * @tags #string #split #utility
 */
export declare function splitFirst(string: any, regexpOrSubstr: string | RegExp): any;
/**
 * Finds the longest common starting substring shared by all strings in an array.
 *
 * @param {string[]} array - The array of strings to analyze.
 * @return {string} - The longest common starting substring.
 * @tags #string #array #utility
 */
export declare function sharedStart(array: any): any;
/**
 * Finds the longest common starting sequence of words shared by all strings in an array.
 *
 * @param {string[]} array - The array of strings to analyze.
 * @param {string} [separator=' '] - The separator to use when joining the common words.
 * @return {string} - The longest common starting sequence of words.
 * @tags #string #array #utility
 */
export declare function sharedStartByWord(array: any, separator?: string): any;
/**
 * Groups strings by their shared starting sequence of characters or words, optionally filtered by length.
 *
 * @param {string[]} array - The array of strings to analyze.
 * @param {number} [num] - The length of the shared start to filter by (optional).
 * @param {boolean} [wholeWordCount=false] - Whether to consider whole words instead of characters for the shared start.
 * @return {Object} - An object where keys are shared starts and values are arrays of strings sharing that start.
 * @tags #string #array #utility
 */
export declare function sharedStartByNumber(array: any, num: any, wholeWordCount: any): {};
/**
 * Processes a template string by replacing placeholders with a callback function's result.
 *
 * @param {string} [startSymbols='[-'] - The starting symbols for the template placeholders.
 * @param {string} [endSymbols='-]'] - The ending symbols for the template placeholders.
 * @param {string} text - The text containing the template placeholders.
 * @param {boolean} [insideTags=true] - Whether to process placeholders inside HTML tags.
 * @param {Function} [calbackFn=(item) => item] - A callback function to process each placeholder.
 * @return {string} - The processed text with placeholders replaced.
 * @tags #templating #string #utility
 */
export declare function templating(startSymbols: string, endSymbols: string, text: any, insideTags?: boolean, calbackFn?: (item: any) => any): any;
/**
 * Extracts templating tags from a given text based on specified start and end symbols.
 *
 * @param {string} [startSymbols='[-'] - The starting symbols for the template tags.
 * @param {string} [endSymbols='-]'] - The ending symbols for the template tags.
 * @param {string} text - The text containing the template tags.
 * @param {boolean} [insideTags=true] - Whether to include tags inside HTML elements.
 * @param {boolean} [returnKeys=false] - Whether to split and return keys within the tags.
 * @return {Array<any>} - An array of extracted tags or their keys.
 * @tags #templating #string #utility
 */
export declare function getTemplatingTags(startSymbols: string, endSymbols: string, text: any, insideTags: boolean, returnKeys: any): Array<any>;
/**
 * Finds the indexes of templating tags in a given text based on specified start and end symbols.
 *
 * @param {string} [startSymbols='[-'] - The starting symbols for the template tags.
 * @param {string} [endSymbols='-]'] - The ending symbols for the template tags.
 * @param {string} text - The text containing the template tags.
 * @param {boolean} [insideTags=true] - Whether to include tags inside HTML elements.
 * @return {number[]} - An array of indexes where the templating tags are found.
 * @tags #templating #string #utility
 */
export declare function getTemplatingTagsIndexes(startSymbols: string, endSymbols: string, text: any, insideTags?: boolean): any;
/**
 * Replaces templating tags in a string with values from an object, supporting default values and nested keys.
 *
 * @param {Object} options - The options for the templating function.
 * @param {string} options.startSymbols - The starting symbols for the template tags.
 * @param {string} options.endSymbols - The ending symbols for the template tags.
 * @param {string} options.text - The text containing the template tags.
 * @param {boolean} [options.insideTags=true] - Whether to include tags inside HTML elements.
 * @param {Object} options.data - The object containing values to replace the template tags.
 * @return {string} - The processed string with template tags replaced by corresponding values.
 * @tags #templating #string #utility
 */
export declare function templatingFromObject(options: any): any;
/**
 * A generic sort function for comparing two values.
 *
 * @param {any} a - The first value to compare.
 * @param {any} b - The second value to compare.
 * @return {number} - Returns `-1` if `a` is less than `b`, `1` if `a` is greater than `b`, and `0` if they are equal.
 * @tags #sorting #utility
 */
export declare function sortFunction(a: any, b: any): 0 | 1 | -1;
/**
 * Selects the content of a specified DOM element.
 *
 * @param {Element} elem - The DOM element whose content should be selected.
 * @tags #dom #selection #utility
 */
export declare function setSelection(elem: any): void;
/**
 * Executes a callback function at regular intervals until a specified stop time is reached.
 *
 * @param {number} delay - The interval delay in milliseconds.
 * @param {number} stop - The total time in milliseconds after which the execution stops.
 * @param {Function} callback - The function to execute at each interval. Can be asynchronous.
 * @param {Function} [errorCallback] - An optional function to execute if an error occurs or when stopping.
 * @tags #timing #interval #utility
 */
export declare function intervalExecution(delay: any, stop: any, callback: any, errorCallback?: any): void;
/**
 * Checks if a given function is an asynchronous function.
 *
 * @param {Function} fn - The function to check.
 * @return {boolean} - `true` if the function is asynchronous, otherwise `false`.
 * @tags #function #utility #async
 */
export declare function isAsyncFunction(fn: any): boolean;
/**
 * Performs a fuzzy search to determine if a pattern approximately matches a given text.
 *
 * @param {string} text - The text to search within.
 * @param {string} pattern - The pattern to search for.
 * @param {Object} [options] - Options for the fuzzy search.
 * @param {number} [options.location=0] - The approximate location in the text where the pattern is expected.
 * @param {number} [options.distance=50] - The maximum distance from the location for a match to be considered.
 * @param {number} [options.threshold=0.3] - The threshold for match accuracy (0.0 requires a perfect match, 1.0 matches anything).
 * @return {boolean} - `true` if the pattern matches the text approximately, otherwise `false`.
 * @tags #string #search #fuzzy #utility
 */
export declare function fuzzy(text: any, pattern: any, options?: any): boolean;
/**
 * Converts a string to snake_case format.
 *
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in snake_case.
 * @tags #string #conversion #utility
 */
export declare function toSnakeCase(str: any): any;
/**
 * Converts a string to kebab-case format.
 *
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in kebab-case.
 * @tags #string #conversion #utility
 */
export declare function toKebabCase(str: any): any;
/**
 * Converts a string to Sentence case format.
 *
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in Sentence case.
 * @tags #string #conversion #utility
 */
export declare function toSentenceCase(str: any): any;
/**
 * Converts a string to CONSTANT_CASE format.
 *
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in CONSTANT_CASE.
 * @tags #string #conversion #utility
 */
export declare function toConstantCase(str: any): any;
/**
 * Converts a string to Title Case format.
 *
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in Title Case.
 * @tags #string #conversion #utility
 */
export declare function toTitleCase(str: any): any;
/**
 * Converts a string to camelCase format.
 *
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in camelCase.
 * @tags #string #conversion #utility
 * @altname camelize camelCase
 */
export declare function toCamelCase(str: any): any;
/**
 * Converts a string to PascalCase by splitting it on uppercase letters, spaces, hyphens, underscores, or dots,
 * capitalizing the first letter of each segment, and joining them together.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to PascalCase.
 * @tags #string #utility #formatting #casing
 */
export declare function toPascalCase(str: any): any;
/**
 * Converts a string to UPPERCASE.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to UPPERCASE.
 * @tags #string #utility #formatting #casing
 */
export declare function toUpperCase(str: any): any;
/**
 * Converts a string to lowercase.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to lowercase.
 * @tags #string #utility #formatting #casing
 */
export declare function toLowerCase(str: any): any;
/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} string - The input string.
 * @return {string} - The transformed string.
 * @tags #string #utility
 * @altname upperFirstCase deCap
 */
export declare function capitalizeFirstLetter(string: any): any;
/**
 * Compares multiple strings in a case-insensitive and format-independent manner.
 *
 * @param {...string} strings - The strings to compare.
 * @return {boolean} - `true` if all strings are equivalent, otherwise `false`.
 * @tags #string #comparison #utility
 */
export declare function caseIndependentCompare(...strings: any[]): boolean;
/**
 * Parses a URL string into its components, such as protocol, hostname, pathname, query parameters, and more.
 *
 * @param {string} str - The URL string to parse.
 * @return {Object} - An object containing the parsed components of the URL.
 * @tags #url #parsing #utility
 */
export declare function parseURL(str: any): any[];
/**
 * Parses a multipart/form-data body into its individual parts based on the boundary in the content type.
 *
 * @param {string|ArrayBuffer} body - The raw body of the multipart request.
 * @param {string} contentType - The content type header containing the boundary.
 * @return {Object} - An object where keys are field names and values are their corresponding data.
 * @throws {Error} - Throws an error if the content type does not contain a valid boundary.
 * @tags #multipart #parsing #utility
 */
export declare function multiPartParse(body: any, contentType: any): {};
/**
 * Creates a multipart/form-data body from an object and generates a boundary string.
 *
 * @param {Object} data - The data to include in the multipart body, where keys are field names and values are field values.
 * @param {string} [boundaryHash] - An optional 16-character string to use as the boundary hash. If not provided, a random string is generated.
 * @return {Object} - An object containing the `boundary` string and the `body` as a multipart/form-data formatted string.
 * @tags #multipart #formdata #utility
 */
export declare function createMultipartData(data: any, boundaryHash?: any): {
    boundary: string;
    body: any;
};
/**
 * Parses an instruction string into an array of instructions, handling escaped separators and nested structures.
 *
 * @param {string} instructionString - The string containing instructions to parse.
 * @param {string} [separator=','] - The separator used to split the instructions.
 * @return {string[]} - An array of parsed instructions.
 * @tags #string #parsing #utility
 */
export declare function parseInstructions(instructionString: any, separator?: string): any[] | RegExpMatchArray;
/**
 * Converts an array into an instruction string with a specified separator.
 *
 * @param {string[]} array - The array to convert into an instruction string.
 * @param {string} [separator=','] - The separator to use between instructions.
 * @return {string} - The formatted instruction string.
 * @tags #array #conversion #utility
 */
export declare function convertArrayToInstructions(array: any, separator?: string): string;
/**
 * Matches a URL against one or more URL patterns, supporting wildcard (`*`) matching.
 *
 * @param {string} url - The URL to test.
 * @param {string | string[]} urlPatterns - A single pattern or an array of patterns to match against.
 * @return {boolean} - `true` if the URL matches any of the patterns, otherwise `false`.
 * @tags #url #matching #utility
 */
export declare function matchURLPatterns(url: string, urlPatterns: string | string[]): boolean;
/**
 * Validates whether a given string is a valid URL.
 *
 * @param {string} str - The string to validate.
 * @return {boolean} - `true` if the string is a valid URL, otherwise `false`.
 * @tags #url #validation #utility
 * @altname isURLMatchPattern
 */
export declare function validURL(str: any): boolean;
/**
 * Retrieves a specific parameter or all parameters from a URL query string.
 *
 * @param {string} strParam - The URL or query string to parse.
 * @param {string} [sParam] - The specific parameter name to retrieve. If omitted, all parameters are returned.
 * @param {boolean} [caseInsensitive=false] - Whether to perform a case-insensitive match for the parameter name.
 * @return {string|Array|undefined} - The value of the specified parameter, an array of all parameters, or `undefined` if not found.
 * @tags #url #parameters #utility
 */
export declare function getUrlParameter(strParam: any, sParam?: any, caseInsensitive?: any): any;
/**
 * Extracts query parameters from a URL and returns them as an object.
 *
 * @param {string} url - The URL containing query parameters.
 * @returns {Object} An object with key-value pairs representing the query parameters.
 * @tags #url #utility #parsing
 * @deprecated use getUrlParameter
 */
export declare function getUrlParams(url: any): {};
/**
 * Pauses execution for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @return {Promise<void>} - A promise that resolves after the specified delay.
 * @tags #timing #utility #async
 * @altname delay
 */
export declare function sleep(ms: any): Promise<unknown>;
/**
 * Waits for a DOM element to appear or disappear based on a CSS selector.
 *
 * @param {string} selector - The CSS selector of the element to wait for.
 * @param {Object} [options] - Additional options.
 * @param {number} [options.timeout] - The maximum time to wait in milliseconds.
 * @param {boolean} [options.waitForMissing=false] - Whether to wait for the element to disappear instead of appear.
 * @param {Element} [options.context=document] - The context within which to search for the element.
 * @return {Promise<Element|null>} - A promise that resolves with the element, `true` if waiting for disappearance, or `null` if timed out.
 * @tags #dom #async #utility
 */
export declare function waitForElement(selector: any, options?: any): Promise<unknown>;
/**
 * Retrieves all string values from an enum object.
 *
 * @param {Object} enumObj - The enum object to extract values from.
 * @return {string[]} - An array of string values from the enum.
 * @tags #enum #utility #typescript
 */
export declare function getEnumValues(enumObj: any): Array<string>;
/**
 * Waits until func returns truthy value
 * @param {function} func - function to check, can be async
 * @param {number} [interval=100] - polling interval ms
 * @param {number} [timeout=30000] - timeout ms
 * @see https://github.com/yandex/rtv/blob/e58f3cf80bc3721e1d740f48329e0a2ed34182b2/packages/server/src/helpers/wait-for-function.ts#L7
 */
export declare function waitForFunction<T>(func: () => T, { interval, timeout }?: {
    interval?: number;
    timeout?: number;
}): Promise<unknown>;
/**
 * Finds the closest sibling of an element that matches a given selector, optionally specifying a direction.
 *
 * @param {Element} to - The reference element to start the search from.
 * @param {string} selector - The CSS selector to match the sibling against.
 * @param {string} [direction] - The direction to search: `'next'`, `'previous'`, or `'all'` (default is `'all'`).
 * @return {Element|null} - The closest matching sibling element, or `null` if none is found.
 * @tags #dom #sibling #utility
 */
export declare function closestSibling(to: any, selector: any, direction?: any): any;
/**
 * Finds the closest element that matches a given selector, searching through siblings and up the DOM tree.
 *
 * @param {Element} element - The starting element for the search.
 * @param {string} targetSelector - The CSS selector to match the target element.
 * @return {Element|null} - The closest matching element, or `null` if none is found.
 * @tags #dom #search #utility
 */
export declare function сlosestElement(element: any, targetSelector: any): any;
/**
 * Removes duplicate entries from an array, optionally based on a specific property or properties.
 *
 * @param {Array} array - The array to process.
 * @param {string|string[]} [propertyName] - The property or properties to use for uniqueness. If omitted, the array values themselves are used.
 * @return {Array} - A new array with unique entries.
 * @tags #array #utility #unique
 * @altname unique getUniqueArray
 */
export declare function uniqueArr(array: any, propertyName?: any): any;
/**
 * Finds the mode (most frequent value) in an array.
 *
 * @param {Array} arr - The array to analyze.
 * @return {any} - The mode of the array, or `null` if the array is empty.
 * @tags #array #statistics #utility
 */
export declare function findMod(arr: any): any;
/**
 * Calculates the average (mean) of an array of numbers.
 *
 * @param {number[]} arr - The array of numbers to calculate the average for.
 * @return {number} - The average of the numbers, or `0` if the array is empty.
 * @tags #array #math #utility
 */
export declare function findAverage(arr: any): number;
/**
 * Generates all possible combinations (Cartesian product) of array values.
 *
 * @param {Array<Array<any>>} arr - An array of arrays, where each inner array contains possible values.
 * @return {Array<any>} - An array containing all possible combinations.
 * @see https://stackoverflow.com/questions/4331092/finding-all-combinations-cartesian-product-of-javascript-array-values
 * @tags #array #combinations #utility
 */
export declare function allPossibleCases(arr: any): any;
/**
 * Finds all indexes in an array that satisfy a given callback function.
 *
 * @param {Array} array - The array to search.
 * @param {Function} callback - A function that is called for each element. Should return `true` for matching elements.
 * @return {number[]} - An array of indexes where the callback returns `true`.
 * @tags #array #search #utility
 */
export declare function findAllIndexes(array: any, callback: any): any[];
/**
 * Recursively flattens an object structure into a single array by extracting all array values.
 * This function traverses through all properties of the object and collects all array elements into a single flat array.
 *
 * @param {Object} obj - The object to flatten. Can contain nested objects and arrays.
 * @returns {Array} - A new array containing all elements from arrays found in the object structure.
 *
 * @tags #object #array #flatten #recursion #utility
 */
export declare function flattenObjectToArray(obj: any): any[];
/**
 * Flattens a nested array into a single-level array.
 *
 * @param {Array} array - The nested array to flatten.
 * @param {boolean} [mutable=false] - Whether to modify the original array (if `true`) or work on a copy (if `false`).
 * @return {Array} - A flattened array.
 * @tags #array #flatten #utility
 */
export declare function flatArray(array: any, mutable?: boolean): any[];
/**
 * Filters the properties of an object or elements of an array based on a callback function.
 *
 * @param {Object|Array} obj - The object or array to filter.
 * @param {Function} filtercheck - A callback function that determines whether a property or element should be included.
 * It receives `(key, value, index, array)` as arguments.
 * @return {Object|Array} - A new object or array containing only the filtered properties or elements.
 * @tags #object #array #filter #utility
 */
export declare function objectFilter(obj: any, filtercheck: any): any;
/**
 * Converts a flattened object with dot-separated keys into a nested object.
 *
 * @param {Object} obj - The flattened object to unflatten.
 * @return {Object} - The resulting nested object.
 * @tags #object #unflatten #utility
 */
export declare function unflattenObject(obj?: {}): {};
/**
 * Converts a nested object into a flattened object with dot-separated keys.
 *
 * @param {Object} obj - The nested object to flatten.
 * @return {Object} - The resulting flattened object.
 * @tags #object #flatten #utility
 */
export declare function flattenObject(obj: any): {};
/**
 * Flattens a deeply nested object into a single-level object without preserving key paths.
 *
 * @param {Object} obj - The nested object to flatten.
 * @return {Object} - The resulting flattened object with only top-level keys.
 * @tags #object #flatten #utility
 */
export declare function flattenNested(obj: any): any;
/**
 * Retrieves a nested value from an object using a dot-separated key path, with optional support for regular expressions. lodash.get alternative
 *
 * @param {Object} obj - The object to retrieve the value from.
 * @param {string} key - The dot-separated key path to the desired value.
 * @param {boolean} [regExpEnabled=false] - Whether to enable regular expression matching for keys.
 * @return {any} - The value at the specified key path, or `undefined` if not found.
 * @tags #object #nested #utility
 */
export declare function getNestedValue(obj: any, key: any, regExpEnabled?: any): any;
/**
 * Creates a regular expression from a string, escaping special characters.
 *
 * @param {string} value - The string to convert into a regular expression.
 * @return {RegExp} - The resulting regular expression.
 * @tags #regex #utility
 */
export declare function getMatchesRegExp(value: any): RegExp;
/**
 * Removes all HTML tags from a given string.
 *
 * @param {string} html - The string containing HTML tags.
 * @return {string} - The string with HTML tags removed.
 * @tags #string #html #utility
 */
export declare function removeHTMLTags(html: any): any;
/**
 * Decodes HTML entities in a string, converting numeric character references to their corresponding characters.
 *
 * @param {string} html - The string containing HTML entities.
 * @return {string} - The decoded string.
 * @tags #string #html #decode #utility
 * @see https://stackoverflow.com/a/7394814
 * @see https://github.com/mdevils/html-entities
 * @altname htmlDecode
 */
export declare function stripHTML(html: any): any;
/**
 * @param {String} HTML representing a single element
 * @return {Element}
 * @altname createElementFromHTML
 * @tags #dom #utility #html
 */
export declare function htmlToElement(html: any): ChildNode;
/**
* @param {String} HTML representing any number of sibling elements
* @return {NodeList}
* @tags #dom #utility #html
*/
export declare function htmlToElements(html: any): NodeListOf<ChildNode>;
/**
 * Unescapes JavaScript escape sequences in a string, including Unicode, hexadecimal, octal, and special characters.
 *
 * @param {string} string - The string containing JavaScript escape sequences.
 * @return {string} - The unescaped string.
 * @tags #string #escape #utility
 */
export declare function unescapeJs(string: any): any;
/**
 * Converts an array of JSON objects into an HTML table element.
 *
 * @param {Array<Object>} data - The array of JSON objects to convert.
 * @return {HTMLTableElement} - The generated HTML table element.
 * @tags #json #html #table #utility
 */
export declare function jsonToHtmlTable(data: Array<Object>): Node;
/**
 * Adds a new column to an HTML table, optionally customizing each cell during creation.
 *
 * @param {HTMLTableElement} table - The table to which the column will be added.
 * @param {Function} [onCellCreate] - A callback function to customize each cell. Receives `(row, cell)` as arguments.
 * @tags #html #table #dom #utility
 */
export declare function addColumn(table: any, onCellCreate?: any): void;
/**
 * Creates an HTML table element from a 2D array of data.
 *
 * @param {Array<Array<any>>} tableData - A 2D array where each inner array represents a row of data.
 * @return {HTMLTableElement} - The generated HTML table element.
 * @tags #html #table #dom #utility
 */
export declare function createTable(tableData: any): HTMLTableElement;
/**
 * Converts a 2D array of table data into an array of JSON objects.
 *
 * @param {Array<Array<any>>} tableData - A 2D array where the first row contains keys and subsequent rows contain values.
 * @return {Array<Object>} - An array of JSON objects representing the table data.
 * @tags #json #conversion #utility
 */
export declare function convertJSON(tableData: any): any[];
/**
 * Converts an HTML table into an array of JSON objects, with support for various options like ignoring columns, hidden rows, and custom extractors.
 *
 * @param {HTMLTableElement} table - The HTML table to convert.
 * @param {Object} [opts] - Options for customizing the conversion.
 * @param {Array<number>} [opts.ignoreColumns] - An array of column indexes to ignore.
 * @param {Array<number>} [opts.onlyColumns] - An array of column indexes to include (overrides `ignoreColumns`).
 * @param {boolean} [opts.ignoreHiddenRows=true] - Whether to ignore hidden rows.
 * @param {boolean} [opts.ignoreHiddenColumns=false] - Whether to ignore hidden columns.
 * @param {boolean} [opts.ignoreEmptyRows=false] - Whether to ignore rows with no data.
 * @param {Array<string>} [opts.headings] - Custom headings to use instead of the table's first row.
 * @param {boolean} [opts.allowHTML=false] - Whether to include HTML content instead of plain text.
 * @param {boolean} [opts.includeRowId=false] - Whether to include the row's ID attribute in the output.
 * @param {string} [opts.textDataOverride='data-override'] - Attribute to override cell text content.
 * @param {Function|Array<Function>} [opts.extractor] - Custom extractor function(s) for cell values.
 * @return {Array<Object>} - An array of JSON objects representing the table data.
 * @tags #html #table #json #utility
 */
export declare function tableToJSON(table: any, opts: any): any[];
/**
 * Retrieves a list of unique keys from an array of objects.
 *
 * @param {Array<Object>} objectArray - The array of objects to extract keys from.
 * @return {string[]} - An array of unique keys.
 * @tags #object #array #utility
 */
export declare function getUniqueKeys(objectArray: any): unknown[];
/**
 * Generates an array of numbers within a specified range.
 *
 * @param {number} size - The number of elements in the range.
 * @param {number} [startAt=0] - The starting number of the range.
 * @return {number[]} - An array of numbers from `startAt` to `startAt + size - 1`.
 * @tags #array #range #utility
 */
export declare function range(size: any, startAt?: number): number[];
/**
 * Finds the closest integer to `a` that is a multiple of `b`.
 *
 * @param {number} a - The target number.
 * @param {number} b - The base multiple.
 * @param {number} [x=Math.trunc(a / b)] - How many times `b` fits into `a` (optional, calculated by default).
 * @return {number|string} - The closest multiple of `b` to `a`, or an error message if `a` is less than `b`.
 * @tags #math #utility
 */
export declare function getClosestInteger(a: any, b: any, x?: number): any;
/**
 * Splits an array into smaller chunks of a specified size.
 *
 * @param {Array} arr - The array to split.
 * @param {number} div - The size of each chunk.
 * @return {Array<Array>} - An array of chunks, where each chunk is an array.
 * @tags #array #split #utility
 */
export declare function splitArray(arr: any, div: any): any[];
/**
 * Splits an array into two parts at a specified index.
 *
 * @param {Array} arr - The array to split.
 * @param {number} index - The index at which to split the array.
 * @return {Array<Array>} - An array containing two subarrays: one before the index and one after.
 * @tags #array #split #utility
 */
export declare function splitArrayByIndex(arr: any, index: any): any[];
/**
 * Splits an array into `n` parts, with an optional part length and format.
 *
 * @param {Array} arr - The array to split.
 * @param {number} n - The number of parts to split the array into.
 * @param {number} [plen] - The length of each part. If not provided, it is calculated automatically.
 * @param {boolean} [asObject=false] - Whether to return parts as objects instead of arrays.
 * @return {Array<Array|Object>} - An array of parts, either as arrays or objects.
 * @tags #array #split #utility
 */
export declare function splitToArray(arr: any, n: any, plen?: any, asObject?: any): any;
/**
 * Pairs elements from multiple arrays by their index, filling with `null` if an array is shorter.
 *
 * @param {Array<Array<any>>} arrays - An array of arrays to pair. Example: [["a","b","c"], ["d","e","f","g"]];
 * @return {Array<Array<any>>} - An array of pairs, where each pair contains elements from the input arrays at the same index.
 * @tags #array #pairing #utility
 */
export declare function pairArrays(arrays: any): any[];
/**
 * Determines whether a given object is a class.
 *
 * @param {any} obj - The object to check.
 * @return {boolean} - `true` if the object is a class, otherwise `false`.
 * @tags #class #utility #typecheck
 */
export declare function isClass(obj: any): boolean;
/**
 * Determines whether a given string contains valid HTML content.
 *
 * @param {string} string - The string to check.
 * @return {boolean} - `true` if the string contains HTML, otherwise `false`.
 * @tags #html #validation #utility
 */
export declare function isHTML(string: any): boolean;
/**
 * Checks if a given URL is an absolute URL.
 *
 * @param {string} url - The URL to check.
 * @return {boolean} - `true` if the URL is absolute, otherwise `false`.
 * @tags #url #validation #utility
 */
export declare function isAbsoluteUrl(url: any): boolean;
/**
 * Determines whether a given path is a relative path.
 *
 * @param {string} path - The path to check.
 * @return {boolean} - `true` if the path is relative, otherwise `false`.
 * @tags #path #validation #utility
 * @see https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
 */
export declare function isRelativePath(path: any): boolean;
/**
 * Determines whether a given string is a valid XPath expression.
 *
 * @param {string} s - The string to check.
 * @return {boolean} - `true` if the string is a valid XPath, otherwise `false`.
 * @tags #xpath #validation #utility
 */
export declare function isXPath(s: any): boolean;
/**
 * Executes an XPath query and returns an array of matching elements.
 *
 * @param {string} xpathToExecute - The XPath expression to execute.
 * @returns {Array} An array of elements matching the XPath query.
 * @tags #dom #xpath #array
 */
export declare function getElementsByXpath(xpathToExecute: any): any[];
/**
 * Merges multiple header objects into a single Headers object.
 *
 * @param {...Object} sources - One or more objects containing headers to merge.
 * @returns {Headers} A new Headers object containing the merged headers.
 * @throws {TypeError} If any argument is not an object.
 * @tags #object #headers #converter
 */
export declare function mergeHeaders(...sources: any[]): Headers;
/**
 * Converts an array of string pairs into an object.
 *
 * @param {Array<Array<string>>} array - An array of string pairs to convert.
 * @returns {Object} An object with keys and values derived from the array of string pairs.
 * @tags #array #string #converter
 */
export declare function arrayOfStringsToObject(array: any): any;
/**
 * Converts a CSS string into an object with property-value pairs.
 *
 * @param {string} cssText - A string containing CSS declarations.
 * @returns {Object} An object where keys are CSS properties and values are their corresponding values.
 * @tags #css #string #converter
 */
export declare function CSSToObject(cssText: any): {};
/**
 * Converts an object with CSS properties into a CSS string.
 *
 * @param {Object} style - An object where keys are CSS properties and values are their corresponding values.
 * @returns {string} A CSS string with property-value pairs.
 * @tags #css #string #converter
 */
export declare function objectToCSS(style: any): string;
/**
 * Converts an object into an array of objects, using a specified property as the identifier.
 *
 * @param {Object} object - The object to convert.
 * @param {string} [idProperty='id'] - The property to use as the identifier in each array item.
 * @returns {Array<Object>} An array of objects with the specified identifier property.
 * @tags #object #array #converter
 */
export declare function objectToArray(object: any, idProperty?: any): any[];
/**
 * Unwraps an array if it contains a single element, otherwise returns the array unchanged.
 *
 * @param {Array} arr - The array to unwrap.
 * @returns {*} The single element if the array contains only one element, otherwise the original array.
 * @tags #array #converter
 */
export declare function unwrapSingletonArray(arr: any): any;
/**
 * Sorts an array using a custom comparison function or default string comparison.
 *
 * @param {Array} arr - The array to sort.
 * @param {Function} [compareFunction] - An optional comparison function.
 * @returns {Array} A new array that is sorted according to the comparison function or default string comparison.
 * @throws {TypeError} If the first argument is not an array or the comparator is not a function or undefined.
 * @see https://medium.com/@stheodorejohn/array-sorting-in-javascript-without-sort-mastering-bubble-sort-algorithm-9e8c816d1258
 * @tags #array #sorting #algorithm
 */
export declare function customSort(arr: any, compareFunction: any): any[];
/**
 * Sorts an array of objects based on specified rules and an optional sorting function.
 *
 * @param {Array<Object>} array - The array of objects to sort.
 * @param {Array<Object|string>|Object|string} rules - Sorting rules, which can be an array of rules or a single rule.
 * @param {Function} [sortFunction] - An optional sorting function to use instead of the default Array.sort().
 * @returns {Array<Object>} A new array of objects sorted according to the specified rules.
 * @tags #array #object #sorting #converter
 * @altname multiSort
 */
export declare function sortArrayOfObjects(array: any, rules: any, sortFunction?: any): any;
/**
 * Performs data interpolation on grouped objects, filling missing values and applying linear interpolation.
 * Handles complex data structures by grouping, sorting, and interpolating values between known data points.
 *
 * @param {Object} params - Configuration parameters.
 * @param {Object} params.data - Input data object to process.
 * @param {boolean} [params.fillMissing=true] - Whether to fill missing values before/after known data points.
 * @param {string[]} params.groupByFields - Fields to use for grouping records.
 * @param {string[]} params.sortByFields - Fields to sort records within each group.
 * @param {string[]} params.propertiesList - Properties to interpolate.
 * @param {Function} [params.groupHandlerFn] - Optional handler function to process each group.
 * @returns {Object} - Processed data with interpolated values.
 *
 * @tags #data-processing #interpolation #utility #data-transformation
 */
export declare function interpolateData({ data, fillMissing, groupByFields, sortByFields, propertiesList, groupHandlerFn }: {
    data: any;
    fillMissing: any;
    groupByFields: any;
    sortByFields: any;
    propertiesList: any;
    groupHandlerFn: any;
}): {};
/**
 * Parses an RGB string and returns an array of numeric RGB values.
 *
 * @param {string} rgb - The RGB string to parse.
 * @returns {Array<number>} An array containing the numeric RGB values.
 * @tags #string #color #converter
 */
export declare function parseRGB(rgb: any): any;
/**
 * Calculates the Delta E (CIE2000) color difference between two RGB colors.
 *
 * @param {Array<number>} rgbA - The first RGB color as an array of three numbers.
 * @param {Array<number>} rgbB - The second RGB color as an array of three numbers.
 * @returns {number} The Delta E color difference between the two colors.
 * @see https://stackoverflow.com/a/52453462/14638643
 * @tags #color #math #converter
 */
export declare function deltaE(rgbA: any, rgbB: any): number;
/**
 * Converts an RGB color to the CIELAB color space.
 *
 * @param {Array<number>} rgb - The RGB color as an array of three numbers.
 * @returns {Array<number>} The CIELAB color as an array of three numbers.
 * @tags #color #converter
 */
export declare function rgb2lab(rgb: any): number[];
/**
 * Calculates the average color difference (Delta E) between two arrays of colors.
 *
 * @param {Array<string>} firstColorArray - The first array of colors in RGB format.
 * @param {Array<Array<string>>} secondColorArray - The second array of color arrays in RGB format.
 * @returns {Array<number>} An array of average Delta E values for each color array in the second array.
 * @tags #color #array #math
 */
export declare function getAverageColorDeltaArray(firstColorArray: any, secondColorArray: any): any[];
/**
 * Finds the index of the closest value to a target within an array, optionally within a specified threshold.
 *
 * @param {Array<number>} arr - The array of numbers to search.
 * @param {number} target - The target value to find the closest match for.
 * @param {number} [threshold] - An optional threshold to limit the search to values within this range.
 * @returns {number} The index of the closest value, or -1 if the array is empty or no value is within the threshold.
 * @tags #array #math #search
 */
export declare function findClosestIndex(arr: any, target: any, threshold?: any): number;
/**
 * Merges two arrays of objects based on a unique selector, optionally merging objects with the same selector.
 *
 * @param {Array<Object>} original - The original array of objects.
 * @param {Array<Object>} newdata - The new array of objects to merge.
 * @param {string|Array<string>} [uniqueSelector=''] - The unique selector to identify matching objects.
 * @param {boolean} [mergeObjects] - Whether to merge objects with the same selector.
 * @returns {Array<Object>} The merged array of objects.
 * @tags #array #object #merge
 */
export declare function mergeArrayOfObjects(original: any, newdata: any, uniqueSelector: any, mergeObjects?: any): any;
/**
 * Finds all indexes of a value or values in an array, optionally searching within a nested path.
 *
 * @param {Array} arr - The array to search.
 * @param {*} val - The value or array of values to find.
 * @param {string} [path] - An optional path to search within nested objects.
 * @returns {Array<number>} An array of indexes where the value(s) are found.
 * @tags #array #search
 */
export declare function getAllIndexes(arr: any, val: any, path?: any): any[];
/**
 * Recursively collects paths to all properties of an object as dot-separated strings.
 * If the object contains nested objects or arrays, they will also be processed.
 * The recursion depth can be limited using the `flatNumLimit` parameter.
 *
 * @param {Object} o - The object to retrieve paths for.
 * @param {string} [path=""] - The current path (used for recursion).
 * @param {number} [flatNumLimit] - The recursion depth limit. If not provided, depth is unlimited.
 * @returns {Array<string>} An array of strings representing paths to all properties of the object.
 * @tags #object #recursion #array #utility
 */
export declare function getPaths(o: any, path?: string, flatNumLimit?: any): any;
/**
 * Parses a string to extract valid property names based on JavaScript property access patterns.
 * Matches property names that appear after `.`, `?`, `[`, or quotes, or at the start of the string.
 *
 * @param {string} str - The input string to parse for property names.
 * @returns {Array<string>} An array of extracted property names.
 * @tags #string #parsing #utility
 */
export declare function parsePropertyString(str: any): any[];
/**
 * Parses a function or function string to extract its name, arguments, body, and async status.
 * Uses regular expressions to identify the function's components.
 *
 * @param {Function|string} fn - The function or function string to parse.
 * @returns {Object} An object containing the extracted function details:
 *   - `async`: The `async` keyword if present (empty string otherwise).
 *   - `name`: The function name (empty string for anonymous functions).
 *   - `arguments`: The function arguments as a string.
 *   - `body`: The function body as a string.
 * @throws {string} Throws an error if the input is not a function or a valid function string.
 * @tags #function #parsing #utility #regex
 */
export declare function parseFunction(fn: any): {
    async: any;
    name: any;
    arguments: any;
    body: any;
};
/**
 * Counts the occurrences of each property value in an array of objects.
 * Returns an object where each key is a property name, and its value is another object
 * mapping property values to their counts.
 *
 * @param {Array<Object>} arr - The array of objects to analyze.
 * @returns {Object} An object containing the counts of each property value.
 * @tags #array #object #utility #counting
 */
export declare function countProperties(arr: any): {};
/**
 * Recursively navigates through an object using a path string to find or create a nested value.
 * Supports handling of regular expressions in the path, case-insensitive matching, and optional callbacks.
 *
 * @param {Object} obj - The object to traverse.
 * @param {string} path - The path string to navigate through the object (e.g., "prop1.prop2[0]").
 * @param {Object} [options] - Optional configuration:
 *   - `handleString`: If true, treats string values as final results.
 *   - `create`: If true, creates missing properties in the path.
 *   - `caseInsensitive`: If true, performs case-insensitive property matching.
 *   - `caseIndependent`: If true, performs case-independent property matching.
 * @param {Function} [callbackFn] - Optional callback function invoked at each step of traversal.
 * @returns {*} The value found at the specified path, or `undefined` if the path does not exist.
 * @tags #object #recursion #utility #path #regex
 * @see https://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
 * @see https://github.com/KmlPro/updatejavascriptobjectbypath/blob/master/setMethod.tsx
 */
export declare function deepFind(obj: any, path: any, options?: any, callbackFn?: any): any;
/**
 * Recursively sets a value at a specified path within an object.
 * Supports creating missing properties, replacing existing values, and handling arrays and objects.
 *
 * @param {Object} obj - The object to modify.
 * @param {string} [path=""] - The path string to navigate through the object (e.g., "prop1.prop2[0]").
 * @param {*} value - The value to set at the specified path.
 * @param {Object} [options] - Optional configuration:
 *   - `replace`: If true, replaces the existing value at the path.
 *   - `create`: If true, creates missing properties in the path.
 * @tags #object #recursion #utility #path #modification
 */
export declare function deepSet(obj: any, path: string, value: any, options?: any): void;
/**
 * Extracts all possible paths from a nested tree structure.
 * The tree can contain arrays, sets, or nested objects, and the function iterates through all possible combinations.
 *
 * @param {Array|Set|Object} tree - The tree structure to extract paths from.
 * @returns {Array<Array>} An array of arrays, where each inner array represents a unique path through the tree.
 * @tags #tree #recursion #utility #iteration
 * @see https://github.com/blackflux/object-scan/blob/2a15b901331147d1a7ca30a33f662d15bc355bc8/src/generic/iterator.js
 * @see https://stackoverflow.com/questions/20433821/traverse-nested-javascript-arrays-to-create-paths
 */
export declare function extractTree(tree: any): any[];
/**
 * Compares two paths to determine if they match, optionally using strict comparison.
 * Supports regular expressions in the `exceptPath` for flexible matching.
 *
 * @param {string} path - The path to compare.
 * @param {string} exceptPath - The path or pattern to compare against (can include regex).
 * @param {boolean} [strict] - If true, enforces exact length matching in addition to pattern matching.
 * @returns {boolean} True if the paths match according to the specified rules, otherwise false.
 * @tags #path #comparison #utility #regex
 */
export declare function comparePaths(path: any, exceptPath: any, strict?: any): boolean;
/**
 * Recursively deletes properties from an object based on a specified path.
 * Supports excluding certain paths from deletion using `exceptPaths`.
 *
 * @param {Object} obj - The object to delete properties from.
 * @param {string} path - The path to the property to delete (e.g., "prop1.prop2").
 * @param {Array<string>} [exceptPaths] - An array of paths to exclude from deletion.
 * @returns {void} Modifies the object in place by deleting the specified properties.
 * @tags #object #recursion #utility #path #deletion
 */
export declare function deepDelete(obj: any, path: any, exceptPaths?: any): void;
/**
 * Recursively merges properties from a source object into a target object.
 * If `notStrict` is true, only non-null/undefined values from the source overwrite the target.
 *
 * @param {Object} target - The target object to merge into.
 * @param {Object} source - The source object to merge from.
 * @param {boolean} [notStrict] - If true, only non-null/undefined source values overwrite the target.
 * @returns {Object} The modified target object after merging.
 * @tags #object #recursion #utility #merge
 */
export declare function deepMerge(target: any, source: any, notStrict?: any): any;
/**
 * Performs a deep comparison between two or more objects, arrays, or primitives.
 * Handles edge cases like `NaN`, `Date`, `RegExp`, `Function`, and circular references.
 *
 * @param {...*} arguments - Two or more objects, arrays, or primitives to compare.
 * @returns {boolean} True if all arguments are deeply equal, otherwise false.
 * @tags #object #comparison #utility #recursion
 */
export declare function deepCompare(): boolean;
/**
 * Compares two software version numbers (e.g. "1.7.1" or "1.2b").
 *
 * This function was born in http://stackoverflow.com/a/6832721.
 *
 * @param {string} v1 The first version to be compared.
 * @param {string} v2 The second version to be compared.
 * @param {object} [options] Optional flags that affect comparison behavior:
 * lexicographical: (true/[false]) compares each part of the version strings lexicographically instead of naturally;
 *                  this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than "1.2".
 * zeroExtend: ([true]/false) changes the result if one version string has less parts than the other. In
 *             this case the shorter string will be padded with "zero" parts instead of being considered smaller.
 *
 * @returns {number|NaN}
 * - 0 if the versions are equal
 * - a negative integer iff v1 < v2
 * - a positive integer iff v1 > v2
 * - NaN if either version string is in the wrong format
 */
export declare function versionCompare(v1: any, v2: any, options: any): number;
/**
 * Generates a random integer between a specified minimum and maximum value.
 * The result is scaled by 1000 to provide a larger range of random values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random integer between `min` and `max`, scaled by 1000.
 * @tags #math #random #utility
 * @deprecated use getRandomNumber
 */
export declare function getRandomArbitrary(min: any, max: any): number;
/**
 * Generates a random integer between a specified minimum and maximum value.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random integer between `min` and `max`.
 * @tags #math #random #utility
 */
export declare function getRandomNumber(min: any, max: any): number;
/**
 * Generates a random string of a specified length using a custom character set.
 *
 * @param {number} i - The length of the random string to generate.
 * @param {string} [chars] - The character set to use for generating the string. Defaults to alphanumeric characters.
 * @returns {string} A random string of the specified length.
 * @tags #string #random #utility
 * @altname randomString
 */
export declare function getRandomString(i: any, chars?: any): string;
/**
 * Shuffles the elements of an array randomly using the Fisher-Yates algorithm.
 * Creates a deep copy of the array to avoid mutating the original.
 *
 * @param {Array} array - The array to shuffle.
 * @returns {Array} A new array with the elements shuffled randomly.
 * @tags #array #random #utility
 */
export declare function shuffleArray(array: any): any;
/**
 * Formats a phone number string into a standardized format.
 * Extracts and formats valid phone numbers from the input string, including country codes and area codes.
 *
 * @param {string} str - The input string containing the phone number(s) to format.
 * @returns {string} The formatted phone number string, or the original string if formatting fails.
 * @tags #string #formatting #utility #phone
 */
export declare function phoneFormatter(str: any): any;
/**
 * Adds a separator before and after a string using DOM manipulation.
 * Useful for safely inserting separators without risking HTML injection.
 *
 * @param {string} string - The input string to wrap with separators.
 * @param {string} [startSeparator=''] - The separator to add at the start of the string.
 * @param {string} [endSeparator=''] - The separator to add at the end of the string.
 * @returns {string} The string wrapped with the specified separators, or an empty string if the input is empty.
 * @tags #string #dom #utility #formatting
 */
export declare function addSeparator(string: any, startSeparator?: string, endSeparator?: string): string;
export declare function getSearchResults(options: any): Promise<any[]>;
/**
 * Extracts the hostname from a URL string using a regular expression.
 *
 * @param {string} data - The URL string from which to extract the hostname.
 * @returns {string} The hostname extracted from the URL.
 * @tags #string #url #utility #regex
 * @deprecated use parseURL
 */
export declare function getURLHostName(data: any): any;
/**
 * Checks if an object is a Promise.
 *
 * @param {*} obj - The object to check.
 * @returns {boolean} True if the object is a Promise, otherwise false.
 * @tags #promise #utility #type-checking
 */
export declare function isPromise(obj: any): boolean;
/**
 * Redirects the browser to a specified URL.
 *
 * @param {string} path - The URL to redirect to.
 * @tags #dom #navigation #utility
 */
export declare function redirectTo(path: any): void;
/**
 * Escapes special HTML characters in a string to make it safe for rendering in HTML.
 * Prevents XSS (Cross-Site Scripting) attacks by converting characters like `<`, `>`, `&`, etc., into their HTML entity equivalents.
 *
 * @param {string} text - The input string to escape.
 * @returns {string} The escaped string, safe for HTML rendering.
 * @tags #string #security #utility #html
 * @altname safetext
 */
export declare function escapeHtml(text: any): any;
/**
 * Creates an HTML attribute string in the format `attribute="value"`.
 *
 * @param {string} attr - The attribute name.
 * @param {string} str - The attribute value.
 * @returns {string} The formatted attribute string.
 * @tags #string #utility #html
 */
export declare function attrStr(attr: any, str: any): string;
/**
 * Adds a specified number of days to a given date.
 *
 * @param {Date} date - The initial date.
 * @param {number} days - The number of days to add.
 * @returns {Date} A new date object with the added days.
 * @tags #date #utility
 * @deprecated use dateAdd
 */
export declare function addDays(date: any, days: any): Date;
/**
* Adds time to a date. Modelled after MySQL DATE_ADD function.
* Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
* @see https://stackoverflow.com/a/1214753/18511
*
* @param date  Date to start with
* @param interval  One of: year, quarter, month, week, day, hour, minute, second
* @param units  Number of units of the given interval to add.
*/
export declare function dateAdd(date: any, interval: any, units: any): Date;
/**
 * Generates an array of dates between a start date and a stop date.
 *
 * @param {Date} startDate - The start date of the range.
 * @param {Date} stopDate - The end date of the range.
 * @returns {Array<Date>} An array of dates between the start and stop dates, inclusive.
 * @tags #date #utility #array
 */
export declare function getDates(startDate: any, stopDate: any): any[];
/**
 * Removes escape slashes from a string, replacing escaped characters with their unescaped versions.
 *
 * @param {string} str - The input string containing escape slashes.
 * @returns {string} The string with escape slashes removed.
 * @tags #string #utility #regex
 */
export declare function stripSlashes(str: any): any;
/**
 * Detects the casing style of a given string (e.g., camelCase, snake_case, kebab-case, etc.).
 * Uses regular expressions to identify common casing patterns.
 *
 * @param {string} input - The string to analyze.
 * @returns {string} The detected casing style (e.g., 'camelCase', 'snakeCase', 'kebabCase', etc.), or 'unknown' if the style cannot be determined.
 * @throws {TypeError} If the input is not a string.
 * @tags #string #utility #regex #casing
 * @see https://github.com/jonschlinkert/detect-case/blob/master/index.ts
 * @altname checkCase
 */
export declare function detectCase(input: string): string;
/**
 * Converts a string to a specified casing style using predefined case conversion functions.
 *
 * @param {string} phrase - The input string to convert.
 * @param {string} letterCase - The target casing style (e.g., 'camelCase', 'snakeCase', 'kebabCase', etc.).
 * @returns {string} The string converted to the specified casing style, or the original string if the style is unknown.
 * @tags #string #utility #formatting #casing
 */
export declare function setCase(phrase: any, letterCase: any): any;
/**
 * Removes diacritical marks (accents) from a string by normalizing it to NFD (Normalization Form Decomposition)
 * and removing combining characters.
 *
 * @param {string} str - The input string containing diacritics.
 * @returns {string} The string with diacritical marks removed.
 * @tags #string #utility #formatting
 */
export declare function removeDiacritics(str: any): any;
/**
 * Removes regular expression tokens (e.g., escape sequences, special characters, and patterns) from a string.
 *
 * @param {string} str - The input string containing regular expression tokens.
 * @returns {string} The string with regular expression tokens removed.
 * @tags #string #utility #regex
 */
export declare function removeRegExpTokens(str: any): any;
/**
 * Counts the number of consecutive elements in an array that satisfy a condition, starting from a specified position.
 *
 * @param {Array} array - The array to iterate over.
 * @param {number} position - The starting position in the array.
 * @param {Function} compFn - A function that tests each element. Returns `true` if the element satisfies the condition.
 * @returns {number} The count of consecutive elements that satisfy the condition.
 * @tags #array #utility #iteration
 */
export declare function countFromPosition(array: any, position: any, compFn: any): number;
/**
 * Performs a binary search on a sorted array to find the index of a target element.
 * If the element is not found, returns a negative value indicating the insertion point.
 *
 * @param {Array} ar - The sorted array to search.
 * @param {*} el - The target element to find.
 * @param {Function} compare_fn - A comparison function that returns:
 *   - A positive number if `el` is greater than the current element.
 *   - A negative number if `el` is less than the current element.
 *   - Zero if `el` is equal to the current element.
 * @returns {number} The index of the target element if found, otherwise a negative value indicating the insertion point.
 * @tags #array #utility #search #binary-search
 */
export declare function binarySearch(ar: any, el: any, compare_fn: any): number;
/**
 * Performs a breadth-first search (BFS) to find paths from a starting node to a target node in a graph represented by an adjacency list.
 * Limits the search depth to 50 to prevent infinite loops in cyclic graphs.
 *
 * @param {Object} adj - The adjacency list representing the graph.
 * @param {string|number} s - The starting node.
 * @param {string|number} t - The target node.
 * @returns {Array<Array<string|number>>} An array of paths from the starting node to the target node (if found) or all explored paths within the depth limit.
 * @tags #graph #utility #search #bfs
 */
export declare function afs(adj: any, s: any, t: any): any;
/**
 * Retrieves a range of elements from an array based on specified start and end indices.
 * Optionally includes empty slots if `addEmpty` is true.
 *
 * @param {Array} array - The array to extract elements from.
 * @param {number} lowEnd - The starting index of the range (inclusive).
 * @param {number} highEnd - The ending index of the range (inclusive).
 * @param {boolean} [addEmpty] - If true, includes empty slots in the result.
 * @returns {Array} An array containing the elements within the specified range.
 * @tags #array #utility #range
 */
export declare function multiGetRange(array: any, lowEnd: any, highEnd: any, addEmpty: any): any[];
/**
 * Converts a Date object to an ISO 8601 formatted string (UTC time).
 *
 * @param {Date} d - The Date object to convert.
 * @returns {string} The ISO 8601 formatted date string (e.g., "2023-10-05T14:30:00Z").
 * @tags #date #utility #formatting
 */
export declare function ISODateString(d?: any): string;
/**
 * Removes duplicate elements from a multi-dimensional array by comparing stringified versions of the elements.
 *
 * @param {Array} arr - The multi-dimensional array to filter.
 * @returns {Array} A new array with duplicate elements removed.
 * @tags #array #utility #unique
 */
export declare function multiDimensionalUnique(arr: any): any[];
/**
 * Pads a number with leading zeros to achieve a specified width.
 *
 * @param {number|string} number - The number to pad with zeros.
 * @param {number} width - The desired total width of the padded number.
 * @returns {string} The padded number as a string.
 * @tags #number #utility #formatting
 */
export declare function zeroFill(number: any, width: any): string;
/**
 * Generates an adjacency list from a list of hyphen-separated pairs.
 * Each pair represents a connection between two nodes in a graph.
 *
 * @param {Array<string>} dictionaryList - An array of hyphen-separated strings (e.g., ["A-B", "B-C"]).
 * @returns {Object} An adjacency list representing the graph connections.
 * @tags #graph #utility #adjacency-list
 */
export declare function getAdjacentList(dictionaryList: any): {};
/**
 * Converts non-ASCII characters in a string to their Unicode escape sequences (e.g., `\uXXXX`).
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The string with non-ASCII characters replaced by their Unicode escape sequences.
 * @tags #string #utility #unicode #formatting
 * @see https://stackoverflow.com/a/10937446
 */
export declare function unicodeLiteral(str: any): string;
/**
 * Converts a string to a Unicode-escaped string, replacing non-ASCII characters with their `\uXXXX` representations.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} The Unicode-escaped string.
 * @tags #string #utility #unicode #formatting
 */
export declare function toUnicode(str: any): any;
/**
 * Generates a random hexadecimal color code.
 *
 * @returns {string} A random color code in the format `#RRGGBB`.
 * @tags #color #utility #random
 */
export declare function getRandomColor(): string;
/**
 * Extracts the last word from a string, optionally ignoring trailing spaces or hyphens.
 *
 * @param {string|any} o - The input value (converted to a string).
 * @param {boolean} [strict] - If true, trailing spaces and hyphens are not ignored.
 * @returns {string} The last word in the string.
 * @tags #string #utility #parsing
 */
export declare function lastWord(o: any, strict?: any): string;
/**
 * Replaces the last word in a string with a new string.
 *
 * @param {string} str - The input string.
 * @param {string} newStr - The string to replace the last word with.
 * @returns {string} The modified string with the last word replaced.
 * @tags #string #utility #formatting
 */
export declare function replaceLastWord(str: any, newStr: any): any;
/**
 * Detects if the current device is a mobile device by checking the user agent string and other properties.
 *
 * @returns {boolean} True if the device is a mobile device, otherwise false.
 * @tags #browser #utility #mobile-detection
 */
export declare function mobileCheck(): boolean;
/**
 * Detects if the current device is a mobile device or tablet by checking the user agent string and other properties.
 *
 * @returns {boolean} True if the device is a mobile device or tablet, otherwise false.
 * @tags #browser #utility #mobile-detection #tablet-detection
 */
export declare function mobileAndTabletCheck(): boolean;
/**
 * Retrieves the browser's language setting, optionally returning the full language code or just the primary language tag.
 *
 * @param {boolean} [full=false] - If true, returns the full language code (e.g., "en-US"). If false, returns only the primary language tag (e.g., "en").
 * @returns {string|undefined} The browser's language code, or `undefined` if the language cannot be determined.
 * @tags #browser #utility #language-detection
 */
export declare function getBrowserLang(full?: boolean): any;
/**
 * Replaces all occurrences of a pattern in a string with a specified replacement.
 *
 * @param {string} str - The input string to perform replacements on.
 * @param {RegExp} match - The regular expression pattern to match.
 * @param {string} replacement - The string to replace each match with.
 * @returns {string} The string with all matches replaced.
 * @tags #string #utility #regex
 */
export declare function replaceAll(str: string, match: RegExp, replacement: any): string;
/**
 * Provides a polyfill for `localStorage` in environments where it is not natively supported.
 * If `window.localStorage` is available, it uses that; otherwise, it falls back to a polyfill implementation.
 *
 * @returns {Storage|Proxy} The `localStorage` object, either from the browser or a polyfill.
 * @tags #browser #utility #localStorage #polyfill
 * @see https://github.com/capaj/localstorage-polyfill
 */
export declare function getLocalStorage(): any;
/**
 * Converts a time string in the format "MM:SS" to seconds.
 * If the input is already a number, it returns the number as is.
 *
 * @param {string|number} time - The time string (e.g., "1:30") or a number representing seconds.
 * @returns {number} The total number of seconds.
 * @tags #time #utility #conversion
 */
export declare function timeToSeconds(time: any): any;
/**
 * Converts a number of seconds into a time string in the format "MM:SS".
 *
 * @param {number} seconds - The number of seconds to convert.
 * @returns {string} The time string in "MM:SS" format.
 * @tags #time #utility #conversion
 */
export declare function secondsToTime(seconds: any): string;
/**
 * Converts milliseconds into a specified time format (seconds, minutes, hours, or days).
 * If no format is provided, returns an object with days, hours, minutes, and seconds.
 *
 * @param {number} miliseconds - The number of milliseconds to convert.
 * @param {string} [format] - The desired output format: 's' for seconds, 'm' for minutes, 'h' for hours, or 'd' for days.
 * @returns {number|Object} The converted time in the specified format, or an object with days, hours, minutes, and seconds.
 * @tags #time #utility #conversion
 */
export declare function convertMiliseconds(miliseconds: number, format: any): any;
/**
 * Normalizes a file name by replacing spaces with underscores and ensuring the correct file extension.
 *
 * @param {string} fileName - The original file name to be normalized.
 * @param {string} extension - The file extension to be appended to the normalized file name.
 * @returns {string} The normalized file name with the specified extension.
 * @tags #string #file
 * @deprecated upgrade needed
 */
export declare function normalizeFileName(fileName: string, extension: string): string;
/**
 * Normalizes an XML name by removing invalid characters and replacing spaces with hyphens.
 *
 * @param {string} data - The original XML name to be normalized.
 * @returns {string} The normalized XML name.
 * @tags #string #xml
 */
export declare function normalizeXMLName(data: string): string;
/**
 * Adjusts the shade of a given color by a specified percentage.
 *
 * @param {string} color - The hexadecimal color code to be shaded.
 * @param {number} percent - The percentage by which to lighten or darken the color.
 * @returns {string} The shaded color in hexadecimal format.
 * @tags #color #converter
 */
export declare function shadeColor(color: any, percent: any): string;
/**
 * A library for color manipulation and conversion.
 *
 * @returns {Object} An object containing color conversion and manipulation functions.
 * @tags #color #converter #library
 */
export declare function colorLib(): {};
/**
 * Determines if a locale uses 24-hour time format.
 *
 * @param {string} [langCode] - The language code of the locale to check. Defaults to the system locale if not provided.
 * @returns {boolean} True if the locale uses 24-hour time format, false otherwise.
 * @tags #locale #time
 */
export declare function localeUses24HourTime(langCode?: any): boolean;
/**
 * Counts the occurrences of each element in an array.
 *
 * @param {Array} arr - The array to count the duplicates in.
 * @returns {Object} An object where keys are array elements and values are their counts.
 * @tags #array #counter
 */
export declare function duplicateCountArr(arr: any): any;
/**
 * Renames a property in an object.
 *
 * @param {Object} obj - The object containing the property to be renamed.
 * @param {string} oldName - The current name of the property.
 * @param {string} newName - The new name for the property.
 * @returns {Object} A new object with the property renamed.
 * @tags #object #converter
 * @deprecated
 */
export declare function renameObjectPropertyName(obj: any, oldName: any, newName: any): any;
/**
 * Moves an item from one position to another within an array.
 *
 * @param {number} from - The index of the item to move.
 * @param {number} to - The index where the item should be moved to.
 * @param {Array} arr - The array in which to move the item.
 * @returns {Array} A new array with the item moved to the new position.
 * @tags #array #converter
 */
export declare function moveArrayItem(from: any, to: any, arr: any): any[];
/**
 * Counts the occurrences of each element in an array.
 *
 * @param {Array} arr - The array to count the elements in.
 * @returns {Object} An object where keys are array elements and values are their counts.
 * @tags #array #counter
 */
export declare function getCounts(arr: any): {};
/**
 * Counts the occurrences of each element in an array and returns them sorted by frequency in descending order.
 *
 * @param {Array} arr - The array to count and sort the elements in.
 * @returns {Object} An object where keys are array elements and values are their counts, sorted by frequency.
 * @tags #array #counter #sorting
 */
export declare function getCountsSorted(arr: any): any;
/**
 * Combines multiple arrays into a single array.
 *
 * @param {...Array} arg - The arrays to combine.
 * @returns {Array} A single array containing all elements from the input arrays.
 * @tags #array #converter
 * @deprecated
 */
export declare function combineArrays(...arg: any[]): any[];
/**
 * Validates if a given string is a valid email address.
 *
 * @param {string} str - The string to validate as an email address.
 * @returns {boolean} True if the string is a valid email address, false otherwise.
 * @tags #string #validator
 */
export declare function validEmail(str: any): boolean;
/**
 * Converts a string to a number, handling commas and non-numeric characters.
 *
 * @param {string} string - The string to convert to a number.
 * @returns {number} The converted number.
 * @tags #string #converter
 * @deprecated
 */
export declare function toNumber(string: any): number;
/**
 * Splits an array into subarrays (pigeonholes) of a specified size.
 *
 * @param {Array} array - The array to split.
 * @param {number} pigeonholeSize - The size of each subarray.
 * @returns {Array} An array of subarrays, each containing up to `pigeonholeSize` elements.
 * @tags #array #converter
 */
export declare function pigeonholeArray(array: any, pigeonholeSize: any): any;
/**
 * Sets multiple CSS styles on a DOM element.
 *
 * @param {HTMLElement} elem - The DOM element to apply the styles to.
 * @param {Object} propertyObject - An object where keys are CSS properties and values are the styles to apply.
 * @tags #dom #style
 * @deprecated
 */
export declare function setStyle(elem: any, propertyObject: any): void;
/**
 * Helper function, that allows to attach multiple events to selected objects
 * @param {[object]}   el     [selected element or elements]
 * @param {[type]}   events   [DOM object events like click or touch]
 * @param {Function} callback [Callback method]
 */
export declare function addMulitListener(el: any, events: any, callback: any, options?: any): void;
/**
 * Checks if the given value is a NodeList, HTMLCollection, or similar collection of DOM nodes.
 * This function is useful for determining if a variable represents a collection of DOM elements.
 *
 * @param {*} nodes - The value to check. Can be any type, but the function is designed to work with DOM collections.
 * @returns {boolean} - Returns `true` if the value is a NodeList, HTMLCollection, or similar collection of DOM nodes; otherwise, returns `false`.
 *
 * @tags #dom #array-like #type-checking
 */
export declare function isNodeList(nodes: any): boolean;
/**
 * Formats a number into a shorter, more readable string with a suffix (k, M, G, etc.).
 * This function is useful for displaying large numbers in a compact form.
 *
 * @param {number} num - The number to format.
 * @param {number} digits - The number of digits to appear after the decimal point.
 * @returns {string} - The formatted number as a string with an appropriate suffix (e.g., "1.5k", "2M").
 *
 * @tags #number #formatter #converter
 */
export declare function nFormatter(num: any, digits: any): string;
/**
 * Rounds a number to the nearest multiple of a given number.
 * Optionally rounds down if the `down` parameter is set to `true`.
 *
 * @param {number} a - The number to round.
 * @param {number} num - The multiple to round to.
 * @param {boolean} [down] - If `true`, rounds down; otherwise, rounds up. Defaults to rounding up.
 * @returns {number} - The rounded number.
 *
 * @tags #number #math #rounding
 */
export declare function roundToNearest(a: any, num: any, down?: any): number;
/**
 * Synchronously executes an asynchronous function by blocking until the function completes.
 * This is a utility function to convert async behavior into sync behavior (not recommended for production use).
 *
 * @param {Function} asyncFunction - The asynchronous function to execute. It should return a promise.
 * @returns {*} - The resolved value of the asynchronous function.
 * @throws {*} - Throws the error if the asynchronous function fails.
 *
 * @tags #async #sync #utility
 * @deprecated
 */
export declare function syncFunction(asyncFunction: any): any;
/**
 * Checks if the provided value is a valid number.
 * This function ensures the value is of type "number" and is finite (not NaN or Infinity).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a valid number; otherwise, returns `false`.
 *
 * @tags #number #type-checking
 * @deprecated
 */
export declare function isNumber(value: any): boolean;
/**
 * Generates a UUID (Universally Unique Identifier) version 4.
 * This function uses the `crypto.randomUUID()` method if available, otherwise falls back to a custom implementation.
 *
 * @returns {string} - A randomly generated UUID v4 string.
 *
 * @tags #uuid #random #utility
 */
export declare function uuidv4(): string;
/**
 * Generates a random hexadecimal key of a specified length.
 * The key is generated by randomly selecting characters from the set of valid hexadecimal digits (0-9, a-f).
 *
 * @param {number} [keyLength=12] - The length of the key in bytes. Defaults to 12 bytes (24 hex characters).
 * @returns {string} - A randomly generated hexadecimal key.
 *
 * @tags #hex #random #key-generation
 */
export declare function generateHexKey(keyLength?: number): string;
/**
 * Asynchronously finds an element in an array that satisfies the provided predicate.
 * Supports sequential or parallel execution, and can handle both synchronous and asynchronous predicates.
 * Optionally, it can use `Promise.allSettled` to handle all promises without failing on rejection.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to search.
 * @param {(t: T) => Promise<boolean | any> | any} predicate - A function to test each element. Can be synchronous or asynchronous.
 * @param {Object} [options] - Optional configuration.
 * @param {boolean} [options.sequential] - If `true`, processes elements sequentially. Defaults to parallel execution.
 * @param {boolean} [options.allSettled] - If `true`, uses `Promise.allSettled` to handle promises. Defaults to `Promise.all`.
 * @returns {Promise<T | undefined>} - The first element that satisfies the predicate, or `undefined` if no such element is found.
 *
 * @tags #async #array #search #utility
 */
export declare function findAsync<T>(array: T[], predicate: (t: T) => Promise<boolean | any> | any, options?: {
    sequential: boolean;
    allSettled: boolean;
}): Promise<T | undefined>;
/**
 * Asynchronously checks if at least one element in the array satisfies the provided predicate.
 * Supports both synchronous and asynchronous predicates.
 *
 * @param {Array} arr - The array to check.
 * @param {(element: any) => Promise<boolean> | boolean} predicate - A function to test each element. Can be synchronous or asynchronous.
 * @returns {Promise<boolean>} - Returns `true` if at least one element satisfies the predicate; otherwise, returns `false`.
 *
 * @tags #async #array #utility
 */
export declare function someAsync(arr: any, predicate: any): Promise<boolean>;
/**
 * Asynchronously filters an array based on the provided predicate.
 * The predicate is applied to each element, and the function returns a new array containing only the elements that satisfy the predicate.
 *
 * @param {Array} arr - The array to filter.
 * @param {(element: any) => Promise<boolean> | boolean} predicate - A function to test each element. Can be synchronous or asynchronous.
 * @returns {Promise<Array>} - A new array containing only the elements that satisfy the predicate.
 *
 * @tags #async #array #filter #utility
 */
export declare function filterAsync(arr: any, predicate: any): Promise<any>;
/**
 * Recursively iterates over all properties of an object, including nested objects.
 * Applies a provided function to each non-object property.
 *
 * @param {Object} obj - The object to iterate over.
 * @param {(obj: Object, key: string) => void} fn - A function to apply to each non-object property. Receives the parent object and the current key as arguments.
 *
 * @tags #object #recursion #utility
 */
export declare function eachRecursive(obj: any, fn: any): void;
/**
 * Attempts to parse a string as JSON. If parsing fails or the input is not a string, the original value is returned.
 *
 * @param {*} str - The input value to parse. If it's a string, it will be parsed as JSON; otherwise, it will be returned as-is.
 * @returns {*} - The parsed JSON object if successful, or the original input if parsing fails or the input is not a string.
 *
 * @tags #string #json #utility
 */
export declare function parseString(str: any): any;
/**
 * Parses a stream of Server-Sent Events (SSE) formatted string into an array of objects.
 * Each object contains `data`, `event`, and `id` fields extracted from the stream.
 * If the input is not a string or is undefined, an empty array is returned.
 * test string:
 * id: 4b739a27-3cc6-4064-b469-f037b8e8a379
 * event: MESSAGE_REPLY_SSE_ELEMENT_EVENT_NAME_TEXT_STREAM_PUSH_FINISHED
 * data: {"content":""}
 *
 * id:...
 *
 *
 * @param {string} str - The SSE formatted string to parse.
 * @returns {Array<{ data: any, event?: any, id?: any }>} - An array of objects representing the parsed events.
 *
 * @tags #sse #stream #parsing #utility
 */
export declare function parseStream(str: any): Array<{
    data: any;
    event?: any;
    id?: any;
}>;
/**
 * Simulates typing text into an input element with a specified delay between each character.
 * This function is useful for creating a typing effect in web applications.
 *
 * @param {HTMLElement} element - The input element to type into.
 * @param {string} text - The text to type.
 * @param {number} delay - The delay (in milliseconds) between typing each character.
 * @returns {Promise<void>} - Resolves when the typing is complete.
 *
 * @tags #dom #animation #utility
 */
export declare function typeWithDelay(element: any, text: any, delay: any): Promise<void>;
/**
 * Validates an IPv4 address.
 * Checks if the provided string is a valid IPv4 address using a regular expression.
 *
 * @param {string} ip - The string to validate as an IPv4 address.
 * @returns {boolean} - Returns `true` if the string is a valid IPv4 address; otherwise, returns `false`.
 *
 * @tags #ip #validation #regex
 */
export declare function isValidIP(ip: any): boolean;
/**
 * Generates random IPv4 addresses within a specified range or the full range (0.0.0.0 to 255.255.255.255).
 * Optionally, generates multiple IP addresses.
 *
 * @param {Object} [options] - Configuration options.
 * @param {Array<number>|string} [options.start] - The starting range for the IP address (e.g., [192, 168, 1, 1] or "192.168.1.1").
 * @param {Array<number>|string} [options.end] - The ending range for the IP address (e.g., [192, 168, 1, 254] or "192.168.1.254").
 * @param {number} [options.amount=1] - The number of random IP addresses to generate.
 * @returns {string|Array<string>} - A single random IP address or an array of random IP addresses.
 *
 * @tags #ip #random #utility
 */
export declare function getRandomIP(options?: any): any;
/**
 * Checks if a string contains an end-of-line character.
 *
 * @param {string} str - The input string to check.
 * @return {boolean} - Returns true if the string contains an end-of-line character, otherwise false.
 * @tags #string
 */
export declare function hasEOL(str: any): boolean;
/**
 * Sorts an array of objects based on multiple criteria.
 *
 * @param {Array<Object>} data - The array of objects to sort.
 * @param {Array<Object>} criteria - The array of criteria objects, each containing a field and order.
 * @param {string} criteria[].field - The field to sort by.
 * @param {string} criteria[].order - The sort order, either 'asc' for ascending or 'desc' for descending.
 * @return {Array<Object>} - The sorted array of objects.
 * @tags #array #sorting
 * @deprecated use sortArrayOfObjects
 */
export declare function multiSort(data: any, criteria: any): any;
export declare function calculateDifference(value1: any, value2: any): number;
export declare function getMergedArray(aArray: any, bArray: any): any[];
export declare function setValueByPath(obj: any, path: any, value: any): any;
export declare function removeByIndexes(arr: any, indexes: any): any;
export declare function getSplitEdgeRange(options: any): {
    range: any;
    index: any;
};
export declare function typeValue(value: any): any;
//# sourceMappingURL=utils.d.ts.map
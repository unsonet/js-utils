import * as JSON5NS from 'json5';
const JSON5 = (JSON5NS as any).default || JSON5NS;
import * as acorn from 'acorn';
// import * as base64Utf8Module from '../../../assets/js/lib/base64-utf8.module.js';
// import * as imageSSIMModule from '../../../assets/js/lib/image-ssim.js';
// import parsePhone from '../../../assets/js/lib/phoneparser.js';
// import { base64Utf8Module, ImageSSIM, parsePhone } from '../../../../../../../libs/external-libs/src/index';
import { base64Utf8Module, ImageSSIM, parsePhone } from '@unsonet/external-libs';
import { UnsonetDataGrid } from '@unsonet/unsonet-types';
// import * as base64Utf8Module from '../../../../../../../libs/external-libs/src/lib/base64-utf8.module.js';
// import * as ImageSSIM from '../../../../../../../libs/external-libs/src/lib/image-ssim.js';
// import parsePhone from '../../../../../../../libs/external-libs/src/lib/phoneparser.js';

export { base64Utf8Module, ImageSSIM, parsePhone };

export var regExpPatterns = (() => {

  const htmlTags = /<(\s*\w*[^>]*)>|<\s*\/\s*\w*>/gi
  const firstChar = /(?<=(?:[^\p{L}|\p{N}\w]))(?:[\p{L}|\p{N}\w])/giu;
  //const cyrillicBoundary = /((?<=^|([^a-zа-я\w]))|(?![a-zа-я]|\w))/; //(\b alternative) deprecated
  //const wordBoundary = /(?<![\p{L}\p{N}_])WORD(?![\p{L}\p{N}_])/gu; //(\b alternative)
  const jsonParser = /(?:\"|\')(?<key>[^"]*)(?:\"|\')(?=:)(?:\:\s*)(?:\"|\')?(?<value>true|false|[0-9a-zA-Z\u0400-\u04FF\+\-\,\.\$ /]+)+./gi;
  //const jsonParseAll = /\{|\}|\[|\]|,|:|(\\-)?\\d+(\\.\\d+)?|"|.+?"/gi; //deprecated
  const arrayExtractor = /\[[^\]]*(?:,[^\]]*){0,}\]/g;
  const arrayParser = /(?!\,|\[)[^\,]+(?=,|\s*\])/;
  const escapeString = /(?<!\\)(?:\\{2})*(?<=")(?:(?<!\\)(?:\\{2})*\\"|[^"])+(?<!\\)(?:\\{2})*/gim;
  const parseArrayWithEscapedComma = /(?!\,|\[)(?:(?:\\{2})*\\,|[^,])+(?=,|\s*\])/
  const pseudoSelectors = /((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\(((['"])((?:\\.|[^\\])*?)\3|(?:(?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)[\x20\t\r\n\f]*(?:([*^$|!~]?=)[\x20\t\r\n\f]*(?:(['"])((?:\\.|[^\\])*?)\8|((?:\\.|[\w#-]|[^\x00-\xa0])+)|)|)[\x20\t\r\n\f]*\])*)|(?:(?!\:).)*)\)|)/gim;
  const findDotInVariable = /(?<=[^?])\./;
  const parsePropertyPath = /(?:^|(?<=\?|\.|\[|['"]))\s*([a-zA-Z \-$_][a-zA-Z \-0-9$_]*)(?=\s*(?:\?|\.|\[|$|\]|['"]))/gm;
  const streamSplitter = /(?!\p{L}+|\w+)|(?!\S+|\w+)/gum;//chat gpt split stream
  const caseSplit = /(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum;
  const wordSplit = /(?:\p{L}+(?!\p{Ll}))|[^\s]/gu;
  const pathSplit = /(?:(?:[^.\[\]\/\\"']{1,}\s{0,}|[^.\[\]\/\\"']\s{0,}(?<=\w|\d|\S))){1,}/gim;
  const wordSplitWithEndSpace = /(?:[^\s\-_]+[\s\-_]+$)|(?:\p{L}+(?!\p{Ll}))|[^\s]/gu;
  const abbreviations = /(?<![\p{L}\p{N}_-])([\p{Lu}]{1,}(?=\.)(?:\.\p{Lu}+)*(?:(?<=\.[\p{L}]+)\.(?=\s)){0,}(?:\d+[\p{Lu}]*)?|[\p{Lu}]{2,})(?:\d+[\p{Lu}]*)?(?![\p{L}\p{N}_-])/gmu;
  const stringifyJsObject = /^\s{0,}"|",{0,}\s{0,}$|^[\[\]]$/;
  const punctuations = /[^\p{L}\p{N}\s]/gmu;
  const numbers = /[\p{N}]/gmu;

  //range from https://stackoverflow.com/questions/15861088/regex-to-match-only-language-chars-all-language
  const allScripts = /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\w]/;
  const combiningDiacritics = /[\u0300-\u036f]/g;
  const cyrillicCombiningMarks =
    /[\u0300\u0301\u0302\u0304\u0306\u0307\u0308\u030B\u030C\u0311\u0483\u0484\u0485\u0486\u0487\u0488\u0489\u2DE0-\u2DFF\uA66F\uA670-\uA672]/g;
  const nonAscii = /[^\u0000-\u007E]/g;

  const wordSeparators = /[^\p{L}]/gu;// /[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
  const capitals = /[A-Z\u00C0-\u00D6\u00D9-\u00DD]/g;
  const basicCamel = /^[a-z\u00E0-\u00FCA-Z\u00C0-\u00DC][\d|a-z\u00E0-\u00FCA-Z\u00C0-\u00DC]*$/;
  const fourOrMoreConsecutiveCaps = /([A-Z\u00C0-\u00DC]{4,})/g;
  const allCaps = /^[A-Z\u00C0-\u00DC]+$/;
  const regExpTokens = /\\(n|r|t|0|s|S|d|D|w|W|x|C|R|v|V|h|H|K|n|pX|PX|P|k|gn|g|xYY|ddd|cY|G|A|Z|z|b|B|f|U|L|E)|[\.\^\$]|((\[|\{|\<|\((\?|\*)).+?(\]|\}|\>|\)))/g;
  const urlLike = /(?<![\p{L}\p{N}_/.\-])(?:(?:[A-Za-z][A-Za-z0-9+.\-]*)?:){0,3}(?:\/\/)?(?:(?:(?:[^\s\.]+\.\S{1}|(?=\w+:\/\/)\S{1}|(?<=\w+:)\S{1})|localhost[:?\d]?)(?:(?=\(\s*[\p{L}\p{N}\s]*\s*)[^\)]*\s*\)|[^\s\)\(])*)(?![\p{L}\p{N}_/.\-])/gum;
  ///(?<![\p{L}\p{N}_/.-])(?<url>(?:(?<protocol>(?:(?:view-source|blob):)?(?:(?:[A-Za-z][A-Za-z0-9+.-]*:)(?:\/\/)?|\/\/)?)(?:(?:(?<auth1>\S+(?::\S*)?@)?(?<domain1>(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[\p{L}\p{N}_-]+\.(?!\.)[\p{L}\p{N}_-]+(?:\.(?!\.)[\p{L}\p{N}_-]+)*))|localhost)(?<port1>:\d+)?(?<path1>(?:(?:\/|\?|#)[^\s\[\]<>'"]*))?)|(?<path2>[^\s\[\]<>'"]+))|(?:(?<auth2>\S+(?::\S*)?@)?(?<domain2>(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[\p{L}\p{N}_-]+\.(?!\.)[\p{L}\p{N}_-]+(?:\.(?!\.)[\p{L}\p{N}_-]+)*))|localhost)(?<port2>:\d+)?(?<path3>(?:(?:\/|\?|#)[^\s\[\]<>'"]*))?)))(?![\p{L}\p{N}_/.-])/gum
  // /(?<![\p{L}\p{N}_/.-])(?<url>(?:(?<protocol>(?:(?:view-source|blob):)?(?:(?:[A-Za-z][A-Za-z0-9+.-]*:)(?:\/\/)?|\/\/)?)?(?:(?:(?<auth1>\S+(?::\S*)?@)?(?<domain1>(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[\p{L}\p{N}_-]+\.(?!\.)[\p{L}\p{N}_-]+(?:\.(?!\.)[\p{L}\p{N}_-]+)*))|localhost)(?<port1>:\d+)?(?<path1>(?:(?:\/|\?|#)[^\s\[\]<>'"]*))?)|(?<path2>(?=[\p{L}\p{N}_/.-](?:\.|\/))[^\s\[\]<>'"]+))|(?:(?<auth2>\S+(?::\S*)?@)?(?<domain2>(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[\p{L}\p{N}_-]+\.(?!\.)[\p{L}\p{N}_-]+(?:\.(?!\.)[\p{L}\p{N}_-]+)*))|localhost)(?<port2>:\d+)?(?<path3>(?:(?:\/|\?|#)[^\s\[\]<>'"]*))?)))(?![\p{L}\p{N}_/.-])/gum

  //https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  ///^(?<href>(?:(?<scheme>(?:view-source|blob):))?(?<protocol>(?:http|https|ftp|ftps|file|urn|chrome|browser|chrome-extension|moz-extension|chrome-error|devtools|view-source|about|javascript|data|postgres|mysql|ws|wss|[A-Za-z][A-Za-z0-9+.-]*):)(?:(?:(?:\/\/)?(?:(?<username>(?:[A-Za-z0-9._~!$&'()*+,;=\-]|%[0-9A-Fa-f]{2})*)(?::(?<password>(?:[A-Za-z0-9._~!$&'()*+,;=:\-]|%[0-9A-Fa-f]{2})*))?@)?(?<host>(?<hostname>(?<=\/\/|@)(?:(?<ip>\d{1,3}(?:\.\d{1,3}){3}(?![.\d]))|(?![\p{N}.]{1,3}\.)(?:(?:(?<subdomains>(?:[\p{L}\p{N}\p{S}][\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}]?\.)*)?(?<secondLevelDomain>[\p{L}\p{N}\p{S}](?:[\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}])?)\.(?<topLevelDomain>[\p{L}\p{N}\p{S}](?:[\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}])?))|(?:[\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}])))(?=[^\p{L}\p{N}_]|$))?(?::(?<port>\d+))?)?(?<!\/\/|@|-|\.)(?<pathname>(?!\/\/|-|\.)(?:\/{0,}[-,\/%_.~+();\p{L}\p{N}\p{S}\p{M}\p{Pc}\p{Pd} ]+)+)?(?:(?<search>\?[;&\p{L}\d%_.~+=\-\/ ]*))?(?:(?<hash>#[\p{L}\d_\-\?&=]*))?)))$/umg;
  const parseLanguageTag = /^(?<language>[a-z]{2,3}|mis_[a-z0-9]+)(?:-(?<script>[A-Z][a-z]{3}))?(?:-(?<region>[A-Z]{2}|\d{3}))?(?:-(?<variants>[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/gmi; //IETF BCP 47
  const parseUrl = /^(?<href>(?:(?<scheme>(?:view-source|blob):))?(?<protocol>(?:http|https|ftp|ftps|file|urn|chrome|browser|chrome-extension|moz-extension|chrome-error|devtools|view-source|about|javascript|data|postgres|mysql|ws|wss|[A-Za-z][A-Za-z0-9+.-]*)(?<!localhost\b):(?=[^\s]+))(?:(?:(?:\/\/)?(?<auth>(?<username>(?:[A-Za-z0-9._~!$&'()*+,;=\-]|%[0-9A-Fa-f]{2})*)(?::(?<password>(?:[A-Za-z0-9._~!$&'()*+,;=:\-]|%[0-9A-Fa-f]{2})*))?@)?(?<host>(?<hostname>(?<=\/\/|@)(?:(?<ip>\d{1,3}(?:\.\d{1,3}){3}(?![.\d]))|(?![\p{N}.]{1,3}\.)(?:(?:(?<subdomains>(?:[\p{L}\p{N}\p{S}][\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}]?\.)*)?(?<secondLevelDomain>[\p{L}\p{N}\p{S}](?:[\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}])?)\.(?<topLevelDomain>(?=[\p{L}\p{N}\p{S}\p{M}-]*\p{L})[\p{L}\p{N}\p{S}](?:[\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}])?))|(?:[\p{L}\p{N}\p{S}\p{M}-]*[\p{L}\p{N}\p{S}\p{M}])))(?=[^\p{L}\p{N}_]|$))?(?::(?<port>\d+))?)?(?<!\/\/\b|@|-|\.)(?<pathname>(?!\/\/|-|\.)(?:\/{0,}[-,\/%_.~+()'"&@:;\p{L}\p{N}\p{S}\p{M}\p{Pc}\p{Pd} ]+)+)?(?:(?<search>\?[:;&\p{L}\d%_.,~+=\-\/ ]*))?(?:(?<hash>#[\p{L}\d_\-\?&=]*))?)))$/gum;
  /*
  tele-gram://www.example.com/
ftp://example.com/file/y
view-source:https://example.com
javascript:alert(1)
data:text/plain;base64,AAA
about:blank
foo.com
blob:https://www.example.com:40/uuidy?рапра
chrome-extension://idfsdfsdfsd/page.html
devtools://devtools/bundled/devtools_app.html
http://3628126748
https://username:password@www.example.com/
hh7-dttp://132.34.33.145/123?пвапв=ываы#gsdfs
*/
  const phone = /(?<phone>(?<![\w\p{L}\p{N}_/.-])(?:[()]\s*){0,1}(?:\+\s*)?(?![ ])(?<![-_():=+/.])(?:[-_( ):=+/.]?\d[- _():=+/.]*?){7,14}(?:\s*(?:#|x\.?|ext\.?|extension)\s*(?:\d+))?(?![\w\p{L}\p{N}_/.-]))/gui;
  const color = /(?<color>(?<hex>#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b)|(?<prefix>(?:rgb|hsl)(?:a?))\s*\(\s*(?<value>(?:(?:[-+]?\d+%?)\s*(?:,|(?=\s*\)))\s*){3}\s*(?<alpha>(?:(?<!,\s*),|)\s*(?:[-+]?(?:(?:\d+(?:\.\d+)?)|(?:\.\d+))))?)\s*\))/gmi;
  const text = /(?<html>(?:<(?:\s*\w*[^\n>]*)>|<\s*\/\s*\w*>))|(?<phone>(?<![\w\p{L}\p{N}_/.\-])(?:[()]\s*){0,1}(?:\+\s*)?(?![ ])(?<![-_():=+/.])(?:[-_( ):=+/.]?\d[- _():=+/.]*?){7,14}(?:\s*(?:#|x\.?|ext\.?|extension)\s*(?:\d+))?(?![\w\p{L}\p{N}_/.\-]))|(?<url>(?<![\p{L}\p{N}_/.\-])(?:(?:[A-Za-z][A-Za-z0-9+.\-]*)?:){0,3}(?:\/\/)?(?:(?:(?:[^\s\.]+\.\S{1}|(?=\w+:\/\/)\S{1}|(?<=\w+:)\S{1})|localhost[:?\d]?)(?:(?=\(\s*[\p{L}\p{N}\s]*\s*)[^\)]*\s*\)|[^\s\)\(])*)(?![\p{L}\p{N}_/.\-]))|(?<color>(?:#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})\b)|(?:(?:rgb|hsl)(?:a?))\s*\(\s*(?:(?:(?:[-+]?\d+%?)\s*(?:,|(?=\s*\)))\s*){3}\s*(?:(?:(?<!,\s*),|)\s*(?:[-+]?(?:(?:\d+(?:\.\d+)?)|(?:\.\d+))))?)\s*\))|(?<word>(?:[\p{L}\-_]+(?!\p{Ll})))|(?<char>[^\p{L}\p{N}\s])|(?<digit>[\p{N}]+)|(?<space>[\s]+)/gui;
  const hashes = /#(?:[\p{L}\w\-_]+)/gmu;
  const cryptoHashes8 = /(?:\b(?=[^A-Z0-9]*[A-Z0-9])[a-zA-Z0-9]{8}\b)/gm;
  const cryptoHashes16 = /(?:\b(?=[^A-Z0-9]*[A-Z0-9])[a-zA-Z0-9]{16}\b)/gm;
  const cryptoHashes32 = /(?:\b(?=[^A-Z0-9]*[A-Z0-9])[a-zA-Z0-9]{32}\b)/gm;

  //const sentence = /(?:(?:\S)+(?=\s|\b|\W|$)[^.!?\r\n]+[.!?]*)/gim; //deprecated
  const sentenceSplitter = /(?<!\b(?:[\w\d])[!¡?¿؟।।ฯ։።\.·…;។།ໃ་᠆᠉⸮⸘⸴፧᜵᜶ᝪᝫ᠃᠉᠊᠋᠌᠍᠆᠊᠋᠌᠍᠆᠊᠋᠌᠍⹀⹁⹂⹃⹄⹅⹆⹇⹈⹉⹊⹋⹌⹍⹎⹏⹐⹑⹒⹓⹔⹕⹖⹗⹘⹙⹚⹛⹜⹝⹞⹟⹠⹡⹢⹣⹤⹥⹦⹧⹨⹩⹪⹫⹬⹭⹮⹯⹰⹱⹲⹳⹴⹵⹶⹷⹸⹹⹺⹻⹼⹽⹾⹿;\n\r]\b)(?<!^[[!¡?¿؟।।ฯ։።\.·…;។།ໃ་᠆᠉⸮⸘⸴፧᜵᜶ᝪᝫ᠃᠉᠊᠋᠌᠍᠆᠊᠋᠌᠍᠆᠊᠋᠌᠍⹀⹁⹂⹃⹄⹅⹆⹇⹈⹉⹊⹋⹌⹍⹎⹏⹐⹑⹒⹓⹔⹕⹖⹗⹘⹙⹚⹛⹜⹝⹞⹟⹠⹡⹢⹣⹤⹥⹦⹧⹨⹩⹪⹫⹬⹭⹮⹯⹰⹱⹲⹳⹴⹵⹶⹷⹸⹹⹺⹻⹼⹽⹾⹿;\n\r])(?<=[!¡?¿؟।।ฯ։።\.·…;។།ໃ་᠆᠉⸮⸘⸴፧᜵᜶ᝪᝫ᠃᠉᠊᠋᠌᠍᠆᠊᠋᠌᠍᠆᠊᠋᠌᠍⹀⹁⹂⹃⹄⹅⹆⹇⹈⹉⹊⹋⹌⹍⹎⹏⹐⹑⹒⹓⹔⹕⹖⹗⹘⹙⹚⹛⹜⹝⹞⹟⹠⹡⹢⹣⹤⹥⹦⹧⹨⹩⹪⹫⹬⹭⹮⹯⹰⹱⹲⹳⹴⹵⹶⹷⹸⹹⹺⹻⹼⹽⹾⹿;\n\r](?=\s))/gi
  const baseHtmlElement = /<\s*base\s*href\s*=\s*"[^"]*"\s*[\/]*\s*>/gmi;
  return {
    htmlTags, firstChar, jsonParser, allScripts, combiningDiacritics, cyrillicCombiningMarks, nonAscii,
    arrayExtractor, arrayParser, escapeString, parseArrayWithEscapedComma, pseudoSelectors,
    findDotInVariable, parsePropertyPath, streamSplitter, caseSplit, wordSplit, pathSplit, wordSplitWithEndSpace, abbreviations,
    wordSeparators, capitals, basicCamel, fourOrMoreConsecutiveCaps, allCaps, regExpTokens, urlLike,
    parseUrl, parseLanguageTag,
    phone, color, text, hashes, sentenceSplitter,
    stringifyJsObject, punctuations, numbers, baseHtmlElement,
    cryptoHashes8, cryptoHashes16, cryptoHashes32
  };
})();

/**
 * Converts a file to a Base64-encoded string.
 * 
 * @param {File} file - The file to be converted.
 * @param {boolean} [urlEncoded=false] - Whether to include the full data URL (with MIME type).
 * @param {boolean} [withHeader=false] - Whether to include the Base64 header in the result.
 * @return {Promise<string>} - A promise that resolves to the Base64-encoded string.
 * @tags #converter #string #web
 */
export function toBase64(file, urlEncoded = false, withHeader = false) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let header = reader.result.toString().match(/^data:(.*,)?/)?.[0];
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }

      let data = urlEncoded ? reader.result : encoded

      return resolve(withHeader ? header + data : data);
    };
    reader.onerror = error => reject(error);
  })
};

/**
 * Converts a Blob object to a Base64-encoded string.
 * 
 * @param {Blob} blob - The Blob object to be converted.
 * @return {Promise<string>} - A promise that resolves to the Base64-encoded string.
 * @tags #converter #string #web
 */
export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

/**
 * Converts a Base64-encoded string to a Blob object.
 * 
 * @param {string} b64Data - The Base64-encoded string.
 * @param {string} [contentType] - The MIME type of the resulting Blob. If not provided, it is extracted from the Base64 string.
 * @param {number} [sliceSize=512] - The size of each slice when processing the Base64 string.
 * @return {Blob} - The resulting Blob object.
 * @tags #converter #string #web
 */
export function base64toBlob(b64Data, contentType?, sliceSize = 512) {

  // Split into two parts
  const parts = b64Data.split(';base64,');

  // Hold the content type
  contentType = contentType || parts[0].split(':')[1];

  const byteCharacters = atob(parts[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

/**
 * Converts a Base64 Data URI to a binary Uint8Array.
 * 
 * @param {string} base64 - The Base64 Data URI to be converted.
 * @return {Uint8Array} - The resulting binary data as a Uint8Array.
 * @tags #converter #string #web
 */
export function convertDataURIToBinary(base64) {
  return Uint8Array.from(atob(base64.replace(/^data:(.*,)?/, '')), v => v.charCodeAt(0));//old regExp /^data[^,]+,/
}

/**
 * Calculates the closeness between two numbers as a value between 0 and 1.
 * 
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @return {number} - The closeness value, where 1 indicates identical numbers and 0 indicates maximum difference.
 * @tags #math #utility
 */
export function calculateCloseness(num1, num2) {
  const difference = Math.abs(num1 - num2);
  const maxDifference = Math.max(num1, num2);
  const closeness = 1 - (difference / maxDifference);

  return closeness;
}

/**
 * Clamps a value to the nearest boundary within a specified range.
 * 
 * @param {number} value - The value to be clamped.
 * @param {[number, number]} range - An array representing the range [start, end].
 * @return {number} - The clamped value within the range.
 * @tags #math #utility
 */
export function clampToRange(value, range) {
  const [start, end] = range;

  if (value >= Math.min(start, end) && value <= Math.max(start, end)) {
    return value;
  } else if (Math.abs(value - start) < Math.abs(value - end)) {
    return start;
  } else {
    return end;
  }
}

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
export function checkRectangleRanges(block1, block2, options) {
  let { axis, strict, strictIntersecting, strictContained, tolerance = 0 } = options;
  let axisList = Array.isArray(axis) ? axis : [axis];

  let ranges = axisList.map(axis => {
    let property = axis === 'x' ? 'width' : 'height';

    let getRectFrom = (block) => {
      // Determine the minimum and maximum values for the ranges
      let min = block[axis] ? Array.isArray(block[axis]) ? Math.min(block[axis][0], block[axis][1]) : block[axis] : -Infinity;
      let max = block[axis] ? Array.isArray(block[axis]) ? Math.max(block[axis][0], block[axis][1]) : block[axis] + (block[property] || 0) : Infinity;
      return { min: Math.min(min, max), max: Math.max(min, max) };
    }

    let rect1 = getRectFrom(block1);
    let rect2 = getRectFrom(block2);

    let biggestArgument = null;
    let setBiggestArgument = (n) => {
      biggestArgument = n;
      return true;
    }

    // Intersection check with tolerance
    let isIntersecting = (() => {
      let rect1IntersectsRect2, rect2IntersectsRect1;
      if (strictIntersecting) {//previously used by default
        rect1IntersectsRect2 = !((rect1.max + tolerance < rect2.min) || (rect1.min - tolerance > rect2.max));
        rect2IntersectsRect1 = !((rect2.max + tolerance < rect1.min) || (rect2.min - tolerance > rect1.max));
      } else {
        rect1IntersectsRect2 = !((rect1.max + tolerance <= rect2.min) || (rect1.min - tolerance >= rect2.max));
        rect2IntersectsRect1 = !((rect2.max + tolerance <= rect1.min) || (rect2.min - tolerance >= rect1.max));
      }

      return rect1IntersectsRect2 || rect2IntersectsRect1;
    })();

    // Checking for the complete content of one rectangle inside the other with tolerance
    let isContained = (() => {
      let rect1ContainsRect2, rect2ContainsRect1;
      if (strictContained) {
        rect1ContainsRect2 = (rect1.min - tolerance < rect2.min) && (rect1.max + tolerance > rect2.max) && setBiggestArgument(0);
        rect2ContainsRect1 = (rect2.min - tolerance < rect1.min) && (rect2.max + tolerance > rect1.max) && setBiggestArgument(1);
      } else {//previously used by default
        rect1ContainsRect2 = (rect1.min - tolerance <= rect2.min) && (rect1.max + tolerance >= rect2.max) && setBiggestArgument(0);
        rect2ContainsRect1 = (rect2.min - tolerance <= rect1.min) && (rect2.max + tolerance >= rect1.max) && setBiggestArgument(1);
      }

      if (rect2ContainsRect1 == rect1ContainsRect2) { // rectangles is equal
        setBiggestArgument(null);
      }
      return rect2ContainsRect1 || rect1ContainsRect2;
    })();

    let inRange = false;

    if (strict) {
      inRange = isIntersecting && isContained;
    } else {
      inRange = isIntersecting;
    }

    return { axis, isContained, isIntersecting, inRange, biggestArgument }
  });

  return Array.isArray(axis) ? ranges : ranges[0];
}

/**
 * Rounds a number to a specified number of decimal places.
 * 
 * @param {number} n - The number to be rounded.
 * @param {number} [digits=0] - The number of decimal places to round to.
 * @return {number} - The rounded number.
 * @tags #math #utility
 */
export function roundTo(n, digits) {
  if (digits === undefined) {
    digits = 0;
  }
  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  var test = (Math.floor(n) / multiplicator);
  return +(test.toFixed(digits));
}

/**
 * Returns the correct declension of a word based on a number.
 * 
 * @param {number} n - The number to determine the declension for.
 * @param {string[]} titles - An array of three word forms: [singular, few, many].
 * @return {string} - The correct word form based on the number.
 * @tags #string #utility #localization
 */
export function declOfNum(n: number, titles: Array<string>) {// one,two,few
  return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
}

/**
 * Gets the coordinates of an element relative to the document.
 * 
 * @param {Element} elem - The DOM element to get the coordinates for.
 * @return {DOMRect} - A DOMRect object containing the element's position and size.
 * @tags #dom #geometry #utility
 */
export function getCoordFromDocument(elem) {
  let coords = elem.getBoundingClientRect();
  let top = coords.top + (window.pageYOffset || document.body.scrollTop);
  let left = coords.left + (window.pageXOffset || document.body.scrollLeft);
  let rect = new DOMRect(left, top, coords.width, coords.height);

  return rect;
}

/**
 * Retrieves the line and column number of the code execution point.
 * 
 * @return {Object} - An object containing the `line` and `column` numbers of the caller's code location.
 * @tags #debugging #utility
 */
export function getCoordFromCode() {
  var e = new Error();
  if (!e.stack) try {
    // IE requires the Error to actually be throw or else the Error's 'stack'
    // property is undefined.
    throw e;
  } catch (e) {
    if (!e.stack) {
      return 0; // IE < 10, likely
    }
  }
  var stack = e.stack.toString().split(/\r\n|\n/);
  // We want our caller's frame. It's index into |stack| depends on the
  // browser and browser version, so we need to search for the second frame:
  var frameRE = /(?<=:)(\d+):(?:\d+)[^\d]*$/;
  do {
    var frame = stack.shift();
  } while (!frameRE.exec(frame) && stack.length);
  return frameRE.exec(stack.shift())[0].split(':').reduce((prev, cur, i) => {
    prev[i == 0 ? 'line' : 'column'] = +cur;
    return prev;
  });
}

/**
 * Generates an array of numbers within a specified range.
 * 
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range.
 * @return {number[]} - An array of numbers from `start` to `end` (inclusive).
 * @tags #array #utility #math
 */
export function numberRange(start, end) {
  return new Array(end - start + 1).fill(undefined).map((d, i) => i + start);
}

/**
 * Opens a new browser window with the specified URL, target, and features.
 * 
 * @param {string} url - The URL to open in the new window.
 * @param {string} target - The target for the new window (e.g., `_blank`, `_self`).
 * @param {Object} featuresObject - An object specifying window features (e.g., width, height, resizable).
 * @return {Window|null} - A reference to the newly opened window, or `null` if the operation failed.
 * @tags #web #dom #utility
 */
export function openWindow(url, target, featuresObject) {
  let features = ((data) => {
    return Object.keys(data).reduce((prev, cur) => {
      let str = data[cur] ? `${cur}=${data[cur]}` : '';
      return [...prev, str];
    }, []).join(', ');
  })(featuresObject);
  return window.open(url, target, features);
}

/**
 * Detects the browser name and returns its value and display name.
 * 
 * @return {Object} - An object containing the browser's `value` (identifier) and `name` (display name).
 * @tags #browser #utility #web
 * @see https://gist.github.com/code-boxx/3875db284f522cacc375da94150edaf2
 */
export function getBrowserName() {
  let browserName = { value: "other", name: "Other" };

  //CHROME
  var isChrome = !!(window as any).chrome;
  if (navigator.userAgent.indexOf("Chrome") != -1 && isChrome) {
    browserName = { value: "chrome", name: "Google Chrome" };
  }
  // FIREFOX
  var isFirefox = typeof (window as any).InstallTrigger !== 'undefined';
  if (navigator.userAgent.indexOf("Firefox") != -1 && isFirefox) {
    browserName = { value: "firefox", name: "Mozilla Firefox" };
  }
  // INTERNET EXPLORER
  var isIE = /*@cc_on!@*/false || !!((window as any).document as any).documentMode;
  if (navigator.userAgent.indexOf("MSIE") != -1 && isIE) {
    browserName = { value: "ie", name: "Internet Explorer" };
  }
  // EDGE
  var isEdge = !isIE && !!(window as any).StyleMedia;
  if (navigator.userAgent.indexOf("Edge") != -1 && isEdge) {
    browserName = { value: "edge", name: "Edge" };
  }
  // SAFARI
  var isSafari = /constructor/i.test((window as any).HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof (window as any).safari !== 'undefined' && (window as any).safari.pushNotification));
  if (navigator.userAgent.indexOf("Safari") != -1 && isSafari) {
    browserName = { value: "safari", name: "Safari" };
  }
  // OPERA
  var isOpera = !!(window as any).opr || !!(window as any).opera || navigator.userAgent.indexOf(' OPR/') >= 0;
  if (navigator.userAgent.indexOf("Opera") != -1 && isOpera) {
    browserName = { value: "opera", name: "Opera" };
  }
  // YANDEX BROWSER
  var isYandex = !!(window as any).yandex;
  if (navigator.userAgent.indexOf("YaBrowser") != -1 && isYandex) {
    browserName = { value: "yabrowser", name: "Yandex Browser" };
  }

  //EPIC BROWSER
  var isEpic = JSON.parse((window as any)?.globalObj?.slots || '{}')?.[0]?.title?.toLowerCase()?.includes('epic');
  if (isEpic) {
    browserName = { value: "epicbrowser", name: "Epic Private Browser" };
  }

  // BLINK ENGINE DETECTION
  // var isBlink = (isChrome || isOpera) && !!window.CSS && ;
  // if (isBlink) {
  //   browserName = {value:"blink", name:"Blink Engine"};
  // }

  return browserName;
}

/**
 * Determines the text direction (RTL, LTR, or auto) based on the content of the text.
 * 
 * @param {string} text - The text to analyze for directionality.
 * @return {string} - The text direction: `'rtl'`, `'ltr'`, or `'auto'`.
 * @see https://gist.github.com/nekofar/f1f7b4f55e5ea24e49df289b034197a2 - Original source of the implementation.
 * @tags #string #utility #localization
 */
export function getTextDirection(text) {
  // Regular expression to match RTL Unicode characters
  var rtlChars = /[\u0600-\u06FF\u0750-\u077F\u0590-\u05FF\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]/;

  // Regular expression to match LTR Unicode characters
  var ltrChars = /[\u0000-\u05FF\u0700-\u08FF\uFB00-\uFB4F\uFB50-\uFDFF\uFE70-\uFEFF]/;

  // Count the number of RTL and LTR characters in the text
  var rtlCount = (text.match(rtlChars) || []).length;
  var ltrCount = (text.match(ltrChars) || []).length;

  // Return the text direction based on the character count
  if (rtlCount > 0 && ltrCount === 0) {
    return 'rtl';
  } else if (ltrCount > 0 && rtlCount === 0) {
    return 'ltr';
  } else {
    return 'auto';
  }
}

/**
 * High-level rule checker using checkConditionGeneric
 * @param settings.rules Array of rules { property, op, value, required }
 * @param settings.satisfy 'ALL' or 'ANY'
 * @param settings.log Function to log the evaluation process
 * @param reference The object under test
 * @altname checkCondition
 * @returns boolean|null (null when no rules)
 */
export function checkConditionGeneric(options: {
  value: string | string[];
  operator: string;
  comparisonValue?: string | string[];
  valuesType?: 'string' | 'number' | 'date' | 'array' | 'object';
  treatAsCollection?: boolean;
  customOperators?: Record<string, any>;
}) {

  type CollectionStrategy = 'some' | 'every';

  interface OperatorConfig {
    needsComparisonValue: boolean;
    outer: CollectionStrategy;
    inner?: CollectionStrategy;
    compareFn?: (valueItem: string, cmpItem: string) => boolean;
  }

  const operatorConfig: Record<string, OperatorConfig> = {
    exists: {
      needsComparisonValue: false,
      outer: 'some',
      compareFn: v => Boolean(v),
    },
    doesNotExists: {
      needsComparisonValue: false,
      outer: 'every',
      compareFn: v => !v,
    },
    empty: {
      needsComparisonValue: false,
      outer: 'every',
      compareFn: v => v === '',
    },
    notEmpty: {
      needsComparisonValue: false,
      outer: 'some',
      compareFn: v => v !== '',
    },
    equalTo: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => v === c,
    },
    notEqualTo: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => v !== c,
    },
    lessThan: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => v < c,
    },
    greaterThan: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => v > c,
    },
    lessThanOrEqualTo: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => v <= c,
    },
    greaterThanOrEqualTo: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => v >= c,
    },
    contains: {
      needsComparisonValue: true,
      outer: 'some',
      inner: 'some',
      compareFn: (v, c) => v.includes(c),
    },
    doesNotContain: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => !v.includes(c),
    },
    matches: {
      needsComparisonValue: true,
      outer: 'some',
      inner: 'some',
      compareFn: (v, c) => {
        try {
          const escaped = v.replace(/\\\\/g, '\\\\');
          const re = new RegExp(escaped, 'gim');
          return re.test(c);
        } catch {
          return false;
        }
      },
    },
    doesNotMatch: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => {
        try {
          const escaped = v.replace(/\\\\/g, '\\\\');
          const re = new RegExp(escaped, 'gim');
          return !re.test(c);
        } catch {
          return true;
        }
      },
    },
    startsWith: {
      needsComparisonValue: true,
      outer: 'some',
      inner: 'some',
      compareFn: (v, c) => v.startsWith(c),
    },
    doesNotStartWith: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => !v.startsWith(c),
    },
    endsWith: {
      needsComparisonValue: true,
      outer: 'some',
      inner: 'some',
      compareFn: (v, c) => v.endsWith(c),
    },
    doesNotEndWith: {
      needsComparisonValue: true,
      outer: 'every',
      inner: 'every',
      compareFn: (v, c) => !v.endsWith(c),
    },
  };

  function normalize<V>(
    raw: V | V[],
    type: 'string' | 'number' | 'date' | 'array' | 'object',
    treatAsCollection: boolean
  ): any[] {
    if (!treatAsCollection && Array.isArray(raw)) {
      return [raw.length];
    }
    const arr = Array.isArray(raw) ? raw : [raw];
    switch (type) {
      case 'date':
        return arr.map(v => {
          if (v instanceof Date) return v.getTime();
          const d = new Date(String(v));
          return isNaN(d.getTime()) ? NaN : d.getTime();
        });
      case 'number':
        return arr.map(v => Number(v));
      case 'string':
        return arr.map(v => String(v));
      default:
        return arr;
    }
  }

  const {
    value: rawValue,
    operator,
    comparisonValue: rawComparison,
    valuesType,
    treatAsCollection,
    customOperators
  } = options;

  const mergedConfig = Object.assign({}, operatorConfig, customOperators || {});
  const cfg = mergedConfig[operator];
  if (!cfg) return false;

  // If valuesType is not set, we take it "as is"
  const values = valuesType != null
    ? normalize(rawValue, valuesType, treatAsCollection)
    : (Array.isArray(rawValue) ? rawValue : [rawValue]);

  const cmps = cfg.needsComparisonValue
    ? (valuesType != null
      ? normalize(rawComparison, valuesType, treatAsCollection)
      : (Array.isArray(rawComparison)
        ? rawComparison
        : [rawComparison]))
    : [];

  if (!cfg.needsComparisonValue) {
    return (values as any)[cfg.outer](v => cfg.compareFn(v, ''));
  }
  return (values as any)[cfg.outer](v =>
    (cmps as any)[cfg.inner!](c => cfg.compareFn(v, c))
  );
}

/**
 * @param settings.rules Array of rules { property, op, value, required }
 * @param settings.satisfy 'ALL' or 'ANY'
 * @param settings.log Function to log the evaluation process
 * @param reference The object under test
 * @returns boolean|null (null when no rules)
 * @see https://github.com/raisely/json-conditions
 */
export function checkConditions(
  settings: {
    rules: Array<{ property: string; op: string; value?: any; required?: boolean }>;
    satisfy?: 'ALL' | 'ANY';
    log?: (msg: string) => void;
  },
  reference: any
): boolean | null {
  if (!settings || !Array.isArray(settings.rules)) return null;
  const { rules, satisfy = 'ANY', log } = settings;

  // shorthand alias mapping (only original shorthand names)
  const opMap: Record<string, string> = {
    eq: 'equalTo',
    ne: 'notEqualTo',
    neq: 'notEqualTo',
    gt: 'greaterThan',
    gte: 'greaterThanOrEqualTo',
    lt: 'lessThan',
    lte: 'lessThanOrEqualTo',
    present: 'exists',
    empty: 'empty',
    absent: 'doesNotExists'
  };

  let debugStr = '';
  let requiredPassed = 0;
  let normalPassed = 0;

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (!rule.property) throw Object.assign(new Error(`Property not specified for rule ${i}`), { rule });

    const rawOp = rule.op;
    const key = opMap[rawOp] || rawOp;

    // evaluate using generic checker
    const passed = checkConditionGeneric({
      value: getNestedValue(reference, rule.property),
      operator: key,
      comparisonValue: rule.value,
      valuesType: typeof rule.value === 'number' ? 'number' : 'string',
      treatAsCollection: false,
    });

    if (passed) rule.required ? requiredPassed++ : normalPassed++;

    // detect unary operators by full key names
    const unaryFull = ['exists', 'doesNotExists', 'empty', 'notEmpty'];
    const isUnary = unaryFull.includes(key);

    const valStr = isUnary ? '' : `(${getNestedValue(reference, rule.property)}) `;
    const cmpStr = isUnary ? '' : ` ${rule.value}`;
    debugStr += `(${i}) ${rule.property} ${valStr}${rawOp}${cmpStr} → ${passed}
`;
  }

  const totalRequired = rules.filter(r => r.required).length;
  const totalNormal = rules.length - totalRequired;
  const requiredOk = totalRequired === 0 || requiredPassed === totalRequired;
  const normalOk = satisfy === 'ALL' ? normalPassed === totalNormal : normalPassed > 0;
  const outcome = requiredOk && normalOk;

  debugStr += `Passed ${normalPassed}/${totalNormal} (need ${satisfy}` +
    `${totalRequired ? `, required ${requiredPassed}/${totalRequired}` : ''}) → ${outcome}`;
  if (log) log(debugStr);

  return outcome;
}

/**
 * Parses a regular expression string and extracts its pattern and flags.
 * 
 * @param {string} pattern - The regular expression string to parse.
 * @return {Array|null} - An array containing the matched parts of the regular expression or `null` if the input is invalid.
 * @tags #regex #string #utility
 */
export function parseRegExpString(pattern) {
  var re = /^\/((?:\\\/|[^\/])+)\/([gimsuyv]*)$/;
  /*
    Matches parts of a regular expression string.
    /^\/
      -	match a string that begins with a /
    ()
      -	capture
    (?:)+
      -	capture, but do not remember, a group of characters which occur 1 or more times
    \\\/
      -	match the literal \/
    |
      -	OR
    [^\/]
      -	anything which is not the literal \/
    \/
      -	match the literal /
    ([imgy]*)
      -	capture any characters matching `imgy` occurring 0 or more times
    $/
      -	string end
  */
  return pattern.match(re);
}

/**
 * Checks if a given string is a valid regular expression string.
 * A valid regex string should be enclosed by delimiters and may include flags.
 *
 * @param {string} s - The string to check for regex validity.
 * @returns {boolean} - Returns true if the string is a valid regex pattern, false otherwise.
 */
export function isValidRegexString(s) {
  try {
    const m = s.match(/^([/~@;%#'])(.*?)\1([gimsuy]*)$/);
    return m ? !!new RegExp(m[2], m[3])
      : false;
  } catch (e) {
    return false
  }
}

/**
 * Checks if a given value is a RegExp object.
 * This function is robust against cross-realm issues by checking the internal class tag.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns true if the value is a RegExp object, false otherwise.
 */
export function isRegExp(value) {
  return value instanceof RegExp ||
    Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * Validates a file name to ensure it does not contain invalid characters.
 * 
 * @param {string} fileName - The file name to validate.
 * @return {boolean} - `true` if the file name is valid, otherwise `false`.
 * @tags #validation #string #utility
 */
export function validateFileName(fileName) {
  return !(fileName.toString())?.match(/[\\/:*?\"<>|]/gim)
    && fileName?.length > 0;
}

/**
 * Sanitizes a file name by removing invalid characters and leading dots.
 * 
 * @param {string} fileName - The file name to sanitize.
 * @return {string} - A valid file name with invalid characters removed.
 * @tags #string #utility #validation
 */
export function getValidFileName(fileName) {
  let newFileName = fileName.replace(/^\.+/gim, "").replace(/[\\/:*?\"<>|]/gim, "");
  return newFileName;
}

/**
 * Extracts the file extension from a given file name.
 * 
 * @param {string} fileName - The file name to extract the extension from.
 * @return {string|undefined} - The file extension, or `undefined` if none is found.
 * @tags #string #utility #file
 */
export function getFileExtension(fileName) {
  return (/(?<=\.)[^./\\ ]+$/.exec(fileName?.trim()))?.[0].replace(/[?#].*$/gm, '');
}

/**
 * Returns the appropriate MIME type for a given file path based on its extension.
 *
 * This function looks up the file extension in a predefined map of common MIME types
 * (e.g., `.json` → `application/json; charset=utf-8`, `.png` → `image/png`, `.webp` → `image/webp`).
 * If the extension is not recognized, it falls back to `application/octet-stream`.
 *
 * @param filePath - The full or relative path to the file (e.g., `"assets/image.webp"`, `"index.html"`).
 * @returns The MIME type string corresponding to the file extension.
 *
 * @example
 * ```ts
 * guessContentType("index.html"); // "text/html; charset=utf-8"
 * guessContentType("image.webp"); // "image/webp"
 * guessContentType("unknown.xyz"); // "application/octet-stream"
 * ```
 */
export function guessContentType(filePath: string): string {
  const MimeTypes = {
    "json": "application/json; charset=utf-8",
    "js": "application/javascript; charset=utf-8",
    "ts": "application/typescript; charset=utf-8",
    "html": "text/html; charset=utf-8",
    "css": "text/css; charset=utf-8",
    "txt": "text/plain; charset=utf-8",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "svg": "image/svg+xml",
    "webp": "image/webp",
    "ico": "image/x-icon",
    "avif": "image/avif"
  } as const;
  const ext = getFileExtension(filePath).toLowerCase();
  return MimeTypes[ext as keyof typeof MimeTypes] || "application/octet-stream";
}


/**
 * Extracts the file extension from a given file name.
 * 
 * @param {string} fileName - The file name to extract the extension from.
 * @return {string|undefined} - The file extension, or `undefined` if none is found.
 * @tags #string #utility #file
 * @altname getFilename
 */
export function getFileName(fullPath, withExtension?) {
  let fileName = fullPath || '';
  if (fullPath) {
    var m = fullPath.toString().match(/(?=[\\\/]{0,})([^\\\/?#]+)[^\\\/]*$/);
    if (m && m.length > 1) {
      fileName = m[1];
      if (!withExtension) {
        fileName = fileName.replace(/\.[\w]+$/gm, '');
      }
    }
  }
  return fileName;
}

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
export function injectToDOM(str, options) {
  let isURL = options?.isURL || (globalThis?.validURL ? globalThis?.validURL(str) : false);
  let context = options?.context || window?.document?.documentElement;
  let attributes = options?.attributes || {};
  try {
    var script = window?.document.createElement("script");

    Object.keys(attributes).forEach(attr => {
      script.setAttribute(attr, attributes[attr]);
    });

    try {
      if (isURL) {
        script.setAttribute('src', str);
      } else {
        script.textContent = str;
      }
    } catch (error) {
      if (error?.message?.match(/TrustedScript/gim)?.length) {
        var trustedPolicy;
        if ((window as any)?.trustedTypes && (window as any)?.trustedTypes?.createPolicy) {
          trustedPolicy = (window as any)?.trustedTypes.createPolicy('default', {
            //createHTML: (string) => DOMPurify.sanitize(string, {RETURN_TRUSTED_TYPE: true}),
            createScriptURL: string => string, // warning: this is unsafe!
            createScript: string => string, // warning: this is unsafe!
          });
        } else {
          trustedPolicy = {
            createScriptURL: function () {
              return String(str);
            },
            createScript: function () {
              return String(str);
            }
          };
        }

        if (isURL) {
          script.setAttribute('src', trustedPolicy.createScript(str));
        } else {
          script.textContent = trustedPolicy.createScript(str);
        }
      }
    }
    context.appendChild(script);
    script.remove();
  } catch (error) {
    console.error(error)
  }
}


/**
 * Converts a string value to its appropriate JavaScript type.
 * @param {string} value - The input value to be converted.
 * @returns {*} The converted value. Can be of type string, number, boolean, null, or undefined.
 */
/**
 * Converts a string value to its appropriate JavaScript type.
 * @param {string} value - The input value to be converted.
 * @returns {*} The converted value.
 */
export function typeValue(value: string) {
  const newVal = value.trim();

  if (newVal === 'null') {
    return null;
  }

  if (newVal === 'undefined') {
    return void 0;
  }

  if (newVal === 'true') {
    return true;
  }

  if (newVal === 'false') {
    return false;
  }

  if (newVal === 'NaN') {
    return NaN;
  }

  if (newVal === 'Infinity') {
    return Infinity;
  }

  if (newVal === '-Infinity') {
    return -Infinity;
  }

  // Safe numeric detection.
  // Prevents things like "" => 0 and keeps non-numeric strings untouched.
  if (isNumeric(newVal)) {
    return Number(newVal);
  }

  return newVal;
}


const RESERVED_VALUES = Object.freeze({
  VALUE_IS_NULL: 'value_is_null',
  NOT_COPIED_DUE_ERROR: 'not_copied_due_error',
  NOT_COPIED: 'not_copied',
  DEPTH_LIMIT_REACHED: 'depth_limit_reached',
  RECURSIVE_OBJ: 'recursive_obj',
});
const SKIP = Symbol('skip');

/**
 * Returns a map of reserved placeholder values used during cloning.
 *
 * @returns {Object} An object containing reserved string markers.
 */
export function getReservedValues() {
  return { ...RESERVED_VALUES };
}

/**
 * Checks whether a value is one of the reserved placeholder values.
 *
 * @param {*} value - The value to check.
 * @param {Object} [reservedValues] - Optional custom reserved values map.
 * @returns {boolean} True if the value is reserved.
 */
export function isReservedValue(value: unknown, reservedValues = RESERVED_VALUES) {
  return typeof value === 'string' && Object.values(reservedValues).includes(value as any);
}

/**
 * Determines whether a value is a plain object (not an array or class instance).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a plain object.
 */
export function isPlainObject(value: unknown) {
  if (!value || typeof value !== 'object') return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

/**
 * Creates a safe deep copy of a value, handling circular references and special types.
 *
 * @param {*} input - The value to clone.
 * @param {Object} [options] - Cloning options.
 * @param {number} [options.depthLimit=10] - Maximum recursion depth.
 * @param {boolean} [options.omitReservedValues=false] - Skip reserved markers in result.
 * @param {boolean} [options.convertStringValues=false] - Convert string values via typeValue.
 * @param {Object} [options.reservedValues] - Custom reserved values map.
 *
 * @returns {*} The cloned result.
 */
export function saveCopy<T>(input: T, options: {
  depthLimit?: number;
  omitReservedValues?: boolean;
  convertStringValues?: boolean;
  reservedValues?: typeof RESERVED_VALUES;
} = {}, state?: {
  seen: WeakMap<object, any>;
  depth: number;
}): any {
  const {
    depthLimit = 10,
    omitReservedValues = false,
    convertStringValues = false,
    reservedValues = RESERVED_VALUES,
  } = options;

  const localState = state ?? { seen: new WeakMap<object, any>(), depth: 0 };

  if (localState.depth > depthLimit) {
    return omitReservedValues ? SKIP : reservedValues.DEPTH_LIMIT_REACHED;
  }

  if (input === null) {
    return omitReservedValues ? SKIP : reservedValues.VALUE_IS_NULL;
  }

  const inputType = typeof input;

  if (inputType === 'string') {
    return convertStringValues ? typeValue(input as unknown as string) : input;
  }

  if (
    inputType === 'number' ||
    inputType === 'boolean' ||
    inputType === 'bigint'
  ) {
    return input;
  }

  if (inputType === 'undefined') {
    return omitReservedValues ? SKIP : undefined;
  }

  if (inputType === 'function' || inputType === 'symbol') {
    return omitReservedValues ? SKIP : reservedValues.NOT_COPIED;
  }

  const obj = input as unknown as object;

  if (localState.seen.has(obj)) {
    return omitReservedValues ? SKIP : reservedValues.RECURSIVE_OBJ;
  }

  // Date
  if (input instanceof Date) {
    return new Date(input.getTime());
  }

  // RegExp
  if (input instanceof RegExp) {
    return new RegExp(input.source, input.flags);
  }

  // ArrayBuffer
  if (input instanceof ArrayBuffer) {
    return input.slice(0);
  }

  // Typed arrays / DataView
  if (ArrayBuffer.isView(input)) {
    if (input instanceof DataView) {
      return new DataView(
        input.buffer.slice(0),
        input.byteOffset,
        input.byteLength
      );
    }

    // Uint8Array, Float64Array, etc.
    return new (input.constructor as any)(input);
  }

  // Map
  if (input instanceof Map) {
    const cloned = new Map();
    localState.seen.set(obj, cloned);

    for (const [key, value] of input.entries()) {
      const nextState = {
        seen: localState.seen,
        depth: localState.depth + 1,
      };

      const clonedKey = saveCopy(key, options, nextState);
      if (clonedKey === SKIP) continue;

      const clonedValue = saveCopy(value, options, nextState);
      if (clonedValue === SKIP) continue;

      cloned.set(clonedKey, clonedValue);
    }

    return cloned;
  }

  // Set
  if (input instanceof Set) {
    const cloned = new Set();
    localState.seen.set(obj, cloned);

    for (const value of input.values()) {
      const clonedValue = saveCopy(value, options, {
        seen: localState.seen,
        depth: localState.depth + 1,
      });

      if (clonedValue === SKIP) continue;
      cloned.add(clonedValue);
    }

    return cloned;
  }

  // Array
  if (Array.isArray(input)) {
    const cloned: any[] = [];
    localState.seen.set(obj, cloned);

    for (let i = 0; i < input.length; i++) {
      const clonedValue = saveCopy(input[i], options, {
        seen: localState.seen,
        depth: localState.depth + 1,
      });

      if (clonedValue === SKIP) continue;
      cloned.push(clonedValue);
    }

    return cloned;
  }

  // Generic object / class instance
  const proto = Object.getPrototypeOf(input);
  const clonedObj = proto === null ? Object.create(null) : Object.create(proto);
  localState.seen.set(obj, clonedObj);

  const keys = Object.getOwnPropertyNames(input);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    try {
      const value = (input as any)[key];
      const clonedValue = saveCopy(value, options, {
        seen: localState.seen,
        depth: localState.depth + 1,
      });

      if (clonedValue === SKIP) continue;
      (clonedObj as any)[key] = clonedValue;
    } catch (error) {
      if (!omitReservedValues) {
        (clonedObj as any)[key] = reservedValues.NOT_COPIED_DUE_ERROR;
      }
    }
  }

  return clonedObj;
}

/**
 * Provides a utility for extracting and cloning properties from objects, including the `window` object, while handling circular references and depth limits.
 * 
 * @return {Object} - A utility object with methods for processing and extracting properties.
 * @tags #utility #object #window
 * @see https://stackoverflow.com/questions/31525166/converting-the-javascript-window-object-to-json - Inspiration for handling the `window` object.
 */
export const GetLocalProperties = function () {
  function getObjectClean(obj: any) {
    return saveCopy(obj, {
      omitReservedValues: true,
      depthLimit: 10,
      convertStringValues: false,
    });
  }

  function getWindow() {
    return getObjectClean(window);
  }

  function mainFunction(obj?: any, options?: {
    depthLimit?: number;
    omitReservedValues?: boolean;
    convertStringValues?: boolean;
    reservedValues?: typeof RESERVED_VALUES;
  }) {
    return saveCopy(obj, options);
  }

  const sharedMethods = {
    getReservedValues,
    typeValue,
    saveCopy,
    getWindow,
    getObjectClean,
  };

  for (const method in sharedMethods) {
    (mainFunction as any)[method] = (sharedMethods as any)[method];
  }

  return mainFunction;
}();

/**
 * Retrieves specified global variables from the `window` object or a given document context.
 * 
 * @param {string[]} variables - An array of variable names to retrieve.
 * @param {Document} [doc] - An optional document context to use instead of the default `window.document`.
 * @return {Object} - An object containing the retrieved variables and their values.
 * @tags #utility #window #variables #dom
 */
export function retrieveWindowVariables(variables, doc?) {
  let document = doc ? doc : window.document || this.document;
  var ret = {};
  var scriptContent = '';

  var extractorFn = GetLocalProperties;
  if (extractorFn) {
    var fnKeys = Object.keys(extractorFn).filter(item => !['getWindow'].includes(item));//extractorFn['localPropertiesKeys'].filter((item, i)=> !['getWindow'].includes(Object.keys(extractorFn)[i]));
    for (let index = 0; index < fnKeys.length; index++) {
      const key = fnKeys[index];
      let obj = extractorFn[key];
      if (obj) {
        if (typeof obj === 'function') {
          scriptContent = scriptContent + obj.toString() + '; ';
        } else if (typeof obj === 'object') {
          scriptContent = scriptContent + 'var ' + key + ' = ' + JSON.stringify(obj) + '; ';
        }
      }
    }
    scriptContent = scriptContent + extractorFn.toString() + '; ';
  }

  for (var i = 0; i < variables.length; i++) {
    var currVariable = variables[i];
    scriptContent += "if (typeof " + currVariable + " !== 'undefined') document.body.setAttribute('tmp_" + currVariable + "', JSON.stringify(" + (extractorFn ? extractorFn.name + '(' + currVariable + ')' : currVariable) + "));\n";
  }
  var script = document.createElement('script');
  script.id = 'tmpScript';
  script.appendChild(document.createTextNode(scriptContent));
  (document.body || document.head || document.documentElement).appendChild(script);
  for (var i = 0; i < variables.length; i++) {
    var currVariable = variables[i];
    ret[currVariable] = JSON.parse(document.body.getAttribute("tmp_" + currVariable));
    document.body.removeAttribute("tmp_" + currVariable);
  }
  if (document.querySelector("#tmpScript")) {
    document.querySelector("#tmpScript").remove();
  }
  return ret;
}

/**
 * Extracts variables and their values from a string using a regular expression.
 * 
 * @param {string} string - The input string containing variable definitions.
 * @return {Object} - An object where keys are variable names and values are their parsed values.
 * @tags #string #parsing #utility
 */
export function extractVariableFromString(string) {
  let variables = {};
  const regex = /([^ =,"\\&\?\n]+)\s*=\s*([\s\S]*?)(?=\n\n|$|\;)/gi; ///([^ =]+)\s*=\s*(.*?);/gim; // ([^=\n]+)\s*=\s*([\s\S]*?)(?=\n\n|$)
  const matchList = [...string.matchAll(regex)];
  for (let index = 0; index < matchList.length; index++) {
    let match = matchList[index];
    if (match && match?.length == 3) {
      try {
        variables[match[1]] = JSON5.parse(match[2]);
      } catch (error) {
        console.log(error)
      }
    }
  }
  return variables;
}

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
export function getVariableFromString(string, variable, multiple?, insensitive?) {
  variable = Array.isArray(variable) ? variable : [variable];

  return variable.reduce((prev, cur) => {
    let regExpStr = `(?<=(?:\\"|\\'|\\b)${cur}(?:\\"|\\'|\\b)(?:[\\s]*|){0,}(?:\\:|=)[\\s\\\`\\'\\"]{0,})(?:(?:(?<!\\\\)(?:\\\\{2})*(?<=\\\`|\\'|\\")(?<!\\\`\\\`|\\'\\'|\\"\\")(?:(?<!\\\\)(?:\\\\{2})*\\\\\\\`\\'\\"|[^\\\`\\'\\"]|)+(?<!\\\\)(?:\\\\{2})*)+|(?:[^\\\`\\'\\",\\}\\{\\n\\s]+(?!(?!\\b\\;)(\\s|\\n|[^\\\`\\'\\",\\}\\{\\n])+)))`; //old:`((?<=${cur}(?:[\\s]*|){0,}(?:\\:|=)[\\s\\'\\"]*)[^\\s\'\\",;]+)`;
    let matches = string.match(new RegExp(regExpStr, 'gm' + (insensitive ? 'i' : ''))) || []
    let value = matches?.[0];

    if (multiple ? value?.length : value) {
      prev[cur] = multiple ? [...(prev[cur] || []), value] : value
    }
    return prev;
  }, {});
}

/**
 * Extracts variable values from JavaScript code by parsing it into an abstract syntax tree (AST).
 * 
 * @param {string} code - The JavaScript code to analyze.
 * @return {Object} - An object where keys are variable names and values are their parsed values.
 * @tags #parsing #javascript #ast #utility
 */
export function extractVariableValues(code) {

  const parseExpression = (expr) => {
    if (expr.type === 'ObjectExpression') {
      const obj = {};
      for (const prop of expr.properties) {
        obj[prop.key.value] = parseExpression(prop.value);
      }
      return obj;
    } else if (expr.type === 'ArrayExpression') {
      return expr.elements.map(parseExpression);
    } else if (expr.type === 'Literal') {
      return expr.value;
    }
  };

  const ast = acorn.parse(code, { sourceType: 'module', ecmaVersion: 'latest' });

  const variables = {};

  for (const statement of (ast as any).body) {
    if (statement.type === 'ExpressionStatement') {
      const expression = statement.expression;
      if (
        expression.type === 'AssignmentExpression' &&
        expression.operator === '=' &&
        expression.left.type === 'MemberExpression' &&
        expression.left.object.type === 'Identifier' &&
        expression.left.property.type === 'Identifier'
      ) {
        const variableName = expression.left.object.name + '.' + expression.left.property.name;
        const value = parseExpression(expression.right);
        variables[variableName] = value;
      }
    }
  }

  return variables;
}

/**
 * Executes an HTML string by injecting it into the DOM and optionally delaying its removal.
 * 
 * @param {string} htmlString - The HTML string to execute.
 * @param {number} [delayMs=0] - The delay in milliseconds before removing the injected HTML.
 * @return {Promise<string>} - A promise that resolves with the inner HTML of the executed content.
 * @tags #dom #html #utility
 */
export function executeHTML(htmlString, delayMs?) {
  return new Promise((resolve) => {
    var range = document.createRange();
    //range.setStart(document.querySelector('body'), 0);
    var docFragment = range.createContextualFragment(htmlString);

    let id = 'tmpTemplate';
    let template = document.querySelector('#' + id) || document.createElement('template');
    if (!document.querySelector('#' + id)) {
      template.id = id;
      document.querySelector('body').appendChild(template);
    }

    template.appendChild(docFragment);

    setTimeout(() => {
      let innerHTML = template.innerHTML;
      document.querySelector('body')?.querySelector('#' + id)?.remove();
      return resolve(innerHTML);
    }, delayMs || 0)
  });
}

/**
 * Sets focus on a specified element without changing the current scroll position.
 * 
 * @param {Element} elem - The DOM element to focus.
 * @tags #dom #focus #utility
 */
export function cursorFocus(elem) {
  var x = window.scrollX, y = window.scrollY;
  window.scrollTo(x, y);
  elem.focus();
}

/**
 * Formats a given date into a string with the format `DD/MM/YYYY HH:mm:ss:ms`.
 * 
 * @param {Date} currentDate - The date to format.
 * @return {string} - The formatted date string.
 * @tags #date #formatting #utility
 * @deprecated use new Date().toLocaleString() or better ISODateString()
 */
export function printDate(currentDate) {
  function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
  }
  var dateStr = `${padStr(currentDate.getDate())}/${padStr(1 + currentDate.getMonth())}/${padStr(currentDate.getFullYear())} ${padStr(currentDate.getHours())}:${padStr(currentDate.getMinutes())}:${padStr(currentDate.getSeconds())}:${padStr(currentDate.getMilliseconds())}`;
  return dateStr;
}

/**
 * Converts a number to its corresponding spreadsheet column letter (e.g., 1 -> A, 27 -> AA).
 * 
 * @param {number} num - The number to convert.
 * @return {string|undefined} - The corresponding column letter, or `undefined` if the input is invalid.
 * @tags #conversion #string #utility
 */
export function numToSSColumnLetter(num) {
  let columnLetter = "",
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    columnLetter = String.fromCharCode(65 + t) + columnLetter;
    num = (num - t) / 26 | 0;
  }
  return columnLetter || undefined;
}

/**
 * Converts a multiline string into an array of trimmed, non-empty lines.
 * 
 * @param {string} str - The input string to process.
 * @return {string[]} - An array of trimmed lines from the input string.
 * @tags #string #array #utility
 */
export function inputStringToArray(str) {
  return str?.trim()?.split(/\r?\n/)?.reduce((prev, cur) => [...prev, ...(cur?.trim() ? [cur?.trim()] : [])], []) || []; //.map(value => value.trim()).filter(item => item);
}

/**
 * Converts an array of strings into a single multiline string.
 * 
 * @param {string[]} arr - The array of strings to join.
 * @return {string} - A multiline string created by joining the array elements with newline characters.
 * @tags #array #string #utility
 */
export function inputArrayToString(arr) {
  return arr?.join('\n') || '';
}

/**
 * Converts a multiline text into a single line by replacing all newline characters with spaces.
 * @param {string} text - The multiline text to be converted.
 * @returns {string} The single-line text with newline characters replaced by spaces.
 */
export function convertToSingleLine(text) {
  return /[\r\n]/.test(text) ? text.replace(/\r?\n|\r/g, ' ') : text;
}


/**
 * Serializes a value into a safe JS assignment for window variable injection.
 * @param {string} varName - Global window variable name
 * @param {any} data - Data to serialize
 * @returns {string} JS assignment string (e.g. window.__DATA__={...};)
 */
export function serializeWindowVar(varName: string, data: any): string {
  const safeJson = JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');

  return `window["${varName}"]=${safeJson};`;
}

/**
 * Serializes an object into HTML attribute string.
 * Boolean attributes are rendered without value.
 * Null/undefined/false values are omitted.
 * @param {Record<string, any>} attrs - Attributes map
 * @param {boolean} [removeNullAttrs=false]
 * @returns {string} HTML attribute string
 */
export function serializeAttributes(attrs, removeNullAttrs?) {
  return Object.entries(attrs)
    .filter(([, value]) => {
      if (value === false) return false;
      if (value === null || value === undefined) {
        return !removeNullAttrs;
      }
      return true;
    })
    .map(([key, value]) => {
      if (value === true) {
        return key; // boolean attribute
      }

      const escaped = String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `${key}="${escaped}"`;
    })
    .join(' ');
}

/**
 * Serializes an object into a query string format.
 * 
 * @param {Object} obj - The object to serialize.
 * @param {string} [prefix] - An optional prefix for nested keys.
 * @param {boolean|function} [encoder]  
 *   - If true, uses encodeURIComponent.
 *   - If a function, uses that function to encode keys/values.
 *   - Otherwise (false or omitted), leaves keys/values as‑is.
 * @return {string} - The serialized query string.
 * @tags #object #serialization #utility
 */
export function serialize(obj, prefix?, encoder?) {
  const str = [];

  // Determine the encoder function:
  // - If encoder===true → use built‑in encodeURIComponent
  // - If encoder is a function → use it
  // - Otherwise → identity (no encoding)
  let encodeFn;
  if (encoder === true) {
    encodeFn = encodeURIComponent;
  } else if (typeof encoder === 'function') {
    encodeFn = encoder;
  } else {
    encodeFn = (s) => s;
  }

  for (const prop in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;

    const key = prefix
      ? `${prefix}[${prop}]`
      : prop;
    const value = obj[prop];

    if (value !== null && typeof value === 'object') {
      // Recurse for nested objects/arrays
      str.push(serialize(value, key, encoder));
    } else {
      // Primitive value: encode key and value
      str.push(`${encodeFn(key)}=${encodeFn(String(value))}`);
    }
  }

  return str.join('&');
}

/**
 * Deserializes a query string into an object, optionally typing the values.
 * 
 * @param {string} str - The query string to deserialize.
 * @param {boolean} [typed=false] - Whether to automatically typecast values (e.g., numbers, booleans, null).
 * @return {Object} - The deserialized object.
 * @tags #string #deserialization #utility
 * @altname getQueryParamsObject
 */
export function deserialize(str, typed?) {

  function typeValue(value) {
    if (value == "null") {
      value = null;
    } else if (value == "undefined") {
      value = void 0;
    } else if (isNumeric(value)) {
      value = Number(value);
    } else if (["true", "false"].includes(value)) {
      value = Boolean(value);
    } else if (typeof value == 'string') {

    }
    return value;
  };

  let queryParts = str.split('#')?.[0].split(/\?/);  //.match(/(?:[\?&][^#]*)/)?.[0] || '';
  let query = queryParts[queryParts.length - 1];
  query = query.indexOf('?') == -1 ? query : query.substring(query.indexOf('?') + 1);

  let obj = {};
  let pairs = query.split("&");
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=");
    let key = pair[0] ? decodeURIComponent(pair[0]) : null;
    if (key) {
      let value = typed ? typeValue(decodeURIComponent(pair[1])) : decodeURIComponent(pair[1]);
      let keys = key.split(/[\[\]\.]/).filter(Boolean);
      let target = obj;
      for (let j = 0; j < keys.length - 1; j++) {
        let k = keys[j];
        if (isNumeric(k) && Number.isInteger(+k)) {
          k = typed ? typeValue(k) : k;
        }
        if (isNumeric(keys[j + 1]) && Number.isInteger(+keys[j + 1]) && !target[k]) {
          target[k] = [];
        } else if (!target[k]) {
          target[k] = {};
        }
        target = target[k];
      }
      target[keys[keys.length - 1]] = value;
    }
  }
  return obj;

}

/**
 * Converts a query string into an object, supporting nested structures and optional typecasting.
 * 
 * @param {string} query - The query string to convert.
 * @param {boolean} [nested=false] - Whether to parse nested structures (e.g., `key.subkey=value`).
 * @param {boolean} [typed=false] - Whether to automatically typecast values (e.g., numbers, booleans, null).
 * @return {Object} - The resulting object with parsed query parameters.
 * @tags #string #parsing #utility
 */
export function paramsToObject(query, nested?, typed?) {
  query = query.substring(query.indexOf('?') + 1);

  var re = /([^&=]+)=?([^&]*)/g;
  var decodeRE = /\+/g;

  var decode = function (str) {
    return decodeURIComponent(str.replace(decodeRE, " "));
  };

  function typeValue(value) {
    let newVal = value.trim();

    if (newVal == "null") {
      newVal = null;
    } else if (newVal == "undefined") {
      newVal = void 0;
    } else if (!Number.isNaN(Number(newVal))) {
      newVal = Number(newVal);
    } else if (newVal == "true" || newVal == "false") {
      newVal = Boolean(newVal);
    }
    return newVal;
  };

  var params = {}, e;
  while (e = re.exec(query)) {
    var k = decode(e[1]), v = decode(e[2]);
    if (k.substring(k.length - 2) === '[]' && nested) {
      k = k.substring(0, k.length - 2);
      (params[k] || (params[k] = [])).push(typed ? typeValue(v) : v);
    }
    else { params[k] = typed ? typeValue(v) : v; }
  }

  var assign = function (obj, keyPath, value) {
    var lastKeyIndex = keyPath.length - 1;
    for (var i = 0; i < lastKeyIndex; ++i) {
      var key = keyPath[i];
      if (!(key in obj)) {
        obj[key] = {}
      }

      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  }

  for (var prop in params) {
    var structure = prop.split(/\./g);
    if (structure.length > 1 && nested) {
      var levels = [];
      structure.forEach(function (item, i) {
        var key = item.replace(/[?[\]\\ \.\/]/g, '');
        levels.push(key);
      });
      assign(params, levels, params[prop]);
      delete (params[prop]);
    }
  }
  return params;
}

/**
 * Smart wrapper around encodeURIComponent.
 * 
 * If the input is already fully percent‑encoded, returns it unchanged;
 * otherwise, applies encodeURIComponent.
 *
 * @param {string} str - The input string to (maybe) encode.
 * @returns {string} The original string if already encoded, or the encoded string.
 *
 * @example
 * smartEncodeURIComponent('hello world');
 * // => 'hello%20world'
 *
 * @example
 * smartEncodeURIComponent('hello%20world');
 * // => 'hello%20world'
 */
export function smartEncodeURIComponent(str) {
  try {
    // Attempt to decode; if it's not valid encoded URI, this will throw
    const decoded = decodeURIComponent(str);
    // If re‑encoding yields exactly the original, it's already encoded
    if (encodeURIComponent(decoded) === str) {
      return str;
    }
    // Otherwise, encode the original input
    return encodeURIComponent(str);
  } catch (e) {
    // Not valid percent‑encoded input, so encode it
    return encodeURIComponent(str);
  }
}

/**
 * Parses a cookie string into an array of key-value pairs.
 * 
 * @param {string} str - The cookie string to parse.
 * @return {Array<Array<string>>} - An array of key-value pairs representing the cookies.
 * @tags #string #parsing #cookie #utility
 */
export function parseCookieString(str) {
  return [...str.match(/[^, ;=]+(?:=|)(?:[^;,]|(?:[^=;]*(?=;)))*/gm)].reduce((prev, cur) => {
    var arr = cur.split('=');
    return [...prev, arr];
  }, []);
}

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
export function getCookies(strParam, sParam?) {
  if (strParam) {
    var cookiesVariables = strParam.split(new RegExp('; ', 'gim')).filter(item => !!item),
      sParameterName,
      i,
      array = [];
    for (i = 0; i < cookiesVariables.length; i++) {
      sParameterName = splitFirst(cookiesVariables[i], '=');
      if (sParam != undefined) {
        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
        }
      } else {
        array.push(sParameterName);
        if (i + 1 == cookiesVariables.length) {
          return array;
        }
      }
    }
  }
}

/**
 * Converts an array of cookie objects into a cookie string.
 * 
 * @param {Array<Object>} cookies - An array of cookie objects, each with `name` and `value` properties.
 * @return {string} - A formatted cookie string.
 * @tags #cookie #string #utility
 */
export function getCookieString(cookies) {
  let cookieString = cookies.reduce(function (previousValue, currentItem) {
    if (currentItem.name != '') {
      return previousValue == undefined ? '' : previousValue + `${currentItem.name}=${currentItem.value}; `
    } else {
      return previousValue + '';
    }
  }, '');

  return cookieString;
}

/**
 * Retrieves the value of a specific cookie by name.
 * 
 * @param {string} name - The name of the cookie to retrieve.
 * @return {string|null} - The value of the cookie, or `null` if not found.
 * @tags #cookie #utility #web
 */
export function getCookie(name) {
  const cookieName = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    let c = cookie.trim();
    if (c.indexOf(cookieName) === 0) {
      return decodeURIComponent(c.substring(cookieName.length, c.length));
    }
  }

  return null;
}



/**
 * Sets a cookie with the specified name, value, and options.
 * 
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {Object} [options] - Additional options for the cookie (e.g., `path`, `expires`, `secure`).
 * @tags #cookie #utility #web
 */
export function setCookie(name, value, options?) {
  const { expires, path, domain, secure } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (path) {
    cookieString += `; path=${path}`;
  }

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  if (secure) {
    cookieString += `; secure`;
  }

  document.cookie = cookieString;
}

/**
 * Deletes a cookie by setting its `max-age` to -1.
 * 
 * @param {string} name - The name of the cookie to delete.
 * @tags #cookie #utility #web
 */
export function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

/**
 * Encodes a URI component with additional encoding for specific characters.
 * 
 * @param {string} str - The string to encode.
 * @return {string} - The encoded URI component.
 * @tags #uri #encoding #utility
 */
export function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[ '#=?&+\(\)]/g, function (c) { return '%' + c.charCodeAt(0).toString(16); });
}

/**
 * Escapes special characters in a string for use in regular expressions or other contexts.
 * 
 * @param {string} str - The string to escape.
 * @param {number} [slashLength=2] - The number of backslashes to prepend to special characters.
 * @return {string} - The escaped string.
 * @tags #string #escaping #utility
 */
export function escapeString(str, slashLength = 2) {
  const slashes = '\\'.repeat(slashLength);
  return str.replace(/[[\]{}()*+?&.,\\^$|#'"\/]/g, `${slashes}$&`);
};

/**
 * Escapes special characters in a string to safely use it in a regular expression.
 * 
 * @param {string} string - The string to escape.
 * @return {string} - The escaped string.
 * @tags #regex #escaping #utility
 */
export function escapeRegExp(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Splits a string into two parts at the first occurrence of a specified substring or regular expression.
 * 
 * @param {string} string - The string to split.
 * @param {string | RegExp} regexpOrSubstr - The substring or regular expression to split on.
 * @return {string[]} - An array containing the two parts of the string.
 * @tags #string #split #utility
 */
export function splitFirst(string, regexpOrSubstr: string | RegExp) {
  let specialSymbol = '¬';
  return string.replace(regexpOrSubstr, specialSymbol).split(specialSymbol);
}

/**
 * Splits a string into parts according to the specified positions.
 * @param {string} str - The original string to be split.
 * @param {number[]|number} positions - An array of positions at which to split the string.
 * @returns {string[]} An array of substrings split at the specified positions.
 * @throws {Error} If the positions are specified incorrectly (e.g., out of bounds of the string).
 */
export function splitByPosition(str, positions) {
  // Sort the positions in ascending order
  positions = Array.isArray(positions) ? positions : [positions];
  const sortedPositions = [...positions].sort((a, b) => a - b);
  const result = [];
  let start = 0;

  for (const pos of sortedPositions) {
    result.push(str.slice(start, pos));
    start = pos;
  }

  // Add the remaining part of the string
  result.push(str.slice(start));

  return result;
}

/**
 * Splits a path string into segments using a regular expression.
 * Supports splitting while ignoring separators inside brackets, quotes, and other special characters.
 *
 * @param {string} path - The path string to split into segments.
 * @returns {string[]} - An array of path segments. Returns an empty array if the path does not match the pattern.
 *
 */
export function splitPath(path) {
  const pathSplit = /(?:(?:[^.\[\]\/\\"']{1,}\s{0,}|[^.\[\]\/\\"']\s{0,}(?<=\w|\d|\S))){1,}/gim;
  return [...path.match(pathSplit)];
}

/**
 * Finds the longest common starting substring shared by all strings in an array.
 * 
 * @param {string[]} array - The array of strings to analyze.
 * @return {string} - The longest common starting substring.
 * @tags #string #array #utility
 */
export function sharedStart(array) {
  var A = array.concat().sort(),
    a1 = A[0], a2 = A[A.length - 1], L = a1.length, i = 0;
  while (i < L && a1.charAt(i) === a2.charAt(i)) i++;
  return a1.substring(0, i);
}

/**
 * Finds the longest common starting sequence of words shared by all strings in an array.
 * 
 * @param {string[]} array - The array of strings to analyze.
 * @param {string} [separator=' '] - The separator to use when joining the common words.
 * @return {string} - The longest common starting sequence of words.
 * @tags #string #array #utility
 */
export function sharedStartByWord(array, separator = ' ') {
  var A = array.concat().sort(),
    a1 = A[0].split(/[^\p{L}]/gmu), a2 = A[A.length - 1].split(/[^\p{L}]/gmu),
    L = a1.length, i = 0;
  while (i < L && a1[i] === a2[i]) { i++; }
  return a1.slice(0, i).join(separator);
}

/**
 * Groups strings by their shared starting sequence of characters or words, optionally filtered by length.
 * 
 * @param {string[]} array - The array of strings to analyze.
 * @param {number} [num] - The length of the shared start to filter by (optional).
 * @param {boolean} [wholeWordCount=false] - Whether to consider whole words instead of characters for the shared start.
 * @return {Object} - An object where keys are shared starts and values are arrays of strings sharing that start.
 * @tags #string #array #utility
 */
export function sharedStartByNumber(array, num, wholeWordCount) {
  let numberTemp = {};
  let stringTemp = {};
  let sharedStartFn = wholeWordCount ? sharedStartByWord : sharedStart;
  array?.sort(function (a, b) {
    let cnum = sharedStartFn([a, b]).length;
    numberTemp[cnum] = [...new Set([...(numberTemp[cnum] || []), ...[a, b]])];
    return 0;
  });

  Object.keys(numberTemp).forEach((numberTempItem) => {
    (numberTemp[numberTempItem] || []).sort(function (a, b) {
      let word = sharedStartFn([a, b]);
      stringTemp[word] = [...new Set([...(stringTemp[word] || []), ...[a, b]])];
      return 0;
    });
  });

  Object.keys(stringTemp)?.sort(function (a, b) {
    let word = sharedStartFn([a, b]);
    stringTemp[word] = [
      ...new Set([
        ...(stringTemp[word] || []),
        ...(stringTemp[a] || []),
        ...(stringTemp[b] || [])
      ])
    ];
    return 0;
  });

  stringTemp = Object.keys(stringTemp)
    .filter((item) => {
      return num == undefined || num == null ? true : item.length == num;
    })
    .reduce((prev, cur) => {
      prev[cur] = stringTemp[cur];
      return prev;
    }, {});

  return stringTemp;
}
/**
 * Processes a template string by replacing placeholders with a callback function's result.
 *
 * @param {Object} options
 * @param {string} [options.startSymbols='[-'] - The starting symbols for the template placeholders.
 * @param {string} [options.endSymbols='-]'] - The ending symbols for the template placeholders.
 * @param {string} options.text - The text containing the template placeholders.
 * @param {boolean} [options.insideTags=true] - Whether to process placeholders inside HTML tags.
 * @param {Function} [options.callbackFn=(item) => item] - A callback function to process each placeholder. Receives the placeholder including delimiters (e.g. '[-key-]') and should return replacement string.
 * @return {string} - The processed text with placeholders replaced.
 * @tags #templating #string #utility
 */
export function templating(options) {
  const {
    startSymbols = '[-',
    endSymbols = '-]',
    text = '',
    insideTags = true,
    callbackFn = (item) => item,
  } = options || {};

  if (!text) return '';

  let result = '';
  let lastIndex = 0;
  let inTag = false;

  for (let i = 0; i < text.length; i++) {
    // we keep track of whether we are inside the HTML tag, only if we need to ignore the tags
    if (!insideTags) {
      if (text[i] === '<') inTag = true;
      else if (text[i] === '>') inTag = false;
    }

    // if processing is allowed inside the tag or we are not in the tag
    if (insideTags || !inTag) {
      if (text.startsWith(startSymbols, i)) {
        // adding text to the template
        result += text.slice(lastIndex, i);

        // looking for the end of the template
        const endIndex = text.indexOf(endSymbols, i + startSymbols.length);
        if (endIndex !== -1) {
          const content = text.slice(i + startSymbols.length, endIndex);
          // passing the full tag along with the delimiters to the callback so that the callback can work on its own
          result += callbackFn(startSymbols + content + endSymbols);
          i = endIndex + endSymbols.length - 1;
          lastIndex = i + 1;
        } else {
          // did not find the closing character — we treat it as plain text: add the current character and continue
          // but to avoid getting stuck, just advance the index by the length of the starting sequence - 1
          i += startSymbols.length - 1;
        }
      }
    }
  }

  // adding the remaining text
  result += text.slice(lastIndex);
  return result;
}

/**
 * Extracts templating tags from a given text based on specified start and end symbols.
 *
 * @param {Object} options
 * @param {string} [options.startSymbols='[-'] - The starting symbols for the template tags.
 * @param {string} [options.endSymbols='-]'] - The ending symbols for the template tags.
 * @param {string} options.text - The text containing the template tags.
 * @param {boolean} [options.insideTags=true] - Whether to include tags inside HTML elements.
 * @param {boolean} [options.returnKeys=false] - If true, splits inner content by '|' and returns array of trimmed keys; otherwise returns full match including delimiters.
 * @return {Array<any>} - An array of extracted tags or their keys.
 * @tags #templating #string #utility
 */
export function getTemplatingTags(options) {
  const {
    startSymbols = '[-',
    endSymbols = '-]',
    text = '',
    insideTags = true,
    returnKeys = false,
  } = options || {};

  if (!text) return [];

  // The regular expression uses your auxiliary escapeString
  const query = new RegExp(
    `(?!\<(\\s*\\w*[^>]*))${escapeString(startSymbols, 1)}([\\u0400-\\u04FF. \\|\\-\\p{L}]+|\\w)+(?=\\s|\\b|\\W|$)${escapeString(endSymbols, 1)}(?=\\s|\\S|.*<|)${!insideTags ? `(?:(?=<(\\s*\\w*[^>]*)>|<\\s*\\/\\s*\\w*>)|(?!\\w*[^<>]*>))` : ``}`,
    'guim'
  );

  const matches = [...text.matchAll(query)];
  if (!matches.length) return [];

  return matches.map(m => {
    const matchStr = m[0];
    if (returnKeys) {
      const inner = matchStr.replace(startSymbols, '').replace(endSymbols, '');
      // splitFirst is supposed to return an array by the first separator; if you have a different implementation, you can replace it with inner.split('|')
      return splitFirst(inner, /\|/).map(item => item.trim());
    } else {
      return matchStr.trim();
    }
  });
}

/**
 * Finds the indexes (start positions) of templating tags in a given text based on specified start and end symbols.
 *
 * @param {Object} options
 * @param {string} [options.startSymbols='[-'] - The starting symbols for the template tags.
 * @param {string} [options.endSymbols='-]'] - The ending symbols for the template tags.
 * @param {string} options.text - The text containing the template tags.
 * @param {boolean} [options.insideTags=true] - Whether to include tags inside HTML elements.
 * @return {number[]} - An array of indexes (positions in the original text) where the templating tags start.
 * @tags #templating #string #utility
 */
export function getTemplatingTagsIndexes(options) {
  const {
    startSymbols = '[-',
    endSymbols = '-]',
    text = '',
    insideTags = true,
  } = options || {};

  if (!text) return [];

  const query = new RegExp(
    `(?!\<(\\s*\\w*[^>]*))${escapeString(startSymbols, 1)}([\\u0400-\\u04FF. \\|\\-\\p{L}]+|\\w)+(?=\\s|\\b|\\W|$)${escapeString(endSymbols, 1)}(?=\\s|\\S|.*<|)${!insideTags ? `(?:(?=<(\\s*\\w*[^>]*)>|<\\s*\\/\\s*\\w*>)|(?!\\w*[^<>]*>))` : ``}`,
    'guim'
  );

  const matches = [...text.matchAll(query)];
  // Returning the actual positions in the text (match.index)
  return matches.reduce((acc, m) => {
    if (typeof m.index === 'number') acc.push(m.index);
    return acc;
  }, []);
}

/**
 * Replaces templating tags in a string with values from an object, supporting default values and nested keys.
 *
 * @param {Object} options
 * @param {string} [options.startSymbols='[-'] - The starting symbols for the template tags.
 * @param {string} [options.endSymbols='-]'] - The ending symbols for the template tags.
 * @param {string} options.text - The text containing the template tags.
 * @param {boolean} [options.insideTags=true] - Whether to include tags inside HTML elements.
 * @param {Object} options.data - The object containing values to replace the template tags.
 *    If a tag contains a pipe (e.g. '[-user.name|default-]'), the part before '|' is used to lookup `data`, the part after '|' is a default.
 *    Nested keys like 'user.name' are supported.
 * @return {string} - The processed string with template tags replaced by corresponding values.
 * @tags #templating #string #utility
 */
export function templatingFromObject(options) {
  const {
    startSymbols = '[-',
    endSymbols = '-]',
    text = '',
    insideTags = true,
    data = {},
  } = options || {};

  // helper to get nested value
  const getValue = (obj, key) => {
    if (key.includes('.')) {
      return deepFind(obj, key);
    } else {
      return obj ? obj[key] : undefined;
    }
  };

  const result = templating({
    startSymbols,
    endSymbols,
    text,
    insideTags,
    callbackFn: (word) => {
      const inner = word.replace(startSymbols, '').replace(endSymbols, '');
      const parts = splitFirst(inner, /\|/).map(p => p.trim());
      const val = getValue(data, parts[0]);
      // if the object has a value (including false/0), we use it; otherwise, the default from parts[1] or an empty string
      return (val !== undefined && val !== null) ? val : (parts[1] ? parts[1] : '');
    }
  });

  return String(result).trim();
}

/**
 * A generic sort function for comparing two values.
 * 
 * @param {any} a - The first value to compare.
 * @param {any} b - The second value to compare.
 * @return {number} - Returns `-1` if `a` is less than `b`, `1` if `a` is greater than `b`, and `0` if they are equal.
 * @tags #sorting #utility
 */
export function sortFunction(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Selects the content of a specified DOM element.
 * 
 * @param {Element} elem - The DOM element whose content should be selected.
 * @tags #dom #selection #utility
 */
export function setSelection(elem) {
  var target = elem;
  var rng, sel;
  if (document.createRange) {
    rng = document.createRange();
    rng.selectNode(target)
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(rng);
  } else {
    var rng = (document.body as any).createTextRange();
    rng.moveToElementText(target);
    rng.select();
  }
}

/**
 * Executes a callback function at regular intervals until a specified stop time is reached.
 * 
 * @param {number} delay - The interval delay in milliseconds.
 * @param {number} stop - The total time in milliseconds after which the execution stops.
 * @param {Function} callback - The function to execute at each interval. Can be asynchronous.
 * @param {Function} [errorCallback] - An optional function to execute if an error occurs or when stopping.
 * @tags #timing #interval #utility
 */
export function intervalExecution(delay, stop, callback, errorCallback?) {
  var interval = setInterval((function () {
    var i = 0;
    return async function () {
      i += delay;

      if (callback.constructor.name == 'AsyncFunction') {
        await callback(interval, i);
      } else {
        callback(interval, i);
      }

      if (i >= stop) {
        try {
          if (errorCallback) {
            if (callback.constructor.name == 'AsyncFunction') {
              await errorCallback(interval, i);
            } else {
              errorCallback(interval, i);
            }
          }
          clearInterval(interval);
        } catch (error) {
          if (errorCallback) {
            if (callback.constructor.name == 'AsyncFunction') {
              await errorCallback(interval, i);
            } else {
              errorCallback(interval, i);
            }
          }
          clearInterval(interval);
        }
      }
    }
  })(), delay);
}

/**
 * Checks if a given function is an asynchronous function.
 * 
 * @param {Function} fn - The function to check.
 * @return {boolean} - `true` if the function is asynchronous, otherwise `false`.
 * @tags #function #utility #async
 */
export function isAsyncFunction(fn) {
  return fn.constructor.name == 'AsyncFunction';
}


/**
* @typedef {Object} FuzzyMatchInfo
* @property {number} index      The start position of the best match, or -1 if none acceptable.
* @property {number} errors     Number of edit errors in the best match.
* @property {number} score      Normalized distance-like score: errors/pattern.length (+ optional proximity). Lower is better.
* @property {number} similarity Similarity in [0..1]: 1 - score. Higher is better.
*/

/**
 * Fuzzy search with distance-like score; returns also similarity = 1 - score.
 *
 * @param {string} text
 * @param {string} pattern
 * @param {Object} [options]
 *   @param {boolean} [options.ignoreCase=false]
 *   @param {boolean} [options.ignoreProximity=false]
 *   @param {boolean} [options.ignoreDiacritics=false]
 *   @param {number}  [options.location=0]
 *   @param {number}  [options.distance=50]
 *   @param {number}  [options.threshold=1.0]   Maximum allowed score; if score > threshold, index = -1.
 * @returns {FuzzyMatchInfo}
 */
export function fuzzyMatchInfo(text, pattern, options?) {
  options = options || {};
  const ignoreCase = options.ignoreCase === true;
  const ignoreProximity = options.ignoreProximity === true;
  const ignoreDiacritics = options.ignoreDiacritics === true;
  const location = options.location != null ? options.location : 0;
  const distance = options.distance != null ? options.distance : 50;
  const threshold = options.threshold != null ? options.threshold : 0.3;

  let hay = text;
  let needle = pattern;
  if (ignoreCase) {
    hay = text.toLowerCase();
    needle = pattern.toLowerCase();
  }
  if (ignoreDiacritics) {
    text = removeDiacritics(text);
    pattern = removeDiacritics(pattern);
  }
  // Exact match shortcut:
  const exactIdx = hay.indexOf(needle);
  if (exactIdx !== -1) {
    const score0 = 0;
    return { index: exactIdx, errors: 0, score: score0, similarity: 1 - score0 };
  }
  if (needle.length === 0) {
    return { index: 0, errors: 0, score: 0, similarity: 1 };
  }
  if (needle.length > 32) {
    // Too long: treat as not found
    const score1 = 1;
    return { index: -1, errors: needle.length, score: score1, similarity: 1 - score1 };
  }

  const loc = ignoreProximity ? 0 : location;
  const dist = ignoreProximity ? 1 : distance;

  // Build bitmask
  const s = {};
  for (let i = 0; i < needle.length; i++) s[needle.charAt(i)] = 0;
  for (let i = 0; i < needle.length; i++) {
    s[needle.charAt(i)] |= 1 << (needle.length - i - 1);
  }

  function matchBitapScore(e, x) {
    const accuracy = e / needle.length;
    if (ignoreProximity) return accuracy;
    const proximity = Math.abs(loc - x);
    if (!dist) return proximity ? 1.0 : accuracy;
    return accuracy + (proximity / dist);
  }

  let bestScore = 1.0;
  let bestErrors = needle.length;
  let resultPos = -1;

  // Fast fuzzy near loc
  const firstIndex = hay.indexOf(needle, loc);
  if (firstIndex !== -1) {
    const sc0 = matchBitapScore(0, firstIndex);
    bestScore = sc0; bestErrors = 0; resultPos = firstIndex;
    const lastIndex = hay.lastIndexOf(needle, loc + needle.length);
    if (lastIndex !== -1) {
      const sc1 = matchBitapScore(0, lastIndex);
      if (sc1 < bestScore) {
        bestScore = sc1; bestErrors = 0; resultPos = lastIndex;
      }
    }
  }

  const matchmask = 1 << (needle.length - 1);
  let binMax = needle.length + hay.length;
  let lastRd = null;

  for (let d = 1; d < needle.length; d++) {
    let binMin = 0;
    let binMid = binMax;
    while (binMin < binMid) {
      if (matchBitapScore(d, loc + binMid) <= bestScore) {
        binMin = binMid;
      } else {
        binMax = binMid;
      }
      binMid = Math.floor((binMax - binMin) / 2 + binMin);
    }
    binMax = binMid;

    const start = Math.max(1, loc - binMid + 1);
    const finish = Math.min(loc + binMid, hay.length) + needle.length;
    const rd = new Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;

    for (let j = finish; j >= start; j--) {
      const charMatch = s[hay.charAt(j - 1)] || 0;
      const prev1 = lastRd && lastRd[j + 1] !== undefined ? lastRd[j + 1] : 0;
      const prev0 = lastRd && lastRd[j] !== undefined ? lastRd[j] : 0;
      rd[j] = (((rd[j + 1] << 1) | 1) & charMatch)
        | (((prev1 | prev0) << 1) | 1)
        | prev1;
      if (rd[j] & matchmask) {
        const sc = matchBitapScore(d, j - 1);
        if (sc < bestScore) {
          bestScore = sc;
          bestErrors = d;
          resultPos = j - 1;
        }
      }
    }
    lastRd = rd;
    if (matchBitapScore(d + 1, loc) > bestScore) break;
  }

  if (bestScore > threshold) {
    const sim = 1 - bestScore;
    return { index: -1, errors: bestErrors, score: bestScore, similarity: sim };
  }
  const sim = 1 - bestScore;
  return { index: resultPos, errors: bestErrors, score: bestScore, similarity: sim };
}

/**
 * Perform a fuzzy indexOf: return the start index of the best approximate match or -1.
 *
 * @param {string} text
 * @param {string} pattern
 * @param {Object} [options]  Same options as fuzzyMatchInfo; options.threshold controls acceptability.
 *   @param {boolean} [options.ignoreCase=false]
 *   @param {boolean} [options.ignoreProximity=false]
 *   @param {boolean} [options.ignoreDiacritics=false]
 *   @param {number}  [options.location=0]
 *   @param {number}  [options.distance=50]
 *   @param {number}  [options.threshold=1.0]   Maximum allowed score; if score > threshold, index = -1.
 * @returns {number} The index of the best match, or -1 if none within threshold.
 */
export function fuzzyIndexOf(text, pattern, options?) {
  const info = fuzzyMatchInfo(text, pattern, options);
  return info.index;
}

/**
 * Fuzzy boolean match: return true if an approximate match is found.
 *
 * @param {string} text
 * @param {string} pattern
 * @param {Object} [options]  Same options as fuzzyMatchInfo.
 *   @param {boolean} [options.ignoreCase=false]
 *   @param {boolean} [options.ignoreProximity=false]
 *   @param {boolean} [options.ignoreDiacritics=false]
 *   @param {number}  [options.location=0]
 *   @param {number}  [options.distance=50]
 *   @param {number}  [options.threshold=1.0]   Maximum allowed score; if score > threshold, index = -1.
 * @returns {boolean}
 */
export function fuzzy(text, pattern, options?) {
  return fuzzyIndexOf(text, pattern, options) !== -1;
}

/**
 * Fuzzy includes: similar to String.prototype.includes, but fuzzy.
 * If pattern is empty, returns true.
 * By default, sets options.location to the middle of text if not provided.
 *
 * @param {string} text
 * @param {string} pattern
 * @param {Object} [options]
 *   @param {boolean} [options.ignoreCase=false]
 *   @param {boolean} [options.ignoreProximity=false]
 *   @param {boolean} [options.ignoreDiacritics=false]
 *   @param {number}  [options.location=0]
 *   @param {number}  [options.distance=50]
 *   @param {number}  [options.threshold=1.0]   Maximum allowed score; if score > threshold, index = -1.
 * @returns {boolean}
 */
export function fuzzyIncludes(text, pattern, options) {
  if (pattern.length === 0) return true;
  const opts = Object.assign({}, options);
  if (opts.location == null) {
    opts.location = Math.floor(text.length / 2);
  }
  return fuzzyIndexOf(text, pattern, opts) !== -1;
}

/**
 * Converts a string to snake_case format.
 * 
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in snake_case.
 * @tags #string #conversion #utility
 */
export function toSnakeCase(str) {
  //var result = str.replace(/[A-Z]/g, (letter, index) => { return index == 0 ? letter.toLowerCase() : '_'+ letter.toLowerCase();}).split(' ').join('_').toLowerCase()
  let parsedStringArray = str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
  var result = parsedStringArray.join('_').toLowerCase();
  return result;
}

/**
 * Converts a string to kebab-case format.
 * 
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in kebab-case.
 * @tags #string #conversion #utility
 */
export function toKebabCase(str) {
  let parsedStringArray = str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
  var result = parsedStringArray.join('-').toLowerCase();
  return result;
}

/**
 * Converts a string to Sentence case format.
 * 
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in Sentence case.
 * @tags #string #conversion #utility
 */
export function toSentenceCase(str) {
  let parsedStringArray = str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
  var result = parsedStringArray.join(' ').toLowerCase();
  return capitalizeFirstLetter(result);
}

/**
 * Converts a string to CONSTANT_CASE format.
 * 
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in CONSTANT_CASE.
 * @tags #string #conversion #utility
 */
export function toConstantCase(str) {
  let parsedStringArray = str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
  var result = parsedStringArray.join('_').toUpperCase();
  return result;
}

/**
 * Converts a string to Title Case format.
 * 
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in Title Case.
 * @tags #string #conversion #utility
 * @altnames toProperCase
 */
export function toTitleCase(str) {
  let parsedStringArray = str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
  var result = parsedStringArray.map(item => capitalizeFirstLetter(item.toLowerCase())).join(' ');
  return result;
}

/**
 * Converts a string to camelCase format.
 * 
 * @param {string} str - The input string to convert.
 * @return {string} - The converted string in camelCase.
 * @tags #string #conversion #utility
 * @altname camelize camelCase
 */
export function toCamelCase(str) {
  let parsedStringArray = str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
  var result = parsedStringArray.map((item, i) => i == 0 ? item.toLowerCase() : capitalizeFirstLetter(item.toLowerCase())).join('');
  return result;
}

/**
 * Converts a string to PascalCase by splitting it on uppercase letters, spaces, hyphens, underscores, or dots,
 * capitalizing the first letter of each segment, and joining them together.
 * 
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to PascalCase.
 * @tags #string #utility #formatting #casing
 */
export function toPascalCase(str) {
  let parsedStringArray = str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
  var result = parsedStringArray.map((item, i) => i == 0 ? capitalizeFirstLetter(item) : capitalizeFirstLetter(item.toLowerCase())).join('');
  return result;
}

/**
 * Converts a string to UPPERCASE.
 * 
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to UPPERCASE.
 * @tags #string #utility #formatting #casing
 */
export function toUpperCase(str) {
  var result = str.toUpperCase();
  return result;
}

/**
 * Converts a string to lowercase.
 * 
 * @param {string} str - The input string to convert.
 * @returns {string} The string converted to lowercase.
 * @tags #string #utility #formatting #casing
 */
export function toLowerCase(str) {
  var result = str.toLowerCase();
  return result;
}

/**
 * Converts each alphabetical character in the string to either uppercase or lowercase randomly.
 * Non-alphabetical characters are left unchanged.
 * @param {string} input - The string to transform.
 * @returns {string} A new string with each letter randomly uppercased or lowercased.
 */
export function toRandomCase(str) {
  return [...str]
    .map(char => {
      return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
    })
    .join('');
}

/**
 * Inverts the case of each alphabetical character in the string.
 * Lowercase letters become uppercase and vice versa. Non-alphabetical characters are unchanged.
 * Supports any Unicode letters.
 * @param {string} input - The string to transform.
 * @returns {string} A new string with each letter's case inverted.
 */
export function toAlternateCase(input) {
  return [...input]
    .map(char => {
      if (/\p{Ll}/u.test(char)) return char.toUpperCase();
      if (/\p{Lu}/u.test(char)) return char.toLowerCase();
      return char;
    })
    .join('');
}

/**
 * Converts the string into a sPoNgE/mOcKiNg case with configurable options.
 * Can alternate across the whole string or reset per word, and choose starting case.
 * Supports any Unicode letters.
 * @param {string} input - The string to transform.
 * @param {Object} [options] - Configuration options.
 * @param {boolean} [options.wordLevel=false] - If true, resets the alternation at each word boundary.
 * @param {boolean} [options.firstLowerCase=false] - If true, starts with lowercase first (inverse alternating case).
 * @returns {string} A new string transformed into sponge case based on the options.
 * @altname toWaveCase toSarcasticCase toMockingCase
 */
export function toSpongeCase(input, options?) {
  const { wordLevel = false, firstLowerCase = false } = options || {};
  let toggle = 0;
  return input
    .split(wordLevel ? /(\s+)/ : /(?!^)/)
    .map(token => {
      if (wordLevel && /^\s+$/.test(token)) return token;
      return [...token]
        .map(char => {
          if (/\p{L}/u.test(char)) {
            const isLower = firstLowerCase ? (toggle % 2 === 0) : (toggle % 2 !== 0);
            const result = isLower ? char.toLowerCase() : char.toUpperCase();
            toggle++;
            return result;
          }
          toggle++;
          return char;
        })
        .join('');
    })
    .join('');
}

/**
 * Capitalizes the first letter of a string.
 * 
 * @param {string} string - The input string.
 * @return {string} - The transformed string.
 * @tags #string #utility
 * @altname upperFirstCase deCap
 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * Compares multiple strings in a case-insensitive and format-independent manner.
 * 
 * @param {...string} strings - The strings to compare.
 * @return {boolean} - `true` if all strings are equivalent, otherwise `false`.
 * @tags #string #comparison #utility
 */
export function caseIndependentCompare(...strings) {
  if (strings.length < 2) {
    return false;
  }

  for (let i = 1; i < strings.length; i++) {
    let parseString = (str) => str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum).filter(item => item && !/^[^\p{L}\d]$/ui.test(item));
    let formatStringArray = (arr) => arr.join('').toLowerCase();
    if (formatStringArray(parseString(strings[i])) !== formatStringArray(parseString(strings[0]))) {
      return false;
    }
  }

  return true;
}

/**
 * Parses a URL string into its components, such as protocol, hostname, pathname, query parameters, and more.
 * 
 * @param {string} str - The URL string to parse.
 * @return {Object} - An object containing the parsed components of the URL.
 * @tags #url #parsing #utility
 */
export function parseURL(str) {
  //old:
  //const regex = /^(?:(?<protocol>[^:]*):\/\/)?(?: (?<username>[^:@]*)(?::(?<password>[^@]*))?@)?(?<host>(?:(?<subdomain>[^.\/:]+)\.)?(?<domainName>[^.\/:]+)\.(?<topLevelDomain>[^\/:]+)(?::(?<port>[0-9]+))?)?(?<pathname>[^?#]*)?(?:\?(?<queryParams>[^#]*))?(?:#(?<hash>.*))?/;
  const regex = regExpPatterns.parseUrl;
  const match = regex.exec(str);
  if (!match) return null;

  const g = match.groups;

  const obj = {
    href: g.href,//http://a:b@www.example.com:123/foo/bar.html?fox=trot#foo
    origin: g.host
      ? `${g.scheme || ''}${g.protocol}//${g.username ? g.username + (g.password ? ':' + g.password : '') + '@' : ''}${g.host}${g.port ? ':' + g.port : ''}`
      : null, //http://a:b@www.example.com:123 (with username and password)
    protocol: g.protocol, //http 
    scheme: g.scheme, //view-source: (deprecated)
    auth: g.scheme, //a:b@ (deprecated)
    username: g.username, //a
    password: g.password, //b
    host: g.host, //www.example.com:123
    hostname: g.hostname, //www.example.com
    ip: g.ip, //123.123.123.123 (deprecated)
    subdomain: g.subdomains ? g.subdomains?.split('.')?.[0] : undefined, //www (deprecated)
    subdomains: g.subdomains, //www. (deprecated)
    domain: g.secondLevelDomain && g.topLevelDomain
      ? `${g.secondLevelDomain}.${g.topLevelDomain}`
      : null, //example.com (deprecated)
    domainName: g.secondLevelDomain, //example (deprecated)
    topLevelDomain: g.topLevelDomain, //com (deprecated)
    port: g.port, //123
    pathname: g.pathname, // /foo/bar.html
    queryParams: g.search ? g.search.slice(1) : undefined, //fox=trot 
    hash: g.hash ? g.hash.slice(1) : undefined // foo
  };

  return obj;
}

/**
 * Parses a multipart/form-data body into its individual parts based on the boundary in the content type.
 * 
 * @param {string|ArrayBuffer} body - The raw body of the multipart request.
 * @param {string} contentType - The content type header containing the boundary.
 * @return {Object} - An object where keys are field names and values are their corresponding data.
 * @throws {Error} - Throws an error if the content type does not contain a valid boundary.
 * @tags #multipart #parsing #utility
 */
export function multiPartParse(body, contentType) {
  // Examples for content types:
  //      multipart/form-data; boundary="----7dd322351017c"; ...
  //      multipart/form-data; boundary=----7dd322351017c; ...
  var m = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);

  if (!m) {
    throw new Error('Bad content-type header, no multipart boundary');
  }

  var boundary = m[1] || m[2];

  function Header_parse(header) {
    var headerFields = {} as any;
    var matchResult = header.match(/^.*name="([^"]*)"$/);
    if (matchResult) headerFields.name = matchResult[1];
    return headerFields;
  }

  function rawStringToBuffer(str) {
    var idx, len = str.length, arr = new Array(len);
    for (idx = 0; idx < len; ++idx) {
      arr[idx] = str.charCodeAt(idx) & 0xFF;
    }
    return new Uint8Array(arr).buffer;
  }

  // \r\n is part of the boundary.
  boundary = '\r\n--' + boundary;

  var isRaw = typeof (body) !== 'string';
  var s;
  if (isRaw) {
    var view = new Uint8Array(body);
    s = String.fromCharCode.apply(null, view);
  } else {
    s = body;
  }

  // Prepend what has been stripped by the body parsing mechanism.
  s = '\r\n' + s;

  var parts = s.split(new RegExp(boundary)),
    partsByName = {};

  // First part is a preamble, last part is closing '--'
  for (var i = 1; i < parts.length - 1; i++) {
    var subparts = parts[i].split('\r\n\r\n');
    var headers = subparts[0].split('\r\n');
    var fieldName;
    for (var j = 1; j < headers.length; j++) {
      var headerFields = Header_parse(headers[j]) as any;
      if (headerFields.name) {
        fieldName = headerFields.name;
      }
    }

    if (fieldName) {
      let value = isRaw ? rawStringToBuffer(subparts[1]) : subparts[1];
      partsByName[fieldName] = Number.isInteger(Number.parseInt(value)) ? Number.parseInt(value) : value;
    }
  }

  return partsByName;
}

/**
 * Creates a multipart/form-data body from an object and generates a boundary string.
 * 
 * @param {Object} data - The data to include in the multipart body, where keys are field names and values are field values.
 * @param {string} [boundaryHash] - An optional 16-character string to use as the boundary hash. If not provided, a random string is generated.
 * @return {Object} - An object containing the `boundary` string and the `body` as a multipart/form-data formatted string.
 * @tags #multipart #formdata #utility
 */
export function createMultipartData(data, boundaryHash?) {
  boundaryHash = typeof boundaryHash == 'string' && boundaryHash?.length == 16 || getRandomString(16);
  var boundary = '----WebKitFormBoundary' + boundaryHash;
  var boundaryMiddle = '--' + boundary + '\r\n';
  var boundaryLast = '--' + boundary + '--\r\n'
  var body: any = [''];//'\r\n'
  for (var key in data) {
    body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
  }
  body = body.join(boundaryMiddle) + boundaryLast;

  // let formData = new FormData();
  // for (const name in data) {
  //    formData.append(name, data[name]);
  // }

  return { boundary, body };
}

/**
 * Parses an instruction string into an array of instructions, handling escaped separators and nested structures.
 * 
 * @param {string} instructionString - The string containing instructions to parse.
 * @param {string} [separator=','] - The separator used to split the instructions.
 * @return {string[]} - An array of parsed instructions.
 * @tags #string #parsing #utility
 */
export function parseInstructions(instructionString, separator = ',') {
  return typeof instructionString == 'string' ? instructionString?.match(new RegExp(`(?!^[\\[${separator}])(?:(?:\\\\{2})*\\\\${separator}|[^${separator}\\[]|(?=\\[)((?:(?:\\\\{2})*\\\\${separator}|(?!^[^\\[]*\\[)[^${separator}])+(?=${separator}|\\s*\\]))(?=\\]))+(?=${separator}|\\s*\\])`, 'gim')) || [] : [];
}

/**
 * Converts an array into an instruction string with a specified separator.
 * 
 * @param {string[]} array - The array to convert into an instruction string.
 * @param {string} [separator=','] - The separator to use between instructions.
 * @return {string} - The formatted instruction string.
 * @tags #array #conversion #utility
 */
export function convertArrayToInstructions(array, separator = ',') {
  return '[' + array.join(separator + ' ') + ']';
}

/**
 * Matches a URL against one or more URL patterns, supporting wildcard (`*`) matching.
 * 
 * @param {string} url - The URL to test.
 * @param {string | string[]} urlPatterns - A single pattern or an array of patterns to match against.
 * @return {boolean} - `true` if the URL matches any of the patterns, otherwise `false`.
 * @tags #url #matching #utility
 */
export function matchURLPatterns(url: string, urlPatterns: string | string[]) {

  function escapeString(str, slashLength = 2) {
    return str.replace(new RegExp('[-[\\]{}()*+?&.,\\\\^$|#\'\"]', 'gim'), (`${[...new Array(slashLength)].map(i => '\\').join('')}$&`));
  };

  urlPatterns = typeof urlPatterns == 'string' ? [urlPatterns] : urlPatterns as Array<string> || [];

  return urlPatterns?.some(pattern => {
    return url.match(new RegExp('^' + escapeString(pattern, 1).replace(/\\\*/gim, '.*') + '$', ''));
  });
}

/**
 * Validates whether a given string is a valid URL.
 * 
 * @param {string} str - The string to validate.
 * @return {boolean} - `true` if the string is a valid URL, otherwise `false`.
 * @tags #url #validation #utility
 * @altname isURLMatchPattern
 */
export function validURL(str, handlerFn?) {
  let obj = parseURL(str);

  return handlerFn ? handlerFn(obj) || false : !!obj.protocol;
}

/**
 * Converts a URL-like string into a fully qualified URL.
 * - Preserves absolute and `mailto:` URLs.
 * - Adds default protocol to host-only inputs (`example.com`).
 * - Converts scheme-relative URLs (`//example.com`) to absolute.
 * - Validates result using the `URL` constructor.
 *
 * @param {string} input - URL-like string.
 * @param {string} [defaultProtocol='https:'] - Protocol to prepend (with colon).
 * @returns {string|null} Normalized URL or null if invalid.
 */
export function normalizeUrl(input, defaultProtocol?) {

  if (typeof input !== 'string') return null;
  defaultProtocol = defaultProtocol || 'https:';
  const urlLike = regExpPatterns.urlLike;
  const match = urlLike.exec(input);
  urlLike.lastIndex = 0;

  if (!match?.groups?.url) return null;

  let { url, protocol } = match.groups;

  // mailto
  if (protocol === 'mailto:') {
    return url;
  }

  // scheme-relative: //example.com
  if (url.startsWith('//')) {
    url = defaultProtocol + url;
  }

  else if (!protocol) {
    url = defaultProtocol + '//' + url;
  }

  try {
    return new URL(url).toString();
  } catch {
    return null;
  }
}

/**
 * Retrieves a specific parameter or all parameters from a URL query string.
 * 
 * @param {string} strParam - The URL or query string to parse.
 * @param {string} [sParam] - The specific parameter name to retrieve. If omitted, all parameters are returned.
 * @param {boolean} [caseInsensitive=false] - Whether to perform a case-insensitive match for the parameter name.
 * @return {string|Array|undefined} - The value of the specified parameter, an array of all parameters, or `undefined` if not found.
 * @tags #url #parameters #utility
 */
export function getUrlParameter(strParam, sParam?, caseInsensitive?) {
  if (strParam) {
    var sPageURL = strParam,//decodeURIComponent(strParam),
      sURLVariables = sPageURL.split(new RegExp('\\&|\\?', 'gim')),
      sParameterName,
      i,
      array = [];
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParam) {
        if (caseInsensitive ? sParameterName[0].toLowerCase() == sParam.toLowerCase() : sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
        }
      } else {
        array.push(sParameterName);
        if (i + 1 == sURLVariables.length) {
          return array;
        }
      }
    }
  }
}

/**
 * Extracts query parameters from a URL and returns them as an object.
 * 
 * @param {string} url - The URL containing query parameters.
 * @returns {Object} An object with key-value pairs representing the query parameters.
 * @tags #url #utility #parsing
 * @deprecated use getUrlParameter
 */
export function getUrlParams(url) {
  var urlParams = {};
  url.replace(
    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
    function ($0, $1, $2, $3) {
      urlParams[$1] = $3;
    }
  );

  return urlParams;
}

/**
 * Pauses execution for a specified number of milliseconds.
 * 
 * @param {number} ms - The number of milliseconds to sleep.
 * @return {Promise<void>} - A promise that resolves after the specified delay.
 * @tags #timing #utility #async
 * @altname delay
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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
export function waitForElement(selector, options?) {
  const { timeout, waitForMissing, context = (window as any).document } = options || {};
  let timer;
  let observer;
  return new Promise((resolve, reject) => {

    let handleElement = () => {
      let condition = context?.querySelector(selector);
      if (waitForMissing ? !condition : condition) {
        resolve(waitForMissing ? true : condition || null);
        if (observer) observer.disconnect();
      }
    }

    handleElement();

    observer = new MutationObserver(mutations => {
      handleElement();
    });

    observer.observe(context, {
      childList: true,
      subtree: true
    });

    if (timeout) {
      const handleTimeout = () => {
        clearTimeout(timer);
        observer.disconnect();
        resolve(null);//new Error('Timeout waiting for element')
      };
      timer = setTimeout(handleTimeout, timeout);
    }
  });
}

/**
 * Retrieves all string values from an enum object.
 * 
 * @param {Object} enumObj - The enum object to extract values from.
 * @return {string[]} - An array of string values from the enum.
 * @tags #enum #utility #typescript
 */
export function getEnumValues(enumObj): Array<string> {
  let enumAsArray = Object.values(enumObj).filter(value => typeof value === 'string');
  return enumAsArray as Array<string>
}

/**
 * Waits until func returns truthy value
 * @param {function} func - function to check, can be async
 * @param {number} [interval=100] - polling interval ms
 * @param {number} [timeout=30000] - timeout ms
 * @see https://github.com/yandex/rtv/blob/e58f3cf80bc3721e1d740f48329e0a2ed34182b2/packages/server/src/helpers/wait-for-function.ts#L7
 */
export async function waitForFunction<T>(func: () => T, { interval = 100, timeout = 30000 } = {}) {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const timeLeft = Date.now() - startTime;
        if (timeout && (timeLeft > timeout)) {
          return reject(new Error(`Timeout ${timeout} ms exceeded.`));
        }
        const result = await func();
        if (result) {
          resolve(result);
        } else {
          setTimeout(check, interval);
        }
      } catch (e) {
        reject(e);
      }
    };

    check();
  });
}

/**
 * Finds the closest sibling of an element that matches a given selector, optionally specifying a direction.
 * 
 * @param {Element} to - The reference element to start the search from.
 * @param {string} selector - The CSS selector to match the sibling against.
 * @param {string} [direction] - The direction to search: `'next'`, `'previous'`, or `'all'` (default is `'all'`).
 * @return {Element|null} - The closest matching sibling element, or `null` if none is found.
 * @tags #dom #sibling #utility
 */
export function closestSibling(to, selector, direction?) {
  let directionObj = {
    "next": ['nextElementSibling'],
    "previous": ['previousElementSibling'],
    "all": ['nextElementSibling', 'previousElementSibling'],
  };

  let results = (directionObj[direction] || directionObj["all"]).map(key => {
    let sibling = to[key];
    let i = 1;
    while (sibling) {
      if (sibling.matches(selector)) {
        return [i, sibling];
      }
      sibling = sibling[key];
      i += 1
    }

    return null;
  });

  return results.sort((a, b) => {
    a = (a as any)?.[0] || Infinity;
    b = (b as any)?.[0] || Infinity;
    let dir = 1;//-1 - negative (reverse sort)
    if (a > b) return dir;
    if (a < b) return -dir;
    return 0;
  })?.[0]?.[1] || null
}

/**
 * Finds the closest element that matches a given selector, searching through siblings and up the DOM tree.
 * 
 * @param {Element} element - The starting element for the search.
 * @param {string} targetSelector - The CSS selector to match the target element.
 * @return {Element|null} - The closest matching element, or `null` if none is found.
 * @tags #dom #search #utility
 */
export function сlosestElement(element, targetSelector) {
  if (!element || !(element instanceof Element)) return null;

  // Check if there is a neighbor element corresponding to the targetSelector
  function checkSiblings(el) {
    let previous = el.previousElementSibling;
    let next = el.nextElementSibling;

    while (previous) {
      if (previous.matches(targetSelector)) return previous;
      previous = previous.previousElementSibling;
    }

    while (next) {
      if (next.matches(targetSelector)) return next;
      next = next.nextElementSibling;
    }

    return null;
  }

  let found = checkSiblings(element);
  while (!found && element.parentElement) {
    element = element.parentElement;
    found = element.matches(targetSelector) ? element : checkSiblings(element);
  }

  return found;
}

/**
 * Checks whether a sticky element (with bottom: 0) has reached
 * the bottom edge of its parent element.
 *
 * @param el - The sticky element.
 * @param parent - The parent container element.
 * @returns True if the element's bottom aligns with the parent's bottom.
 */
export function isAtParentBottom(el: HTMLElement, parent: HTMLElement, esp?): boolean {
  const EPS = esp || 1;
  const elRect = el.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  // небольшая погрешность из-за дробных пикселей
  

  return Math.abs(elRect.bottom - parentRect.bottom) < EPS;
}

/**
 * Removes duplicate entries from an array, optionally based on a specific property or properties.
 * Can preserve either first occurrences (default) or last occurrences (`fromEnd = true`).
 * 
 * @param {Array} array - The array to process.
 * @param {string|string[]} [propertyName] - The property or properties to use for uniqueness. If omitted, the array values themselves are used.
 * @param {boolean} [fromEnd=false] - If true, preserve the last occurrence of each unique item; otherwise preserve the first.
 * @return {Array} - A new array with unique entries.
 * @tags #array #utility #unique
 * @altname unique getUniqueArray
 */
export function uniqueArr(array, propertyName?, fromEnd?) {
  // Helper to deep‐access dotted keys
  function deepFind(obj, path) {
    return splitPath(path).reduce((o, key) => (o == null ? undefined : o[key]), obj);
  }

  // Simple value extractor
  function getValue(obj, key) {
    return key.includes('.') ? deepFind(obj, key) : obj[key];
  }

  // If we want to preserve last occurrences, reverse first
  const working = fromEnd ? [...array].reverse() : array;

  let result;
  if (propertyName) {
    if (Array.isArray(propertyName)) {
      // multiple keys ⇒ build kv‐pairs and use Map to override earlier duplicates
      const kv = working.map(entry => {
        const composite = propertyName.map(k => getValue(entry, k)).join('|');
        return [composite, entry];
      });
      result = Array.from(new Map(kv).values());
    } else {
      // single property name ⇒ use findIndex on working array
      result = working.filter((e, i) =>
        working.findIndex(a => getValue(a, propertyName) === getValue(e, propertyName)) === i
      );
    }
  } else {
    // primitive values ⇒ Set does the job
    result = [...new Set(working)];
  }

  // If we reversed at the start, reverse back to restore original order
  return fromEnd ? result.reverse() : result;
}

/**
 * Finds the mode (most frequent value) in an array.
 * 
 * @param {Array} arr - The array to analyze.
 * @return {any} - The mode of the array, or `null` if the array is empty.
 * @tags #array #statistics #utility
 */
export function findMod(arr) {
  const frequency = {};

  (arr || []).forEach(num => {
    if (frequency[num]) {
      frequency[num]++;
    } else {
      frequency[num] = 1;
    }
  });

  let mode = null;
  let maxCount = 0;

  for (const num in frequency) {
    if (frequency[num] > maxCount) {
      maxCount = frequency[num];
      mode = num;
    }
  }

  return mode;
}

/**
 * Calculates the average (mean) of an array of numbers.
 * 
 * @param {number[]} arr - The array of numbers to calculate the average for.
 * @return {number} - The average of the numbers, or `0` if the array is empty.
 * @tags #array #math #utility
 */
export function findAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, num) => acc + num, 0);
  const average = sum / arr.length;
  return average;
}

/**
 * Generates all possible combinations/variations (Cartesian product) of array values.
 * 
 * @param {Array<Array<any>>} arr - An array of arrays, where each inner array contains possible values.
 * @return {Array<any>} - An array containing all possible combinations.
 * @see https://stackoverflow.com/questions/4331092/finding-all-combinations-cartesian-product-of-javascript-array-values
 * @tags #array #combinations #utility
 */
export function allPossibleCases(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push([arr[0][j], allCasesOfRest[i]]);
      }
    }
    return result;
  }

}

/**
 * Finds all indexes in an array that satisfy a given callback function.
 * 
 * @param {Array} array - The array to search.
 * @param {Function} callback - A function that is called for each element. Should return `true` for matching elements.
 * @return {number[]} - An array of indexes where the callback returns `true`.
 * @tags #array #search #utility
 */
export function findAllIndexes(array, callback) {
  var result = [];
  array.forEach((item, index, array) => {
    if (callback(item, index, array)) {
      result.push(index);
    }
  });
  return result;
}

/**
 * Recursively flattens an object structure into a single array by extracting all array values.
 * This function traverses through all properties of the object and collects all array elements into a single flat array.
 *
 * @param {Object} obj - The object to flatten. Can contain nested objects and arrays.
 * @returns {Array} - A new array containing all elements from arrays found in the object structure.
 *
 * @tags #object #array #flatten #recursion #utility
 */
export function flattenObjectToArray(obj) {
  let result = [];
  function flatten(currentObj) {
    for (let key in currentObj) {
      if (Array.isArray(currentObj[key])) {
        result.push(...currentObj[key]);
      } else if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
        flatten(currentObj[key]);
      }
    }
  }
  flatten(obj);
  return result;
}

/**
 * Flattens a nested array into a single-level array.
 * 
 * @param {Array} array - The nested array to flatten.
 * @param {boolean} [mutable=false] - Whether to modify the original array (if `true`) or work on a copy (if `false`).
 * @return {Array} - A flattened array.
 * @tags #array #flatten #utility
 */
export function flatArray(array, mutable = false) {
  var toString = Object.prototype.toString;
  var arrayTypeStr = '[object Array]';

  var result = [];
  var nodes = (mutable && array) || array.slice();
  var node;

  if (!array.length) {
    return result;
  }

  node = nodes.pop();

  do {
    if (toString.call(node) === arrayTypeStr) {
      nodes.push.apply(nodes, node);
    } else {
      result.push(node);
    }
  } while (nodes.length && (node = nodes.pop()) !== undefined);

  result.reverse(); // we reverse result to restore the original order
  return result;
}

/**
 * Filters the properties of an object or elements of an array based on a callback function.
 * 
 * @param {Object|Array} obj - The object or array to filter.
 * @param {Function} filtercheck - A callback function that determines whether a property or element should be included. 
 * It receives `(key, value, index, array)` as arguments.
 * @return {Object|Array} - A new object or array containing only the filtered properties or elements.
 * @tags #object #array #filter #utility
 */
export function objectFilter(obj, filtercheck) {
  let isArray = Array.isArray(obj);
  let result: any = isArray ? [] : {};
  Object.keys(obj).forEach((key, i, array) => {
    if (filtercheck(key, obj[key], i, array)) {
      if (isArray) {
        result.push(obj[key]);
      } else {
        result[key] = obj[key];
      }
    };
  })
  return result;
};

/**
 * Converts a flattened object with dot-separated keys into a nested object.
 * 
 * @param {Object} obj - The flattened object to unflatten.
 * @return {Object} - The resulting nested object.
 * @tags #object #unflatten #utility
 */
export function unflattenObject(obj = {}) {
  const result = {};
  let temp, substrings, property, i;
  for (property in obj) {
    substrings = splitPath(property);
    temp = result;
    for (i = 0; i < substrings.length - 1; i++) {
      if (!(substrings[i] in temp)) {
        if (isFinite(substrings[i + 1])) {
          temp[substrings[i]] = [];
        }
        else {
          temp[substrings[i]] = {};
        }
      }
      temp = temp[substrings[i]];
    }
    temp[substrings[substrings.length - 1]] = obj[property];
  }
  return result;
};

/**
 * Converts a nested object into a flattened object with dot-separated keys.
 * 
 * @param {Object} obj - The nested object to flatten.
 * @return {Object} - The resulting flattened object.
 * @tags #object #flatten #utility
 */
export function flattenObject(obj) {
  var flattenedObject = {};

  return (function traverseAndFlatten(currentNode, target, flattenedKey) {
    for (var key in currentNode) {
      if (currentNode.hasOwnProperty(key)) {
        var newKey;
        if (flattenedKey === undefined) {
          newKey = key;
        } else {
          newKey = flattenedKey + '.' + key;
        }

        var value = currentNode[key];
        if (typeof value === "object") {
          traverseAndFlatten(value, target, newKey);
        } else {
          target[newKey] = value;
        }
      }
    }

    return flattenedObject;

  })(obj, flattenedObject);
}

/**
 * Flattens a deeply nested object into a single-level object without preserving key paths.
 * 
 * @param {Object} obj - The nested object to flatten.
 * @return {Object} - The resulting flattened object with only top-level keys.
 * @tags #object #flatten #utility
 */
export function flattenNested(obj) {
  return Object.assign(
    {},
    ...function _flatten(o) {
      return [].concat(...Object.keys(o)
        .map(k =>
          typeof o[k] === 'object' ?
            _flatten(o[k]) :
            ({ [k]: o[k] })
        )
      );
    }(obj)
  )
}

/**
 * Retrieves a nested value from an object using a dot-separated key path, with optional support for regular expressions. lodash.get alternative
 * 
 * @param {Object} obj - The object to retrieve the value from.
 * @param {string} key - The dot-separated key path to the desired value.
 * @param {boolean} [regExpEnabled=false] - Whether to enable regular expression matching for keys.
 * @return {any} - The value at the specified key path, or `undefined` if not found.
 * @tags #object #nested #utility #lodash
 */
export function getNestedValue(obj, key, regExpEnabled?) {
  return key.split(".").reduce(function (result, key) {
    if (regExpEnabled) {
      let resultKey = Object.keys(result).find(resKey => {
        key = key.replace('*', '.*');
        var bool = getMatchesRegExp(key).test(resKey);
        return bool
      });
      return result?.[resultKey];
    } else {
      return result?.[key];
    }
  }, obj);
}

/**
 * Converts `value` to a string. Handles `null`, `undefined`, `Symbol`, and `-0` edge cases.
 *
 * Based on lodash `toString`.
 *
 * @param {*} value - The value to convert.
 * @returns {string} - The string representation of the value.
 *
 * @tags #convert #string #symbol #lodash
 */
export function toString(value) {
  var INFINITY = 1 / 0;
  var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if the provided value is numeric or a valid number.
 * This function can determine if a value is numeric (including numeric strings)
 * or strictly a valid number based on the provided options.
 *
 * @param {*} value - The value to check.
 * @param {boolean} [strict=false] - If true, checks if the value is strictly a valid number. If false, checks if the value is numeric.
 * @returns {boolean} - Returns true if the value meets the criteria based on the options.
 * @altname isNumber
 * @tags #number #type-checking
 */
export function isNumeric(value, strict?) {
  if (strict) {
    // Check if the value is strictly a valid number (type 'number' and finite)
    return typeof value === 'number' && isFinite(value);
  } else {
    // Check if the value is numeric (including numeric strings)
    return !isNaN(parseFloat(value)) && isFinite(value);
  }
}

/**
 * Checks if the provided value is a valid number.
 * This function ensures the value is of type "number" and is finite (not NaN or Infinity).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if the value is a valid number; otherwise, returns `false`.
 *
 * @tags #number #type-checking
 * @deprecated use isNumeric
 */
export function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}


/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * Based on lodash `isSymbol`.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if value is a symbol, else `false`.
 *
 * @tags #typecheck #symbol #utility #lodash
 */
export function isSymbol(value) {
  var symbolTag = '[object Symbol]';
  return typeof value == 'symbol' ||
    (isObjectLike(value) && Object.prototype.toString.call(value) == symbolTag);
}

/**
 * Checks if `value` is object-like. A value is object-like if it’s not `null` and has a typeof result of "object".
 *
 * Based on lodash `isObjectLike`.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} - Returns `true` if value is object-like, else `false`.
 *
 * @tags #typecheck #object #utility #lodash
 */
export function isObjectLike(value) {
  return !!value && typeof value === 'object';
}


/**
 * Creates a regular expression from a string, escaping special characters.
 * 
 * @param {string} value - The string to convert into a regular expression.
 * @return {RegExp} - The resulting regular expression.
 * @tags #regex #utility
 */
export function getMatchesRegExp(value) {
  var regStr = value.replace(new RegExp('[\\\\]', 'gim'), '\$&');
  var regExp = new RegExp(regStr, 'gim');
  return regExp;
}


/**
 * Removes HTML tags from a given string.
 *
 * @param {string} html - The input string that may contain HTML tags.
 * @param {boolean} [onlyWrapTags=false] - If true, only removes wrapping tags at the start or end of the string.
 *                                         If false or omitted, removes all HTML tags.
 * @returns {string} The string with the specified HTML tags removed.
 *
 * @example
 * removeHTMLTags('<p>Hello</p>'); 
 * // Returns: 'Hello'
 *
 * @example
 * removeHTMLTags('<p>Hello</p>', true); 
 * // Returns: 'Hello' (only removes wrapping <p> tags)
 * 
 * @tags #string #html #utility
 */
export function removeHTMLTags(html, onlyWrapTags?) {
  let wrapTagsRegExp = /^(?:<[^>]+>){1,}|(?:<\/[^>]+>){1,}$/gm;
  let allTagsRegExp = /<[^>]*>?/gm;
  let result = html.replace(onlyWrapTags ? wrapTagsRegExp : allTagsRegExp, '');

  return result;
}

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
export function stripHTML(html) {
  return html.replace(/&#([0-9]{1,4});/gi, function (match, numStr) {
    var num = parseInt(numStr, 10); // read num as normal number
    return String.fromCharCode(num);
  });

  //alternative
  // var txt = document.createElement("textarea");
  // txt.innerHTML = html;
  // return txt.value;

  //alternative 
  // var tmp = document.createElement("DIV");
  // tmp.innerHTML = html;
  // return tmp.textContent || tmp.innerText;

  //alternative 
  //var doc = new DOMParser().parseFromString(html, "text/html");
  //return doc.documentElement.textContent;
}

/**
 * @param {String} HTML representing a single element
 * @return {Element}
 * @altname createElementFromHTML htmlToElement
 * @tags #dom #utility #html
 */
export function htmlToFragment(html) {
  var template = document.createElement('template');
  html = html?.toString()?.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content;
}

/**
 * Serializes a DocumentFragment into an HTML string.
 *
 * Iterates over all child nodes of the provided fragment and converts each node
 * to its string representation. Element nodes use `outerHTML`, while text nodes
 * use their `textContent`. Other node types (e.g., comments, CDATA) will be
 * serialized to their `textContent` as well.
 *
 * @param {DocumentFragment} frag - The DocumentFragment to serialize.
 * @returns {string} A string containing the HTML/text of all child nodes in order.
 */
export function fragmentToString(frag) {
  const parts = [];
  frag.childNodes.forEach(node => {
    if (node instanceof Element) {
      parts.push(node.outerHTML);
    } else {
      parts.push(node.textContent || '');
    }
  });
  return parts.join('');
}

/**
* @param {String} HTML representing any number of sibling elements
* @return {NodeList} 
* @tags #dom #utility #html
*/
export function htmlToElements(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.childNodes;
}

/**
 * Inserts an element or fragment into the DOM relative to a subject element.
 *
 * @param {Object} options - Configuration object.
 * @param {HTMLElement} options.subject - Target element for insertion.
 * @param {string|HTMLElement|DocumentFragment} options.content - Content to insert.
 * @param {string} [options.elementUniqueSelector] - CSS selector for reference element.
 * @param {'before'|'after'} [options.operation='before'] - Insertion operation.
 */
export function insertElement(options) {
  let {
    subject,
    content,
    elementUniqueSelector,
    operation = 'before'
  } = options || {}
  if (content) {
    const elementFragment = (typeof content == 'string' || typeof content == 'number') ? htmlToFragment(content) : content;
    let previousElement = elementUniqueSelector ? document.querySelector(elementUniqueSelector) : null;
    if (previousElement) {
      previousElement.replaceWith(elementFragment);
    } else {
      subject[operation](elementFragment);
    }
  }
}

/**
 * Unescapes JavaScript escape sequences in a string, including Unicode, hexadecimal, octal, and special characters.
 * 
 * @param {string} string - The string containing JavaScript escape sequences.
 * @return {string} - The unescaped string.
 * @tags #string #escape #utility
 */
export function unescapeJs(string) {
  /**
 * \\ - matches the backslash which indicates the beginning of an escape sequence
 * (
 *   u\{([0-9A-Fa-f]+)\} - first alternative; matches the variable-length hexadecimal escape sequence (\u{ABCD0})
 * |
 *   u([0-9A-Fa-f]{4}) - second alternative; matches the 4-digit hexadecimal escape sequence (\uABCD)
 * |
 *   x([0-9A-Fa-f]{2}) - third alternative; matches the 2-digit hexadecimal escape sequence (\xA5)
 * |
 *   ([1-7][0-7]{0,2}|[0-7]{2,3}) - fourth alternative; matches the up-to-3-digit octal escape sequence (\5 or \512)
 * |
 *   (['"tbrnfv0\\]) - fifth alternative; matches the special escape characters (\t, \n and so on)
 * |
 *   \U([0-9A-Fa-f]+) - sixth alternative; matches the 8-digit hexadecimal escape sequence used by python (\U0001F3B5)
 * )
 */
  const jsEscapeRegex = /\\(u\{([0-9A-Fa-f]+)\}|u([0-9A-Fa-f]{4})|x([0-9A-Fa-f]{2})|([1-7][0-7]{0,2}|[0-7]{2,3})|(['"tbrnfv0\\]))|\\U([0-9A-Fa-f]{8})/g;
  const usualEscapeSequences = {
    '0': '\0',
    'b': '\b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t',
    'v': '\v',
    '\'': '\'',
    '"': '"',
    '\\': '\\'
  };

  const fromHex = (str) => String.fromCodePoint(parseInt(str, 16));
  const fromOct = (str) => String.fromCodePoint(parseInt(str, 8));

  return string.replace(jsEscapeRegex, (_, __, varHex, longHex, shortHex, octal, specialCharacter, python) => {
    if (varHex !== undefined) {
      return fromHex(varHex);
    } else if (longHex !== undefined) {
      return fromHex(longHex);
    } else if (shortHex !== undefined) {
      return fromHex(shortHex);
    } else if (octal !== undefined) {
      return fromOct(octal);
    } else if (python !== undefined) {
      return fromHex(python);
    } else {
      return usualEscapeSequences[specialCharacter];
    }
  });
}

/*tables*/
/**
 * Converts an array of JSON objects into an HTML table element.
 * 
 * @param {Array<Object>} data - The array of JSON objects to convert.
 * @return {HTMLTableElement} - The generated HTML table element.
 * @tags #json #html #table #utility
 */
export function jsonToHtmlTable(data: Array<Object>) {
  var _table_ = document.createElement('table'),
    _tr_ = document.createElement('tr'),
    _th_ = document.createElement('th'),
    _td_ = document.createElement('td');

  // Builds the HTML Table out of myList json data from Ivy restful service.
  function buildHtmlTable(arr) {
    var table = _table_.cloneNode(false),
      columns = addAllColumnHeaders(arr, table);
    for (var i = 0, maxi = arr.length; i < maxi; ++i) {
      var tr = _tr_.cloneNode(false);
      for (var j = 0, maxj = columns.length; j < maxj; ++j) {
        var td = _td_.cloneNode(false);
        var cellValue = arr[i][columns[j]] || '';
        td.appendChild(document.createTextNode(cellValue));
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    return table;
  }

  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records
  function addAllColumnHeaders(arr, table) {
    var columnSet = [],
      tr = _tr_.cloneNode(false);
    for (var i = 0, l = arr.length; i < l; i++) {
      for (var key in arr[i]) {
        if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
          columnSet.push(key);
          var th = _th_.cloneNode(false);
          th.appendChild(document.createTextNode(key));
          tr.appendChild(th);
        }
      }
    }
    table.appendChild(tr);
    return columnSet;
  }

  return buildHtmlTable(data)
}

/**
 * Adds a new column to an HTML table, optionally customizing each cell during creation.
 * 
 * @param {HTMLTableElement} table - The table to which the column will be added.
 * @param {Function} [onCellCreate] - A callback function to customize each cell. Receives `(row, cell)` as arguments.
 * @tags #html #table #dom #utility
 */
export function addColumn(table, onCellCreate?) {
  [...table.querySelectorAll('tr')].forEach((row, i) => {
    if (row.closest('table') == table) {
      const cell = document.createElement(i ? "td" : "th");
      if (onCellCreate) onCellCreate(row, cell)
      row.appendChild(cell)
    }
  });
}

/**
 * Creates an HTML table element from a 2D array of data.
 * 
 * @param {Array<Array<any>>} tableData - A 2D array where each inner array represents a row of data.
 * @return {HTMLTableElement} - The generated HTML table element.
 * @tags #html #table #dom #utility
 */
export function createTable(tableData) {
  var table = document.createElement('table');
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);
  var row = {};
  var cell = {};

  tableData.forEach(function (rowData, i) {

    if (i == 0) {
      row = table.tHead.insertRow(-1);
    } else {
      row = table.tBodies[0].insertRow(-1);
    }

    rowData.forEach(function (cellData) {
      cell = (row as any).insertCell();
      (cell as any).textContent = cellData;
    });
  });

  return table;
}

/**
 * Converts a 2D array of table data into an array of JSON objects.
 * 
 * @param {Array<Array<any>>} tableData - A 2D array where the first row contains keys and subsequent rows contain values.
 * @return {Array<Object>} - An array of JSON objects representing the table data.
 * @tags #json #conversion #utility
 */
export function convertJSON(tableData) {
  var keys = tableData[0],
    objects = [];

  for (var i = 1; i < tableData.length; i++) {
    var rowObject = {};
    tableData[i].forEach(function (item, index) {
      rowObject[keys[index]] = item;
    });
    objects.push(rowObject);
  }

  return objects;
}

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
export function tableToJSON(table, opts) {
  // Set options

  var defaultExtractors = [(rowIndex, cellIndex, cell, isHeader) => {
    if (isHeader) {
      return cell.textContent;
    } else {
      return cell.textContent;
    }
  }];

  var defaults = {
    ignoreColumns: [],
    onlyColumns: null,
    ignoreHiddenRows: true,
    ignoreHiddenColumns: false,
    ignoreEmptyRows: false,
    headings: null,
    allowHTML: false,
    includeRowId: false,
    textDataOverride: 'data-override',
    extractor: opts?.extractor || defaultExtractors,
    textExtractor: null,
  };
  opts = Object.assign(defaults, opts);

  var isVisible = function (el) {
    return el.offsetParent !== null;
  }

  var isFunction = function (v) {
    return typeof v === 'function'
  }

  var notNull = function (value) {
    return value !== undefined && value !== null;
  };

  var notEmpty = function (value) {
    return value !== undefined && value.length > 0;
  };

  var ignoredColumn = function (index) {
    if (notNull(opts.onlyColumns)) {
      return opts.onlyColumns.indexOf(index) === -1;
    }
    return opts.ignoreColumns.indexOf(index) !== -1;
  };

  var arraysToHash = function (keys, values) {
    var result = {},
      index = 0;
    values.forEach(function (value, i) {
      // when ignoring columns, the header option still starts
      // with the first defined column
      let key = keys[index];
      let isEmptyKey = !notEmpty(key);
      if (!isEmptyKey || !opts.ignoreHiddenColumns) {
        key = isEmptyKey ? index : key;
        result[key] = value;
      }
      index++;
    });
    return result;
  };

  var cellValues = function (rowIndex, cellIndex, cell, isHeader) {
    var extractor = opts.extractor || opts.textExtractor,
      override = cell.getAttribute(opts.textDataOverride),
      value;
    // don't use extractor for header cells
    // if (extractor === null || isHeader) {
    //   return (override || (opts.allowHTML ? cell.innerHTML : cell.textContent) || '').trim();
    // } else {
    // overall extractor function
    if (isFunction(extractor)) {
      value = override || extractor(rowIndex, cellIndex, cell, isHeader);
      return typeof value === 'string' ? value.trim() : value;
    } else if (typeof extractor === 'object' && isFunction(extractor[cellIndex])) {
      value = override || extractor[cellIndex](rowIndex, cellIndex, cell, isHeader);
      return typeof value === 'string' ? value.trim() : value;
    }
    // }
    // fallback
    return (override || (opts.allowHTML ? cell.innerHTML : cell.textContent) || '').trim();
  };

  /* var cellValues = function(rowIndex, cellIndex, cell) {
    var value, result;
    if (!ignoredColumn(cellIndex)) {
      var override = cell.dataset['override'];
      if (opts.allowHTML) {
        value = cell.innerHTML.trim();
      } else {
        value = cell.textContent.trim();
      }
      result = notNull(override) ? override : value;
    }
    return result;
  };  */

  var rowValues = function (row, rowIndex) {
    var result = [];
    [...row.querySelectorAll('tr>*')].forEach(function (cell, cellIndex) {
      if (!ignoredColumn(cellIndex)) {
        result.push(cellValues(rowIndex, cellIndex, cell, true));
      }
    });
    return result;
  };

  var getHeadings = function (table) {
    var firstRow = table.querySelector('tr:first-child');
    return notNull(opts.headings) ? opts.headings : rowValues(firstRow, 0);
  };

  var construct = function (table, headings) {
    var i, j, len, len2, txt, row, cell,
      tmpArray = [],
      cellIndex = 0,
      result = [];

    [...table.querySelectorAll('tr')].forEach(function (row, rowIndex) {

      if (row.closest('table') == table) {

        if (rowIndex > 0 || notNull(opts.headings)) {
          if (isVisible(row) || !opts.ignoreHiddenRows) {

            if (!tmpArray[rowIndex]) {
              tmpArray[rowIndex] = [];
            }
            cellIndex = 0;

            [...row.children].forEach(function (cell, cellIndex) {


              if (!ignoredColumn(cellIndex)) {


                // process rowspans
                if ([cell].filter(item => item.hasAttribute('rowspan')).length) {
                  len = parseInt(cell.getAttribute('rowspan'), 10) - 1;
                  txt = cellValues(rowIndex, cellIndex, cell, false);
                  for (i = 1; i <= len; i++) {
                    if (!tmpArray[rowIndex + i]) {
                      tmpArray[rowIndex + i] = [];
                    }
                    tmpArray[rowIndex + i][cellIndex] = txt;
                  }
                }
                // process colspans
                if ([cell].filter(item => item.hasAttribute('colspan')).length) {
                  len = parseInt(cell.getAttribute('colspan'), 10) - 1;
                  txt = cellValues(rowIndex, cellIndex, cell, false);
                  for (i = 1; i <= len; i++) {
                    // cell has both col and row spans
                    if ([cell].filter(item => item.hasAttribute('rowspan')).length) {
                      len2 = parseInt(cell.getAttribute('rowspan'), 10);
                      for (j = 0; j < len2; j++) {
                        tmpArray[rowIndex + j][cellIndex + i] = txt;
                      }
                    } else {
                      tmpArray[rowIndex][cellIndex + i] = txt;
                    }
                  }
                }
                // skip column if already defined
                while (tmpArray[rowIndex][cellIndex]) {
                  cellIndex++;
                }
                if (!ignoredColumn(cellIndex)) {
                  txt = tmpArray[rowIndex][cellIndex] || cellValues(rowIndex, cellIndex, cell, false);
                  if (notNull(txt)) {
                    tmpArray[rowIndex][cellIndex] = txt;
                  }
                }
              }
              cellIndex++;
            });
          }
        }
      }
    });
    tmpArray.forEach(function (row, i) {
      if (notNull(row)) {
        txt = arraysToHash(headings, row);
        result[result.length] = txt;
      }
    });
    return result;
  };

  // Run
  var headings = getHeadings(table);

  return construct(table, headings);
};

/*end tables*/

/**
 * Retrieves a list of unique keys from an array of objects.
 * 
 * @param {Array<Object>} objectArray - The array of objects to extract keys from.
 * @return {string[]} - An array of unique keys.
 * @tags #object #array #utility
 */
export function getUniqueKeys(objectArray) {
  return Array.from(new Set(objectArray.map((item) => Object.keys(item)).flat()));
}

/**
 * Generates an array of numbers within a specified range.
 * 
 * @param {number} size - The number of elements in the range.
 * @param {number} [startAt=0] - The starting number of the range.
 * @return {number[]} - An array of numbers from `startAt` to `startAt + size - 1`.
 * @tags #array #range #utility
 */
export function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

/**
 * Finds the closest integer to `a` that is a multiple of `b`.
 * 
 * @param {number} a - The target number.
 * @param {number} b - The base multiple.
 * @param {number} [x=Math.trunc(a / b)] - How many times `b` fits into `a` (optional, calculated by default).
 * @return {number|string} - The closest multiple of `b` to `a`, or an error message if `a` is less than `b`.
 * @tags #math #utility
 */
export function getClosestInteger(a, b, x = Math.trunc(a / b)) {//x - how many times is b contained in a
  if (a > b) {// foolproof
    if (!(a % b)) //if a is divisible by b without remainder
      return a;// so a is the answer
    return (b * (x + 1) - a) < (a - b * x) ? b * (x + 1) : b * x; //otherwise, choose between b * x and b * (x + 1)
  }
  return 'Wrong attributes';
}

/**
 * Splits an array into smaller chunks of a specified size.
 * 
 * @param {Array} arr - The array to split.
 * @param {number} div - The size of each chunk.
 * @return {Array<Array>} - An array of chunks, where each chunk is an array.
 * @tags #array #split #utility #chunk
 */
export function splitArray(arr, div) {
  const out = [];
  if (!div || div <= 0) return [arr.slice()];
  for (let i = 0; i < Math.ceil(arr.length / div); i++) {
    out.push(arr.slice(i * div, i * div + div));
  }
  return out;
}

/**
 * Splits an array into two parts at a specified index.
 * 
 * @param {Array} arr - The array to split.
 * @param {number} index - The index at which to split the array.
 * @return {Array<Array>} - An array containing two subarrays: one before the index and one after.
 * @tags #array #split #utility
 */
export function splitArrayByIndex(arr, index) {
  return [arr.slice(0, index), arr.slice(index + 1)];
}

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
export function splitToArray(arr, n, plen?, asObject?) {
  plen = plen ? plen : Math.ceil(arr.length / n);
  return arr.reduce(function (p, c, i, a) {
    if (i % plen === 0) p.push(asObject ? {} : []);
    if (asObject) {
      p[p.length - 1][i] = c;
    } else {
      p[p.length - 1].push(c);
    }
    return p;
  }, []);
}

/**
 * Pairs elements from multiple arrays by their index, filling with `null` if an array is shorter.
 * 
 * @param {Array<Array<any>>} arrays - An array of arrays to pair. Example: [["a","b","c"], ["d","e","f","g"]];
 * @return {Array<Array<any>>} - An array of pairs, where each pair contains elements from the input arrays at the same index.
 * @tags #array #pairing #utility
 */
export function pairArrays(arrays) {
  const maxLength = Math.max(...arrays.map(arr => arr.length));
  const result = [];
  for (let i = 0; i < maxLength; i++) {
    const pair = [];
    for (const arr of arrays) {
      pair.push(arr[i] || null);
    }
    result.push(pair);
  }
  return result;
}

/**
 * Determines whether a given object is a class.
 * 
 * @param {any} obj - The object to check.
 * @return {boolean} - `true` if the object is a class, otherwise `false`.
 * @tags #class #utility #typecheck
 */
export function isClass(obj) {
  const isCtorClass = obj?.constructor
    && obj?.constructor?.toString()?.substring(0, 5) === 'class'
  if (obj?.prototype === undefined) {
    return isCtorClass
  }
  const isPrototypeCtorClass = obj?.prototype?.constructor
    && obj?.prototype?.constructor?.toString
    && obj?.prototype?.constructor?.toString()?.substring(0, 5) === 'class'
  return isCtorClass || isPrototypeCtorClass
}

/**
 * Determines whether a given string contains valid HTML content.
 * 
 * @param {string} string - The string to check.
 * @return {boolean} - `true` if the string contains HTML, otherwise `false`.
 * @tags #html #validation #utility
 */
export function isHTML(string) {
  let htmlTags = [
    "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo",
    "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col",
    "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl",
    "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2",
    "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img",
    "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "math",
    "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup",
    "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt",
    "rtc", "ruby", "s", "samp", "script", "search", "section", "select", "slot", "small",
    "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody",
    "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track",
    "u", "ul", "var", "video", "wbr"
  ];

  const basic = /\s?<!doctype html>|(<html\b[^>]*>|<body\b[^>]*>|<x-[^>]+>)+/i;
  const full = new RegExp(htmlTags.map(tag => `<${tag}\\b[^>]*>`).join('|'), 'i');

  if (typeof string !== "string") return false;

  const trimmed = string.trim().slice(0, 1000);

  // Node.js fallback
  if (typeof DOMParser === "undefined") {
    return basic.test(trimmed) || full.test(trimmed);
  }

  try {
    const fragment = new DOMParser().parseFromString(trimmed, "text/html");

    if (fragment?.body?.children?.length > 0) {
      return basic.test(trimmed) || full.test(trimmed);
    }

    return false;
  } catch {
    return false;
  }
}

/**
 * Checks if a given URL is an absolute URL.
 * 
 * @param {string} url - The URL to check.
 * @return {boolean} - `true` if the URL is absolute, otherwise `false`.
 * @tags #url #validation #utility
 */
export function isAbsoluteUrl(url) {
  var r = new RegExp('^(?:[a-z+]+:)?//', 'i');
  return r.test(url); // true - regular http absolute URL
}

/**
 * Determines whether a given path is a relative path.
 * 
 * @param {string} path - The path to check.
 * @return {boolean} - `true` if the path is relative, otherwise `false`.
 * @tags #path #validation #utility
 * @see https://github.com/nodejs/node/blob/b3fcc245fb25539909ef1d5eaa01dbf92e168633/lib/path.js#L56
 */
export function isRelativePath(path) {
  var splitDeviceRe = /^([a-zA-Z]:|[\\/]{2}[^\\/]+[\\/]+[^\\/]+)?([\\/])?([\s\S]*?)$/;
  var result = splitDeviceRe.exec(path);
  var device = result[1] || '';
  var isUnc = Boolean(device && device.charAt(1) !== ':');

  // UNC paths are always absolute
  return path.charAt(0) === '/' || Boolean(result[2] || isUnc);
}

/**
 * Determines whether a given string is a valid XPath expression.
 * 
 * @param {string} s - The string to check.
 * @return {boolean} - `true` if the string is a valid XPath, otherwise `false`.
 * @tags #xpath #validation #utility
 */
export function isXPath(s) {
  const VALID_AXIS = ["ancestor", "ancestor-or-self", "attribute", "child", "descendant", "descendant-or-self",
    "following", "following-sibling", "namespace", "parent", "preceding", "preceding-sibling", "self"];

  function firstAxisIsValid(s) {
    const axisSplit = s.split("::");
    if (axisSplit.length > 1) {
      const axe = axisSplit[0];
      if (VALID_AXIS.indexOf(axe) !== -1) return true;
    }
    return false;
  }

  // Test for @ and plain nodes
  if (s[0] === '/') return true;
  if (/^.\./.test(s)) return true;
  if (firstAxisIsValid(s)) return true;
  return false;
};

/**
 * Executes an XPath query and returns an array of matching elements.
 *
 * @param {string} xpathToExecute - The XPath expression to execute.
 * @returns {Array} An array of elements matching the XPath query.
 * @tags #dom #xpath #array
 */
export function getElementsByXpath(xpathToExecute) {
  var result = [];
  //document.evaluate(xpathToExecute, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var nodesSnapshot = document.evaluate(xpathToExecute, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < nodesSnapshot.snapshotLength; i++) {
    result.push(nodesSnapshot.snapshotItem(i));
  }
  return result;
}

/**
 * Merges multiple header objects into a single Headers object.
 *
 * @param {...Object} sources - One or more objects containing headers to merge.
 * @returns {Headers} A new Headers object containing the merged headers.
 * @throws {TypeError} If any argument is not an object.
 * @tags #object #headers #converter
 */
export function mergeHeaders(...sources) {
  const result = {};

  for (const source of sources) {
    if (!isObjectLike(source)) {
      throw new TypeError('All arguments must be of type object')
    }
    const headers = new globalThis.Headers(source)

    for (let [key, value] of (headers as any).entries()) {
      if ((value === undefined || value === 'undefined')) {
        delete result[key]
      } else {
        result[key] = value
      }
    }
  }

  return new globalThis.Headers(result)
}

/**
 * Converts an array of string pairs into an object.
 *
 * @param {Array<Array<string>>} array - An array of string pairs to convert.
 * @returns {Object} An object with keys and values derived from the array of string pairs.
 * @tags #array #string #converter
 */
export function arrayOfStringsToObject(array) {
  return array.reduce((prev, cur) => {
    prev[cur[0]] = cur[1];
    return prev;
  }, {})
}

/**
 * Converts a CSS string into an object with property-value pairs.
 *
 * @param {string} cssText - A string containing CSS declarations.
 * @returns {Object} An object where keys are CSS properties and values are their corresponding values.
 * @tags #css #string #converter
 */
export function CSSToObject(cssText) {
  var regex = /([\w-]*)\s*:\s*([^;]*)/g;
  var match, properties = {};
  while (match = regex.exec(cssText)) properties[match[1]] = match[2].trim();
  return properties;
}

/**
 * Converts an object with CSS properties into a CSS string.
 *
 * @param {Object} style - An object where keys are CSS properties and values are their corresponding values.
 * @returns {string} A CSS string with property-value pairs.
 * @tags #css #string #converter
 */
export function objectToCSS(style) {
  return Object.entries(style).map(([k, v]) => !!v && v !== 0 ? `${k}:${v}` : '').filter(item => item).join(';')
}

/**
 * Converts an object into an array of objects, using a specified property as the identifier.
 *
 * @param {Object} object - The object to convert.
 * @param {string} [idProperty='id'] - The property to use as the identifier in each array item.
 * @returns {Array<Object>} An array of objects with the specified identifier property.
 * @tags #object #array #converter
 */
export function objectToArray(object, idProperty?) {
  object = object || {};
  idProperty = idProperty || 'id';
  return Object.keys(object).reduce((prev, cur) => {
    let item = object[cur];

    if (!item[idProperty]) item[idProperty] = cur;
    Object.defineProperty(item, idProperty, {
      writable: false,
      enumerable: false
    });

    prev = [...prev, item]
    return prev
  }, [])
}

/**
 * Unwraps an array if it contains a single element, otherwise returns the array unchanged.
 *
 * @param {Array} arr - The array to unwrap.
 * @returns {*} The single element if the array contains only one element, otherwise the original array.
 * @tags #array #converter
 */
export function unwrapSingletonArray(arr) {
  if (Array.isArray(arr) && arr.length === 1) {
    return arr[0];
  } else {
    return arr;
  }
}

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
export function customSort(arr, compareFunction) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Argument must be an array");
  }
  if (typeof compareFunction !== "function" && compareFunction !== undefined) {
    throw new TypeError("Comparator must be a function or undefined");
  }
  // Clone the array to avoid modifying the original
  const clonedArray = [...arr];
  // Implement the bubble sort algorithm
  for (let i = 0; i < clonedArray.length - 1; i++) {
    for (let j = 0; j < clonedArray.length - i - 1; j++) {
      // Use the custom compare function or default comparison
      const shouldSwap =
        typeof compareFunction === "function"
          ? compareFunction(clonedArray[j], clonedArray[j + 1], j, clonedArray) > 0
          : String(clonedArray[j]) > String(clonedArray[j + 1]); // Default comparison as strings
      if (shouldSwap) {
        // Swap elements
        const temp = clonedArray[j];
        clonedArray[j] = clonedArray[j + 1];
        clonedArray[j + 1] = temp;
      }
    }
  }
  return clonedArray;
}

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
export function sortArrayOfObjects(array, rules, sortFunction?) {
  const newArray = [...array];
  sortFunction = sortFunction || ((arr, fn) => arr.sort(fn));
  const sortingRules = Array.isArray(rules) ? rules : [rules];

  return sortFunction(newArray, (a, b) => {
    for (let rule of sortingRules) {
      let result = 0;
      let direction = 'asc';

      if (typeof rule === 'object') {
        // Defining the sorting direction
        if (rule.order === 'desc') direction = 'desc';
        if (rule.order === 'asc') direction = 'asc';

        if (rule.negative) {
          // Invert the direction if negative is set
          direction = direction === 'asc' ? 'desc' : 'asc';
        }

        const dir = direction === 'asc' ? 1 : -1;

        if ('func' in rule && typeof rule.func === 'function') {
          result = dir * (Number(rule.func(a, b)) || 0);
        } else if ('field' in rule) {
          const field = rule.field;
          const isDate = rule.isDate;
          const isNumber = rule.isNumber;
          const ignoreCase = rule.ignoreCase;

          let aValue = a?.[field];
          let bValue = b?.[field];

          if (isDate) {
            aValue = aValue ? new Date(aValue) : new Date(0);
            bValue = bValue ? new Date(bValue) : new Date(0);
          } else if (isNumber) {
            aValue = Number(String(aValue).replace(/\D/g, ''));
            bValue = Number(String(bValue).replace(/\D/g, ''));
          } else if (ignoreCase && typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }

          if (aValue > bValue) {
            result = dir;
          } else if (aValue < bValue) {
            result = -dir;
          }
        }
      } else if (typeof rule === 'string') {
        let dir = 1;
        if (rule[0] === '-') {
          dir = -1;
          rule = rule.substring(1);
        }
        const field = rule;
        let aValue = a?.[field];
        let bValue = b?.[field];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue > bValue) {
          result = dir;
        } else if (aValue < bValue) {
          result = -dir;
        }
      }

      if (result !== 0) {
        return result;
      }
    }
    return 0;
  });
}

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
export function interpolateData({ data, fillMissing, groupByFields, sortByFields, propertiesList, groupHandlerFn }) {

  let set = (obj, key, value) => {
    if (key.includes('.')) {
      return deepSet(obj, key, value, { replace: true, create: true });
    } else {
      obj[key] = value;
      return value;
    }
  };

  let get = (obj, key) => {
    if (key.includes('.')) {
      return deepFind(obj, key);
    } else {
      return obj[key];
    }
  };

  // Converting the object to an array of records while preserving the original key
  const entries = Object.entries(data).map(([key, obj]) => ({ key, ...(obj as any) }));

  // We group the records according to the specified list of fields.
  // For a composite key, we use combining values separated by a separator (for example, "|")
  const groups = entries.reduce((acc, entry) => {
    const groupKey = groupByFields.map(field => get(entry, field)).join("|");
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(entry);
    return acc;
  }, {});

  // process each group separately
  for (const groupKey in groups) {
    let group = groups[groupKey];
    // Sorting by the specified fields (for example, timestamp)
    group = sortArrayOfObjects(group, sortByFields);

    // Interpolation for each coefficient from propertiesList
    propertiesList.forEach(prop => {
      // We collect indexes of objects where the value is known
      const knownIndices = [];
      group.forEach((item, idx) => {
        // We use get to support nested properties.
        if (get(item, prop) !== undefined) {
          knownIndices.push(idx);
        }
      });

      // If fillMissing is enabled, fill in the values before and after the last known one.
      if (fillMissing && knownIndices.length > 0) {
        // Filling up to the first known one
        for (let i = 0; i < knownIndices[0]; i++) {
          const val = get(group[knownIndices[0]], prop);
          set(group[i], prop, val);
          group[i].interpolatedProperties = group[i].interpolatedProperties || [];
          if (!group[i].interpolatedProperties.includes(prop)) {
            group[i].interpolatedProperties.push(prop);
          }
        }
        // Filling in after the last known one
        const lastIdx = knownIndices[knownIndices.length - 1];
        for (let i = lastIdx + 1; i < group.length; i++) {
          const val = get(group[lastIdx], prop);
          set(group[i], prop, val);
          group[i].interpolatedProperties = group[i].interpolatedProperties || [];
          if (!group[i].interpolatedProperties.includes(prop)) {
            group[i].interpolatedProperties.push(prop);
          }
        }
      }

      // Interpolation for gaps between known values
      for (let i = 0; i < knownIndices.length - 1; i++) {
        const startIdx = knownIndices[i];
        const endIdx = knownIndices[i + 1];
        const startVal = get(group[startIdx], prop);
        const endVal = get(group[endIdx], prop);
        const gap = endIdx - startIdx - 1; // number of objects between known values
        if (gap <= 0) continue;

        for (let j = 1; j <= gap; j++) {
          const fraction = j / (gap + 1);
          // Calculating a new value with two decimal places
          const newVal = +(startVal + fraction * (endVal - startVal)).toFixed(2);
          set(group[startIdx + j], prop, newVal);
          group[startIdx + j].interpolatedProperties = group[startIdx + j].interpolatedProperties || [];
          if (!group[startIdx + j].interpolatedProperties.includes(prop)) {
            group[startIdx + j].interpolatedProperties.push(prop);
          }
        }
      }
    });

    // Calling the handler function for the group if it is passed
    if (groupHandlerFn && typeof groupHandlerFn === 'function') {
      group.forEach((item, idx, array) => groupHandlerFn(item, idx, array));
    }
    groups[groupKey] = group;
  }

  // collect the result back into the object with the original keys.
  const result = {};
  Object.values(groups).forEach(group => {
    (group as any).forEach(entry => {
      const { key, ...rest } = entry;
      result[key] = rest;
    });
  });
  return result;
}

/*RGB utils*/
/**
 * Parses an RGB string and returns an array of numeric RGB values.
 *
 * @param {string} rgb - The RGB string to parse.
 * @returns {Array<number>} An array containing the numeric RGB values.
 * @tags #string #color #converter
 */
export function parseRGB(rgb) {
  return (rgb || '')?.match(/\d+/g)?.map(Number) || [];
}

/**
 * Checks if a string is a valid CSS color using browser parsing.
 * Works only in environments with DOM (e.g. browser or jsdom).
 *
 * @param {string} c - Color value to validate
 * @returns {boolean} True if valid CSS color, otherwise false
 * @tags #string #color
 * @see https://github.com/princejwesley/is-css-color
 */
export function isValidColor(c) {
  if (!c || typeof c !== 'string') return false;

  const color = c.trim().toLowerCase();

  if (globalThis['Option']) {
    const s = new globalThis['Option']().style;
    s.color = color;
    return s.color !== '';
  }

  const CSS_COLOR_NAMES = new Set([
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond',
    'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
    'cornsilk', 'crimson', 'currentcolor', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen',
    'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon',
    'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink',
    'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink',
    'indianred', 'indigo', 'inherit', 'initial', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen',
    'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen',
    'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
    'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine',
    'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen',
    'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
    'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen',
    'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple',
    'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen',
    'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
    'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'transparent', 'turquoise', 'violet', 'wheat', 'white',
    'whitesmoke', 'yellow', 'yellowgreen'
  ]);

  regExpPatterns.color.lastIndex = 0;
  const match = regExpPatterns.color.exec(color);

  if (match && match[0].length === color.length) {
    const { prefix, value } = match.groups || {};

    if (!prefix) return true;

    const parts = value
      .split(/[\s,]+/)
      .filter(Boolean)
      .slice(0, 3);

    const types = parts.map(v => v.includes('%') ? 'percent' : 'number');

    if (prefix.startsWith('hsl')) {
      return (
        types[0] === 'number' &&
        types[1] === 'percent' &&
        types[2] === 'percent'
      );
    }

    if (prefix.startsWith('rgb')) {
      const allNumber = types.every(t => t === 'number');
      const allPercent = types.every(t => t === 'percent');
      return allNumber || allPercent;
    }
  }

  return CSS_COLOR_NAMES.has(color);
}

/**
 * Calculates the Delta E (CIE2000) color difference between two RGB colors.
 *
 * @param {Array<number>} rgbA - The first RGB color as an array of three numbers.
 * @param {Array<number>} rgbB - The second RGB color as an array of three numbers.
 * @returns {number} The Delta E color difference between the two colors.
 * @see https://stackoverflow.com/a/52453462/14638643
 * @tags #color #math #converter
 */
export function deltaE(rgbA, rgbB) {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / 1.0;
  let deltaCkcsc = deltaC / sc;
  let deltaHkhsh = deltaH / sh;
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

/**
 * Converts an RGB color to the CIELAB color space.
 *
 * @param {Array<number>} rgb - The RGB color as an array of three numbers.
 * @returns {Array<number>} The CIELAB color as an array of three numbers.
 * @tags #color #converter
 */
export function rgb2lab(rgb) {
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
  y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
  z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
}

/**
 * Calculates the average color difference (Delta E) between two arrays of colors.
 *
 * @param {Array<string>} firstColorArray - The first array of colors in RGB format.
 * @param {Array<Array<string>>} secondColorArray - The second array of color arrays in RGB format.
 * @returns {Array<number>} An array of average Delta E values for each color array in the second array.
 * @tags #color #array #math
 */
export function getAverageColorDeltaArray(firstColorArray, secondColorArray) {
  function averageDeltaE(colors1, colors2) {
    let totalDeltaE = 0;
    let count = 0;

    for (let i = 0; i < colors1.length; i++) {
      let color1 = parseRGB(colors1[i]);

      let minDeltaE = Infinity;
      for (let j = 0; j < colors2.length; j++) {
        let color2 = parseRGB(colors2[j]);
        let delta = deltaE(color1, color2);
        if (delta < minDeltaE) {
          minDeltaE = delta;
        }
      }

      totalDeltaE += minDeltaE;
      count++;
    }

    return totalDeltaE / count;
  }

  let minDeltaE = Infinity;
  let closestArrayIndex = null;
  let averageDeltaArray = [];

  for (let i = 0; i < secondColorArray.length; i++) {
    let deltaEValue = averageDeltaE(firstColorArray, secondColorArray[i]);
    if (deltaEValue < minDeltaE) {
      minDeltaE = deltaEValue;
      closestArrayIndex = i;
    }
    averageDeltaArray.push(deltaEValue);
  }
  return averageDeltaArray;
}
/*end RGB utils*/

/**
 * Finds the index of the closest value to a target within an array, optionally within a specified threshold.
 *
 * @param {Array<number>} arr - The array of numbers to search.
 * @param {number} target - The target value to find the closest match for.
 * @param {number} [threshold] - An optional threshold to limit the search to values within this range.
 * @returns {number} The index of the closest value, or -1 if the array is empty or no value is within the threshold.
 * @tags #array #math #search
 */
export function findClosestIndex(arr, target, threshold = null) {
  let closestIndex = -1;
  let minDiff = Infinity;

  if (arr.length === 0) {
    return closestIndex;
  }

  for (let i = 0; i < arr.length; i++) {
    let diff = Math.abs(arr[i] - target);
    if (threshold && diff > threshold) {
      continue; // Skipping elements that exceed the threshold
    }
    if (diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }

  return closestIndex;
}

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
export function mergeArrayOfObjects(original, newdata, uniqueSelector, mergeObjects?) {
  uniqueSelector = uniqueSelector == undefined ? '' : uniqueSelector;

  let get = (obj, key) => {
    if (key.includes('.')) {
      return deepFind(obj, key);
    } else {
      return obj[key];
    }
  };

  newdata.forEach(dat => {
    const foundIndex = original.findIndex(
      ori => {
        if (typeof uniqueSelector == 'string') {
          return get(ori, uniqueSelector) === get(dat, uniqueSelector)
        } else {
          return uniqueSelector.every(selectors => {
            get(ori, selectors) === get(dat, selectors)
          })
        }
      }
    );
    if (foundIndex >= 0) original.splice(foundIndex, 1, mergeObjects ? deepMerge(original[foundIndex], dat, { mutation: true }) : dat);
    else original.push(dat);
  });

  return original;
}

/**
 * Finds all indexes of a value or values in an array, optionally searching within a nested path.
 *
 * @param {Array} arr - The array to search.
 * @param {*} val - The value or array of values to find.
 * @param {string} [path] - An optional path to search within nested objects.
 * @returns {Array<number>} An array of indexes where the value(s) are found.
 * @tags #array #search
 */
export function getAllIndexes(arr, val, path?) {
  val = Array.isArray(val) ? val : [val]
  var indexes = [], i;
  for (i = 0; i < arr.length; i++) {
    if (path ? val.includes(deepFind(arr[i], path)) : val.includes(arr[i])) {
      indexes.push(i);
    }
  }

  return indexes;
}

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
export function getPaths(o, path = "", flatNumLimit?) {
  flatNumLimit = Number.parseInt(flatNumLimit) || null;
  function getPathsInner(o, path = "", flatNum) {
    if (!o || typeof o !== "object") return path;
    let keys = Object.keys(o);
    flatNum += 1;
    return keys.length ? flatNum <= flatNumLimit || !flatNumLimit ? keys.map(key => getPathsInner(o[key], path ? [path, key].join(".") : key, flatNum)) : path : (Array.isArray(o) ? path : []);//old:path [object Object] fix
  }
  return getPathsInner(o, path, 0);
}

/**
 * Parses a string to extract valid property names based on JavaScript property access patterns.
 * Matches property names that appear after `.`, `?`, `[`, or quotes, or at the start of the string.
 * 
 * @param {string} str - The input string to parse for property names.
 * @returns {Array<string>} An array of extracted property names.
 * @tags #string #parsing #utility
 */
export function parsePropertyString(str) {
  return [...str.match(/(?:^|(?<=\?|\.|\[|['"]))\s*([a-zA-Z \-$_][a-zA-Z \-0-9$_]*)(?=\s*(?:\?|\.|\[|$|\]|['"]))/gm)];
}

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
export function parseFunction(fn) {
  let bodyRegExp = /(?<=(?<=(?:[\s\w]*)(?:\=>|\))(?:[\s\w]*))(?<start>\{)\k<start>)(?!\{)(?<body>[\s\w\W\S]+)(?=(?<end>\})(?!(?:[\s]|.)*\k<end>)|(?=\k<start>.*\k<end>))/;
  let argumentsRegExp = /(?<=(?<start>\())(?<body>[\s\w\W\S]|.*)(?<end>\))/;///(?<=(?<start>\())(?<body>[\s\w\W\S]+|)(?=(?<end>\))(?=(?:[\s]|.)*(?:\{|=>)))/;
  let nameRegExp = /(?<body>\w*)(?<!async|function)(?=(?:[\s]|function){0,}(?<end>\()(?<=(?:[\s]|.)*(?:\()))/;
  let asyncRegExp = /(?<body>(\basync\b))(?=.*(?<end>\())/;///(?<body>\basync\b|)(?=(?:[\s]|function|.){0,}(?<end>\()(?=(?:[\s]|.)*(?:\()))/;
  let isFn = typeof fn === 'function' ? true : false;
  let isStr = typeof fn === 'string' ? true : false;
  try {
    if (isFn || isStr) {
      let fnStr = isStr ? fn : fn.toString();
      return {
        async: fnStr.match(asyncRegExp)?.groups?.body || '',
        name: fnStr.match(nameRegExp)?.groups?.body || '',
        arguments: fnStr.match(argumentsRegExp)?.groups?.body || '',
        body: fnStr.match(bodyRegExp)?.groups?.body || '',
      }
    } else {
      throw 'invalid type'
    }
  } catch (error) {
    throw error
  }
}

/**
 * Counts the occurrences of each property value in an array of objects.
 * Returns an object where each key is a property name, and its value is another object
 * mapping property values to their counts.
 * 
 * @param {Array<Object>} arr - The array of objects to analyze.
 * @returns {Object} An object containing the counts of each property value.
 * @tags #array #object #utility #counting
 */
export function countProperties(arr) {
  const result = {};

  arr.forEach(obj => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!result[key]) {
          result[key] = {};
        }
        const value = obj[key];
        if (!result[key][value]) {
          result[key][value] = 0;
        }
        result[key][value]++;
      }
    }
  });

  return result;
}

/*set library*/

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
export function deepFind(obj, path, options?, callbackFn?) {
  let { handleString, create, caseInsensitive, caseIndependent } = options || {};

  var schema = obj;  // refrence to main object
  let schemaReplaced = false;
  let lastSchema = schema;
  let lastReplacedSchema;

  return (function deepFindInner(obj, path, options?, callbackFn?) {
    let { handleString, create, caseInsensitive, caseIndependent } = options || {};

    var schema = obj;
    var pList = splitPath(path);
    var len = pList.length;
    let hasRegExp;
    // in this iteration we skip first element (if u want include first element in this iterations, change var i=1 to 0)
    // < len-1 for replace
    // < len for get

    for (var i = 0; i < len; i++) {

      var elem = pList[i];
      var indexOfTable = elem.indexOf("[");
      let parsedElem = parseRegExpString(elem || '');
      if (indexOfTable !== -1 && !parsedElem?.length) {
        var tableElementName = elem.substring(0, indexOfTable);
        var indexName = elem.substring(indexOfTable + 1, elem.length - 1);

        if (!schema[tableElementName][indexName]) {
          schema[tableElementName][indexName] = {};
        }
        else {
          schema = schema[tableElementName][indexName];
        }

        lastSchema = schema;
      } else {

        let keySchema = (caseInsensitive || caseIndependent ? schema[Object.keys(schema).find(i => {
          return caseIndependent ? caseIndependentCompare(i, elem) : caseInsensitive ? i.toLowerCase() == elem.toLowerCase() : i == elem;
        })] : schema?.[elem]);

        if (typeof schema == 'object' && hasRegExp && lastReplacedSchema == schema) {
          hasRegExp = true;
          if (!schemaReplaced) {
            lastSchema = schema;
            schemaReplaced = true;
          }

          schema = Object.keys(schema || {}).reduce((prev, cur) => {
            let item = schema[cur];
            let result = deepFindInner(item, elem, { handleString: true, create: false, caseInsensitive, caseIndependent });

            let data = result != undefined ? typeof prev == 'object' || typeof result == 'object' ? { ...((prev as any) || []), ...result } : prev : prev;
            return data;
          }, undefined);

          //lastReplacedSchema = schema;

        } else {

          if (parsedElem?.length) {

            hasRegExp = true;
            let elemRegExp = new RegExp(parsedElem[1].replace(/\\/g, '\\$&'), parsedElem[2] || '');
            let schemaKeys = Object.keys(schema || {}).filter(item => elemRegExp.test(item));

            if (!schemaReplaced) {
              lastSchema = schema;
              schemaReplaced = true;
            }

            if (typeof schema == 'object') {
              if (Array.isArray(schema)) {
                let arr = [];
                let clearedArr = schemaKeys.map(key => {
                  if (schema[key] != undefined) {
                    arr[key] = schema[key];
                  }
                  return schema[key]
                }).flat();
                schema = arr;//clearedArr
              } else {
                schema = schemaKeys.reduce((prev, cur) => {
                  prev[cur] = schema[cur];
                  return prev;
                }, {})
              }

              lastReplacedSchema = schema;

            }

          } else {
            if (keySchema == undefined) {
              if (create && (len > 1 ? len != i : true)) {
                keySchema = Number.isInteger(+pList[i + 1]) ? [] : {};
                schema[elem] = keySchema;
                schema = schema[elem];
              } else {
                //return undefined;
                schema = undefined;
              }

            } else {
              schema = handleString ? keySchema : typeof schema == 'string' ? undefined : keySchema;
            }
            lastSchema = schema;
          }

        }

      }


      if (callbackFn) callbackFn(schema, [...pList].slice(0, i + 1), schemaReplaced, lastSchema);
    }

    return schema;
  })(obj, path, { handleString, create, caseInsensitive, caseIndependent }, callbackFn);
}

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
export function deepSet(obj, path = '', value, options?) {
  let { replace, create } = options || {};
  var schema = obj;  // refrence to main object
  var pList = splitPath(path);
  var len = pList.length;
  let handleString = false;

  let alternativePathList = [];
  let alternativeLastSchemaList = [];

  let initAdditionalDeepFind = false;
  try {
    deepFind(obj, path, { handleString: false, create }, (schemaRef, currentPathList, schemaReplaced, lastSchema) => {

      let i = currentPathList.length - 1;
      let elem = currentPathList[i];
      let parsedElem = parseRegExpString(elem || '');

      alternativePathList.push(new Set([]));
      alternativeLastSchemaList.push([]);

      if (schemaReplaced) {
        len = currentPathList.length;
        alternativeLastSchemaList[i].push(lastSchema);
      } else {
        initAdditionalDeepFind = true;
      }

      if (parsedElem?.length) {
        let elemRegExp = new RegExp(parsedElem[1].replace(/\\/g, '\\$&'), parsedElem[2] || '');
        let currentAlternativeLastSchema = initAdditionalDeepFind ? schemaRef : alternativeLastSchemaList[i - 1] || obj;
        //currentAlternativeLastSchema = Array.isArray(currentAlternativeLastSchema) || currentAlternativeLastSchema.size ? [currentAlternativeLastSchema] : currentAlternativeLastSchema;
        //currentAlternativeLastSchema = [currentAlternativeLastSchema];

        [currentAlternativeLastSchema].forEach((currentAlternativeSchema, index) => {
          let schemaKeys = Object.keys(currentAlternativeSchema || {}).filter(item => elemRegExp.test(item));
          if (schemaKeys.length) {
            alternativePathList[i].add(new Set(schemaKeys));
            alternativeLastSchemaList[i].push(currentAlternativeSchema);
          }
        });

      } else {
        alternativePathList[i].add(elem);
      }

      // if(i == pList.length - 2){
      //   if(!schemaReplaced){
      //     schema = lastSchema;
      //   }else{
      //     //throw 'no possibility to set values when using regular expressions'
      //     schema = lastSchema;
      //   }
      // }
    });
  } catch (error) {
    console.log('deepFindError', error);
  }


  if (alternativePathList.some(item => !item.size)) {
    return;
  }

  let extractedPathList = extractTree(alternativePathList);

  /*regex update*/
  extractedPathList.forEach((pList, index) => {
    len = pList.length;
    if (initAdditionalDeepFind) {
      deepFind(obj, pList.join('.'), { handleString: false, create }, (schemaRef, currentPathList, schemaReplaced, lastSchema) => {
        let i = currentPathList.length - 1;
        if (i == len - 2) {
          schema = schemaRef
        }
      });
    } else {
      schema = alternativeLastSchemaList[len - 2][0];
    }

    var indexOfTableReplace = pList[len - 1].indexOf("[");

    if (indexOfTableReplace !== -1) {
      var tableElementNameReplace = pList[len - 1].substring(0, indexOfTableReplace);
      var indexNameReplace = pList[len - 1].substring(indexOfTableReplace + 1, pList[len - 1].length - 1);
      if (indexNameReplace === "") {
        schema[tableElementNameReplace].push(value);
      }
      else {
        if (replace) {
          schema[tableElementNameReplace][indexNameReplace] = value;
        }
        else {
          if (Array.isArray(schema[tableElementNameReplace][indexNameReplace])) {
            schema[tableElementNameReplace][indexNameReplace] = [...schema[tableElementNameReplace][indexNameReplace], ...value];
          }
          else {
            schema[tableElementNameReplace][indexNameReplace] = { ...schema[tableElementNameReplace][indexNameReplace], ...value };
          }
        }

      }
    } else {
      if (create || (!create && schema?.[pList[len - 1]] != undefined)) {
        if (Array.isArray(value)) {
          if (replace) {
            schema[pList[len - 1]] = value;
          }
          else {
            schema[pList[len - 1]] = [...schema[pList[len - 1]], ...value];
          }
        }
        else {
          if (replace) {
            schema[pList[len - 1]] = value;
          } else {
            if (typeof value === 'object') {
              schema[pList[len - 1]] = { ...schema[pList[len - 1]], ...value };
            } else {
              schema[pList[len - 1]] = value;
            }
          }
        }
      }
    }

  })

}

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
export function extractTree(tree) {
  const result = [];

  const iterate = (tree, cb) => {
    const stack = [tree];
    const parent = [null];
    const count = [];
    const depth = [];
    const path = [];
    let idx = 0;
    let inc = true;

    while (idx !== -1) {
      const e = stack[idx];
      if (e instanceof Set) {
        stack[idx] = [...e];
        stack[idx].or = true;
      } else if (Array.isArray(e)) {
        if ((e as any).or !== true) {
          stack.splice(idx, 1, ...e);
          parent.splice(idx, 1, ...new Array(e.length).fill(parent[idx]));
          if (parent[idx] !== null) {
            depth[parent[idx]] += e.length - 1;
          }
        } else {
          if (count[idx] === undefined) {
            count[idx] = 0;
            depth[idx] = 0;
          } else if (depth[idx] !== 0) {
            stack.splice(idx + 1, depth[idx]);
            parent.splice(idx + 1, depth[idx]);
            depth[idx] = 0;
          }

          if (count[idx] < e.length) {
            stack.splice(idx + 1, 0, e[count[idx]]);
            parent.splice(idx + 1, 0, idx);
            count[idx] = (count[idx] || 0) + 1;
            depth[idx] += 1;
            inc = true;
            idx += 1;
          } else {
            count[idx] = 0;
            idx -= 1;
          }
        }
      } else if (inc === true) {
        path.push(e);
        cb('ADD', e);
        if (idx === stack.length - 1) {
          cb('FIN', path);
          inc = false;
        } else {
          idx += 1;
        }
      } else {
        cb('RM', path.pop());
        idx -= 1;
      }
    }
  };

  iterate(tree, (type, p) => {
    if (type === 'FIN') {
      result.push([...p]);
    }
  });
  return result;
}

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
export function comparePaths(path, exceptPath, strict?) {

  let pathList = splitPath(path);
  let exceptPathList = splitPath(exceptPath);

  if (pathList?.length) {
    return [...exceptPathList]
      .slice(0, pathList.length)
      .every((exceptPathItem) => {
        let parsedElem = parseRegExpString(exceptPathItem);
        let elemRegExp = parsedElem
          ? new RegExp(
            parsedElem[1].replace(/\\/g, "\\$&"),
            parsedElem[2] || ""
          )
          : new RegExp(exceptPathItem);

        return strict && !parsedElem?.length ? elemRegExp.test(path) && exceptPathList.length == pathList.length : elemRegExp.test(path);
      });
  } else {
    return false;
  }
}

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
export function deepDelete(obj, path, exceptPaths?) {
  path = path || "";
  exceptPaths = exceptPaths || [];
  let originalObj = obj;
  let originalPath = path;

  function deepDeleteInner(obj, path) {

    if (!obj || typeof obj !== "object") {
      if (exceptPaths.some(exceptPath => comparePaths(path, exceptPath))) {
        // return path;
        return;
      } else {
        delete obj[path];
        return;
      }
    }

    let keys = Object.keys(obj);
    if (keys.length) {
      keys.forEach((key) => {
        let currentPath = [path, key].filter(item => item).join('.');
        if (!(exceptPaths.length && exceptPaths.some(exceptPath => comparePaths(currentPath, exceptPath)))) {
          if (comparePaths(currentPath, originalPath)) {
            if (comparePaths(currentPath, originalPath, true)) {
              delete obj[key];
            } else {
              deepDeleteInner(obj[key], currentPath);
            }
          }
        }
      });
    }
  }

  return deepDeleteInner(originalObj, '')

}

/**
 * Checks whether a value can be deep-merged (plain object or array).
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is mergeable.
 */
export function isMergeable(value: any) {
  return Array.isArray(value) || isPlainObject(value);
}

/**
 * Recursively merges properties from a source object into a target object.
 * Arrays are merged by index (like objects), not replaced.
 *
 * @param {Object|Array} target - The target to merge into.
 * @param {Object|Array} source - The source to merge from.
 * @param {Object} [options] - Options object
 * @param {boolean} [options.notStrict=false] - If true, only non-null/undefined source values overwrite target values.
 * @param {boolean} [options.mutation=false] - If true, mutates the target object; otherwise target is cloned first.
 *
 * @returns {Object|Array} The merged result.
 */
export function deepMerge(target, source, options?: {
  notStrict?: boolean;
  mutation?: boolean;
}) {
  const { notStrict = false, mutation = false } = options || {};

  function cloneForMerge<T>(value: T): T {
    // structuredClone — лучший вариант, если доступен
    if (typeof structuredClone === 'function') {
      try {
        return structuredClone(value);
      } catch (e) {
        // fallback ниже
      }
    }

    // fallback на твою утилиту
    return saveCopy(value, {
      omitReservedValues: false,
      depthLimit: 100,
      convertStringValues: false,
    });
  }

  if (typeof source !== 'object' || source === null) {
    return notStrict ? (source != null ? source : target) : source;
  }

  if (!mutation) {
    target = cloneForMerge(target);
  }

  if (Array.isArray(source)) {
    if (!Array.isArray(target)) {
      target = [];
    }
  } else {
    if (!isPlainObject(target)) {
      target = {};
    }
  }

  const keys = Object.keys(source);

  for (const prop of keys) {
    const srcVal = source[prop];
    const targetVal = target[prop];

    if (isMergeable(srcVal) && isMergeable(targetVal)) {
      target[prop] = deepMerge(targetVal, srcVal, {
        notStrict,
        mutation: true,
      });
    } else {
      if (notStrict) {
        if (srcVal != null) {
          target[prop] = isMergeable(srcVal) ? cloneForMerge(srcVal) : srcVal;
        }
      } else {
        target[prop] = isMergeable(srcVal) ? cloneForMerge(srcVal) : srcVal;
      }
    }
  }

  return target;
}

/**
 * Performs a deep comparison between two or more objects, arrays, or primitives.
 * Handles edge cases like `NaN`, `Date`, `RegExp`, `Function`, and circular references.
 * 
 * @param {...*} arguments - Two or more objects, arrays, or primitives to compare.
 * @returns {boolean} True if all arguments are deeply equal, otherwise false.
 * @tags #object #comparison #utility #recursion
 */
export function deepCompare() {
  var i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
      return true;
    }

    // Compare primitives and functions.     
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if ((typeof x === 'function' && typeof y === 'function') ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      }
      else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof (x[p])) {
        case 'object':
        case 'function':

          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {

    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }

  return true;
}


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
export function versionCompare(v1, v2, options) {
  var lexicographical = (options && options.lexicographical) || false,
    zeroExtend = (options && options.zeroExtend) || true,
    v1parts = (v1 || "0").split('.'),
    v2parts = (v2 || "0").split('.');

  function isValidPart(x) {
    return (lexicographical ? /^\d+[A-Za-zαß]*$/ : /^\d+[A-Za-zαß]?$/).test(x);
  }

  if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
    return NaN;
  }

  if (zeroExtend) {
    while (v1parts.length < v2parts.length) v1parts.push("0");
    while (v2parts.length < v1parts.length) v2parts.push("0");
  }

  if (!lexicographical) {
    v1parts = v1parts.map(function (x) {
      var match = (/[A-Za-zαß]/).exec(x);
      return Number(match ? x.replace(match[0], "." + x.charCodeAt(match.index)) : x);
    });
    v2parts = v2parts.map(function (x) {
      var match = (/[A-Za-zαß]/).exec(x);
      return Number(match ? x.replace(match[0], "." + x.charCodeAt(match.index)) : x);
    });
  }

  for (var i = 0; i < v1parts.length; ++i) {
    if (v2parts.length == i) {
      return 1;
    }

    if (v1parts[i] == v2parts[i]) {
      continue;
    }
    else if (v1parts[i] > v2parts[i]) {
      return 1;
    }
    else {
      return -1;
    }
  }

  if (v1parts.length != v2parts.length) {
    return -1;
  }

  return 0;
}

/*end set library*/





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
export function getRandomArbitrary(min, max) {
  return Math.floor((Math.random() * (max - min) + min) * 1000);
}

/**
 * Generates a random integer between a specified minimum and maximum value.
 * 
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random integer between `min` and `max`.
 * @tags #math #random #utility
 */
export function getRandomNumber(min, max) {
  return Math.floor((Math.random() * (max - min) + min));
}

/**
 * Generates a random string of a specified length using a custom character set.
 * 
 * @param {number} i - The length of the random string to generate.
 * @param {string} [chars] - The character set to use for generating the string. Defaults to alphanumeric characters.
 * @returns {string} A random string of the specified length.
 * @tags #string #random #utility
 * @altname randomString
 */
export function getRandomString(i, chars?) {
  chars = chars || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";//Math.random().toString(36).substring(2);
  var rnd = '';
  while (rnd.length < i) {
    rnd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return rnd;
};

/**
 * Shuffles the elements of an array randomly using the Fisher-Yates algorithm.
 * Creates a deep copy of the array to avoid mutating the original.
 * 
 * @param {Array} array - The array to shuffle.
 * @returns {Array} A new array with the elements shuffled randomly.
 * @tags #array #random #utility
 */
export function shuffleArray(array) {
  array = JSON.parse(JSON.stringify(array));
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Formats a phone number string into a standardized format.
 * Extracts and formats valid phone numbers from the input string, including country codes and area codes.
 * 
 * @param {string} str - The input string containing the phone number(s) to format.
 * @returns {string} The formatted phone number string, or the original string if formatting fails.
 * @tags #string #formatting #utility #phone
 */
export function phoneFormatter(str) {
  if (!str) {
    return str;
  }
  var number;
  try {
    number = str.replace(regExpPatterns.phone, item => {
      var parsedData = parsePhone(item.replace(new RegExp('[^+0-9]', 'gim'), ''));
      return `+${parsedData.countryCode} ${parsedData.areaCode}${parsedData.number}`;
    });
  } catch (error) {
    number = str;
  }
  return number;
}

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
export function addSeparator(string, startSeparator = '', endSeparator = '') {
  if (string != '') {
    let div = document.createElement('div');
    div.innerHTML = startSeparator + string + endSeparator;
    return div.textContent;
  } else {
    return '';
  }
}

/*universal search page scraper*/

/**
 * Runs a paginated search, processes each page, optionally processes each item,
 * limits concurrency with batching, and collects all final results.
 *
 * @async
 * @function getSearchResults
 * @param {Object} options - Configuration.
 * @param {Object} options.searchOptions - Search parameters (startPage, totalPages, etc.).
 * @param {Function} options.getSearchPageResultsFn - Loads a single page of results (sync or async).
 * @param {Function} [options.searchItemHandlerFn] - Processes each item (sync or async).
 * @param {number} [options.errorLimit=50] - Max errors allowed before stopping.
 * @param {number} [options.requestLimitItems=1] - Batch size for item processing.
 * @param {number} [options.requestLimitResults=1] - Batch size for page processing.
 * @param {Function} [options.onItemsSettledFn] - Called after each batch of items settles.
 * @param {Function} [options.onResultsSettledFn] - Called after each batch of pages settles.
 *
 * @returns {Promise<Array>} All processed items from all pages.
 *
 * @description
 * Fetches pages one by one, optionally processes each item,
 * triggers callbacks after batches finish, respects error limits,
 * and stops when pages end or break flags are set.
 */
export async function getSearchResults(options) {
  let {
    searchOptions,
    getSearchPageResultsFn,
    searchItemHandlerFn,
    errorLimit,
    requestLimitItems,
    requestLimitResults,
    onItemsSettledFn,
    onResultsSettledFn
  } = options;

  // results container
  let totalSearchResults = [];
  let errors = [];

  // break states visible to handlers
  let breakStates = { results: false, items: false };

  let eventListener = {
    onItemsSettled: onItemsSettledFn,
    onResultsSettled: onResultsSettledFn
  };

  requestLimitItems = requestLimitItems || 1;
  requestLimitResults = requestLimitResults || 1;

  // Keep original default = 0 for backwards compatibility with твоим кодом.
  searchOptions.startPage = searchOptions.startPage != undefined ? Number.parseInt(searchOptions.startPage) : 0;
  searchOptions.totalPages = searchOptions.totalPages != undefined ? Number.parseInt(searchOptions.totalPages) : undefined;

  let iterator = { results: 0, items: 0 };
  let page = searchOptions.startPage;

  // buffer of page-promises
  let searchResultsPromises = [];

  // safety threshold to avoid runaway (tweak if needed)
  const SAFE_MAX_PAGE = (searchOptions.safeMaxPage && Number.isFinite(searchOptions.safeMaxPage)) ? searchOptions.safeMaxPage : 10_000_000;

  // while condition: respect totalPages if provided, respect error limit
  const checkWhileCondition = (p) => {
    return (
      Number.isInteger(searchOptions.totalPages) ? (searchOptions.totalPages >= p) && (p <= searchOptions.totalPages) : true &&
        (errors.length <= (errorLimit || 50)) &&
        (!breakStates.results) &&
        (p <= SAFE_MAX_PAGE)
    );
  }


  while (checkWhileCondition(page)) {
    // capture page for this iteration to avoid closure races
    const currentPage = page;

    // create a page worker promise
    let resultsPromise = (async () => {
      // assign to shared searchOptions exactly like original code did (compatibility)
      Object.assign(searchOptions, { page: currentPage, breakStates: breakStates, iterator: { results: iterator.results }, eventListener });

      let pageItems;
      try {
        if (getSearchPageResultsFn) {
          // call page fetcher with current (possibly mutated) searchOptions
          pageItems = getSearchPageResultsFn.constructor?.name === 'AsyncFunction'
            ? await getSearchPageResultsFn(searchOptions)
            : getSearchPageResultsFn(searchOptions);
        }
      } catch (err) {
        // record error and return empty array for this page
        errors.push(err);
        return [];
      }

      // normalize to array
      pageItems = Array.isArray(pageItems) ? pageItems : [];

      // process items (preserve original parallel/process batching semantics)
      let searchItemsPromises = [];
      const checkForCondition = (index) => (index < (pageItems?.length || 0));

      for (let index = 0; checkForCondition(index); index++, iterator.items++) {
        // capture element index
        const elementIndex = index;

        let itemPromise = (async () => {
          let element = pageItems[elementIndex];
          let additional;
          let searchItemHandlerOptions = {
            ...searchOptions,
            ...{ element: element, elementIndex: elementIndex, iterator: { results: iterator.results, items: iterator.items } },
            elementsArray: pageItems
          };

          try {
            if (searchItemHandlerFn && !breakStates.items) {
              additional = (searchItemHandlerFn.constructor?.name === 'AsyncFunction')
                ? await searchItemHandlerFn(searchItemHandlerOptions)
                : searchItemHandlerFn(searchItemHandlerOptions);
            }
          } catch (err) {
            console.log('additional data error', err);
            errors.push(err);
          }

          if (searchItemHandlerFn) {
            if (additional && typeof additional === 'object') {
              pageItems[elementIndex] = additional;
            } else {
              pageItems[elementIndex] = undefined;
            }
          }

          // preserve original hook assignment
          searchOptions.onItemsSettledFn = searchItemHandlerOptions.onItemsSettledFn;
        })();

        searchItemsPromises.push(itemPromise);

        if (breakStates.items) {
          break;
        }

        // flush item promises according to requestLimitItems or end of page
        if (!checkForCondition(index) || (!checkForCondition(index + 1) || Math.round(iterator.items % requestLimitItems) == requestLimitItems - 1)) {
          let searchItemsSettled = await Promise.allSettled(searchItemsPromises);
          if (eventListener?.onItemsSettled) {
            if (eventListener.onItemsSettled.constructor?.name === 'AsyncFunction') {
              await eventListener.onItemsSettled(searchItemsSettled);
            } else {
              eventListener.onItemsSettled(searchItemsSettled);
            }
          }
          searchItemsPromises = [];
        }
      }

      // return processed items for this page (keep behaviour: caller filters falsy later)
      return pageItems;
    })();

    // push page promise to buffer
    searchResultsPromises.push(resultsPromise);

    // Decide whether to flush buffered pages now:
    // flush when:
    //  - next page would exceed totalPages (if known), OR
    //  - we've buffered requestLimitResults pages, OR
    //  - errors exceeded limit (then flush and break)
    const shouldFlush =
      !checkWhileCondition(page) ||
      (!checkWhileCondition(page + 1) || Math.round(iterator.results % requestLimitResults) == requestLimitResults - 1) ||
      (errors.length > (errorLimit || 50));

    if (shouldFlush) {
      // wait for buffered page promises and collect results safely from settled.value
      let searchResultsSettled = await Promise.allSettled(searchResultsPromises);

      if (eventListener?.onResultsSettled) {
        if (eventListener.onResultsSettled.constructor?.name === 'AsyncFunction') {
          await eventListener.onResultsSettled(searchResultsSettled);
        } else {
          eventListener.onResultsSettled(searchResultsSettled);
        }
      }

      // collect successful page results
      for (const settled of searchResultsSettled) {
        if (settled.status === 'fulfilled') {
          const pageArr = Array.isArray(settled.value) ? settled.value : [];
          totalSearchResults = [...totalSearchResults, ...pageArr.filter(item => item)];
        } else {
          // rejected: already recorded in errors earlier (we don't double-push)
        }
      }

      // clear buffer
      searchResultsPromises = [];
    }

    // Advance page / iterator
    page = page + 1;
    iterator.results = iterator.results + 1;

    // If a worker (getSearchPageResultsFn) meanwhile set breakStates.results = true,
    // we must break the loop — but make sure all already-buffered promises were flushed above.
    if (breakStates.results) {
      break;
    }

    // safety: if page exceeded SAFE_MAX_PAGE, break to avoid runaway
    if (page > SAFE_MAX_PAGE) {
      errors.push(new Error(`Exceeded SAFE_MAX_PAGE (${SAFE_MAX_PAGE}) — breaking loop`));
      break;
    }
  }

  return totalSearchResults;
}

/*end universal search page scraper*/

/**
 * Extracts the hostname from a URL string using a regular expression.
 * 
 * @param {string} data - The URL string from which to extract the hostname.
 * @returns {string} The hostname extracted from the URL.
 * @tags #string #url #utility #regex
 * @deprecated use parseURL
 */
export function getURLHostName(data) {
  // var a = document.createElement('a');
  // a.href = data;
  //return a.hostname;
  return [...data.matchAll(new RegExp('^(?:\\w+\:\\/\\/)?([^\\/]+)(.*)$', 'gim'))][0][1];
}

/**
 * Checks if an object is a Promise.
 * 
 * @param {*} obj - The object to check.
 * @returns {boolean} True if the object is a Promise, otherwise false.
 * @tags #promise #utility #type-checking
 */
export function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * Redirects the browser to a specified URL.
 * 
 * @param {string} path - The URL to redirect to.
 * @tags #dom #navigation #utility
 */
export function redirectTo(path) {
  window.location.href = path;
}

/**
 * Renders a flexbox-based HTML grid from a 3-level array.
 * Supports custom CSS classes for grid, rows, cells, and items.
 */
export function renderFlexGrid(
  data: UnsonetDataGrid,
  options?: {
    gridClass?: string;
    rowClass?: string;
    cellClass?: string;
    itemClass?: string;
  }
): string {
  const {
    gridClass = 'grid',
    rowClass = 'row',
    cellClass = 'cell',
    itemClass = 'cell-item'
  } = options || {};

  return `
    <div class="${gridClass}">
      ${data.map(row => `
        <div class="${rowClass}">
          ${row.map(col => `
            <div class="${cellClass}">
              ${col.map(item => `
                <div class="${itemClass}">
                  ${escapeHtml(item)}
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

/**
 * Escapes special HTML characters in a string to make it safe for rendering in HTML.
 * Prevents XSS (Cross-Site Scripting) attacks by converting characters like `<`, `>`, `&`, etc., into their HTML entity equivalents.
 * 
 * @param {string} text - The input string to escape.
 * @returns {string} The escaped string, safe for HTML rendering.
 * @tags #string #security #utility #html
 * @altname safetext
 */
export function escapeHtml(text) {
  var table = {
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    '\'': 'apos',//'#039'
    '&': 'amp',
    '\r': '#10',
    '\n': '#13'
  };

  //alt:
  // const div = document.createElement('div');
  // div.textContent = str;
  // return div.innerHTML;

  return text.toString().replace(/[<>"'\r\n&]/g, function (chr) {
    return '&' + table[chr] + ';';
  });
};

/**
 * Unescapes HTML entities in a string.
 * 
 * @param {string} text - The string containing HTML entities.
 * @returns {string} - The unescaped string.
 */
export function unescapeHtml(text: string): string {
  const table: Record<string, string> = {
    'lt': '<',
    'gt': '>',
    'quot': '"',
    'apos': "'",
    'amp': '&',
    '#10': '\r',
    '#13': '\n'
  };

  return text.replace(/&(?:lt|gt|quot|apos|amp|#10|#13);/g, (match) => {
    const key = match.slice(1, -1);
    return table[key] || match;
  });
}


/**
 * Creates an HTML attribute string in the format `attribute="value"`.
 * 
 * @param {string} attr - The attribute name.
 * @param {string} str - The attribute value.
 * @returns {string} The formatted attribute string.
 * @tags #string #utility #html
 */
export function attrStr(attr, str) {
  return `${attr}="${str}"`;
}

/**
 * Adds a specified number of days to a given date.
 * 
 * @param {Date} date - The initial date.
 * @param {number} days - The number of days to add.
 * @returns {Date} A new date object with the added days.
 * @tags #date #utility
 * @deprecated use dateAdd
 */
export function addDays(date, days) {
  var newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
* Adds time to a date. Modelled after MySQL DATE_ADD function.
* Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
* @see https://stackoverflow.com/a/1214753/18511
* 
* @param date  Date to start with
* @param interval  One of: year, quarter, month, week, day, hour, minute, second
* @param units  Number of units of the given interval to add.
*/
export function dateAdd(date, interval, units) {
  if (!(date instanceof Date)) {
    return undefined;
  }
  const INTERVALS = {
    YEARS: ['y', 'year', 'years'],
    QUARTERS: ['q', 'quarter', 'quarters'],
    MONTHS: ['m', 'month', 'months'],
    WEEKS: ['w', 'week', 'weeks'],
    DAYS: ['d', 'day', 'days'],
    HOURS: ['h', 'hour', 'hours'],
    MINUTES: ['m', 'minute', 'minutes'],
    SECONDS: ['s', 'second', 'seconds'],
    MILLISECONDS: ['ms', 'millisecond', 'milliseconds']
  };

  var ret = new Date(date); //don't change original date
  var checkRollover = function () { if (ret.getDate() != date.getDate()) ret.setDate(0); };
  var checkInterval = function (interval, intervalList) { return intervalList.includes(String(interval).trim().toLowerCase()) };

  switch (true) {
    case checkInterval(interval, INTERVALS.YEARS): ret.setFullYear(ret.getFullYear() + units); checkRollover(); break;
    case checkInterval(interval, INTERVALS.QUARTERS): ret.setMonth(ret.getMonth() + 3 * units); checkRollover(); break;
    case checkInterval(interval, INTERVALS.MONTHS): ret.setMonth(ret.getMonth() + units); checkRollover(); break;
    case checkInterval(interval, INTERVALS.WEEKS): ret.setDate(ret.getDate() + 7 * units); break;
    case checkInterval(interval, INTERVALS.DAYS): ret.setDate(ret.getDate() + units); break;
    case checkInterval(interval, INTERVALS.HOURS): ret.setTime(ret.getTime() + units * 3600000); break;
    case checkInterval(interval, INTERVALS.MINUTES): ret.setTime(ret.getTime() + units * 60000); break;
    case checkInterval(interval, INTERVALS.SECONDS): ret.setTime(ret.getTime() + units * 1000); break;
    case checkInterval(interval, INTERVALS.MILLISECONDS): ret.setTime(ret.getTime() + units); break;
    default: ret = undefined; break;
  }
  return ret;
}

/**
 * Generates an array of dates between a start date and a stop date.
 * 
 * @param {Date} startDate - The start date of the range.
 * @param {Date} stopDate - The end date of the range.
 * @returns {Array<Date>} An array of dates between the start and stop dates, inclusive.
 * @tags #date #utility #array
 */
export function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = dateAdd(currentDate, 'days', 1);
  }
  return dateArray;
}

/**
 * Removes escape slashes from a string, replacing escaped characters with their unescaped versions.
 * 
 * @param {string} str - The input string containing escape slashes.
 * @returns {string} The string with escape slashes removed.
 * @tags #string #utility #regex
 */
export function stripSlashes(str) {
  return str.replace(/\\(.)/mg, "$1");
}

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
export function detectCase(input: string): string {
  let caseRegExpPatterns = {
    'constantCase': /^([\p{Lu}][\p{Lu}0-9_]+)+$/u,
    'snakeCase': /^([\p{Ll}][\p{Ll}0-9_]+)+$/u,
    'kebabCase': /^([\p{Ll}][\p{Ll}0-9-]+)+$/u,
    'lowerCase': /^[\p{Ll} ]+$/u,
    'upperCase': /^[\p{Lu}][\p{Lu}0-9_]*$/u,
    'titleCase': /^(?:\p{N}+\s+)?(?:(?:(?<!\p{Lu})[\p{Lu}]{1,1}\p{Ll}{0,}|\p{N})*\s{0,})+$/u,
    'pascalCase': /^(?:[\p{Lu}][\p{Ll}\p{Lu}]*){2,}$/u,
    'camelCase': /^([\p{Ll}][\p{Ll}0-9]*[\p{Lu}]+[\p{Ll}0-9]*)+$/u,
    'spongeCase': /^(?<![\p{L}\p{N}])(?:\p{Lu}\p{Ll})+(?:\p{Lu})?(?![\p{L}\p{N}])$/u,
    'unknown': /[.!?;:,](?!(?:\s|$))/u,
  }

  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (!input) return 'unknown';

  if (input.includes('_')) {
    if (caseRegExpPatterns['constantCase'].test(input)) return 'constantCase';
    if (caseRegExpPatterns['snakeCase'].test(input)) return 'snakeCase';
    return 'mixedCase';
  }

  if (input.includes('-')) {
    if (caseRegExpPatterns['kebabCase'].test(input)) return 'kebabCase';
    return 'mixedCase';
  }

  if (caseRegExpPatterns['lowerCase'].test(input) || (input === input.toLowerCase())) return 'lowerCase';
  if (caseRegExpPatterns['upperCase'].test(input) || (input === input.toLocaleUpperCase())) return 'upperCase';
  let isNumberStr = (str) => (/^[\d]+$/).test(str)
  const words = input.split(/[^\p{L}]/gu).filter(item => item && !isNumberStr(item));
  if (
    (words.length >= 1) &&
    (
      words.every((word) => caseRegExpPatterns['titleCase'].test(word)) ||
      (/^[0-9]+$/.test(words[0]) && caseRegExpPatterns['titleCase'].test(words[1]))//The exception to previous is when the first word is a number making the second word a candidate for pascal case
    )
  ) {
    return 'titleCase';
  }

  if (words.length > 1 && caseRegExpPatterns['pascalCase'].test(words[0])) {
    return 'sentenceCase';
  }

  if (
    (() => {
      let filteredWords = words.filter(item => item.length > 2);
      return filteredWords.length && filteredWords.every((word) => caseRegExpPatterns['spongeCase'].test(input))
    })()
  ) {
    return 'spongeCase';
  }

  if (caseRegExpPatterns['pascalCase'].test(input)) return 'pascalCase';
  if (caseRegExpPatterns['camelCase'].test(input)) return 'camelCase';
  if (caseRegExpPatterns['unknown'].test(input)) return 'unknown';
  return 'unknown';
};

/**
 * Converts a string to a specified casing style using predefined case conversion functions.
 * 
 * @param {string} phrase - The input string to convert.
 * @param {string} letterCase - The target casing style (e.g., 'camelCase', 'snakeCase', 'kebabCase', etc.).
 * @returns {string} The string converted to the specified casing style, or the original string if the style is unknown.
 * @tags #string #utility #formatting #casing
 */
export function setCase(phrase, letterCase) {
  let caseFunctions = {
    'constantCase': toConstantCase,
    'snakeCase': toSnakeCase,
    'kebabCase': toKebabCase,
    'lowerCase': toLowerCase,
    'upperCase': toUpperCase,
    'pascalCase': toPascalCase,
    'sentenceCase': toSentenceCase,
    'titleCase': toTitleCase,
    'camelCase': toCamelCase,
    'alternateCase': toAlternateCase,
    'spongeCase': toSpongeCase,
    'randomCase': toRandomCase,
    'unknown': (str) => str,
  }

  return (caseFunctions?.[letterCase] || caseFunctions?.['unknown'])(phrase);
}

/**
 * Removes diacritical marks (accents) from a string by normalizing it to NFD (Normalization Form Decomposition)
 * and removing combining characters.
 * 
 * @param {string} str - The input string containing diacritics.
 * @returns {string} The string with diacritical marks removed.
 * @tags #string #utility #formatting
 * @altname deburr
 * @see https://stackoverflow.com/a/75838423/14638643
 */
export function removeDiacritics(str, extendedRange?) {

  if (!str) return str;

  let normalized = str.normalize("NFD"); //NFKD

  if (!extendedRange) {
    return normalized.replace(regExpPatterns.combiningDiacritics, "");
  }

  // lazy init
  if (!removeDiacritics?.['_diacriticsMap']) {

    const defaultDiacriticsRemovalMap = [
      //latn
      { 'base': 'A', 'letters': '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
      { 'base': 'AA', 'letters': '\uA732' },
      { 'base': 'AE', 'letters': '\u00C6\u01FC\u01E2' },
      { 'base': 'AO', 'letters': '\uA734' },
      { 'base': 'AU', 'letters': '\uA736' },
      { 'base': 'AV', 'letters': '\uA738\uA73A' },
      { 'base': 'AY', 'letters': '\uA73C' },
      { 'base': 'B', 'letters': '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
      { 'base': 'C', 'letters': '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
      { 'base': 'D', 'letters': '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0' },
      { 'base': 'DZ', 'letters': '\u01F1\u01C4' },
      { 'base': 'Dz', 'letters': '\u01F2\u01C5' },
      { 'base': 'E', 'letters': '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
      { 'base': 'F', 'letters': '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
      { 'base': 'G', 'letters': '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
      { 'base': 'H', 'letters': '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
      { 'base': 'I', 'letters': '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
      { 'base': 'J', 'letters': '\u004A\u24BF\uFF2A\u0134\u0248' },
      { 'base': 'K', 'letters': '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
      { 'base': 'L', 'letters': '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
      { 'base': 'LJ', 'letters': '\u01C7' },
      { 'base': 'Lj', 'letters': '\u01C8' },
      { 'base': 'M', 'letters': '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
      { 'base': 'N', 'letters': '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
      { 'base': 'NJ', 'letters': '\u01CA' },
      { 'base': 'Nj', 'letters': '\u01CB' },
      { 'base': 'O', 'letters': '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
      { 'base': 'OI', 'letters': '\u01A2' },
      { 'base': 'OO', 'letters': '\uA74E' },
      { 'base': 'OU', 'letters': '\u0222' },
      { 'base': 'OE', 'letters': '\u008C\u0152' },
      { 'base': 'oe', 'letters': '\u009C\u0153' },
      { 'base': 'P', 'letters': '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
      { 'base': 'Q', 'letters': '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
      { 'base': 'R', 'letters': '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
      { 'base': 'S', 'letters': '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
      { 'base': 'T', 'letters': '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
      { 'base': 'TZ', 'letters': '\uA728' },
      { 'base': 'U', 'letters': '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
      { 'base': 'V', 'letters': '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
      { 'base': 'VY', 'letters': '\uA760' },
      { 'base': 'W', 'letters': '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
      { 'base': 'X', 'letters': '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
      { 'base': 'Y', 'letters': '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
      { 'base': 'Z', 'letters': '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
      { 'base': 'a', 'letters': '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
      { 'base': 'aa', 'letters': '\uA733' },
      { 'base': 'ae', 'letters': '\u00E6\u01FD\u01E3' },
      { 'base': 'ao', 'letters': '\uA735' },
      { 'base': 'au', 'letters': '\uA737' },
      { 'base': 'av', 'letters': '\uA739\uA73B' },
      { 'base': 'ay', 'letters': '\uA73D' },
      { 'base': 'b', 'letters': '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
      { 'base': 'c', 'letters': '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
      { 'base': 'd', 'letters': '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
      { 'base': 'dz', 'letters': '\u01F3\u01C6' },
      { 'base': 'e', 'letters': '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
      { 'base': 'f', 'letters': '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
      { 'base': 'g', 'letters': '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
      { 'base': 'h', 'letters': '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
      { 'base': 'hv', 'letters': '\u0195' },
      { 'base': 'i', 'letters': '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
      { 'base': 'j', 'letters': '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
      { 'base': 'k', 'letters': '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
      { 'base': 'l', 'letters': '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
      { 'base': 'lj', 'letters': '\u01C9' },
      { 'base': 'm', 'letters': '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
      { 'base': 'n', 'letters': '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
      { 'base': 'nj', 'letters': '\u01CC' },
      { 'base': 'o', 'letters': '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
      { 'base': 'oi', 'letters': '\u01A3' },
      { 'base': 'ou', 'letters': '\u0223' },
      { 'base': 'oo', 'letters': '\uA74F' },
      { 'base': 'p', 'letters': '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
      { 'base': 'q', 'letters': '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
      { 'base': 'r', 'letters': '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
      { 'base': 's', 'letters': '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
      { 'base': 't', 'letters': '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
      { 'base': 'tz', 'letters': '\uA729' },
      { 'base': 'u', 'letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
      { 'base': 'v', 'letters': '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
      { 'base': 'vy', 'letters': '\uA761' },
      { 'base': 'w', 'letters': '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
      { 'base': 'x', 'letters': '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
      { 'base': 'y', 'letters': '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
      { 'base': 'z', 'letters': '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' },
      //cyrl
      { 'base': 'А', 'letters': '\u0410\u04D0\u04D2\u04D4\u04DA\u04DE' },
      { 'base': 'а', 'letters': '\u0430\u04D1\u04D3\u04D5\u04DB\u04DF' },
      { 'base': 'Е', 'letters': '\u0415\u0400\u0401\u04D6\u04D8\u04DA' },
      { 'base': 'е', 'letters': '\u0435\u0450\u0451\u04D7\u04D9\u04DB' },
      { 'base': 'Ж', 'letters': '\u0416\u04C1' },
      { 'base': 'ж', 'letters': '\u0436\u04C2' },
      { 'base': 'З', 'letters': '\u0417\u04DE\u04E0\u0498' },
      { 'base': 'з', 'letters': '\u0437\u04DF\u04E1\u0499' },
      { 'base': 'И', 'letters': '\u0418\u040D\u04E2\u0419' },
      { 'base': 'и', 'letters': '\u0438\u045D\u04E3\u0439' },
      { 'base': 'Й', 'letters': '\u0419' },
      { 'base': 'й', 'letters': '\u0439' },
      { 'base': 'К', 'letters': '\u041A\u049A\u049C\u04A0\u04C3\u051E' },
      { 'base': 'к', 'letters': '\u043A\u049B\u049D\u04A1\u04C4\u051F' },
      { 'base': 'Л', 'letters': '\u041B\u04C5' },
      { 'base': 'л', 'letters': '\u043B\u04C6' },
      { 'base': 'Н', 'letters': '\u041D\u04A2\u04A4\u04C7' },
      { 'base': 'н', 'letters': '\u043D\u04A3\u04A5\u04C8' },
      { 'base': 'О', 'letters': '\u041E\u04E6\u04E8\u04EA\u04EC\u04EE' },
      { 'base': 'о', 'letters': '\u043E\u04E7\u04E9\u04EB\u04ED\u04EF' },
      { 'base': 'П', 'letters': '\u041F\u04A6' },
      { 'base': 'п', 'letters': '\u043F\u04A7' },
      { 'base': 'Р', 'letters': '\u0420\u048E' },
      { 'base': 'р', 'letters': '\u0440\u048F' },
      { 'base': 'С', 'letters': '\u0421\u04AA\u04AC\u04BA' },
      { 'base': 'с', 'letters': '\u0441\u04AB\u04AD\u04BB' },
      { 'base': 'Т', 'letters': '\u0422\u04A8\u04AC' },
      { 'base': 'т', 'letters': '\u0442\u04A9\u04AD' },
      { 'base': 'У', 'letters': '\u0423\u040E\u04EE\u04F0\u04F2\u04AE' },
      { 'base': 'у', 'letters': '\u0443\u045E\u04EF\u04F1\u04F3\u04AF' },
      { 'base': 'Х', 'letters': '\u0425\u04B2\u04B6' },
      { 'base': 'х', 'letters': '\u0445\u04B3\u04B7' },
      { 'base': 'Ч', 'letters': '\u0427\u04B8\u04CB' },
      { 'base': 'ч', 'letters': '\u0447\u04B9\u04CC' },
      { 'base': 'Ы', 'letters': '\u042B\u04F8' },
      { 'base': 'ы', 'letters': '\u044B\u04F9' },
      { 'base': 'Э', 'letters': '\u042D\u04EC' },
      { 'base': 'э', 'letters': '\u044D\u04ED' },
      { 'base': 'Ю', 'letters': '\u042E\u04E2' },
      { 'base': 'ю', 'letters': '\u044E\u04E3' },
      { 'base': 'Я', 'letters': '\u042F\u04F6' },
      { 'base': 'я', 'letters': '\u044F\u04F7' }
    ];

    const map = {};

    for (let i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
      const { base, letters } = defaultDiacriticsRemovalMap[i];
      for (let j = 0; j < letters.length; j++) {
        map[letters[j]] = base;
      }
    }

    removeDiacritics['_diacriticsMap'] = map;
  }

  const diacriticsMap = removeDiacritics['_diacriticsMap'];

  normalized = normalized
    .replace(regExpPatterns.combiningDiacritics, "")
    .replace(regExpPatterns.cyrillicCombiningMarks, "");

  return normalized.replace(regExpPatterns.nonAscii, c => diacriticsMap[c] || c);
}

/**
 * Removes regular expression tokens (e.g., escape sequences, special characters, and patterns) from a string.
 * 
 * @param {string} str - The input string containing regular expression tokens.
 * @returns {string} The string with regular expression tokens removed.
 * @tags #string #utility #regex
 */
export function removeRegExpTokens(str) {
  let regExpTokens = /\\(n|r|t|0|s|S|d|D|w|W|x|C|R|v|V|h|H|K|n|pX|PX|P|k|gn|g|xYY|ddd|cY|G|A|Z|z|b|B|f|U|L|E)|[\.\^\$]|((\[|\{|\<|\((\?|\*)).+?(\]|\}|\>|\)))/g;
  return str.replace(regExpPatterns.regExpTokens, "");
}

/**
 * Converts input data to a regular expression object.
 * Attempts to create a RegExp from a string or uses the provided RegExp object.
 * Returns null if conversion fails or input is invalid.
 *
 * @param {string|RegExp|null|undefined} data - Input to convert to RegExp.
 *   Can be a regex pattern string or a RegExp object.
 * @returns {RegExp|null} Returns a RegExp object with global, unicode, and multiline flags
 *   if successful, otherwise returns null.
 *
 * @example
 * // returns /abc/gum
 * convertToRegExp('abc');
 *
 * @example
 * // returns the input RegExp (with possible modified flags)
 * convertToRegExp(/abc/);
 *
 * @example
 * // returns null
 * convertToRegExp('');
 */
export function convertToRegExp(data) {
  let regex: RegExp | null;

  if (data) {
    try {
      regex = typeof data == 'string' ? new RegExp(data, 'gum') : data;
    } catch {
      regex = null;
    }
  }
  return regex;
}
/*end strings*/

/**
 * Counts the number of consecutive elements in an array that satisfy a condition, starting from a specified position.
 * 
 * @param {Array} array - The array to iterate over.
 * @param {number} position - The starting position in the array.
 * @param {Function} compFn - A function that tests each element. Returns `true` if the element satisfies the condition.
 * @returns {number} The count of consecutive elements that satisfy the condition.
 * @tags #array #utility #iteration
 */
export function countFromPosition(array, position, compFn) {
  var count = 0;
  for (var i = position; i < array.length; ++i) {
    if (compFn(array[i])) {
      count++;
    } else {
      break;
    }
  }
  return count
}

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
export function binarySearch(ar, el, compare_fn) {
  var m = 0;
  var n = ar.length - 1;
  while (m <= n) {
    var k = (n + m) >> 1;
    var cmp = compare_fn(el, ar[k]);
    if (cmp > 0) {
      m = k + 1;
    } else if (cmp < 0) {
      n = k - 1;
    } else {
      return k;
    }
  }
  return -m == 0 ? -Infinity : -m;//-m;//-m - 1
}


/**
 * Iterate over an array starting from a given index, moving in the specified direction,
 * and for each element optionally handle it or break out based on provided callbacks.
 *
 * @template T
 * @param {Object} options
 * @param {T[]} options.array         - Array to traverse.
 * @param {number} options.startIndex - Index at which to start the traversal.
 * @param {number} options.increment  - Step: +1 to go forward, -1 to go backward.
 * @param {(item: T, index: number) => boolean} options.addConditionFn
 *        - If true, handlerFn(item) is invoked.
 * @param {(item: T, index: number) => boolean} options.breakConditionFn
 *        - If true, traversal stops immediately.
 * @param {(item: T, index: number) => void} options.handlerFn
 *        - Called for each element where addConditionFn returned true.
 */
export function iterateFromIndex({
  array,
  startIndex,
  increment,
  addConditionFn,
  breakConditionFn,
  handlerFn
}) {
  const n = array.length;
  for (let i = startIndex; i >= 0 && i < n; i += increment) {
    const item = array[i];
    if (addConditionFn(item, i)) {
      handlerFn(item, i);
    }
    if (breakConditionFn(item, i)) {
      break;
    }
  }
}

/**
 * Performs a breadth-first search (BFS) to find paths from a starting node to a target node in a graph represented by an adjacency list.
 * Limits the search depth to 50 to prevent infinite loops in cyclic graphs.
 * 
 * @param {Object} adj - The adjacency list representing the graph.
 * @param {string|number} s - The starting node.
 * @param {string|number} t - The target node.
 * @returns {Array<Array<string|number>>} An array of paths from the starting node to the target node (if found) or all explored paths within the depth limit.
 * @tags #graph #utility #search #bfs
 * @altname afs
 */
export function bfs(adj, s, t) {//my version of the bfs algorithm
  // adj - adjacent list
  // v - visited node (vertex)
  // t is the destination
  let queue = adj[s].map(i => [s, i]);
  let depth = 1;

  while (depth < 50) {
    queue.forEach((pathArr, n) => {
      search(pathArr[depth], n);
    });
    depth++;
  }

  function search(v, n) {
    if (!adj[v]) return;
    for (let i = 0; i < adj[v].length; i++) {
      let neighbor = adj[v][i];

      if (queue[n].indexOf(neighbor) == -1) {
        if (queue[n].length - 1 > depth) {
          let arr = [...queue[n]]
          arr.pop();
          queue.push([...arr, neighbor])
        } else {
          if (queue[n].indexOf(t) == -1) {
            queue[n] = queue[n] ? [...queue[n], neighbor] : [neighbor];
          } else {
            //element found; no need to add another element;
          }
        }

        if (neighbor == t) {
          return;//element found;
        }
      } else {
        if (adj[v].length == 1) {
          //the branch ended
        }
      }
    }
  }

  return queue;
}

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
export function multiGetRange(array, lowEnd, highEnd, addEmpty?) {
  var numArr = [],
    c = highEnd - lowEnd + 1;
  while (c--) {
    numArr[c] = highEnd--;
  }
  if (lowEnd == highEnd) {
    numArr.push(array[lowEnd]);
  }
  var args = [...numArr];
  var result = [];

  for (var i = 0; i < numArr.length; i++) {
    if (array[args[i]] || addEmpty) result.push(array[args[i]]);
  }
  return result;
}

/**
 * Converts a Date object to an ISO 8601 formatted string (UTC time).
 * 
 * @param {Date} d - The Date object to convert.
 * @returns {string} The ISO 8601 formatted date string (e.g., "2023-10-05T14:30:00Z").
 * @tags #date #utility #formatting
 */
export function ISODateString(d?) {
  d = d || new Date();
  function pad(n) { return n < 10 ? '0' + n : n }
  return d.getUTCFullYear() + '-'
    + pad(d.getUTCMonth() + 1) + '-'
    + pad(d.getUTCDate()) + 'T'
    + pad(d.getUTCHours()) + ':'
    + pad(d.getUTCMinutes()) + ':'
    + pad(d.getUTCSeconds()) + 'Z'
};

/**
 * Removes duplicate elements from a multi-dimensional array by comparing stringified versions of the elements.
 * 
 * @param {Array} arr - The multi-dimensional array to filter.
 * @returns {Array} A new array with duplicate elements removed.
 * @tags #array #utility #unique
 */
export function multiDimensionalUnique(arr) {
  var uniques = [];
  var itemsFound = {};
  for (var i = 0, l = arr.length; i < l; i++) {
    var stringified = JSON.stringify(arr[i]);
    if (itemsFound[stringified]) { continue; }
    uniques.push(arr[i]);
    itemsFound[stringified] = true;
  }
  return uniques;
}

/**
 * Pads a number with leading zeros to achieve a specified width.
 * 
 * @param {number|string} number - The number to pad with zeros.
 * @param {number} width - The desired total width of the padded number.
 * @returns {string} The padded number as a string.
 * @tags #number #utility #formatting
 */
export function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + "";
}


// export function getLanguageName(names, langName) {
//   return (names || [])?.find(item => item[0] == langName)?.[1] || (names || [])?.find(item => item[0] == 'eng')?.[1] || (names || [])?.[0]?.[1] || '';
// }

/**
 * Generates an adjacency list from a list of hyphen-separated pairs.
 * Each pair represents a connection between two nodes in a graph.
 * 
 * @param {Array<[string, string]>} dictionaryList - An array of hyphen-separated strings (e.g., [["A","B"], ["B","C"]]).
 * @returns {Object} An adjacency list representing the graph connections.
 * @tags #graph #utility #adjacency-list
 */
export function getAdjacentList(dictionaryKeys) {
  let adj = {};

  dictionaryKeys.forEach((arr, i) => {
    arr.forEach((item, i) => {
      if (!adj[item]) adj[item] = [];
      let neighbor = arr[i == 0 ? 1 : 0];
      if (adj[item].indexOf(neighbor) == -1) {
        adj[item].push(neighbor)
      }
    });
  });

  return adj;
}


/**
 * Converts a number to a hexadecimal string with a fixed length, padding with leading zeros if necessary.
 * 
 * @param {number} number - The number to convert to hexadecimal.
 * @param {number} length - The desired length of the hexadecimal string.
 * @returns {string} The hexadecimal string in uppercase, padded to the specified length.
 * @tags #number #utility #hex #formatting
 * @see https://stackoverflow.com/a/10937446
 */
function fixedHex(number, length) {
  var str = number.toString(16).toUpperCase();
  while (str.length < length)
    str = "0" + str;
  return str;
}

/**
 * Converts non-ASCII characters in a string to their Unicode escape sequences (e.g., `\uXXXX`).
 * 
 * @param {string} str - The input string to convert.
 * @returns {string} The string with non-ASCII characters replaced by their Unicode escape sequences.
 * @tags #string #utility #unicode #formatting
 * @see https://stackoverflow.com/a/10937446
 */
export function unicodeLiteral(str) {
  var i;
  var result = "";
  for (i = 0; i < str.length; ++i) {
    /* You should probably replace this by an isASCII test */
    if (str.charCodeAt(i) > 126 || str.charCodeAt(i) < 32)
      result += "\\u" + fixedHex(str.charCodeAt(i), 4);
    else
      result += str[i];
  }

  return result;
}

/**
 * Converts a string to a Unicode-escaped string, replacing non-ASCII characters with their `\uXXXX` representations.
 * 
 * @param {string} str - The input string to convert.
 * @returns {string} The Unicode-escaped string.
 * @tags #string #utility #unicode #formatting
 */
export function toUnicode(str) {
  return str.split('').map(function (value, index, array) {
    var temp = value.charCodeAt(0).toString(16).padStart(4, '0');
    if (temp.length > 2) {
      return '\\u' + temp;
    }
    return value;
  }).join('');
}

/**
 * Generates a random hexadecimal color code.
 * 
 * @returns {string} A random color code in the format `#RRGGBB`.
 * @tags #color #utility #random
 */
export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Extracts the last word from a string, optionally ignoring trailing spaces or hyphens.
 * 
 * @param {string|any} o - The input value (converted to a string).
 * @param {boolean} [strict] - If true, trailing spaces and hyphens are not ignored.
 * @returns {string} The last word in the string.
 * @tags #string #utility #parsing
 */
export function lastWord(o, strict?) {
  return ("" + o).replace(strict ? '' : /[\s-]+$/, '').split(/[\s-]/).pop();
}

/**
 * Replaces the last word in a string with a new string.
 * 
 * @param {string} str - The input string.
 * @param {string} newStr - The string to replace the last word with.
 * @returns {string} The modified string with the last word replaced.
 * @tags #string #utility #formatting
 */
export function replaceLastWord(str, newStr) {
  return str.replace(/(\S+)$/, newStr);
}

/*end of strings*/

/**
 * Detects if the current device is a mobile device by checking the user agent string and other properties.
 * 
 * @returns {boolean} True if the device is a mobile device, otherwise false.
 * @tags #browser #utility #mobile-detection
 */
export function mobileCheck() {
  let check = false;
  (function (a: string) {
    a = a || '';
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a?.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || (window as any).opera || '');
  return check || (typeof window.orientation !== 'undefined');
};

/**
 * Detects if the current device is a mobile device or tablet by checking the user agent string and other properties.
 * 
 * @returns {boolean} True if the device is a mobile device or tablet, otherwise false.
 * @tags #browser #utility #mobile-detection #tablet-detection
 */
export function mobileAndTabletCheck() {
  let check = false;
  (function (a: string) {
    a = a || '';
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a?.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || (window as any).opera || '');
  return check;
};

/**
 * Retrieves the browser's language setting, optionally returning the full language code or just the primary language tag.
 * 
 * @param {boolean} [full=false] - If true, returns the full language code (e.g., "en-US"). If false, returns only the primary language tag (e.g., "en").
 * @returns {string|undefined} The browser's language code, or `undefined` if the language cannot be determined.
 * @tags #browser #utility #language-detection
 */
export function getBrowserLang(full = false) {
  if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
    return undefined;
  }

  let browserLang: any = window.navigator.languages ? window.navigator.languages[0] || '' : '';
  browserLang = browserLang || window.navigator.language || (window.navigator as any).browserLanguage || (window.navigator as any).userLanguage;

  if (typeof browserLang === 'undefined') {
    return undefined
  }

  if (browserLang?.indexOf('-') !== -1) {
    browserLang = full ? browserLang : browserLang?.split('-')?.[0];
  }

  if (browserLang?.indexOf('_') !== -1) {
    browserLang = full ? browserLang : browserLang?.split('_')?.[0];
  }

  return browserLang;
}

//polyfills

/**
 * Replaces all occurrences of a pattern in a string with a specified replacement.
 * 
 * @param {string} str - The input string to perform replacements on.
 * @param {RegExp} match - The regular expression pattern to match.
 * @param {string} replacement - The string to replace each match with.
 * @returns {string} The string with all matches replaced.
 * @tags #string #utility #regex
 */
export function replaceAll(str: string, match: RegExp, replacement) {
  return str.replace(match, () => replacement);
}




/**
 * Provides a polyfill for `localStorage` in environments where it is not natively supported.
 * If `window.localStorage` is available, it uses that; otherwise, it falls back to a polyfill implementation.
 * 
 * @returns {Storage|Proxy} The `localStorage` object, either from the browser or a polyfill.
 * @tags #browser #utility #localStorage #polyfill
 * @see https://github.com/capaj/localstorage-polyfill
 */
export function getLocalStorage() {
  let global = { localStorage: null };

  const valuesMap = new Map()

  class LocalStorage {
    getItem(key) {
      const stringKey = String(key)
      if (valuesMap.has(key)) {
        return String(valuesMap.get(stringKey))
      }
      return null
    }

    setItem(key, val) {
      valuesMap.set(String(key), String(val))
    }

    removeItem(key) {
      valuesMap.delete(key)
    }

    clear() {
      valuesMap.clear()
    }

    key(i) {
      if (arguments.length === 0) {
        throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.") // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
      }
      var arr = Array.from(valuesMap.keys())
      return arr[i]
    }

    get length() {
      return valuesMap.size
    }
  }
  const instance = new LocalStorage()

  global.localStorage = new Proxy(instance, {
    set: function (obj, prop, value) {
      if (LocalStorage.prototype.hasOwnProperty(prop)) {
        instance[prop] = value
      } else {
        instance.setItem(prop, value)
      }
      return true
    },
    get: function (target, name) {
      if (LocalStorage.prototype.hasOwnProperty(name)) {
        return instance[name]
      }
      if (valuesMap.has(name)) {
        return instance.getItem(name)
      }
    }
  })

  return (typeof window !== "undefined") ? window.localStorage || global.localStorage : global.localStorage || null;
}

/**
 * Converts a time string in the format "MM:SS" to seconds.
 * If the input is already a number, it returns the number as is.
 * 
 * @param {string|number} time - The time string (e.g., "1:30") or a number representing seconds.
 * @returns {number} The total number of seconds.
 * @tags #time #utility #conversion
 */
export function timeToSeconds(time) {
  if (!isNaN(time)) {
    return time;
  }

  const [mins, secs] = time.match(/\d+/g).map((str) => Number(str));
  const seconds = mins * 60 + secs;

  return seconds;
};

/**
 * Converts a number of seconds into a time string in the format "MM:SS".
 * 
 * @param {number} seconds - The number of seconds to convert.
 * @returns {string} The time string in "MM:SS" format.
 * @tags #time #utility #conversion
 */
export function secondsToTime(seconds) {
  seconds = +seconds;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs}`;
}

/**
 * Converts milliseconds into a specified time format (seconds, minutes, hours, or days).
 * If no format is provided, returns an object with days, hours, minutes, and seconds.
 * 
 * @param {number} miliseconds - The number of milliseconds to convert.
 * @param {string} [format] - The desired output format: 's' for seconds, 'm' for minutes, 'h' for hours, or 'd' for days.
 * @returns {number|Object} The converted time in the specified format, or an object with days, hours, minutes, and seconds.
 * @tags #time #utility #conversion
 */
export function convertMiliseconds(miliseconds: number, format) {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000) + '');
  total_minutes = parseInt(Math.floor(total_seconds / 60) + '');
  total_hours = parseInt(Math.floor(total_minutes / 60) + '');
  days = parseInt(Math.floor(total_hours / 24) + '');

  seconds = parseInt((total_seconds % 60) + '');
  minutes = parseInt((total_minutes % 60) + '');
  hours = parseInt((total_hours % 24) + '');

  switch (format) {
    case 's':
      return total_seconds;
    case 'm':
      return total_minutes;
    case 'h':
      return total_hours;
    case 'd':
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
};

/**
 * Normalizes a file name by replacing spaces with underscores and ensuring the correct file extension.
 *
 * @param {string} fileName - The original file name to be normalized.
 * @param {string} extension - The file extension to be appended to the normalized file name.
 * @returns {string} The normalized file name with the specified extension.
 * @tags #string #file
 * @deprecated upgrade needed
 */
export function normalizeFileName(fileName: string, extension: string) {
  const suffix = '.' + extension
  const extensionPattern = new RegExp(`(\\${extension})?$`)

  return fileName.replace(/\s+/, '_').replace(extensionPattern, suffix)
}

/**
 * Normalizes an XML name by removing invalid characters and replacing spaces with hyphens.
 *
 * @param {string} data - The original XML name to be normalized.
 * @returns {string} The normalized XML name.
 * @tags #string #xml
 */

export function normalizeXMLName(data: string) {
  return data.trim().replace(new RegExp(`^xml|[^a-zA-Z0-9 _\\-\\.:]+`, 'gim'), "").replace(new RegExp(' ', 'gim'), '-').toLowerCase();
}

/**
 * Adjusts the shade of a given color by a specified percentage.
 *
 * @param {string} color - The hexadecimal color code to be shaded.
 * @param {number} percent - The percentage by which to lighten or darken the color.
 * @returns {string} The shaded color in hexadecimal format.
 * @tags #color #converter
 */

export function shadeColor(color, percent) {

  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent) / 100) as any);
  G = parseInt((G * (100 + percent) / 100) as any);
  B = parseInt((B * (100 + percent) / 100) as any);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}

/**
 * A library for color manipulation and conversion.
 *
 * @returns {Object} An object containing color conversion and manipulation functions.
 * @tags #color #converter #library
 */
export function colorLib() {
  let Lib = {};

  Lib['convert'] = {
    charToHEX: function (_char) {
      var st = "0123456789abcdef";
      var it = parseInt(_char);
      if (it == 0 || isNaN(_char))
        return "00";
      it = Math.round(Math.min(Math.max(0, it), 255));
      return st.charAt((it - it % 16) / 16) + st.charAt(it % 16);
    },
    //  ---------------------------------------
    //  color
    removeHash: function (_s) {
      return (_s.charAt(0) == '#') ? _s.substring(1, 7) : _s;
    },
    RGBtoHex: function (_rgb) {
      return this.charToHEX(_rgb[0]) + this.charToHEX(_rgb[1]) + this.charToHEX(_rgb[2]);
    },
    HEXtoRGB: function (_hex) {
      var rgb = [];
      rgb[0] = parseInt((this.removeHash(_hex)).substring(0, 2), 16);
      rgb[1] = parseInt((this.removeHash(_hex)).substring(2, 4), 16);
      rgb[2] = parseInt((this.removeHash(_hex)).substring(4, 6), 16);
      return rgb;
    }
  }

  Lib['color'] = {
    //  ==================================================================================
    //  inspire from https://stackoverflow.com/questions/3080421/javascript-color-gradient
    //  ----------------------------------------------------------------------------------
    getGradient: function (_hexFrom, _hexTo, _colorCount) {
      var color_from = Lib['convert'].HEXtoRGB(_hexFrom);  //  start
      var color_to = Lib['convert'].HEXtoRGB(_hexTo);      //  end
      _colorCount = _colorCount - 1;

      if (_colorCount < 1)
        _colorCount = 1;

      //Alpha blending amount
      var alpha = 0.0;
      var out = [];

      for (var i = 0; i < _colorCount; i++) {
        var c = [];
        alpha += (1.0 / _colorCount);

        c[0] = color_from[0] * alpha + (1 - alpha) * color_to[0];
        c[1] = color_from[1] * alpha + (1 - alpha) * color_to[1];
        c[2] = color_from[2] * alpha + (1 - alpha) * color_to[2];

        out.push("#" + Lib['convert'].RGBtoHex(c));
      }
      out.reverse();  //  must reverse, and add last color (to)
      out.push(_hexTo);
      return out;
    },
    addHEXAlpha(color, opacity) {
      var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
      return color + _opacity.toString(16).toUpperCase();
    }
  }

  return Lib;
}

/**
 * Determines if a locale uses 24-hour time format.
 *
 * @param {string} [langCode] - The language code of the locale to check. Defaults to the system locale if not provided.
 * @returns {boolean} True if the locale uses 24-hour time format, false otherwise.
 * @tags #locale #time
 */

export function localeUses24HourTime(langCode?) {
  return new Intl.DateTimeFormat(langCode, {
    hour: 'numeric'
  }).formatToParts(new Date(2020, 0, 1, 13)).find(part => part.type === 'hour').value.length === 2;
}

/**
 * Counts the occurrences of each element in an array.
 *
 * @param {Array} arr - The array to count the duplicates in.
 * @returns {Object} An object where keys are array elements and values are their counts.
 * @tags #array #counter
 */

export function duplicateCountArr(arr) {
  return arr.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {})
}

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

export function renameObjectPropertyName(obj, oldName, newName) {
  let result = (Object as any).fromEntries(Object.entries(obj).map(([key, value]) => {
    return key == oldName ? [newName, value] : [key, value]
  }));
  return result;
}

/**
 * Moves an item from one position to another within an array.
 *
 * @param {number} from - The index of the item to move.
 * @param {number} to - The index where the item should be moved to.
 * @param {Array} arr - The array in which to move the item.
 * @returns {Array} A new array with the item moved to the new position.
 * @tags #array #converter
 */
export function moveArrayItem(from, to, arr) {
  const newArr = [...arr];

  const item = newArr.splice(from, 1)[0];
  newArr.splice(to, 0, item);

  return newArr;
}

/**
 * Counts the occurrences of each element in an array.
 *
 * @param {Array} arr - The array to count the elements in.
 * @returns {Object} An object where keys are array elements and values are their counts.
 * @tags #array #counter
 */
export function getCounts(arr) {
  var counts = {};
  for (var i = 0; i < arr.length; i++) {
    counts[arr[i]] = 1 + (counts[arr[i]] || 0);
  }
  return counts;
}

/**
 * Counts the occurrences of each element in an array and returns them sorted by frequency in descending order.
 *
 * @param {Array} arr - The array to count and sort the elements in.
 * @returns {Object} An object where keys are array elements and values are their counts, sorted by frequency.
 * @tags #array #counter #sorting
 */
export function getCountsSorted(arr) {
  var resultReduce = arr.reduce(function (acc, cur) {
    if (!acc.hash[cur]) {
      acc.hash[cur] = { [cur]: 1 };
      acc.map.set(acc.hash[cur], 1);
      acc.result.push(acc.hash[cur]);
    } else {
      acc.hash[cur][cur] += 1;
      acc.map.set(acc.hash[cur], acc.hash[cur][cur]);
    }
    return acc;
  }, {
    hash: {},
    map: new Map(),
    result: []
  });

  var result = resultReduce.result.sort(function (a, b) {
    return resultReduce.map.get(b) - resultReduce.map.get(a);
  });

  return result.reduce((prev, cur) => {
    prev = { ...prev, ...cur };
    return prev
  }, {});
}

/**
 * Combines multiple arrays into a single array.
 *
 * @param {...Array} arg - The arrays to combine.
 * @returns {Array} A single array containing all elements from the input arrays.
 * @tags #array #converter
 * @deprecated
 */
export function combineArrays(...arg) {
  return [...[...arg].flat()];
}

/**
 * Validates if a given string is a valid email address.
 *
 * @param {string} str - The string to validate as an email address.
 * @returns {boolean} True if the string is a valid email address, false otherwise.
 * @tags #string #validator
 */

export function validEmail(str) {
  return !!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(String(str).toLowerCase())
};

/**
 * Validates if a given string is a valid phone number.
 *
 * @param {string} str - The string to validate as a phone number.
 * @returns {boolean} True if the string is a valid phone number, false otherwise.
 * @tags #string #validator
 */
export function validPhone(str) {
  let parsedStr;
  let error;
  try {
    parsedStr = parsePhone(str);
  } catch (e) {
    parsedStr = null;
    error = true;
  }
  if (str && !error && !parsedStr?.error) {
    return true
  } else {
    return false
  }
};

/**
 * Converts a string to a number, handling commas and non-numeric characters.
 *
 * @param {string} string - The string to convert to a number.
 * @returns {number} The converted number.
 * @tags #string #converter
 * @deprecated
 */
export function toNumber(string) {
  return +string.trim().replace(new RegExp('\\,', 'gim'), '.').replace(new RegExp('[^.0-9]', 'gim'), '');
};

/**
 * Splits an array into subarrays (pigeonholes) of a specified size.
 *
 * @param {Array} array - The array to split.
 * @param {number} pigeonholeSize - The size of each subarray.
 * @returns {Array} An array of subarrays, each containing up to `pigeonholeSize` elements.
 * @tags #array #converter
 */
export function pigeonholeArray(array, pigeonholeSize) {
  return array.reduce((accumulator, currentValue, i) => {
    accumulator[Math.floor(i / pigeonholeSize)].push(currentValue);
    return accumulator;
  }, [...Array(Math.round(array.length / pigeonholeSize))].map(i => []));
};

/**
 * Sets multiple CSS styles on a DOM element.
 *
 * @param {HTMLElement} elem - The DOM element to apply the styles to.
 * @param {Object} propertyObject - An object where keys are CSS properties and values are the styles to apply.
 * @tags #dom #style
 * @deprecated
 */
export function setStyle(elem, propertyObject) {
  for (var property in propertyObject) {
    elem.style[property] = propertyObject[property];
  }
}

/**
 * Helper function, that allows to attach multiple events to selected objects
 * @param {[object]}   el     [selected element or elements]
 * @param {[type]}   events   [DOM object events like click or touch]
 * @param {Function} callback [Callback method]
 */
export function addMulitListener(el, events, callback, options?) {
  // Split all events to array
  var e = events.split(' ');
  el = Array.isArray(el) || isNodeList(el) ? [...el] : [el];
  el = el.map(item => Array.isArray(item) || isNodeList(item) ? [...item] : item).flat();
  // Loop trough all elements
  Array.prototype.forEach.call(el, function (element, i) {
    // Loop trought all events and add event listeners to each
    Array.prototype.forEach.call(e, function (event, i) {
      element.addEventListener(event, callback, options);
    });
  });
}

/**
 * Checks if the given value is a NodeList, HTMLCollection, or similar collection of DOM nodes.
 * This function is useful for determining if a variable represents a collection of DOM elements.
 *
 * @param {*} nodes - The value to check. Can be any type, but the function is designed to work with DOM collections.
 * @returns {boolean} - Returns `true` if the value is a NodeList, HTMLCollection, or similar collection of DOM nodes; otherwise, returns `false`.
 *
 * @tags #dom #array-like #type-checking
 */
export function isNodeList(nodes) {
  var stringRepr = Object.prototype.toString.call(nodes);

  return typeof nodes === 'object' &&
    /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
    (typeof nodes.length === 'number') &&
    (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
}

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
export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

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
export function roundToNearest(a, num, down?): number {
  return a % num ? down ? a - a % num : a + num - a % num : a
};


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
export function syncFunction(asyncFunction) {
  let result;
  let error;

  const promise = new Promise<void>((resolve, reject) => {
    asyncFunction()
      .then(res => {
        result = res;
        resolve();
      })
      .catch(err => {
        error = err;
        resolve();
      });
  });

  while (!result && !error) {
    //wait
  }

  if (error) {
    throw error;
  }

  return result;
}

/**
 * Generates a UUID (Universally Unique Identifier) version 4.
 * This function uses the `crypto.randomUUID()` method if available, otherwise falls back to a custom implementation.
 *
 * @returns {string} - A randomly generated UUID v4 string.
 *
 * @tags #uuid #hash #random #utility
 */
export function uuidv4() {
  return crypto?.randomUUID() || (([1e7] + '') + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) => {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  });

  //alt:
  //return "randomUUID"in crypto ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, a=>(Number(a) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(a) / 4).toString(16))
}

/**
 * Computes the DJB2 hash of a given string.
 *
 * The DJB2 algorithm is a simple, non-cryptographic hash function
 * designed for general-purpose use, such as hash tables.
 *
 * @param {string} s - The input string to hash.
 * @returns {string} The computed hash as a base-36 string.
 * @tags #hash #utility
 * @example
 * // returns "1x62v0n"
 * djb2("hello");
 * 
 */
export function djb2(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return (h >>> 0).toString(36);
}

/**
 * Generates a random hexadecimal key of a specified length.
 * The key is generated by randomly selecting characters from the set of valid hexadecimal digits (0-9, a-f).
 *
 * @param {number} [keyLength=12] - The length of the key in bytes. Defaults to 12 bytes (24 hex characters).
 * @returns {string} - A randomly generated hexadecimal key.
 *
 * @tags #hex #hash #random #key-generation
 */
export function generateHexKey(keyLength = 12) {
  let hexKey = '';
  const hexCharacters = '0123456789abcdef';

  for (let i = 0; i < keyLength * 2; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    hexKey += hexCharacters[randomIndex];
  }

  return hexKey;

  //alt:
  // const crypto = window.crypto || window.msCrypto; // IE11 support
  // if (!crypto) {
  //     throw new Error('The Crypto API is not supported in this browser.');
  // }
  // let token = '';
  // const randomValues = new Uint8Array(keyLength);
  // crypto.getRandomValues(randomValues);
  // for (let i = 0; i < keyLength; ++i) {
  //     const hexValue = randomValues[i].toString(16);
  //     token += hexValue;
  // }
  // token = token.padStart(keyLength * 2, '0');
  // return token;
}

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
export async function findAsync<T>(
  array: T[],
  predicate: (t: T) => Promise<boolean | any> | any,
  options?: {
    sequential: boolean,
    allSettled: boolean
  }
): Promise<T | undefined> {
  if (options?.sequential) {
    for (const t of array) {
      if (options?.allSettled) {
        const result = await Promise.allSettled([predicate(t)]);
        if (result[0].status === 'fulfilled' && result[0].value) {
          return t;
        }
      } else {
        if ((predicate.constructor.name == 'AsyncFunction' ? await predicate(t) : predicate(t))) {
          return t;
        }
      }
    }
  } else {
    const promises = array.map((t) => (options?.allSettled ? Promise.allSettled([predicate(t)]) : predicate(t)));
    const results = await Promise.all(promises);

    const index = results.findIndex((result) =>
      options?.allSettled ? (result[0].status === 'fulfilled' && result[0].value) : result
    );
    return array[index];
  }

  return undefined;
}

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
export async function someAsync(arr, predicate) {
  for (let e of arr) {
    if (predicate.constructor.name == 'AsyncFunction' ? await predicate(e) : predicate(e)) return true;
  }
  return false;
};

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
export async function filterAsync(arr, predicate) {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v, index) => results[index]);
}

/**
 * Recursively iterates over all properties of an object, including nested objects.
 * Applies a provided function to each non-object property.
 *
 * @param {Object} obj - The object to iterate over.
 * @param {(obj: Object, key: string) => void} fn - A function to apply to each non-object property. Receives the parent object and the current key as arguments.
 *
 * @tags #object #recursion #utility
 */
export function eachRecursive(obj, fn) {
  for (var k in obj) {
    if (typeof obj[k] == "object" && obj[k] !== null) {
      eachRecursive(obj[k], fn);
    } else {
      fn(obj, k);
    }
  }
}

/**
 * Attempts to parse a string as JSON. If parsing fails or the input is not a string, the original value is returned.
 *
 * @param {*} str - The input value to parse. If it's a string, it will be parsed as JSON; otherwise, it will be returned as-is.
 * @returns {*} - The parsed JSON object if successful, or the original input if parsing fails or the input is not a string.
 *
 * @tags #string #json #utility
 */
export function parseString(str) {
  let res;
  if (typeof str == 'string') {
    try {
      res = JSON.parse(str)
    } catch (error) {
      res = str;
    }
  } else {
    res = str;
  }

  return res;
}


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
export function parseStream(str): Array<{ data: any, event?: any, id?: any }> {
  return (str != undefined) && (typeof str == 'string') ? str
    .split(/\n\n(?=^(?:id|data|event))|\n(?=^\{.*\})/gm)
    .map(item => ([...(item?.match(/(?=^(?:id|data|event)).*/gim) || [item])]))
    .reduce((prev, cur) => {
      let obj = cur.reduce((p, c) => {
        let arr = c.split(/(?<=^(?:id|data|event))\:/i);
        let key = arr.length > 1 ? arr[0].trim() : 'data';
        let value;
        try {
          value = JSON.parse(arr[1]);
        } catch (error) {
          value = arr?.[1] != undefined ? arr?.[1]?.trim() : arr?.[0]?.trim();
        }
        p[key] = parseString(value);
        return p;
      }, {})
      return [...prev, obj]
    }, []) as Array<{ data: any, event?: any, id?: any }> : []
}

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
export async function typeWithDelay(element, text, delay) {
  for (let i = 0; i < text.length; i++) {
    element.value += text[i];
    await sleep(delay);
  }
}

/**
 * Validates an IPv4 address.
 * Checks if the provided string is a valid IPv4 address using a regular expression.
 *
 * @param {string} ip - The string to validate as an IPv4 address.
 * @returns {boolean} - Returns `true` if the string is a valid IPv4 address; otherwise, returns `false`.
 *
 * @tags #ip #validation #regex
 */
export function isValidIP(ip) {
  return (/^(?:(?:25[0-5]|(?:2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/).test(ip);
}

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
export function getRandomIP(options?) {
  let rangeValues = [0, 255];
  let { start, end, amount = 1 } = options || {};
  amount = amount || 1;
  start = start ? start : Array(4).fill(rangeValues[0]);
  end = end ? end : Array(4).fill(rangeValues[1]);

  let out = [];
  [start, end] = [start, end].map((range, index) => {
    range = Array.isArray(range) ? range : range.split('.');
    range = range.slice(0, 4).map((e, i) => {
      let arr = Array(4).fill(0)
      arr[i] = +e;
      return isValidIP(arr.join('.')) ? +e : rangeValues[index];
    })
    return range;
  })

  for (var index = 0; index < amount; index++) {
    //var ip = (Math.floor(Math.random() * 255) + 1) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255)) + "." + (Math.floor(Math.random() * 255));
    let ip = [...Array(4)].map((e, i) => (Math.floor(Math.random() * (parseFloat(end[i]) - parseFloat(start[i]) + 1)) + parseFloat(start[i]))).join('.');
    out.push(ip);
  }

  return out.length > 1 ? out : out[0]
}

/**
 * Checks if a string contains an end-of-line character.
 *
 * @param {string} str - The input string to check.
 * @return {boolean} - Returns true if the string contains an end-of-line character, otherwise false.
 * @tags #string
 */
export function hasEOL(str) {
  return /\r\n|\n/.test(str);
}

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
export function multiSort(data, criteria) {
  return data.sort((a, b) => {
    for (let i = 0; i < criteria.length; i++) {
      const { field, order } = criteria[i];
      if (a[field] !== b[field]) {
        return order === 'asc' ? (a[field] > b[field] ? 1 : -1) : (a[field] < b[field] ? 1 : -1);
      }
    }
    return 0;
  });
}

/**
 * Calculates the fractional difference between two values.
 * @param {number} value1 - The first value.
 * @param {number} value2 - The second value.
 * @returns {number} The fractional difference between the two values, expressed as a fraction of 100.
 */
export function calculateDifference(value1, value2) {
  const difference = Math.abs(value1 - value2);
  const fractionalDifference = difference / 100;
  return fractionalDifference;
}

/**
 * Merges two arrays by replacing a range of elements in the first array with the second array.
 * @param {Array<number>} [aArray] - The first array of numbers. If not provided, an empty array is used.
 * @param {Array<number>} [bArray] - The second array of numbers. If not provided, an empty array is used.
 * @returns {Array<number>} A new array where a range of elements from the first array is replaced by the second array.
 * @tags #array #sorting #merge
*/
export function getMergedArray(aArray, bArray) {
  aArray = JSON.parse(JSON.stringify(aArray || '[]')).sort((a, b) => a - b);
  bArray = JSON.parse(JSON.stringify(bArray || '[]')).sort((a, b) => a - b);
  let startIndex = aArray.findLastIndex(value => value <= bArray[0]);
  let endIndex = aArray.findIndex((value, index) => index > startIndex && value > bArray[bArray.length - 1]);
  let replacementEndIndex = endIndex === -1 ? aArray.length : endIndex;

  let newArray = [
    ...aArray.slice(0, startIndex),
    ...bArray,
    ...aArray.slice(replacementEndIndex)
  ];

  return newArray;
}

/**
 * Replaces elements in an array at specified indices with given values and optionally removes extra elements.
 * @param {Array} array - The target array.
 * @param {Array<number> | number} indices - The index or indices of the elements to replace.
 * @param {Object} options - Options for the function.
 * @param {boolean} [options.removeExtra=false] - Whether to remove extra elements between the indices.
 * @param {boolean} [options.mutation=false] - Whether to mutate the original array.
 * @param {...any} values - The values to replace the elements with (can be multiple values via spread).
 * @returns {Array} The modified array with the elements replaced.
 * @deprecated use patchByIndexes
 */
export function replaceByIndexes(array, indices, options = {} as any, ...values) {
  const { removeExtra = false, mutation = false } = options;

  const indicesArray = Array.isArray(indices) ? indices : [indices];

  if (!indicesArray.length) {
    return mutation ? array : [...array];
  }

  const newArray = mutation ? array : [...array];
  const sortedIndices = [...indicesArray].sort((a, b) => a - b);
  const firstIndex = sortedIndices[0];
  const lastIndex = sortedIndices[sortedIndices.length - 1];

  if (removeExtra) {
    newArray.splice(firstIndex, lastIndex - firstIndex + 1, ...values);
  } else {
    sortedIndices.forEach((index, i) => {
      if (index >= 0 && index < newArray.length && i < values.length) {
        newArray[index] = values[i];
      }
    });
  }

  return newArray;
}

/**
 * Replaces a portion of the given string starting at the specified index and spanning the specified length.
 * If `replacement` is a string, it replaces the removed substring.
 * If `replacement` is a function, it is called with the removed substring and its return value (converted to string) is used.
 *
 * @param {string} str The original string.
 * @param {number} position The zero-based index at which to start the replacement. Must be an integer ≥ 0 and ≤ str.length.
 * @param {number} length The number of characters to remove starting at `position`. Must be an integer ≥ 0.
 * @param {string|function(string): string} replacement Either the string to insert, or a callback that receives the removed substring and returns a string.
 * @returns {string} A new string with the specified replacement applied.
 * @throws {TypeError} If `str` is not a string, if `position` or `length` is not an integer, or if `replacement` is neither string nor function.
 * @throws {RangeError} If `position` or `length` is negative, or if `position` > str.length.
 * @deprecated use patchByIndexes
 *
 * @example
 * console.log(replaceByPosition("Hello, world!", 7, 5, "JS")); // "Hello, JS!"
 * @example
 * console.log(replaceByPosition("abcdef", 2, 3, substr => substr.toUpperCase())); // "abCDEf"
 * @example
 * console.log(replaceByPosition("12345", 3, 10, "XYZ")); // "123XYZ"
 */
export function replaceByPosition(str, position, length, replacement) {
  if (typeof str !== 'string') {
    throw new TypeError('First argument must be a string.');
  }
  if (typeof position !== 'number' || !Number.isInteger(position)) {
    throw new TypeError('Parameter "position" must be an integer.');
  }
  if (typeof length !== 'number' || !Number.isInteger(length)) {
    throw new TypeError('Parameter "length" must be an integer.');
  }
  if (position < 0 || length < 0) {
    throw new RangeError('Parameters "position" and "length" must be non-negative.');
  }
  if (position > str.length) {
    throw new RangeError('Parameter "position" exceeds string length.');
  }

  const endPos = Math.min(position + length, str.length);
  const removed = str.slice(position, endPos);

  let newSubstr;
  if (typeof replacement === 'function') {
    newSubstr = replacement(removed);
    if (typeof newSubstr !== 'string') {
      newSubstr = String(newSubstr);
    }
  } else if (typeof replacement === 'string') {
    newSubstr = replacement;
  } else {
    throw new TypeError('Parameter "replacement" must be a string or a function.');
  }

  return str.slice(0, position) + newSubstr + str.slice(endPos);
}

/**
 * Patches an array or string by indices.
 * Supports replace, insert and range replacement.
 *
 * Value entries may be functions:
 * fn(index, oldValue, occurrenceIndex, target)
 *
 * @param {Array|string} target
 * @param {number|number[]} indices
 * @param {Object} [options]
 * @param {boolean} [options.replace=true]
 * @param {boolean} [options.removeExtra=false]
 * @param {boolean} [options.mutation=false]
 * @param {...any} values
 * @tags #array #string #insert #replace #patch
 * @altname replaceByPosition, replaceByIndexes
 * @returns {Array|string}
 */
export function patchByIndexes(target, indices, options, ...values) {
  options = options || {};
  const replace = options.replace === true;
  const removeExtra = options.removeExtra === true;
  const mutation = options.mutation === true;

  const isArray = Array.isArray(target);
  const isString = typeof target === "string";

  if (!isArray && !isString) {
    throw new TypeError("Target must be array or string");
  }

  const idx = Array.isArray(indices) ? indices : [indices];
  const idxLen = idx.length;

  if (!idxLen) {
    return isArray ? (mutation ? target : target.slice()) : target;
  }

  // convert target → array representation
  const arr = isArray
    ? (mutation ? target : target.slice())
    : target.split("");

  let arrLen = arr.length;

  const single = values.length === 1;
  const singleFn = single && typeof values[0] === "function";

  function getValue(index, oldValue, i) {
    if (singleFn) return values[0](index, oldValue, i, target);

    const v = single ? values[0] : values[i];
    return typeof v === "function"
      ? v(index, oldValue, i, target)
      : v;
  }

  // -------- RANGE MODE --------

  if (removeExtra) {

    let min = idx[0];
    let max = idx[0];

    for (let i = 1; i < idxLen; i++) {
      const v = idx[i];
      if (v < min) min = v;
      if (v > max) max = v;
    }

    if (min < 0) min = 0;
    if (max >= arrLen) max = arrLen - 1;

    const deleteCount = max - min + 1;

    arr.splice(min, deleteCount, ...values);

    return isString ? arr.join("") : arr;
  }

  // -------- REPLACE MODE --------

  if (replace) {

    for (let i = 0; i < idxLen; i++) {

      const index = idx[i];
      if (index < 0) continue;

      const old = index < arrLen ? arr[index] : undefined;
      const value = getValue(index, old, i);

      if (value === undefined) continue;

      if (index >= arrLen) {
        arr.length = index;
        arr[index] = value;
        arrLen = arr.length;
      } else {
        arr[index] = value;
      }
    }

    return isString ? arr.join("") : arr;
  }

  // -------- INSERT MODE --------

  const sorted = idx.slice().sort((a, b) => a - b);

  let offset = 0;

  for (let i = 0; i < sorted.length; i++) {

    let index = sorted[i];
    if (index < 0) continue;

    const value = getValue(index, arr[index], i);
    if (value === undefined) continue;

    const pos = index + offset;

    arr.splice(pos, 0, value);

    offset++;
  }

  return isString ? arr.join("") : arr;
}

/**
 * Removes elements from an array at specified indexes.
 * @param {Array} arr - The target array from which elements will be removed.
 * @param {Array<number>} indexes - The indexes of the elements to remove.
 * @returns {Array} The modified array with the specified elements removed.
 */
export function removeByIndexes(arr, indexes) {
  indexes.sort((a, b) => b - a);

  indexes.forEach(index => {
    if (index >= 0 && index < arr.length) {
      arr.splice(index, 1);
    }
  });

  return arr;
}

/**
 * Sets a value in a nested object by specifying a path.
 * @param {Object} obj - The target object to modify.
 * @param {string} path - The path to the property, using dot notation (e.g., 'level1.level2.property').
 * @param {*} value - The value to set at the specified path.
 * @returns {Object} The modified object with the value set at the specified path.
 */
export function setValueByPath(obj, path, value) {
  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }

  current[parts[parts.length - 1]] = value;

  return obj;
}

/**
 * Removes elements from an array at specified indexes.
 * @param {Array} arr - The target array from which elements will be removed.
 * @param {Array<number>} indexes - The indexes of the elements to remove.
 * @returns {Array} The modified array with the specified elements removed.
 */
export function getSplitEdgeRange(options) {
  let {
    arr,
    getLast,
    splitConditionFn,
    ignoreFirstSplitItem,
    includeLastSplitItem,
    includeFirstSplitItem,
  } = options;
  let getIndex = (arr) => getLast ? arr.findLastIndex(splitConditionFn) : arr.findIndex(splitConditionFn);
  let index = getIndex(arr);
  let hasEdgeSplitItem = getLast ? (index == arr.length - 1) : (index == 0);
  index = hasEdgeSplitItem && ignoreFirstSplitItem ? getLast ? getIndex(arr.slice(0, -1)) : getIndex(arr.slice(1)) : index;

  let range = index == -1 ? arr : getLast ? arr.slice(includeLastSplitItem ? index : index + 1) : arr.slice(0, includeLastSplitItem ? index + 1 : index);
  range = hasEdgeSplitItem && !includeFirstSplitItem ? getLast ? range.slice(0, -1) : range.slice(1) : range;
  return { range, index };
}


/**
 * Checks if any suffix of the input substring’s words matches the prefix of the target string’s words,
 * for autocomplete purposes.
 *
 * @param {string} target - The autocomplete suggestion string, e.g. "HelloWorld Person"
 * @param {string} input - The user-typed substring, e.g. "I came. HelloW Pers"
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.fuzzy=false] - Enable fuzzy matching (uses the `fuzzy()` function).
 * @param {Object} [options.fuzzyOptions] - Additional options are passed through to `fuzzy()`.
 *   @param {boolean} [options.fuzzyOptions.ignoreCase=false]
 *   @param {boolean} [options.fuzzyOptions.ignoreProximity=false]
 *   @param {boolean} [options.fuzzyOptions.ignoreDiacritics=false]
 *   @param {number}  [options.fuzzyOptions.location=0]
 *   @param {number}  [options.fuzzyOptions.distance=50]
 *   @param {number}  [options.fuzzyOptions.threshold=1.0]   Maximum allowed score; if score > threshold, index = -1.
 * @returns {boolean} True if a match is found; otherwise false.
 */
export function isAutocompleteMatch(target, input, options?) {
  const { useFuzzy = false, skipExacMatch = false, fuzzyOptions } = options || {};

  // Split a string into words using CamelCase boundaries, dashes, underscores, spaces, or dots.
  let wordSplitWithEndSpace = regExpPatterns.wordSplitWithEndSpace;
  const splitWords = str => Array.from(str.matchAll(wordSplitWithEndSpace))
    .map(m => m[0].toLowerCase());


  const targetWords = splitWords(target);
  const inputWords = splitWords(input);

  if (targetWords.length === 0 || inputWords.length === 0) {
    return false;
  }

  // Try every possible suffix of the inputWords
  for (let start = 0; start < inputWords.length; start++) {
    const suffix = inputWords.slice(start);

    if (suffix.length > targetWords.length) {
      continue;
    }

    let allMatch = true;

    for (let i = 0; i < suffix.length; i++) {
      const textWord = targetWords[i];
      const pattern = suffix[i].slice(0, textWord.length);

      let isLastToken = (start == inputWords.length - 1);
      if (
        skipExacMatch &&
        isLastToken &&
        (useFuzzy ? false : (textWord == pattern))
      ) {
        allMatch = false;
        break;
      }

      if (useFuzzy) {
        if (!fuzzy(textWord, pattern, fuzzyOptions)) {
          allMatch = false;
          break;
        }
      } else {
        if (isLastToken ? !textWord.startsWith(pattern) : !textWord.startsWith(pattern.trim())) {
          allMatch = false;
          break;
        }
      }
    }

    if (allMatch) {
      return true;
    }
  }

  return false;
}

/**
 * Returns the remaining part of the autocomplete suggestion (target) after matching
 * the user input (possibly fuzzily).
 *
 * @param {string} target - The full autocomplete suggestion, e.g. "Hello human"
 * @param {string} input - The user-typed substring, e.g. "Hello hu"
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.fuzzy=false] - Enable fuzzy matching (uses the `fuzzy()` function).
 * @param {Object} [options.fuzzyOptions] - Additional options are passed through to `fuzzy()`.
 *   @param {boolean} [options.fuzzyOptions.ignoreCase=false]
 *   @param {boolean} [options.fuzzyOptions.ignoreProximity=false]
 *   @param {boolean} [options.fuzzyOptions.ignoreDiacritics=false]
 *   @param {number}  [options.fuzzyOptions.location=0]
 *   @param {number}  [options.fuzzyOptions.distance=50]
 *   @param {number}  [options.fuzzyOptions.threshold=1.0]   Maximum allowed score; if score > threshold, index = -1.
 * @returns {string} The remainder of `target` after the matched prefix, or an empty string if no match.
 */
export function getAutocompleteRemainder(target, input, options?) {
  const { useFuzzy = false, fuzzyOptions } = options || {};

  if (!input.trim()) {
    return target;
  }

  let wordSplit = regExpPatterns.wordSplit;
  let wordSplitWithEndSpace = regExpPatterns.wordSplitWithEndSpace;
  const wordInfos = Array.from(target.matchAll(wordSplit))
    .map(m => ({
      word: m[0],
      start: (m as any).index!,
      orig: m[0],
    }));

  //const splitWords = str => str.split(/(?<!\p{Lu})(?=\p{Lu})|-| |_|\./gum);
  //.map(w => w.toLowerCase());

  //const inputWords = splitWords(input);

  const inputWords = [...input.match(wordSplitWithEndSpace)];

  for (let startIdx = 0; startIdx < inputWords.length; startIdx++) {
    const suffix = inputWords.slice(startIdx);
    if (suffix.length > wordInfos.length) continue;

    let allMatch = true;
    let lastI = -1;
    let lastPattern = '';

    for (let i = 0; i < suffix.length; i++) {
      const info = wordInfos[i];
      const text = info.word;
      const pattern = suffix[i].slice(0, text.length);

      const matched = useFuzzy
        ? fuzzy(text, pattern, fuzzyOptions)
        : (options.ignoreCase ? text.toLowerCase().startsWith(pattern.toLowerCase()) : text.startsWith(pattern));

      if (!matched) {
        allMatch = false;
        break;
      }
      lastI = i;
      lastPattern = suffix[i];
    }

    if (allMatch && lastI >= 0) {
      const info = wordInfos[lastI];
      const cutPos = info.start + lastPattern.length;
      let sentencesCaseResults = (() => {
        const sentenceSplitter = regExpPatterns.sentenceSplitter;
        const wordSplit = regExpPatterns.wordSplit;
        let sentences = input.split(sentenceSplitter).slice(-3); //3 for the possibility of defining alternation
        let results = new Array(sentences.length).fill(JSON.parse(JSON.stringify([])));
        for (let sentenceIndex = 0; sentenceIndex < sentences.length; sentenceIndex++) {
          const sentence = sentences[sentenceIndex];
          const words = Array.from(input.matchAll(wordSplit))
            .map(m => {
              return m[0];
            });

          for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
            const word = words[wordIndex];
            let clearWord = wordIndex == words.length - 1 ? word.replace(/\.$/gim, '') : word;
            let wordCase = detectCase(word);
            results[sentenceIndex].push({
              wordCase, word, clearWord
            });
          }

        }

        return results;
      })();

      let specialSymbol = '¬';
      let targetSlice = splitByPosition(target, cutPos).join(specialSymbol);
      let targetSlices = [...targetSlice.match(/(?:\p{L}|\p{N}|\S)+|\s+/gu)];

      let filterSentenceArray = (sentenceArray) => (sentenceArray || [])
        .filter(item => (/^\p{L}+$/gum).test(item.word.trim()));

      let lastSentenceArray = filterSentenceArray(sentencesCaseResults[sentencesCaseResults.length - 1] || []).slice(-2);
      let prevSentenceArray = filterSentenceArray(sentencesCaseResults[sentencesCaseResults.length - 2] || []).slice(-2);
      let prevPrevSentenceArray = filterSentenceArray(sentencesCaseResults[sentencesCaseResults.length - 3] || []).slice(-2);

      let reachedSpecialSymbol = false;

      let remainder = '';
      let wordIndex = 0;
      let sliceIndex = 0;

      while (sliceIndex < targetSlices.length) {
        let targetSlice = targetSlices[sliceIndex];

        let includesSpecialSymbol = targetSlice?.includes(specialSymbol);
        reachedSpecialSymbol = reachedSpecialSymbol || includesSpecialSymbol;

        if (reachedSpecialSymbol) {
          if (!targetSlice.trim()) {
            remainder = remainder + targetSlice;
          } else {

            let sentenceWordObj = includesSpecialSymbol ? lastSentenceArray?.[lastSentenceArray.length - 1] : null;

            let currentWord = sentenceWordObj ? sentenceWordObj.word : targetSlices[sliceIndex];
            let previousWord = (sentenceWordObj ? lastSentenceArray?.[lastSentenceArray.length - 2]?.word || null : targetSlices[sliceIndex - 1]) || null;

            //let isTooShort = (lastPattern.length <= 1) && ['upperCase'].includes(sentenceWordObj.wordCase);
            //let isLackWords = (lastSentenceArray.length <= 1) && ['pascalCase', 'titleCase'].includes(sentenceWordObj.wordCase);

            let targetCase: string = 'unknown';
            let caseSetted: boolean = false;
            let slice;
            let sentenceArray = (() => {
              let res = [];
              if (lastSentenceArray.length) {
                if (lastSentenceArray.length == 1) {
                  if (prevSentenceArray.length) {
                    if (prevSentenceArray.length == 1) {
                      res = [prevPrevSentenceArray[prevPrevSentenceArray.length - 1], prevSentenceArray[prevSentenceArray.length - 1], lastSentenceArray[lastSentenceArray.length - 1]];
                    } else if (prevSentenceArray.length > 1) {
                      res = [prevSentenceArray[prevSentenceArray.length - 2], prevSentenceArray[prevSentenceArray.length - 1], lastSentenceArray[lastSentenceArray.length - 1]]
                    } else {
                      res = lastSentenceArray;
                    }
                  } else {
                    res = lastSentenceArray;
                  }
                } else if (lastSentenceArray.length > 1) {
                  res = lastSentenceArray;
                }
              } else {
                res = lastSentenceArray;
              }
              return res;
            })();

            let uniqueCases = [...new Set(sentenceArray.map(item => item.wordCase))];

            switch (true) {
              case (lastSentenceArray.length == 1): {//Few words in a sentence

                if (uniqueCases.length > 1) {
                  targetCase = 'unknown';
                } else {
                  if (uniqueCases[0] == 'spongeCase') {

                    if (previousWord) {
                      let lastChar = previousWord[previousWord.length];
                      let isUpperCase = detectCase(lastChar) == 'upperCase';

                      slice = toSpongeCase(targetSlice, {
                        firstLowerCase: !isUpperCase
                      });
                      caseSetted = true;
                    } else {
                      targetCase = uniqueCases[0];
                    }

                  } else {
                    if (sentenceWordObj) {
                      let isTooShort = (lastPattern.length <= 1) && ['upperCase'].includes(sentenceWordObj.wordCase);
                      let isLackWords = (sentenceArray.length <= 1) && ['pascalCase', 'titleCase'].includes(sentenceWordObj.wordCase);
                      targetCase = isTooShort || isLackWords ? 'unknown' : sentenceWordObj.wordCase;
                    } else {
                      targetCase = 'unknown';
                    }
                  }
                }
                break;
              }
              case (sentenceArray.length > 1): {
                if (uniqueCases.length > 1) {
                  if (sentenceWordObj) {
                    let isTooShort = (lastPattern.length <= 1) && ['upperCase'].includes(sentenceWordObj.wordCase);
                    let isLackWords = (sentenceArray.length <= 1) && ['pascalCase', 'titleCase'].includes(sentenceWordObj.wordCase);
                    targetCase = isTooShort || isLackWords ? 'unknown' : sentenceWordObj.wordCase;
                  } else {
                    targetCase = 'unknown';
                  }
                } else {
                  targetCase = uniqueCases[0];
                }

                break;
              }
              default: {
                targetCase = 'unknown';
                break;
              }
            }


            if (!caseSetted) {
              slice = setCase(targetSlice, targetCase);
            }

            slice = includesSpecialSymbol ? (() => {
              let arr = slice.split(specialSymbol);
              return arr[arr.length - 1];
            })() : slice;

            remainder = remainder + slice;
            wordIndex++;
          }
        }
        sliceIndex++;
      }

      return remainder;
    }
  }

  return '';
}

/**
 * Aligns a pair of strings into corresponding segments.
 *
 * @param {Array<string>} pair - The pair of strings to align, as [sourceStr, targetStr].
 * @param {Object} [opts] - Configuration options.
 * @param {RegExp} [opts.tokenRegex] - Regular expression for tokenizing strings. Defaults to /\S+|\s+/gu.
 * @param {(a:string, b:string, aIndex:boolean, bIndex:boolean)=>boolean} [opts.customMatcher] - Custom function for matching tokens.
 * @param {(a:string, b:string, aIndex:boolean, bIndex:boolean)=>boolean} [opts.transformMatch] - Custom function for transform matched tokens
 * @returns {Array<Array<string>>} An array of aligned segments as pairs of strings.
 */
export function pairToAlignedSegments(pair, opts) {

  opts = opts || {};

  const [srcStr, tgtStr] = pair;

  const tokenRegex = opts.tokenRegex ?? /\S+|\s+/gu;
  const customMatcher = opts.customMatcher;
  const transformMatch = opts.transformMatch;

  const ensureGlobal = (rx) => {
    if (!rx.global) {
      return new RegExp(rx.source, rx.flags + "g");
    }
    return rx;
  };

  const tokenize = (s) => {

    const re = ensureGlobal(tokenRegex);
    const tokens = [];

    let m;
    let idx = 0;

    while ((m = re.exec(s))) {

      const tok = m[0];

      tokens.push({
        t: tok,
        idx,
        isWhitespace: /^\s+$/u.test(tok),
        isLetter: /\p{L}/u.test(tok)
      });

      idx++;
    }

    return tokens;
  };

  const src = tokenize(srcStr);
  const tgt = tokenize(tgtStr);

  const isNumeric = (tok) => {
    return /^[+-]?\d+(?:[.,]\d+)?$/u.test(tok.t.trim());
  };

  const anchorEqual = (aTok, bTok) => {

    if (aTok.t === bTok.t) return true;

    if (isNumeric(aTok) && isNumeric(bTok)) return true;

    if (customMatcher && customMatcher(aTok.t, bTok.t, aTok.idx, bTok.idx)) {
      return true;
    }

    return false;
  };

  const applyTransform = (a, b, aIndex, bIndex) => {

    if (!transformMatch) return [a, b];

    const res = transformMatch(a, b, aIndex, bIndex);

    if (!res) return [a, b];

    return res;
  };

  const sToT = new Map();
  let lastT = -1;

  for (let s = 0; s < src.length; s++) {

    if (src[s].isWhitespace) continue;

    for (let t = lastT + 1; t < tgt.length; t++) {

      if (tgt[t].isWhitespace) continue;

      if (anchorEqual(src[s], tgt[t])) {

        sToT.set(s, t);
        lastT = t;
        break;

      }

    }

  }

  const anchors = [...sToT.keys()].sort((a, b) => a - b);

  const makeRange = (tokens) => {
    if (!tokens.length) return null;
    return [tokens[0].idx, tokens[tokens.length - 1].idx];
  };

  const splitEdges = (sTokens, tTokens) => {

    sTokens = sTokens.slice();
    tTokens = tTokens.slice();

    const out = [];

    while (
      sTokens.length &&
      tTokens.length &&
      sTokens[0].t === tTokens[0].t
    ) {

      const sTok = sTokens.shift();
      const tTok = tTokens.shift();

      let [a, b] = applyTransform(sTok.t, tTok.t, sTok.idx, tTok.idx);

      const arr = [a, b];

      arr['sourceRange'] = [sTok.idx, sTok.idx];
      arr['targetRange'] = [tTok.idx, tTok.idx];

      out.push(arr);
    }

    const right = [];

    while (
      sTokens.length &&
      tTokens.length &&
      sTokens[sTokens.length - 1].t === tTokens[tTokens.length - 1].t
    ) {

      const sTok = sTokens.pop();
      const tTok = tTokens.pop();

      let [a, b] = applyTransform(sTok.t, tTok.t, sTok.idx, tTok.idx);

      const arr = [a, b];

      arr['sourceRange'] = [sTok.idx, sTok.idx];
      arr['targetRange'] = [tTok.idx, tTok.idx];

      right.unshift(arr);
    }

    if (sTokens.length || tTokens.length) {

      let a = sTokens.map(x => x.t).join("");
      let b = tTokens.map(x => x.t).join("");

      const aIndex = sTokens.length ? sTokens[0].idx : null;
      const bIndex = tTokens.length ? tTokens[0].idx : null;

      [a, b] = applyTransform(a, b, aIndex, bIndex);

      const arr = [a, b];

      arr['sourceRange'] = makeRange(sTokens);
      arr['targetRange'] = makeRange(tTokens);

      out.push(arr);
    }

    out.push(...right);

    return out;
  };

  if (!anchors.length) {
    return splitEdges(src, tgt);
  }

  const segments = [];
  let prev = 0;

  for (const a of anchors) {

    if (a > prev) {
      segments.push({ start: prev, end: a - 1, anchor: null });
    }

    segments.push({ start: a, end: a, anchor: a });

    prev = a + 1;
  }

  segments.push({ start: prev, end: Infinity, anchor: null });

  const getT = (s) => sToT.get(s);

  const outPairs = [];

  for (const seg of segments) {

    let sTokens;

    if (seg.end === Infinity) {
      sTokens = src.slice(seg.start);
    } else {
      sTokens = src.slice(seg.start, seg.end + 1);
    }

    let tTokens = [];

    if (seg.anchor !== null) {

      const t = getT(seg.anchor);

      if (t !== undefined) {
        tTokens = [tgt[t]];
      }

    } else {

      let leftS = null;
      let rightS = null;

      for (let i = anchors.length - 1; i >= 0; i--) {
        if (anchors[i] < seg.start) {
          leftS = anchors[i];
          break;
        }
      }

      for (let i = 0; i < anchors.length; i++) {
        if (anchors[i] > seg.end) {
          rightS = anchors[i];
          break;
        }
      }

      const leftT = leftS != null ? getT(leftS) : null;
      const rightT = rightS != null ? getT(rightS) : null;

      let tStart = 0;
      let tEnd = tgt.length - 1;

      if (leftT != null) tStart = leftT + 1;
      if (rightT != null) tEnd = rightT - 1;

      if (tStart <= tEnd) {
        tTokens = tgt.slice(tStart, tEnd + 1);
      }

    }

    const parts = splitEdges(sTokens, tTokens);

    for (const p of parts) outPairs.push(p);
  }

  const final = [];

  for (const item of outPairs) {

    const sRange = item['sourceRange'];
    const tRange = item['targetRange'];

    const sTokens = sRange ? src.slice(sRange[0], sRange[1] + 1) : [];
    const tTokens = tRange ? tgt.slice(tRange[0], tRange[1] + 1) : [];

    const sLetters = sTokens.filter(x => x.isLetter);
    const tLetters = tTokens.filter(x => x.isLetter);

    if (sLetters.length && sLetters.length === tLetters.length) {

      const max = Math.max(sTokens.length, tTokens.length);

      for (let i = 0; i < max; i++) {

        const sTok = sTokens[i];
        const tTok = tTokens[i];

        let a = sTok ? sTok.t : "";
        let b = tTok ? tTok.t : "";

        const aIndex = sTok ? sTok.idx : null;
        const bIndex = tTok ? tTok.idx : null;

        [a, b] = applyTransform(a, b, aIndex, bIndex);

        const arr = [a, b];

        arr['sourceRange'] = sTok ? [sTok.idx, sTok.idx] : null;
        arr['targetRange'] = tTok ? [tTok.idx, tTok.idx] : null;

        final.push(arr);
      }

    } else {

      final.push(item);

    }

  }

  return final;
}


/**
 * Returns an element from the end of an array by index.
 * @param {Array} arr - The input array
 * @param {number} index - Index from the end (0 = last element, 1 = second last, etc.)
 * @returns {*} The array element or undefined if index is out of bounds
 */
export function getFromEnd(arr, index) {
  return arr?.[arr.length - 1 - index];
}

/**
 * Filters and sorts an array of items based on a query string and specified properties.
 *
 * @param {Object} options - The options object containing filter criteria.
 * @param {string} options.query - The search query string.
 * @param {Array<any>} options.items - The array of items to be filtered.
 * @param {Array<string>} [options.propsNames] - The properties to search within (optional).
 * @returns {Array<any>} The filtered and sorted array of items.
 */
export function getSearchQueryResults(options: {
  query: string,
  items: Array<any>,
  propsNames?: Array<string>,
}) {
  let { query, items, propsNames } = options || {};

  let searchResults = items.filter(entry => {
    if (query?.trim()) {

      if (query?.trim()) {
        // let res = fuzzy(JSON.stringify(entry), query) || (() => {
        //   let words = query.split(regExpPatterns.wordSeparators).filter(item => item.trim());
        //   return words.some(word => fuzzyIncludes(JSON.stringify(entry), word));
        // })();

        let pattern = query;

        let results = (propsNames.length ? propsNames : []).map(prop => {

          let thresholds = [0.1, 0.5];
          let res = false;
          let isArray = Array.isArray(entry[prop]);
          let items = isArray ? entry[prop] : [entry[prop]];

          for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            const item = items[itemIndex];
            if (typeof item == 'string') {
              let text = item;
              for (let index = 0; index < thresholds.length; index++) {
                const threshold = thresholds[index];
                let opts = {
                  location: Math.floor(text.length / 2),
                  distance: text.length,
                  threshold: threshold,
                  ignoreCase: true,
                  ignoreDiacritics: true,
                  ignoreProximity: true,
                };
                let matchInfo = fuzzyMatchInfo(text, pattern, opts);
                let pos = matchInfo.index;

                if (pos !== -1) {
                  let replacement = replaceByPosition(text, pos, pattern.length, substr => {
                    return substr.trim().toLowerCase() == pattern.trim().toLowerCase() ? `<mark tabindex="-1">${substr}</mark>` : substr;
                  })

                  if (isArray) {
                    entry[prop][itemIndex] = replacement;
                  } else {
                    entry[prop] = replacement;
                  }

                  entry['similarity'] = (entry['similarity'] || 0) + matchInfo.similarity;
                  res = true;
                  break;
                }
              }
            }
          }



          return res;
        });

        return results.some(item => item);
      } else {
        return true;
      }
    } else {
      return true;
    }
  })

  return sortArrayOfObjects(searchResults, [{ field: 'similarity', order: 'desc' }]);
}

/**
* Filters an array of items based on whether their property values match any of the specified values.
*
* @param {Object} options - The options object containing filter criteria.
* @param {Array<any>} options.items - The array of items to be filtered.
* @param {Array<string>|string} options.propsNames - The properties to check.
* @param {Array<any>|any} options.propsValues - The values to match against the properties.
* @returns {Array<any>} The filtered array of items.
*/
export function filterByProps(options) {
  let { items, propsNames, propsValues } = options || {};
  propsValues = propsValues ? Array.isArray(propsValues) ? propsValues : [propsValues] : null;
  propsNames = propsNames ? Array.isArray(propsNames) ? propsNames : [propsNames] : null;

  return items.length ? items.filter(entry => {
    if (propsValues) {
      return propsValues.some(propValue => {
        return (propsNames ? propsNames : Object.keys(entry)).some(prop => {
          return (Array.isArray(entry[prop]) ? entry[prop] : [entry[prop]])
            .some(value => {
              return caseIndependentCompare(value, propValue) ||
                fuzzy(toSentenceCase((value || '').toString()), toSentenceCase((propValue || '').toString()))
            })
        });
      })
    } else {
      return true;
    }
  }) : []
}

/**
* Removes hashtags from a given text.
*
* @param {string} text - The input text containing hashtags.
* @returns {string} The text with hashtags removed and trimmed of leading/trailing spaces.
*/
export function clearHashes(text) {
  let crearHashesRegExp = /\s{0,}(?<hash>#(?:[\p{L}\w\-_]+|))\s{0,}/gmiu;

  return text.replace(crearHashesRegExp, ' ').trim();
}

/**
 * Normalizes spaces and optionally fixes punctuation spacing in a string.
 * - Trims leading and trailing whitespace.
 * - Replaces multiple consecutive spaces with a single space.
 * - If `fixPunctuation` is true, removes spaces before punctuation marks and ensures the most frequent space character is used after them.
 *
 * @param {string} input - The text to normalize.
 * @param {boolean} - If true, corrects spacing around punctuation marks.
 * @tags #trim #punctuation #unicode
 * @returns {string} The normalized text with extra spaces removed and optional punctuation fixes.
 */
export function normalizeSpaces(input: string, fixPunctuation?: boolean): string {
  let result = input
    .trim()
    .replace(/\s+/g, ' ');

  if (fixPunctuation) {
    const spaces = result.match(/[^\S\t\n\r\f\v]/g) || [];
    const mostFrequentSpace = findMod(spaces) || ' ';
    // Removing spaces before punctuation marks
    result = result.replace(/\s+([.,!?;:])/g, '$1');
    // Add the most common space after punctuation marks
    result = result.replace(new RegExp(`([.,!?;:])(\\p{L})`, 'gu'), (`$1${mostFrequentSpace}$2`));
  }

  return result;
}

/**
 * Replaces words in a template with words from the source text,
 * preserving punctuation and spaces from the template.
 *
 * @param {string} text Source text.
 * @param {string} template Template that defines punctuation and spacing.
 * @returns {string} Text formatted according to the template.
 */
export function applyPunctuationTemplate(text, template) {
  const templateTokens = template.match(regExpPatterns.text) || [];

  const words = (text.match(regExpPatterns.text) || [])
    .filter(t => !t.match(regExpPatterns.punctuations) && !/^\s+$/.test(t));

  let wi = 0;

  const result = templateTokens.map(token => {

    if (!token.match(regExpPatterns.punctuations) && !/^\s+$/.test(token)) {
      return words[wi++] ?? token;
    }

    return token;
  });

  return result.join('');
}

/**
 * Checks whether a string contains at least one match of the specified
 * named capture groups from a RegExp.
 *
 * @param {string} str - The input string to scan.
 * @param {RegExp} regexp - A RegExp with named capture groups (must have the global flag).
 * @param {string[]} names - List of group names to check.
 * @returns {boolean} True if any of the specified groups matched; otherwise false.
 */
export function hasGroup(str, regexp, names) {
  const set = new Set(names);

  for (const { groups } of str.matchAll(regexp)) {
    if (Object.keys(groups).some(k => groups[k] && set.has(k))) {
      return true;
    }
  }
  return false;
}

export function fitTextSmart(input, options?) {
  const {
    maxChars = Infinity,
    maxWords = Infinity,
  } = options || {};

  let chars = 0;
  let words = 0;

  let accepted = '';
  let restStart = 0;

  const matches = [...input.matchAll(regExpPatterns.text)];

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i][0];
    const isWord = !matches[i].space;
    // matches[i].groups.word ||
    // matches[i].groups.url ||
    // matches[i].groups.phone;

    const nextChars = chars + m.length;
    const nextWords = words + (isWord ? 1 : 0);

    if (nextChars > maxChars || nextWords > maxWords) {
      restStart = matches[i].index;
      return {
        accepted,
        rest: input.slice(restStart)
      };
    }

    accepted += m;
    chars = nextChars;

    if (isWord) {
      words = nextWords;
    }
  }

  return {
    accepted: input,
    rest: ''
  };
}

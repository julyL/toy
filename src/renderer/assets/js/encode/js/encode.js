var baidu = function() {
  this.version = "1.3.5";
};
baidu.namespace = new Object();
baidu.namespace.register = function(e) {
  var c = /^[_$a-z]+[_$a-z0-9]*/i;
  var d = e.split(".");
  var g = "";
  var f = "";
  var a = [window];
  for (var b = 0; b < d.length; b++) {
    if (!c.test(d[b])) {
      throw new Error("Invalid namespace:" + d[b] + "");
      return;
    }
    a[b + 1] = a[b][d[b]];
    if (typeof a[b + 1] == "undefined") {
      a[b + 1] = new Object();
    }
  }
};
String.prototype.trim = function() {
  return this.replace(/^\s*|\s*$/g, "");
};
String.prototype.format = function() {
  var b = arguments.length,
    a = this;
  while (b--) {
    a = a.replace(new RegExp("\\{" + b + "\\}", "g"), arguments[b]);
  }
  return a;
};
Date.prototype.format = function(e) {
  var a = function(m, l) {
    var n = "",
      k = m < 0,
      j = String(Math.abs(m));
    if (j.length < l) {
      n = new Array(l - j.length + 1).join("0");
    }
    return (k ? "-" : "") + n + j;
  };
  if ("string" != typeof e) {
    return this.toString();
  }
  var b = function(k, j) {
    e = e.replace(k, j);
  };
  var f = this.getFullYear(),
    d = this.getMonth() + 1,
    i = this.getDate(),
    g = this.getHours(),
    c = this.getMinutes(),
    h = this.getSeconds();
  b(/yyyy/g, a(f, 4));
  b(/yy/g, a(parseInt(f.toString().slice(2), 10), 2));
  b(/MM/g, a(d, 2));
  b(/M/g, d);
  b(/dd/g, a(i, 2));
  b(/d/g, i);
  b(/HH/g, a(g, 2));
  b(/H/g, g);
  b(/hh/g, a(g % 12, 2));
  b(/h/g, g % 12);
  b(/mm/g, a(c, 2));
  b(/m/g, c);
  b(/ss/g, a(h, 2));
  b(/s/g, h);
  return e;
};
String.prototype.getBytes = function() {
  var b = this.replace(/\n/g, "xx").replace(/\t/g, "x");
  var a = encodeURIComponent(b);
  return a.replace(/%[A-Z0-9][A-Z0-9]/g, "x").length;
};
var getOuterHtmlEllipsis = function(d) {
  var b = /(<[^>]+>)/g;
  var a = b.exec(d.outerHTML);
  var c = a ? a[1] : d.outerHTML;
  c = c.length > 40 ? c.substr(0, 40) + "..." : c;
  return c.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};
var getOuterAndInnerHtmlEllipsis = function(b) {
  var a = jQuery("<div></div>")
    .append(b)
    .html();
};
(function() {
  baidu.i18n = {};
  baidu.i18n.getMessage = function(d, b) {
    if (b) {
      for (var c = 0, a = b.length; c < a; c++) {
        b[c] = "" + b[c];
      }
      return chrome.i18n.getMessage(d, b);
    } else {
      return chrome.i18n.getMessage(d);
    }
  };
})();
var MSG_TYPE = {
  BROWSER_CLICKED: "browser-clicked",
  GET_CSS: "get-css",
  GET_JS: "get-js",
  GET_HTML: "get-html",
  GET_COOKIE: "get-cookie",
  REMOVE_COOKIE: "remove-cookie",
  SET_COOKIE: "set-cookie",
  GET_OPTIONS: "get_options",
  SET_OPTIONS: "set_options",
  FCP_HELPER_INIT: "fcp_helper_init",
  CSS_READY: "css-ready",
  JS_READY: "js-ready",
  HTML_READY: "html-ready",
  ALL_READY: "all-ready",
  START_OPTION: "start-option",
  OPT_START_FCP: "opt-item-fcp",
  OPT_START_GRID: "opt-item-grid",
  CALC_PAGE_LOAD_TIME: "calc-page-load-time",
  GET_PAGE_WPO_INFO: "get_page_wpo_info",
  SHOW_PAGE_LOAD_TIME: "show-page-load-time",
  FCP_HELPER_DETECT: "fcp-helper-detect",
  GRID_DETECT: "grid-detect",
  JS_TRACKER: "js_tracker",
  CODE_COMPRESS: "code_compress",
  FROM_POPUP: "from_popup_action",
  TAB_CREATED_OR_UPDATED: "tab_created_or_updated",
  REGEXP_TOOL: "regexp",
  EN_DECODE: "endecode",
  JSON_FORMAT: "jsonformat",
  QR_CODE: "qrcode",
  CODE_BEAUTIFY: "codebeautify",
  TIME_STAMP: "timestamp",
  IMAGE_BASE64: "imagebase64",
  QR_DECODE: "qr_decode",
  AUTO_FORMART_PAGE_JSON: "opt_item_autojson",
  COLOR_PICKER: "color-picker:newImage",
  AJAX_DEBUGGER: "ajax-debugger",
  AJAX_DEBUGGER_CONSOLE: "ajax-debugger-console",
  AJAX_DEBUGGER_SWITCH: "ajax-debugger-switch"
};
var FILE = { STYLE: "style", LINK: "link", SCRIPT: "script-block" };
var PUBLIC_ID_WHITE_LIST = {
  "": { systemIds: { "": true } },
  "-//W3C//DTD HTML 3.2 Final//EN": { systemIds: { "": true } },
  "-//W3C//DTD HTML 4.0//EN": { systemIds: { "": true, "http://www.w3.org/TR/html4/strict.dtd": true } },
  "-//W3C//DTD HTML 4.01//EN": { systemIds: { "": true, "http://www.w3.org/TR/html4/strict.dtd": true } },
  "-//W3C//DTD HTML 4.0 Transitional//EN": { systemIds: { "": true, "http://www.w3.org/TR/html4/loose.dtd": true } },
  "-//W3C//DTD HTML 4.01 Transitional//EN": {
    systemIds: {
      "": true,
      "http://www.w3.org/TR/html4/loose.dtd": true,
      "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd": true
    }
  },
  "-//W3C//DTD XHTML 1.1//EN": { systemIds: { "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd": true } },
  "-//W3C//DTD XHTML Basic 1.0//EN": { systemIds: { "http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd": true } },
  "-//W3C//DTD XHTML 1.0 Strict//EN": { systemIds: { "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd": true } },
  "-//W3C//DTD XHTML 1.0 Transitional//EN": {
    systemIds: { "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd": true }
  },
  "ISO/IEC 15445:1999//DTD HyperText Markup Language//EN": { systemIds: { "": true } },
  "ISO/IEC 15445:2000//DTD HTML//EN": { systemIds: { "": true } },
  "ISO/IEC 15445:1999//DTD HTML//EN": { systemIds: { "": true } }
};
var COMPAT_MODE_DIFF_PUBLIC_ID_MAP = {
  "-//W3C//DTD HTML 4.0 Transitional//EN": {
    systemIds: { "http://www.w3.org/TR/html4/loose.dtd": { IE: "S", WebKit: "Q" } }
  },
  "ISO/IEC 15445:2000//DTD HTML//EN": { systemIds: { "": { IE: "Q", WebKit: "S" } } },
  "ISO/IEC 15445:1999//DTD HTML//EN": { systemIds: { "": { IE: "Q", WebKit: "S" } } }
};
var HTML_DEPRECATED_TAGS = {
  acronym: "定义首字母缩写",
  applet: "定义Java Applet",
  basefont: "定义Font定义",
  big: "定义大号文本",
  center: "定义居中的文本",
  dir: "定义目录列表",
  font: "定义文字相关",
  frame: "定义框架",
  frameset: "定义框架集",
  isindex: "定义单行的输入域",
  noframes: "定义noframe 部分",
  s: "定义加删除线的文本",
  strike: "定义加删除线的文本",
  tt: "定义打字机文本",
  u: "定义下划线文本",
  xmp: "定义预格式文本",
  layer: "定义层"
};
var HTML_DEPRECATED_ATTRIBUTES = {
  align: { iframe: true, img: true, object: true, table: true },
  color: { font: true },
  height: { td: true, th: true },
  language: { script: true },
  noshade: { hr: true },
  nowrap: { td: true, th: true },
  size: { hr: true, font: true, basefont: true }
};
var BLOCK_HTML_ELEMENT = [
  "address",
  "blockquote",
  "center",
  "dir",
  "div",
  "dl",
  "fieldset",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "isindex",
  "menu",
  "noframes",
  "noscript",
  "ol",
  "p",
  "pre",
  "table",
  "ul"
];
var INLINE_HTML_ELEMENT = [
  "a",
  "acronym",
  "b",
  "bdo",
  "big",
  "br",
  "cite",
  "code",
  "dfn",
  "em",
  "font",
  "i",
  "img",
  "input",
  "kbd",
  "label",
  "q",
  "s",
  "samp",
  "select",
  "small",
  "span",
  "strike",
  "strong",
  "sub",
  "sup",
  "textarea",
  "tt",
  "u",
  "var"
];
var CHANGE_ABLE_HTML_ELEMENT = ["applet", "button", "del", "iframe", "ins", "map", "object", "script"];
var CONDITIONAL_COMMENT_REGEXP = /\[\s*if\s+[^\]][\s\w]*\]/i;
var NOT_IE_REVEALED_OPENING_CONDITIONAL_COMMENT_REGEXP = /^\[if\s+(!IE|false)\]$/i;
var REVEALED_CLOSING_CONDITIONAL_COMMENT_REGEXP = /^\[endif\s*\]$/i;
var NOT_IE_HIDDEN_CONDITIONAL_COMMENT_REGEXP = /^\[if\s+(!IE|false)\]>.*<!\[endif\]$/i;
var REG = {
  SCRIPT: /<script[^>]*>[\s\S]*?<\/[^>]*script>/gi,
  COMMENT: /<!--[\s\S]*?--\>/g,
  CSS_EXPRESSION: /expression[\s\r\n ]?\(/gi,
  TEXTAREA: /<textarea[^>]*>[\s\S]*?<\/[^>]*textarea>/gi,
  INVALID_TAG: /<\W+>/gi
};
var SELF_CLOSING_TAGS = ["meta", "link", "area", "base", "col", "input", "img", "br", "hr", "param", "embed"];
baidu.namespace.register("baidu.endecode");
baidu.endecode = (function() {
  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var h = new Array(
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    62,
    -1,
    -1,
    -1,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    -1,
    -1,
    -1,
    -1,
    -1
  );
  var f = function(m) {
    m = escape(m.toString()).replace(/\+/g, "%2B");
    var k = m.match(/(%([0-9A-F]{2}))/gi);
    if (k) {
      for (var l = 0; l < k.length; l++) {
        var j = k[l].substring(1, 3);
        if (parseInt(j, 16) >= 128) {
          m = m.replace(k[l], "%u00" + j);
        }
      }
    }
    m = m.replace("%25", "%u0025").replace(/%/g, "\\");
    return m;
  };
  var a = function(n) {
    n = n
      .replace(/\\/g, "%")
      .replace("%U", "%u")
      .replace("%u0025", "%25");
    n = unescape(n.toString().replace(/%2B/g, "+"));
    var l = n.match(/(%u00([0-9A-F]{2}))/gi);
    if (l) {
      for (var m = 0; m < l.length; m++) {
        var k = l[m].substring(1, 3);
        var j = Number("0x" + k);
        if (j >= 128) {
          n = n.replace(l[m], k);
        }
      }
    }
    n = unescape(n.toString().replace(/%2B/g, "+"));
    return n;
  };
  var e = function(m) {
    var k, l, j, n;
    k = "";
    j = m.length;
    for (l = 0; l < j; l++) {
      n = m.charCodeAt(l);
      if (n >= 1 && n <= 127) {
        k += m.charAt(l);
      } else {
        if (n > 2047) {
          k += String.fromCharCode(224 | ((n >> 12) & 15));
          k += String.fromCharCode(128 | ((n >> 6) & 63));
          k += String.fromCharCode(128 | ((n >> 0) & 63));
        } else {
          k += String.fromCharCode(192 | ((n >> 6) & 31));
          k += String.fromCharCode(128 | ((n >> 0) & 63));
        }
      }
    }
    return k;
  };
  var i = function(o) {
    var k, m, j, p;
    var n, l;
    k = "";
    j = o.length;
    m = 0;
    while (m < j) {
      p = o.charCodeAt(m++);
      switch (p >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          k += o.charAt(m - 1);
          break;
        case 12:
        case 13:
          n = o.charCodeAt(m++);
          k += String.fromCharCode(((p & 31) << 6) | (n & 63));
          break;
        case 14:
          n = o.charCodeAt(m++);
          l = o.charCodeAt(m++);
          k += String.fromCharCode(((p & 15) << 12) | ((n & 63) << 6) | ((l & 63) << 0));
          break;
      }
    }
    return k;
  };
  var g = function(p) {
    var l, n, j;
    var o, m, k;
    j = p.length;
    n = 0;
    l = "";
    while (n < j) {
      o = p.charCodeAt(n++) & 255;
      if (n == j) {
        l += c.charAt(o >> 2);
        l += c.charAt((o & 3) << 4);
        l += "==";
        break;
      }
      m = p.charCodeAt(n++);
      if (n == j) {
        l += c.charAt(o >> 2);
        l += c.charAt(((o & 3) << 4) | ((m & 240) >> 4));
        l += c.charAt((m & 15) << 2);
        l += "=";
        break;
      }
      k = p.charCodeAt(n++);
      l += c.charAt(o >> 2);
      l += c.charAt(((o & 3) << 4) | ((m & 240) >> 4));
      l += c.charAt(((m & 15) << 2) | ((k & 192) >> 6));
      l += c.charAt(k & 63);
    }
    return l;
  };
  var b = function(q) {
    var p, o, m, k;
    var n, j, l;
    j = q.length;
    n = 0;
    l = "";
    while (n < j) {
      do {
        p = h[q.charCodeAt(n++) & 255];
      } while (n < j && p == -1);
      if (p == -1) {
        break;
      }
      do {
        o = h[q.charCodeAt(n++) & 255];
      } while (n < j && o == -1);
      if (o == -1) {
        break;
      }
      l += String.fromCharCode((p << 2) | ((o & 48) >> 4));
      do {
        m = q.charCodeAt(n++) & 255;
        if (m == 61) {
          return l;
        }
        m = h[m];
      } while (n < j && m == -1);
      if (m == -1) {
        break;
      }
      l += String.fromCharCode(((o & 15) << 4) | ((m & 60) >> 2));
      do {
        k = q.charCodeAt(n++) & 255;
        if (k == 61) {
          return l;
        }
        k = h[k];
      } while (n < j && k == -1);
      if (k == -1) {
        break;
      }
      l += String.fromCharCode(((m & 3) << 6) | k);
    }
    return l;
  };
  var d = function(m) {
    var k, l, j, n;
    k = "";
    j = m.length;
    for (l = 0; l < j; l++) {
      n = m.charCodeAt(l);
      if (n >= 1 && n <= 127) {
        k += m.charAt(l);
      } else {
        if (n > 2047) {
          k += String.fromCharCode(224 | ((n >> 12) & 15));
          k += String.fromCharCode(128 | ((n >> 6) & 63));
          k += String.fromCharCode(128 | ((n >> 0) & 63));
        } else {
          k += String.fromCharCode(192 | ((n >> 6) & 31));
          k += String.fromCharCode(128 | ((n >> 0) & 63));
        }
      }
    }
    return k;
  };
  return { uniEncode: f, uniDecode: a, base64Encode: g, base64Decode: b, utf8Encode: e, utf8Decode: i, utf16to8: d };
})();
var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_md5(a) {
  return binl2hex(core_md5(str2binl(a), a.length * chrsz));
}
function b64_md5(a) {
  return binl2b64(core_md5(str2binl(a), a.length * chrsz));
}
function str_md5(a) {
  return binl2str(core_md5(str2binl(a), a.length * chrsz));
}
function hex_hmac_md5(a, b) {
  return binl2hex(core_hmac_md5(a, b));
}
function b64_hmac_md5(a, b) {
  return binl2b64(core_hmac_md5(a, b));
}
function str_hmac_md5(a, b) {
  return binl2str(core_hmac_md5(a, b));
}
function md5_vm_test() {
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}
function core_md5(p, k) {
  p[k >> 5] |= 128 << (k % 32);
  p[(((k + 64) >>> 9) << 4) + 14] = k;
  var o = 1732584193;
  var n = -271733879;
  var m = -1732584194;
  var l = 271733878;
  for (var g = 0; g < p.length; g += 16) {
    var j = o;
    var h = n;
    var f = m;
    var e = l;
    o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
    l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
    m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
    n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
    o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
    l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
    m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
    n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
    o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
    l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
    m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
    n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
    o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
    l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
    m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
    n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
    o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
    l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
    m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
    n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
    o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
    l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
    m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
    n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
    o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
    l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
    m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
    n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
    o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
    l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
    m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
    n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
    o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
    l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
    m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
    n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
    o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
    l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
    m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
    n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
    o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
    l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
    m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
    n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
    o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
    l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
    m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
    n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
    o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
    l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
    m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
    n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
    o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
    l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
    m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
    n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
    o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
    l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
    m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
    n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
    o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
    l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
    m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
    n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
    o = safe_add(o, j);
    n = safe_add(n, h);
    m = safe_add(m, f);
    l = safe_add(l, e);
  }
  return Array(o, n, m, l);
}
function md5_cmn(h, e, d, c, g, f) {
  return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d);
}
function md5_ff(g, f, k, j, e, i, h) {
  return md5_cmn((f & k) | (~f & j), g, f, e, i, h);
}
function md5_gg(g, f, k, j, e, i, h) {
  return md5_cmn((f & j) | (k & ~j), g, f, e, i, h);
}
function md5_hh(g, f, k, j, e, i, h) {
  return md5_cmn(f ^ k ^ j, g, f, e, i, h);
}
function md5_ii(g, f, k, j, e, i, h) {
  return md5_cmn(k ^ (f | ~j), g, f, e, i, h);
}
function core_hmac_md5(c, f) {
  var e = str2binl(c);
  if (e.length > 16) {
    e = core_md5(e, c.length * chrsz);
  }
  var a = Array(16),
    d = Array(16);
  for (var b = 0; b < 16; b++) {
    a[b] = e[b] ^ 909522486;
    d[b] = e[b] ^ 1549556828;
  }
  var g = core_md5(a.concat(str2binl(f)), 512 + f.length * chrsz);
  return core_md5(d.concat(g), 512 + 128);
}
function safe_add(a, d) {
  var c = (a & 65535) + (d & 65535);
  var b = (a >> 16) + (d >> 16) + (c >> 16);
  return (b << 16) | (c & 65535);
}
function bit_rol(a, b) {
  return (a << b) | (a >>> (32 - b));
}
function str2binl(d) {
  var c = Array();
  var a = (1 << chrsz) - 1;
  for (var b = 0; b < d.length * chrsz; b += chrsz) {
    c[b >> 5] |= (d.charCodeAt(b / chrsz) & a) << (b % 32);
  }
  return c;
}
function binl2str(c) {
  var d = "";
  var a = (1 << chrsz) - 1;
  for (var b = 0; b < c.length * 32; b += chrsz) {
    d += String.fromCharCode((c[b >> 5] >>> (b % 32)) & a);
  }
  return d;
}
function binl2hex(c) {
  var b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var d = "";
  for (var a = 0; a < c.length * 4; a++) {
    d += b.charAt((c[a >> 2] >> ((a % 4) * 8 + 4)) & 15) + b.charAt((c[a >> 2] >> ((a % 4) * 8)) & 15);
  }
  return d;
}
function binl2b64(d) {
  var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var f = "";
  for (var b = 0; b < d.length * 4; b += 3) {
    var e =
      (((d[b >> 2] >> (8 * (b % 4))) & 255) << 16) |
      (((d[(b + 1) >> 2] >> (8 * ((b + 1) % 4))) & 255) << 8) |
      ((d[(b + 2) >> 2] >> (8 * ((b + 2) % 4))) & 255);
    for (var a = 0; a < 4; a++) {
      if (b * 8 + a * 6 > d.length * 32) {
        f += b64pad;
      } else {
        f += c.charAt((e >> (6 * (3 - a))) & 63);
      }
    }
  }
  return f;
}
baidu.namespace.register("baidu.ed");
baidu.ed = (function() {
  var d = function() {
    var h = jQuery("#srcText");
    var g = h.val();
    jQuery("#rst").show();
    var i = jQuery("#rstCode");
    if (jQuery("#uniEncode")[0].checked == true) {
      i.val(baidu.endecode.uniEncode(g));
    } else {
      if (jQuery("#uniDecode")[0].checked == true) {
        h.val(h.val().replace(/\\U/g, "\\u"));
        i.val(baidu.endecode.uniDecode(h.val()));
      } else {
        if (jQuery("#utf8Encode")[0].checked == true) {
          i.val(encodeURIComponent(g));
        } else {
          if (jQuery("#utf8Decode")[0].checked == true) {
            i.val(decodeURIComponent(g));
          } else {
            if (jQuery("#base64Encode")[0].checked == true) {
              i.val(baidu.endecode.base64Encode(baidu.endecode.utf8Encode(g)));
            } else {
              if (jQuery("#base64Decode")[0].checked == true) {
                i.val(baidu.endecode.utf8Decode(baidu.endecode.base64Decode(g)));
              } else {
                if (jQuery("#md5Encode")[0].checked == true) {
                  i.val(hex_md5(g));
                } else {
                  if (jQuery("#html2js")[0].checked == true) {
                    i.val(f(g));
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  var f = function(i) {
    var h = i
      .replace(/\\/g, "\\\\")
      .replace(/\\/g, "\\/")
      .replace(/\'/g, "\\'")
      .split("\n");
    var g = h.length;
    var j = [];
    j.push("var htmlCodes = [\n");
    jQuery.each(h, function(k, l) {
      if (l !== "") {
        if (k === g - 1) {
          j.push("'" + l + "'");
        } else {
          j.push("'" + l + "',\n");
        }
      }
    });
    j.push('\n].join("");');
    return j.join("");
  };
  var c = function() {
    jQuery("#btnCodeChange").click(function() {
      d();
    });
    jQuery("#btnCodeClear").click(function() {
      jQuery("#srcText,#rstCode").val("");
    });
  };
  var b = function() {
    jQuery("input[type=radio],label[for]").click(function(g) {
      $this = jQuery(this);
      setTimeout(function() {
        d();
      }, 150);
    });
  };
  var a = function() {
    jQuery("#rstCode").mouseover(function() {
      this.selectionStart = 0;
      this.selectionEnd = this.value.length;
      this.select();
    });
  };
  var e = function() {
    jQuery(function() {
      jQuery("#srcText").focus();
      c();
      a();
      b();
    });
  };
  return { init: e };
})();
baidu.ed.init();

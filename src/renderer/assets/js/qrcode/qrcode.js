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
var FILE = {
  STYLE: "style",
  LINK: "link",
  SCRIPT: "script-block"
};
var PUBLIC_ID_WHITE_LIST = {
  "": {
    systemIds: {
      "": true
    }
  },
  "-//W3C//DTD HTML 3.2 Final//EN": {
    systemIds: {
      "": true
    }
  },
  "-//W3C//DTD HTML 4.0//EN": {
    systemIds: {
      "": true,
      "http://www.w3.org/TR/html4/strict.dtd": true
    }
  },
  "-//W3C//DTD HTML 4.01//EN": {
    systemIds: {
      "": true,
      "http://www.w3.org/TR/html4/strict.dtd": true
    }
  },
  "-//W3C//DTD HTML 4.0 Transitional//EN": {
    systemIds: {
      "": true,
      "http://www.w3.org/TR/html4/loose.dtd": true
    }
  },
  "-//W3C//DTD HTML 4.01 Transitional//EN": {
    systemIds: {
      "": true,
      "http://www.w3.org/TR/html4/loose.dtd": true,
      "http://www.w3.org/TR/1999/REC-html401-19991224/loose.dtd": true
    }
  },
  "-//W3C//DTD XHTML 1.1//EN": {
    systemIds: {
      "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd": true
    }
  },
  "-//W3C//DTD XHTML Basic 1.0//EN": {
    systemIds: {
      "http://www.w3.org/TR/xhtml-basic/xhtml-basic10.dtd": true
    }
  },
  "-//W3C//DTD XHTML 1.0 Strict//EN": {
    systemIds: {
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd": true
    }
  },
  "-//W3C//DTD XHTML 1.0 Transitional//EN": {
    systemIds: {
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd": true
    }
  },
  "ISO/IEC 15445:1999//DTD HyperText Markup Language//EN": {
    systemIds: {
      "": true
    }
  },
  "ISO/IEC 15445:2000//DTD HTML//EN": {
    systemIds: {
      "": true
    }
  },
  "ISO/IEC 15445:1999//DTD HTML//EN": {
    systemIds: {
      "": true
    }
  }
};
var COMPAT_MODE_DIFF_PUBLIC_ID_MAP = {
  "-//W3C//DTD HTML 4.0 Transitional//EN": {
    systemIds: {
      "http://www.w3.org/TR/html4/loose.dtd": {
        IE: "S",
        WebKit: "Q"
      }
    }
  },
  "ISO/IEC 15445:2000//DTD HTML//EN": {
    systemIds: {
      "": {
        IE: "Q",
        WebKit: "S"
      }
    }
  },
  "ISO/IEC 15445:1999//DTD HTML//EN": {
    systemIds: {
      "": {
        IE: "Q",
        WebKit: "S"
      }
    }
  }
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
  align: {
    iframe: true,
    img: true,
    object: true,
    table: true
  },
  color: {
    font: true
  },
  height: {
    td: true,
    th: true
  },
  language: {
    script: true
  },
  noshade: {
    hr: true
  },
  nowrap: {
    td: true,
    th: true
  },
  size: {
    hr: true,
    font: true,
    basefont: true
  }
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
  return {
    uniEncode: f,
    uniDecode: a,
    base64Encode: g,
    base64Decode: b,
    utf8Encode: e,
    utf8Decode: i,
    utf16to8: d
  };
})();
baidu.qrcode = (function() {
  var g = "";
  var d = function() {
    var j = $("#opt_width").val();
    var k = $("#opt_fc").val();
    var i = {
      render: "canvas",
      minVersion: 1,
      maxVersion: 40,
      ecLevel: "L",
      left: 0,
      top: 0,
      size: +j || 200,
      fill: k,
      background: "#fff",
      radius: 0,
      quiet: 0,
      text: g,
      mode: 0,
      mSize: 0.15,
      mPosX: 0.5,
      mPosY: 0.5,
      label: "FH",
      fontname: "sans",
      fontcolor: "#f00",
      image: false
    };
    var h = $("input[name=qr_icon]:checked").val();
    if (h == 1) {
      i.mode = 4;
      i.image = $("#logo_default")[0];
    } else {
      if (h == 2) {
        i.mode = 4;
        i.image = $("#logo")[0];
      }
    }
    return i;
  };
  var b = function() {
    g = $("#codeSource").val();
    if (g) {
      $("#preview")
        .html("")
        .qrcode(d());
      $("#download_button").css({ "pointer-events": "all" });
    } else {
      $("#preview").html("再在输入框里输入一些内容，就能生成二维码了哦~");
      $("#download_button").css({ "pointer-events": "none" });
    }
    $("#fieldset_qr").show();
    var canvas = $("#preview canvas")[0];
    canvas.toBlob(function(blob) {
      $("#download_button").attr("href", URL.createObjectURL(blob));
    });
  };
  var c = function(i) {
    if (/image\//.test(i.type)) {
      var h = new FileReader();
      h.onload = function(j) {
        $("#logo").attr("src", j.target.result);
        b();
      };
      h.readAsDataURL(i);
    } else {
      alert("请选择图片文件！");
    }
  };
  var a = function() {
    $(document)
      .bind("drop", function(i) {
        i.preventDefault();
        i.stopPropagation();
        var h = i.originalEvent.dataTransfer.files;
        if (h.length) {
          c(h[0]);
        }
      })
      .bind("dragover", function(h) {
        h.preventDefault();
        h.stopPropagation();
      });
  };
  var e = function() {
    $("#confirm_button").click(function() {
      b();
    });
    $("#opt_fc").colorpicker({
      fillcolor: true,
      success: function(i, h) {
        b();
      }
    });
    $("#remove_icon,#default_icon").click(function(h) {
      b();
    });
    $("#upload_icon").click(function(h) {
      $("#file").trigger("click");
    });
    $("#file").change(function(h) {
      if (this.files.length) {
        c(this.files[0]);
        this.value = "";
      }
    });
    a();
  };
  var f = function() {
    $(function() {
      e();
      $("#codeSource").focus();
    });
  };
  return {
    init: f
  };
})();
baidu.qrcode.init();

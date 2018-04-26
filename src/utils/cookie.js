/*
* 读取cookie
* var cookieValue = Cookie.get('cookie-name');
*
* 添加cookie
* Cookie.set('cookie-name', 'cookie-value', options);
*
* 删除cookie
* Cookie.remove('cookie-name', options);
*/
const decode = decodeURIComponent;
const encode = encodeURIComponent;

// Helpers
function isString(o) {
  return typeof o === 'string';
}

function isNonEmptyString(s) {
  return isString(s) && s !== '';
}

function validateCookieName(name) {
  if (!isNonEmptyString(name)) {
    throw new TypeError('Cookie name must be a non-empty string');
  }
}

function same(s) {
  return s;
}

function parseCookieString(text, shouldDecode) {
  const cookies = {};

  if (isString(text) && text.length > 0) {
    const decodeValue = shouldDecode ? decode : same;
    const cookieParts = text.split(/;\s/g);
    let cookieName;
    let cookieValue;
    let cookieNameValue;

    for (let i = 0, len = cookieParts.length; i < len; i += 1) {
      // Check for normally-formatted cookie (name-value)
      cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
      if (cookieNameValue instanceof Array) {
        try {
          cookieName = decode(cookieNameValue[1]);
          cookieValue = decodeValue(cookieParts[i]
            .substring(cookieNameValue[1].length + 1));
        } catch (ex) {
          // Intentionally ignore the cookie -
          // the encoding is wrong
        }
      } else {
        // Means the cookie does not have an "=", so treat it as
        // a boolean flag
        cookieName = decode(cookieParts[i]);
        cookieValue = '';
      }

      if (cookieName) {
        cookies[cookieName] = cookieValue;
      }
    }
  }

  return cookies;
}

// 获取cookie、
export function getCookie(name, options = {}) {
  validateCookieName(name);

  let optionsIN = options;

  if (typeof optionsIN === 'function') {
    optionsIN = { converter: optionsIN };
  }

  const cookies = parseCookieString(document.cookie, !optionsIN.raw);
  return (optionsIN.converter || same)(cookies[name]);
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(name, value, options = {}) {
  validateCookieName(name);
  let encodeValue = value;

  //   option = options || {};
  let expires = options.expires;
  if (typeof expires === 'undefined') {
    // 默认30天有效期
    expires = 30;
  }
  const domain = options.domain || document.domain;
  const path = options.path || '/';

  if (!options.raw) {
    encodeValue = encode(String(encodeValue));
  }

  let text = `${name}=${encodeValue}`;

  // expires
  let date = expires;
  if (typeof date === 'number') {
    date = new Date();
    date.setDate(date.getDate() + expires);
  }
  if (date instanceof Date) {
    text += `; expires=${date.toUTCString()}`;
  }

  // domain
  if (isNonEmptyString(domain)) {
    text += `; domain=${domain}`;
  }

  // path
  if (isNonEmptyString(path)) {
    text += `; path=${path}`;
  }

  // secure
  if (options.secure) {
    text += '; secure';
  }

  document.cookie = text;
  return text;
}

// 删除cookie
export function delCookie(name) {
  var exp = new Date();  
  exp.setTime(exp.getTime() - 1);  
  var cval=getCookie(name);  
  if(cval!=null)  
  document.cookie= name + "="+cval+";expires="+exp.toUTCString();  
}


// 设置cookie
/**
 * @function setUserCookie
 * @param name cookie名称
 * @param value cookie值
 * @param expires cookie过期时间
 */
export const setUserCookie = (name:string, value:string, expires:number) => {
    var date:Date = new Date();
    date.setTime(date.getTime() + expires);
    console.log("时间", date.setTime(date.getTime() + expires));
    document.cookie =
      name + "=" + escape(value) + ";expires=" + date.toUTCString();
    // document.cookie = name + "=" + (value || "")  + expires + "; ";
  };
  
  // 过期时间秒设置cookie
  /**
   * @function setCookieWithSeconds
   * @param name cookie名称
   * @param value cookie值
   * @param seconds cookie有效期 单位秒
   */
  export const setCookieWithSeconds = (name:string, value:string, seconds:number) => {
    var expires = "";
    if (seconds) {
      var date = new Date();
      date.setTime(date.getTime() + seconds * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };
  
  // 获取Cookie值
  /**
   * @function getCookie
   * @param name cookie名称
   */
  export const getCookie = (name:string) => {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return "";
  };
  
  // 清除所有cookie
  /**
   * @function clearAllCookies  清空所有cookie
   */
  export const clearAllCookies = () => {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  };
  
  
  
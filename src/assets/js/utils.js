/**
 * 校验手机号
 */
export function checkMobile(rule, value, callback) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  }
}
/**
* 启动摄像头
* @param {video} localVideo 传入video节点
* @return 摄像头media视频流stream
*/

export function startCamera(localVideo) {
  return new Promise((resolve, reject) => {
    // 老的浏览器可能根本没有实现 mediaDevices，所以我们可以先设置一个空的对象
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
    // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先，如果有getUserMedia的话，就获得它
        let getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
        if (!getUserMedia) {
          reject(new Error("浏览器不支持获取媒体设备"));
        }
        // 否则，为老的navigator.getUserMedia方法包裹一个Promise
        getUserMedia.call(navigator, constraints, resolve, reject);
      };
    }
    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user" },
      })
      .then(function (stream) {
        // 旧的浏览器可能没有srcObject
        if ("srcObject" in localVideo) {
          localVideo.srcObject = stream;
        } else {
          // 防止在新的浏览器里使用它，应为它已经不再支持了
          localVideo.src = window.URL.createObjectURL(stream);
        }
        localVideo.onloadedmetadata = function () {
          localVideo.play();
        };
        resolve(
          typeof stream.stop === "function" ? stream : stream.getTracks()[0]
        );
      })
      .catch(function (err) {
        alert(err.name + ": " + err.message);
        reject(err.name + ": " + err.message);
      });
  });
}

import moment from 'moment'
// 处理日期时间格式
export function momentDate(time) {
  let date = moment(time).format('YYYY-MM-DD HH:mm:ss')
  return date
}

/**
 * 字符串转码base64
 * @param {string} str 传入参数
 * @return 返回该用户标识值
 */
export function encode(str) {
  // 字符串编码
  var encode = unescape(encodeURIComponent(str));
  // 编码的字符串转化base64
  var base64 = btoa(encode);
  return base64;
}

/**
 * base64转码字符串
 * @param {string} str 传入参数
 * @return 返回该用户标识值
 */
export function decode(base64) {
  //base64转化编码的字符串
  var encode = escape(atob(base64));
  // 字符串编码
  var str = decodeURIComponent(encode);
  return str;
}

/**
 * 图片file转化为base64格式
 * @param {string} file 传入图片
 * @return 返回该用户标识值
 */
export function getBase64(file) {
  return new Promise(function (resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file);
    reader.onload = function () {
      imgResult = reader.result;
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.onloadend = function () {
      resolve(imgResult);
    };
  });
}

/**
 * base64的图片数据转换为Blob
 * @param {string} base64Data 传入base64图片
 * @param {string} filetype 传入图片类型
 * @returns {Blob} 返回文件流
 */
export function getBlob(base64Data, filetype) {
  //去掉url的头(data:img/jpg;base64)，并转换为byte
  let bytes = window.atob(base64Data);
  //处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab); //必须是8位的类型数组
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i); //存储每个字符的Unicode码
  }

  let blob = null;
  try {
    blob = new Blob([ia], { type: filetype });
  } catch (e) {
    window.BlobBuilder =
      window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;
    if (e.name == "TypeError" && window.BlobBuilder) {
      let bb = new window.BlobBuilder();
      bb.append(ia.buffer);
      blob = bb.getBlob("image/jpeg");
    } else if (e.name == "InvalidStateError") {
      blob = new Blob([aBuffer], { type: filetype });
    }
  }
  return blob;
}

/**
 * 分钟数转时长
 * @param {number} timeNum 输入分钟
 * @return 展示时长
 */
export function calTimeLength(timeNum) {
  let minute = parseInt(timeNum);
  let hours = parseInt(minute / 60);
  let result = "";
  if (hours > 0) {
    result = `${hours}小时${minute % 60}分钟`;
  } else {
    result = `${minute}分钟`;
  }
  return result;
}

/**
 * 行政编码转化为行政等级
 * @param {string} codeString 输入行政编码
 * @return 返回行政等级 1省 2市 3县
 */
export function regionCodeToLevel(codeString) {
  if (typeof codeString == "string" && codeString.length == 6) {
    let array = [];
    for (let i = 0; i < 3; i++) {
      const element = codeString.slice(i * 2, i * 2 + 2);
      array.push(element);
    }
    if (array[1] == "00") {
      return { level: 1, name: "省" };
    }
    if (array[2] == "00") {
      return { level: 2, name: "市" };
    } else {
      return { level: 3, name: "县" };
    }
  } else {
    return null;
  }
}

/**
 * 视频地址返回视频对象
 * @param {video} videoPath 传入video地址
 * @return 视频对象
 */
export function getVideoObj(videoPath) {
  //截取文件后缀名
  let index = videoPath.lastIndexOf(".");
  let suffixName;
  if (index == -1) {
    suffixName = "";
  } else {
    suffixName = videoPath.substring(index + 1);
  }
  switch (suffixName) {
    case "m3u8":
      return {
        // withCredentials: false,
        type: "application/x-mpegURL",
        src: videoPath,
      };
    case "mp4":
      return {
        type: "video/mp4",
        src: videoPath,
      };
  }
}

/**
 * 记录用户身份cookie
 * @param {string} cname 用户身份标识
 * @param {string} cvalue 标识值
 * @param {number} [exdays] 过期时间
 */
export function setCookie(cname, cvalue, exdays, extime) {
  let expires;
  // 指定过期时间
  if (extime) {
    expires = "expires=" + new Date(extime).toUTCString();
    document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + "; " + expires; //cookie值只能用url编码中字符，所以要编码
  }
  else {
    // 自定制过期时间
    if (exdays || exdays == 0) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      expires = "expires=" + d.toUTCString();
      document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue) + "; " + expires; //cookie值只能用url编码中字符，所以要编码
    }
    // 未设置过期时间 临时
    else {
      document.cookie = encodeURIComponent(cname) + "=" + encodeURIComponent(cvalue);
    }
  }
}

/**
 * 获取用户身份cookie(注意截取cookie时=号左右name和value可能多余空格)
 * @param {string} cname 用户身份标识
 * @return 返回该用户标识值
 */
export function getCookie(cname) {
  var ca = document.cookie.split(";");

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].split('=');
    if (c[0].trim() == encodeURIComponent(cname)) return decodeURIComponent(c[1]);
  }
  return "";
}
/**
 * 对象数据转化为拼接字符串
 * @param {Object} obj 对象
 */
export function convertParams(obj) {
  if (!obj) {
    return obj;
  }
  const params = [];
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    // 如果值为undefined我们将其置空
    if (typeof value === "undefined") {
      value = "";
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, value].join("="));
  });
  return params.join("&");
}
/**
 * 敏感词汇过滤替换*
 * @param {string} text 用户输入文本
 * @return 展示给用户的文本
 */
export function textfilter(text) {
  let result = text
  return result;
}

// 处理激活tab页数组去重
export function deWeight(arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i].name == arr[j].name) {
        arr.splice(j, 1);
        //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
        j--;
      }
    }
  }
  return arr;
}

// 数组去重
export function unique(arr){
  return Array.from(new Set(arr));
}


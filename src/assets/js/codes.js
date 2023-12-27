//报错提示
export const errMsg = [
  { code: 403, value: "您没有访问此功能的权限" },
  { code: 400, value: "服务器不理解请求的语法" },
  { code: 404, value: "服务器找不到请求地址" },
  { code: 408, value: "服务器等候请求时发生超时" },
  { code: 500, value: "服务器遇到错误，无法完成请求" },
  { code: 501, value: "服务器不具备完成请求的功能" },
  { code: 502, value: "错误网关" },
  { code: 503, value: "服务器目前无法使用(由于超载或停机维护)" },
  { code: 504, value: "网关超时" },
  { code: 505, value: "服务器不支持请求中所用的 HTTP 协议版本" },
  { code: 0, value: "网关超时" },
];

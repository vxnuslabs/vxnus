const regex = /(!\[.+?\]\(.+?\)|\*\*.+?\*\*|\*.+?\*|`.+?`|\[.+?\]\(.+?\))/g;
const str1 = "![Caption](https://example.com)";
const str2 = "[![Caption](https://example.com)](https://example.com)";

console.log("Str1:", str1.split(regex).filter(Boolean));
console.log("Str2:", str2.split(regex).filter(Boolean));

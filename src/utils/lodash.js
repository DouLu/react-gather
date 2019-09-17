// 扁平化数组
function flattenDepth(arr, num) {
  const targetArr = [];
  (function flatten(arr, inum) {
    (arr instanceof Array) && arr.forEach(i => {
      (i instanceof Array) && inum > 0 ? flatten(i, inum - 1) : targetArr.push(i);
    });
  })(arr, num);
  return targetArr;
}
const arr = [1, [2, 3, [4, 5, [6]]], [7, 8], [9, [10]]];
console.log(flattenDepth(arr, 1));
console.log(flattenDepth(arr, 2));
console.log(flattenDepth(arr, 3));
console.log(flattenDepth(arr, Infinity));

// 拆分新数据
// splice(n)去除前面n个数
// slice(start,end)切割出start和end的数
function chunk(arr, size) {
  const targetArr = [];
  (function sl(arr, size) {
    targetArr.push(arr.slice(0, size));
    (arr instanceof Array) && arr.length > size && sl(arr.splice(size), size);
  })(arr, size);
  return targetArr;
}
console.log(chunk(['a', 'b', 'c', 'd'], 3));

// 过滤假值,在判断中都为false的值
// false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”
function compact(arr) {
  return arr instanceof Array ? arr.filter(i => i) : [];
}
console.log(compact([-1, -2, 0, 1, false, 2, '', 3]));
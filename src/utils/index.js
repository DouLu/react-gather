// 无副作用，数组操作
const arrayInsert = (arr, index, newItem) => [ // 数组插入解构形式
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
];

const arrayRemove = (arr, index) => (arr.length === 1 ? [] : [ // 数组删除
  ...arr.slice(0, index - 1),
  ...arr.slice(index),
]);

const copy = obj => JSON.parse(JSON.stringify(obj));

export {
  arrayInsert,
  arrayRemove,
  copy,
};

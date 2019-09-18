import province from '../data/province.json';
import city from '../data/city.json';
import county from '../data/county.json';

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

// 三级省市县数据
const ThreeLevelProvinceData = province.map(pro => {
  const proData = { title: pro.name, value: pro.id };
  proData.children = !city[pro.id] ? [] : city[pro.id].map(pCity => {
    const cityData = { title: pCity.name, value: pCity.id };
    cityData.children = !county[pCity.id] ? [] : county[pCity.id].map(cc => {
      return { title: cc.name, value: cc.id };
    })
    return cityData;
  });
  return proData;
});

const PROVINCE = province.map(pro => ({ title: pro.name, value: pro.id }));
const CITY = (pid) => city[pid].map(pro => ({ title: pro.name, value: pro.id }));
const COUNTY = (cid) => county[cid].map(pro => ({ title: pro.name, value: pro.id }));

export {
  arrayInsert,
  arrayRemove,
  copy,
  PROVINCE,
  CITY,
  COUNTY,
  ThreeLevelProvinceData,
};

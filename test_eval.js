const data1 = { isDeleted: true };
const data2 = { isDeleted: false };
const data3 = { isDeleted: "true" };
console.log(data1.isDeleted !== true); // false
console.log(data2.isDeleted !== true); // true
console.log(data3.isDeleted !== true); // true

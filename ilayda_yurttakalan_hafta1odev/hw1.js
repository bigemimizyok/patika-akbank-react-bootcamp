const nameKeyArr = [
  { name: "ilayda" },
  { name: "RESul" },
  { name: "hoMeros" },
  { name: "ceNgiz" },
  { name: "ayŞe" },
  { name: "BARkın" },
  { name: "can" },
  { name: "ECE" },
  { name: "arzU" },
];

const valueArr = nameKeyArr.map((item) => item.name);

Array.prototype.includesCi = function (search) {
  const lowerList = this.map((item) => item.toLocaleLowerCase("tr-TR"));
  return lowerList.includes(search.toLocaleLowerCase("tr-TR"));
};
//toLocaleLowerCase() instead of toLoweCase() I used it because sometimes there were problems with the letters ı and i

console.log(valueArr.includesCi("İlayda"));


/* Test:

const array = ["Patika","219","Akbank","React","Bootcamp"]

console.log(array.includesCi("patika")===true ? "Beklendiği gibi" : "Beklendiği gibi değil")
console.log(array.includesCi("kırmızı")===false ? "Beklendiği gibi" : "Beklendiği gibi değil") */
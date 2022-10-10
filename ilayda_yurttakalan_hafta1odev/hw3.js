const folders = [
  {
    id: 5,
    name: "Klasör 1",
    files: [
      { id: 17, name: "profil.jpg" },
      { id: 18, name: "manzara.jpg" },
    ],
  },
  {
    id: 6,
    name: "Klasör 2",
    files: [
      { id: 21, name: "profil.jpg" },
      { id: 22, name: "dosya.xls" },
    ],
  },
  {
    id: 7,
    name: "Klasör 3",
  },
];

const move = (file, toGo) => {
  const targetFolder = folders.find((x) => x.id === toGo);
  const sourceFolder = folders.find((x) => x.files.find((a) => a.id === file));
  const sourceFile = sourceFolder.files.find((x) => x.id === file);
  sourceFolder.files = sourceFolder.files.filter((x) => x.id != file);
  targetFolder.files?.push(sourceFile);
  if (!targetFolder.files) {
    targetFolder["files"] = [sourceFile];
  }
};

const copy = (file, toGo) => {
  const targetFolder = folders.find((x) => x.id === toGo);
  const sourceFolder = folders.find((x) => x.files.find((a) => a.id === file));
  const sourceFile = sourceFolder.files.find((x) => x.id === file);
  if (!targetFolder.files) {
    targetFolder["files"] = [];
  }
  targetFolder.files?.push(sourceFile);
};

const remove = (file) => {
  const sourceFolder = folders.find((x) => x.files.find((a) => a.id === file));
  sourceFolder.files = sourceFolder.files?.filter((x) => x.id != file);
};

const removeFolder = (folder) => {
  const index = folders.findIndex((x) => x.id === folder);
  if (index > -1) {
    folders.splice(index, 1);
  }
};

const parentFolderOf = (file) => {
  const parentFinder = folders.find((x) => x.files.find((a) => a.id === file));
  const foundId = parentFinder.id;
  return foundId;
};

// TESTS - Yorum satırlarını kaldırarak test edebilirsiniz.


console.log("BAŞLANGIÇ: ", folders) 

move(21,7)                                                                           // dosyayı klasöre taşıyacak

console.log("MOVE - 17 id'li dosya 6 id'li klasöre taşındı.", folders)



/* 
console.log("BAŞLANGIÇ: ", folders)

copy(18,7)                                                                           // kopyasını oluşturacak

console.log("COPY - 18 id'li dosya 7 id'li klasörde kopyalandı.", folders)
 */

/* 
console.log("BAŞLANGIÇ: ", folders)

remove(17)                                                                           // dosyayı silecek

console.log("REMOVE - 17 id'li dosya silindi", folders)

 */
/* 
console.log("BAŞLANGIÇ: ", folders)

removeFolder(6)                                                                      //klasörü ve altındaki tüm dosyaları sileceK

console.log("COPY - 7 id'li klasör silindi.", folders)

 */
/* 
const parentId = parentFolderOf(17)

console.log("17 id'li dosyanın içinde buldunduğu klasörün id'si:", parentId );       // ==> 5

 */
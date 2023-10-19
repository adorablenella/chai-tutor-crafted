// write a node js script which will read the html files inside public directory
// and generate a library.json file which has the following shape
// {
//     "uuid": "hero-one",
//     "name": "Hero 1",
//     "format": "html",
//     "preview": "https://fldwljgzcktqnysdkxnn.supabase.co/storage/v1/object/public/chaibuilder-blob-storage/block-previews/hero-one",
//     "group": "hero"
// },
// set uuid as the file name
// set name as the capitalized file name
// set format as html
// set preview as the url of the file in supabase storage
// set group as first word of the file name
// for example, hero-one.html will have group as hero
// and hero-two.html will have group as hero

const fs = require("fs");
const publicDir = "./public";

const library = [];

fs.readdir(publicDir, (err, files) => {
  if (err) {
    console.error("Error reading public directory:", err);
    return;
  }

  files.forEach((file) => {
    if (file.endsWith(".html")) {
      const uuid = file.replace(".html", "");
      const name = capitalizeFirstLetter(uuid);
      const format = "html";
      const preview = `https://placehold.it/300x100?text=${uuid}`;
      const group = uuid.split("-")[0];

      library.push({ uuid, name, format, preview, group });
    }
  });

  const libraryJSON = JSON.stringify(library, null, 2);

  console.log(libraryJSON);

  fs.writeFile("public/library.json", libraryJSON, (err) => {
    if (err) {
      console.error("Error writing library.json:", err);
    } else {
      console.log("library.json has been created.");
    }
  });
});

function capitalizeFirstLetter(str) {
  return (str.charAt(0).toUpperCase() + str.slice(1)).replace(/-/g, " ");
}

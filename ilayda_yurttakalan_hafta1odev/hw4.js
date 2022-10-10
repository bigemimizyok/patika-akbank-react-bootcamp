const input = {
  cols: ["NameSurname", "Company", "Email", "Date", "Country", "City"],
  data: [
    [
      "Hyacinth Vincent",
      "Duis Corporation",
      "iaculis.enim@magnaCrasconvallis.ca",
      "28/06/2022",
      "Eritrea",
      "Lyubertsy",
    ],
    [
      "Brenden Martinez",
      "Volutpat Nunc Associates",
      "iaculis@estMauris.org",
      "24/03/2021",
      "British Indian Ocean Territory",
      "Colwood",
    ],
  ],
};

const output = [];
for (let i = 0; i < input.data.length; i++) {
  const obj = {};
  for (let j = 0; j < input.cols.length; j++) {
    obj[input.cols[j]] = input.data[i][j];
  }
  output.push(obj);
}

console.log(output);

const URL =
  "https://cors-anywhere.herokuapp.com/typing-stats-server.herokuapp.com/api/data";

const getData = (setData) => {
  fetch(URL, {
    "X-Requested-With": "fetch",
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to retrieve data from server");
      }
    })
    .then((data) => {
      setData(data);
    })
    .catch((error) => console.error(error));
};

const postData = (setData, wpm) => {
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wpm }),
    "X-Requested-With": "fetch",
  })
    .then((res) => {
      if (res.ok) {
        getData(setData);
        return res.json();
      } else {
        throw new Error("Failed to send server data");
      }
    })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};

module.exports = { getData, postData };

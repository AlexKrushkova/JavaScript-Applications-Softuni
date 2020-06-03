function getInfo() {
    const stopIdInput = document.getElementById('stopId');
    const stopNameDiv = document.getElementById('stopName');
    const bustContainer = document.getElementById('buses');


    const buseUrl = `https://judgetests.firebaseio.com/businfo/${stopIdInput.value}.json`;

    stopNameDiv.textContent = "";
    bustContainer.innerHTML = "";

    fetch(buseUrl)
    .then(res => res.json())
    .then(data => {
        const { name, buses} = data;
        stopNameDiv.textContent = name;
        Object.entries(buses)
        .forEach(([ busId, busTime]) => {
            const li = document.createElement("li");
            li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;

            bustContainer.appendChild(li);
        })
    })
    .catch((err) => {
        console.log(err);
        stopNameDiv.textContent = "Error";
    });
}
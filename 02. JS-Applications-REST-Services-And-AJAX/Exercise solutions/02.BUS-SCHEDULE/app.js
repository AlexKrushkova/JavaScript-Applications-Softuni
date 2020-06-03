function solve() {

    const infoSpan = document.getElementsByClassName(`info`)[0];
    const departButtone = document.getElementById("depart");
    const arriveButton = document.getElementById("arrive");

    let currentId = 'depot';
    let curretnName;

    
    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
        .then(res => res.json())
        .then(departSuccess)
        .catch(err =>{
            infoSpan.textContent = 'Wrong stop id!';
            console.log(err);
        })
    }

    function arrive() {
        infoSpan.textContent = `Arriving at ${curretnName}`;
        departButtone.disabled = false;
        arriveButton.disabled = true;
    }

    function departSuccess(data){
        const { name, next } = data;

        currentId = next;
        curretnName = name;

        departButtone.disabled = true;
        arriveButton.disabled = false;

        infoSpan.textContent = `Next stop ${curretnName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
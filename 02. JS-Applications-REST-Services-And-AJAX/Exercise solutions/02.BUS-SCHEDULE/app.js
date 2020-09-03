function solve() {
    let spanInfo = document.querySelector(".info");
    let departBtn = document.querySelector('#depart');
    let arriveBtn = document.querySelector('#arrive');
    let currentId = 'depot';
    let currentName = '';
    

    function depart() {
       
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
            .then(res => res.json())
            .then(departSuccess)
            .catch(err =>{
            console.log(err);
        })
    }

    function arrive() {
            spanInfo.textContent = `Arriving at ${currentName}`;
            departBtn.disabled = false;
            arriveBtn.disabled = true;          
       
    }

    function departSuccess(data){
        const { name, next } = data;
        currentId = next;
        currentName = name;
       
        departBtn.disabled = true;
        arriveBtn.disabled = false;        
        
        spanInfo.textContent = `Next stop ${currentName}`;
    }


    return {
        depart,
        arrive
    };
}

let result = solve();
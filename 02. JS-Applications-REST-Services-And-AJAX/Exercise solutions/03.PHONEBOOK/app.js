function attachEvents() {
    
    let ulPhonebook = document.querySelector("#phonebook");
    let loadBtn = document.querySelector("#btnLoad");

    let createBtn = document.querySelector("#btnCreate");
    let contactName = document.querySelector("#person");
    let contactPhone = document.querySelector("#phone");

    const url = "https://phonebook-nakov.firebaseio.com/phonebook.json";

    createBtn.addEventListener("click", addContact);
    loadBtn.addEventListener("click", loadIsPressed);

    function addContact(){
        const person = contactName.value;
        const phone = contactPhone.value;

        
        let headers = {
            method: 'POST',
            headers: {'Content-type': 'application.json'},
            body: JSON.stringify({person, phone})
        };

        fetch(url, headers)
        // .then((res => res.json())
        .then(()=> {
            clearInput();
            loadIsPressed();
        })
        .catch(handleError)
        
    }

    function loadIsPressed(){
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const {person, phone} = data;
            Object.entries(data)
                .forEach(([ elementId, phonebookData])=>{
                    const { phone, person } = phonebookData;

                    const li =  document.createElement("li");
                    li.textContent = `${person}:${phone}`
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                
                    deleteBtn.setAttribute("data-target", elementId);
                    deleteBtn.addEventListener("click", deleteElement);

                    li.appendChild(deleteBtn);
                    ulPhonebook.appendChild(li);

                })
        })
        .catch(handleError);
    }


    function deleteElement(){
            let ID = this.getAttribute("data-target");

            let header = {
                method: 'DELETE'
            };

            fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${ID}.json`, header)
            .then(() => {
                ulPhonebook.innerHTML = "";
                loadIsPressed();
            })
            .catch(handleError);
    }

    function clearInput(){
        ulPhonebook.innerHTML = "";
        contactName.value = "";
        contactPhone.value = "";
    }

    function handleError(err){
        console.log(err);
    }

}

attachEvents();
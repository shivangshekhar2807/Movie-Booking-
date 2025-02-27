


let myApi = "https://crudcrud.com/api/3c26a8f9ba3e458ca911cc8d29d02dcd/movieBooking"

let total = 0;

let userslist = document.querySelector('#users');
let totalbooked = document.querySelector('#total');

let findSlot = document.querySelector('#find');

async function handleMovieBooking(event) {

    event.preventDefault();
    
    let userValue = document.querySelector('#username').value;
    let seatValue = document.querySelector('#seatnumber').value;

    if (await notpresent(seatValue)) {
         let obj = {
        user: userValue,
        seat : seatValue
    }

    let newLi = document.createElement('li');
    newLi.className = "user";
    newLi.textContent = `${userValue}  -  ${seatValue}`;

    let delbtn = document.createElement('button');
    delbtn.className = "delbtn";

    delbtn.textContent = "Delete";

    let editbtn = document.createElement('button');
    editbtn.className = "editbtn";

    editbtn.textContent = "Edit";

    newLi.appendChild(delbtn);
    newLi.appendChild(editbtn);

    userslist.appendChild(newLi);

    let userId;

    let data;

    axios.post(myApi, obj).then(function (res) {
        console.log(res);
        userId = res.data._id;
        userdata = res;
    })
        .catch(function (err) {
            console.log(err);
        })
    
    
    total++;
   updateTotalBooked();
    
    document.querySelector('#username').value = "";
    document.querySelector('#seatnumber').value = "";
    
    
    delbtn.addEventListener('click', function (e) {
        e.target.parentElement.remove();
        axios.delete(`https://crudcrud.com/api/3c26a8f9ba3e458ca911cc8d29d02dcd/movieBooking/${userId}`);
        total--;
       updateTotalBooked();
    })

    editbtn.addEventListener('click', function (e) {
        document.querySelector('#username').value = userdata.data.user;
        document.querySelector('#seatnumber').value = userdata.data.seat;
        
         e.target.parentElement.remove();
        axios.delete(`https://crudcrud.com/api/3c26a8f9ba3e458ca911cc8d29d02dcd/movieBooking/${userId}`);
        total--;
         updateTotalBooked();
    })
    }
    else {
         document.querySelector('#username').value = "";
         document.querySelector('#seatnumber').value = "";
    }

   
     

}

window.addEventListener('DOMContentLoaded', function (e) {
    
    axios.get("https://crudcrud.com/api/3c26a8f9ba3e458ca911cc8d29d02dcd/movieBooking").then(function (res) {
        Display(res);
    })
        .catch(function (err) {
            console.log(err);
    })

})

function Display(res) {
    let i;
   total = res.data.length;
    for (i = 0; i < res.data.length; i++){
        
        DisplayAll(res.data[i],total);
    }
    updateTotalBooked();
}

function DisplayAll(item) {
     let newLi = document.createElement('li');
    newLi.className = "user";
    newLi.textContent = `${item.user}  -  ${item.seat}`;

    let delbtn = document.createElement('button');
    delbtn.className = "delbtn";

    delbtn.textContent = "Delete";

    let editbtn = document.createElement('button');
    editbtn.className = "editbtn";

    editbtn.textContent = "Edit";

    newLi.appendChild(delbtn);
    newLi.appendChild(editbtn);

    userslist.appendChild(newLi);
    
 

     delbtn.addEventListener('click', function (e) {
        e.target.parentElement.remove();
         axios.delete(`https://crudcrud.com/api/3c26a8f9ba3e458ca911cc8d29d02dcd/movieBooking/${item._id}`);
          total--;
         updateTotalBooked();
        
    })

    editbtn.addEventListener('click', function (e) {
        document.querySelector('#username').value = userdata.data.user;
        document.querySelector('#seatnumber').value = userdata.data.seat;
        
         e.target.parentElement.remove();
        axios.delete(`https://crudcrud.com/api/3c26a8f9ba3e458ca911cc8d29d02dcd/movieBooking/${item._id}`);
         total--;
         updateTotalBooked();
        
    })
}

function updateTotalBooked() {
    totalbooked.textContent = total; 
}

async function notpresent(seatval) {
    try {
        const res = await axios.get("https://crudcrud.com/api/3c26a8f9ba3e458ca911cc8d29d02dcd/movieBooking");
        const check = res.data;

        for (let i = 0; i < check.length; i++) {
            if (check[i].seat === seatval) {
                return false;
            }
        }
        return true;
    } catch (err) {
        console.error(err);
        return false; 
    }
}

findSlot.addEventListener('keyup', function () {
    let seatValue = findSlot.value;

    
    axios.get(myApi).then(function (res) {
        const filteredBookings = res.data.filter(booking => booking.seat.toString().includes(seatValue));
        displayFilteredBookings(filteredBookings);
    }).catch(function (err) {
        console.log(err);
    });
});

function displayFilteredBookings(filteredBookings) {
    
    userslist.innerHTML = '';

    
    filteredBookings.forEach(item => {
        DisplayAll(item);
    });

    
    total = filteredBookings.length;
    updateTotalBooked();
}



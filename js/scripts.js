window.onload = function () {

    var addBtn = document.getElementById('add');
    var name = document.getElementById('name');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');
    var input = document.getElementById('search-input');

    //phone book display
    var phoneBookDiv = document.querySelector(".phone-book");
    //create array to store data
    var phoneBookArr = [];

    //Event Listeners
    addBtn.addEventListener("submit", add);
    phoneBookDiv.addEventListener("click", remove);
    input.addEventListener('keyup' , search);

    //searchBtn.addEventListener("click" , search)

    function PhoneBook(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }

    function add() {
        var obj = new PhoneBook(name.value, phone.value, email.value);
        phoneBookArr.push(obj);
        localStorage['addPhoneBook'] = JSON.stringify(phoneBookArr);
        clearForm();
        //update form after adding
        list();
    }

    function remove(e) {

        if (e.target.classList.contains("delete-btn")) {

            var dataId = e.target.getAttribute('data-id');
            //remove record from array
            phoneBookArr.splice(dataId, 1);
            localStorage['addPhoneBook'] = JSON.stringify(phoneBookArr);
            list();
            console.log(e.target, dataId, phoneBookArr);

        } else {
            console.log('no id');
        }
    }

    //listing the name
    function list() {
        //check the localStorage key [addPhoneBook]

        if (localStorage['addPhoneBook'] === undefined) {
            localStorage['addPhoneBook'] = '[]'
        } else {
            phoneBookArr = JSON.parse(localStorage['addPhoneBook']);
            phoneBookDiv.innerHTML = '';

            phoneBookArr = phoneBookArr.sort(function(a,b) {
                return (a.name.toUpperCase() > b.name.toUpperCase())? 1 : -1;
            });

            for (var n in phoneBookArr) {

                var str = '<div class="col-md-4 item">';
                str += '<ul>';
                str += '<li class="name">' + phoneBookArr[n].name + '</li>';
                str += '<li>' + phoneBookArr[n].phone + '</li>';
                str += '<li>' + phoneBookArr[n].email + '</li>';
                str += '<li ><a href="#" class="delete-btn" data-id="' + n + '" > DELETE </a></li>';
                str += '</ul>';
                str += '</div>';
                phoneBookDiv.innerHTML += str;
            }
        }
    }
    // calling the LIST function
    list();

    //search
    function search() {

        var input = document.getElementById('search-input');
        var filter = input.value.toUpperCase();
        var container = document.querySelector(".phone-book");
        var children = container.getElementsByClassName('item');

        for (var i = 0; i < children.length; i++) {
            a = children[i].getElementsByClassName("name")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                children[i].style.display = "";
            } else {
                children[i].style.display = "none";
            }
        }

    }
    // clear values after submission
    function clearForm() {
        var formInput = document.querySelectorAll('from-input');
        for (var i in formInput) {
            formInput[i].value = ' ';
        }
    }
}


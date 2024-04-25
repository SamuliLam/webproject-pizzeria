'use strict';

const user = JSON.parse(sessionStorage.getItem('user'));
const userInformation = document.getElementById('user-information');
if (!user) {
    window.location.href = 'index.html';
} else {
    console.log(user);
    const firstName = document.createElement('p');
    firstName.textContent = `First Name: ${user.first_name}`;
    const lastName = document.createElement('p');
    lastName.textContent = `Last Name: ${user.last_name}`;
    const email = document.createElement('p');
    email.textContent = `Email: ${user.email}`;
    const address = document.createElement('p');
    address.textContent = `Address: ${user.address}`;
    const phoneNumber = document.createElement('p');
    phoneNumber.textContent = `Phone Number: ${user.phone}`;
    userInformation.appendChild(firstName);
    userInformation.appendChild(lastName);
    userInformation.appendChild(email);
    userInformation.appendChild(address);
    userInformation.appendChild(phoneNumber);
}
import {deleteUser, updateUser} from "../api/fetchCalls.js";

export const userComponent = (users) => {
    const userContainer = document.createElement("div");
    userContainer.classList.add("user-container");

    const headers = ["Id", "First name", "Last name", "Email", "Address", "Phone"];

    const userTable = createTable(users, headers);
    userContainer.appendChild(userTable);

    return userContainer;
}

export const createTable = (users, headers) => {

    const userTableContainer = document.createElement("div");
    userTableContainer.classList.add("user-table-container");
    const userTable = document.createElement("table");
    userTable.classList.add("user-table", "responsive-user-table");
    userTableContainer.appendChild(userTable);

    const thead = document.createElement("thead");
    userTable.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
    });

    const changedInputs = {};

    users.forEach(user => {
        const row = document.createElement("tr");
        userTable.appendChild(row);

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const updateButton = document.createElement("button");
        updateButton.classList.add("admin-edit-button");
        updateButton.textContent = "Edit";
        updateButton.dataset.userId = user.id;
        buttonContainer.appendChild(updateButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("admin-edit-button");
        deleteButton.textContent = "Remove";
        deleteButton.dataset.userId = user.id;

        buttonContainer.appendChild(deleteButton);

        Object.keys(user).forEach(key => {
            const td = document.createElement("td");

            if (key === "id") {
                td.textContent = user[key];
            } else {
                const input = document.createElement("input");
                input.value = user[key];
                input.classList.add("admin-content-input");
                input.id = `${user.id}-${key}`;
                td.appendChild(input);

                input.addEventListener('change', () => {
                    changedInputs[input.id] = input.value;
                    (changedInputs);
                });
            }

            row.appendChild(td);
        });

        updateButton.addEventListener('click', async () => {
            const changesByUserId = {};
            for(const key in changedInputs) {
                const [userId, property] = key.split("-");
                if (!changesByUserId[userId]) {
                    changesByUserId[userId] = {};
                }
                changesByUserId[userId][property] = changedInputs[key];
            }

            const userId = updateButton.dataset.userId;
            (userId);
            const userChanges = changesByUserId[userId];
            (userChanges);

            await updateUser(userId, userChanges, sessionStorage.getItem('token'));
        });

        deleteButton.addEventListener('click', async () => {
            const userId = deleteButton.dataset.userId;
            const response = await deleteUser(userId, sessionStorage.getItem('token'));
            const statusMessage = document.getElementById("status-message");
            ('response', response)

            if (response === 200) {
                statusMessage.textContent = `User with id ${userId} has been deleted`;
                statusMessage.style.color = "green";
                const row = deleteButton.parentElement.parentElement;
                row.remove();
            } else {
                statusMessage.textContent = `Failed to delete user with id ${userId}`;
                statusMessage.style.color = "red";
            }

        });

        row.appendChild(buttonContainer);
    });

    return userTableContainer;
}
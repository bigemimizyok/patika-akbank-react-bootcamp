// State

state = {
  users: [],
  products: [],
  activities: [],
  selectedUserIdId: null,
};

// Constant html parts

const userSelectBoxPlaceholder = `<option value="" selected disabled>Select User</option>`;
const productSelectBoxPlaceholder = `<option value="" selected disabled>Select Product</option>`;
// In this function we are rendering all components on the page. 
// Each components have their own render function. On state change, they call

const reRender = () => {
  userListRender();
  productListRender();
  userSelectsRender();
  productSelectsRender();
  mainTableRender();
};

// User list on left side. Collects all users from state and 
// creates a table body then replace it with former one

const userListRender = () => {
  const tbody = document.createElement("tbody");
  state.users.map((user) => {
    const row = createNewUserRow(user);
    tbody.appendChild(row);
  });
  const userTable = document.getElementById("userList");
  const oldTbody = userTable.getElementsByTagName("tbody")[0];
  userTable.replaceChild(tbody, oldTbody);
};

// Product list on left side. Collects all products from state and 
// creates a table body then replace it with former one

const productListRender = () => {
  const tbody = document.createElement("tbody");
  state.products.map((product) => {
    const row = createNewProductRow(product);
    tbody.appendChild(row);
  });
  const productTable = document.getElementById("productList");
  const oldTbody = document
    .getElementById("productList")
    .getElementsByTagName("tbody")[0];
  productTable.replaceChild(tbody, oldTbody);
};

// When added new user, selectboxes should be updated. Collects all users and creates options.

const userSelectsRender = () => {
  const selectBoxes = document.querySelectorAll(".sentUser");

  selectBoxes.forEach((selectBox) => {
    selectBox.innerHTML = userSelectBoxPlaceholder;
  });

  state.users.forEach((user) => {
    const option = document.createElement("option");
    option.text = user.name + " " + user.surname;
    option.value = user.id;

    selectBoxes.forEach((select) => {
      copiedOption = option.cloneNode(true);
      select.add(copiedOption);
    });
  });

  document.querySelector("#sendBalance").value = null;
};

// When added new product, selectboxes should be updated. Collects all products and creates options.

const productSelectsRender = () => {
  const selectBoxes = document.querySelectorAll(".sentProduct");

  selectBoxes.forEach((selectBox) => {
    selectBox.innerHTML = productSelectBoxPlaceholder;
  });

  state.products.forEach((product) => {
    const option = document.createElement("option");
    option.text = product.name;
    option.value = product.id;

    selectBoxes.forEach((select) => {
      copiedOption = option.cloneNode(true);
      select.add(copiedOption);
    });
  });
};

// On each activity history table should be updated. Also if we choose a user we can see user products.
// This component will collect all activities and selected user product then render it.

const mainTableRender = () => {
  const activitiesListElement = document.getElementById("activitiesList");
  const mainProductListElement = document.getElementById("mainProductList");

  const historyTbody = document.createElement("tbody");
  state.activities.map((activity) => {
    const newRow = document.createElement("tr");
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = createActivitiesSummary(activity);
    historyTbody.appendChild(newRow);
  });
  const historyOldTbody =
    activitiesListElement.getElementsByTagName("tbody")[0];
  activitiesListElement.replaceChild(historyTbody, historyOldTbody);

  if (state.selectedUserId) {
    const selectedUser = state.users.find(
      (user) => user.id === state.selectedUserId
    );
    const mainProductsTbody = document.createElement("tbody");
    Object.keys(selectedUser.products)
      .map((key) => Number(key))
      .map((productID) => {
        product = state.products.find(
          (stateProduct) => stateProduct.id === productID
        );
        const newRow = document.createElement("tr");
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = product.name;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = selectedUser.products[productID];
        mainProductsTbody.appendChild(newRow);
      });
    const mainProductsOldTbody =
      mainProductListElement.getElementsByTagName("tbody")[0];
    mainProductListElement.replaceChild(
      mainProductsTbody,
      mainProductsOldTbody
    );

    const userNameIndicator = document.getElementById("selectedUserName");
    userNameIndicator.innerHTML = selectedUser.name;
  }
};

// On each activity we crate a new activity log, push it to state and rerender all components.

const createActivitiesSummary = (activity) => {
  receiverUser = state.users.find(
    (user) => user.id === activity.receiverUserID
  );
  consignerUser = state.users.find(
    (user) => user.id === activity.consignerUserID
  );
  if (activity.type === "transferMoney") {
    return `${consignerUser.name} kullanıcısı ${receiverUser.name} kullanıcısına ${activity.amount} miktarında bakiye aktardı.`;
  } else if (activity.type === "transferProduct") {
    product = state.products.find(
      (product) => product.id === activity.productID
    );
    return `${consignerUser.name} kullanıcısı ${receiverUser.name} kullanıcısına ${product.name} ürününden aktardı.`;
  } else if (activity.type === "buyProduct") {
    product = state.products.find(
      (product) => product.id === activity.productID
    );
    return `${receiverUser.name} kullanıcısı ${product.name} ürününden satın aldı.`;
  }
};

// It creates a table row and adds to body for user that passed with parameter.

const createNewUserRow = (user) => {
  const newRow = document.createElement("tr");
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = user.name + " " + user.surname;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = user.balance;
  cell3 = newRow.insertCell(2);
  productButtonElement = document.createElement("a");
  productButtonElement.classList.add("fa-solid", "fa-gifts", "btnproduct");
  productButtonElement.addEventListener("click", () => {
    state.selectedUserId = user.id;
    reRender();
  });
  cell3.appendChild(productButtonElement);

  return newRow;
};

// It creates a table row and adds to body for product that passed with parameter.

const createNewProductRow = (product) => {
  const newRow = document.createElement("tr");
  cell1 = newRow.insertCell(0);
  cell1.innerHTML = product.name;
  cell2 = newRow.insertCell(1);
  cell2.innerHTML = product.price;
  cell3 = newRow.insertCell(2);
  cell3.innerHTML = product.stock;
  cell4 = newRow.insertCell(3);
  productSellButtonElement = document.createElement("a");
  productSellButtonElement.classList.add("fa-solid", "fa-hand-holding-dollar");
  productSellButtonElement.addEventListener("click", () => {
    const selectedUser = state.users.find(
      (user) => user.id === state.selectedUserId
    );
    product = state.products.find(
      (stateProduct) => stateProduct.id === product.id
    );
    selectedUser.products = {
      ...selectedUser.products,
      [product.id]: Object.keys(selectedUser.products)
        .map((key) => Number(key))
        .includes(product.id)
        ? selectedUser.products[product.id] + 1
        : 1,
    };
    selectedUser.balance = selectedUser.balance - product.price;

    product.stock = product.stock - 1;

    const newProducts = state.products.map((stateProduct) => {
      if (stateProduct.id === product.id) {
        return product;
      }
      return stateProduct;
    });
    const newUsers = state.users.map((stateUser) => {
      if (stateUser.id === selectedUser.id) {
        return selectedUser;
      }
      return stateUser;
    });
    state = {
      ...state,
      users: newUsers,
      products: newProducts,
      activities: [
        ...state.activities,
        {
          receiverUserID: selectedUser.id,
          productID: product.id,
          type: "buyProduct",
        },
      ],
    };
    reRender();
  });
  cell4.appendChild(productSellButtonElement);
  return newRow;
};

// On new user form submitted we call this function. It collects form datas from inputs 
// and adds an incremented id and empty product array then rerender all components.

const formUserSubmit = (event) => {
  event.preventDefault();
  const formData = readFormDataUser();

  const userIds = state.users.map((user) => user.id);
  const maxId = userIds.length ? Math.max(...userIds) : 0;

  formData["id"] = maxId + 1;
  formData["products"] = {};

  state = {
    ...state,
    users: [...state.users, formData],
  };
  reRender();
  resetUserForm();
};

// On new product form submitted we call this function. It collects form datas from inputs 
// and adds an incremented id then rerender all components.

const formProductSubmit = (event) => {
  event.preventDefault();
  const formData = readFormDataProduct();

  const productIds = state.products.map((product) => product.id);
  const maxId = productIds.length ? Math.max(...productIds) : 0;

  formData["id"] = maxId + 1;

  state = {
    ...state,
    products: [...state.products, formData],
  };
  reRender();
  resetProductForm();
};

// EVENT LISTENERS

let formUserDOM = document.querySelector("#userCreateForm");
formUserDOM.addEventListener("submit", formUserSubmit);

let formProductDOM = document.querySelector("#productCreateForm");
formProductDOM.addEventListener("submit", formProductSubmit);

// Data collectors for form inputs

const readFormDataUser = () => {
  let formData = {};
  formData["name"] = document.querySelector("#userName").value;
  formData["surname"] = document.querySelector("#userSurname").value;
  formData["balance"] = Number(document.querySelector("#userBalance").value);
  return formData;
};

const readFormDataProduct = () => {
  let formData = {};
  formData["name"] = document.querySelector("#product").value;
  formData["price"] = Number(document.querySelector("#productPrice").value);
  formData["stock"] = Number(document.querySelector("#productStock").value);
  return formData;
};

/* Reset functions */
const resetUserForm = () => {
  document.querySelector("#userName").value = null;
  document.querySelector("#userSurname").value = null;
  document.querySelector("#userBalance").value = null;
};

const resetProductForm = () => {
  document.querySelector("#product").value = null;
  document.querySelector("#productPrice").value = null;
  document.querySelector("#productStock").value = null;
};

// It collects input values. These are consigner user id, receiver user id and amount. Then we are fetching user objects which are corresponding ids. 
// If consigner user matches we reduce its balance as transferred amount, if receiver user matches we increase its balance as transferred amount.
// At end of process we updates state value and rerenders page.

const sendBalance = () => {
  const consignerUserID = Number(
    document.querySelector("#moneyConsignor").value
  );
  const receiverUserID = Number(document.querySelector("#moneyReceiver").value);
  const amount = Number(document.querySelector("#sendBalance").value);

  const newUsers = state.users.map((user) => {
    if (user.id === consignerUserID) {
      user.balance = user.balance - amount;
    } else if (user.id === receiverUserID) {
      user.balance = user.balance + amount;
    }
    return user;
  });

  state = {
    ...state,
    users: newUsers,
    activities: [
      ...state.activities,
      {
        consignerUserID: consignerUserID,
        receiverUserID: receiverUserID,
        amount: amount,
        type: "transferMoney",
      },
    ],
  };
  reRender();
};

// It collects input values. These are consigner user id, receiver user id and product id. Then we are fetching user objects which are corresponding ids. 
// If consigner user matches we drop product stock in its products inventory, if receiver user matches we add product stock in its product inventory.
// At end of process we updates state value and rerenders page.

const sentProduct = () => {
  const consignerUserID = Number(
    document.querySelector("#productConsignor").value
  );
  const receiverUserID = Number(
    document.querySelector("#productReceiver").value
  );
  const productID = Number(document.querySelector("#selectsendProduct").value);

  const newUsers = state.users.map((user) => {
    if (user.id === consignerUserID) {
      if (
        !Object.keys(user.products)
          .map((key) => Number(key))
          .includes(productID)
      ) {
        alert("Gondericide bu üründen yok!");
        throw Error;
      }
      user.products = {
        ...user.products,
        [productID]: user.products[productID] - 1,
      };
    } else if (user.id === receiverUserID) {
      user.products = {
        ...user.products,
        [productID]: Object.keys(user.products)
          .map((key) => Number(key))
          .includes(productID)
          ? user.products[productID] + 1
          : 1,
      };
    }
    return user;
  });

  state = {
    ...state,
    users: newUsers,
    activities: [
      ...state.activities,
      {
        consignerUserID: consignerUserID,
        receiverUserID: receiverUserID,
        productID: productID,
        type: "transferProduct",
      },
    ],
  };
  reRender();
};

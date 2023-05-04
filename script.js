let addUserBtn = document.getElementById("addUserBtn");
let fullName = document.querySelector(".full__name__input");
let age = document.querySelector(".age__input");
let phoneNumber = document.querySelector(".phone__number__input");
let data = [];
function getPosts() {
  axios({
    url: "http://localhost:3004/users",
    method: "get",
  }).then((res) => {
    console.log(res);
    data = res.data;
    draw();
  });
}
getPosts();
addUserBtn.addEventListener("click", () => {
  if (!fullName.value && !age.value && !phoneNumber.value) {
    return;
  } else {
    axios({
      url: "http://localhost:3004/users",
      method: "post",
      data: {
        name: fullName.value,
        age: age.value,
        phoneNumber: phoneNumber.value,
      },
    }).then((res) => {
      getPosts();
    });
  }
});
function draw() {
  let s = ``;
  for (let i = 0; i < data.length; i++) {
    s += `
     <div class="list-group list-group-flush border-bottom scrollarea">
        <a
          class="list-group-item list-group-item-action py-3 lh-tight"
          aria-current="true"
        >
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">${data[i].name} </strong>
          </div>
          <div class="col-10 mb-1 small">
            <button class="btn btn-outline-primary" onclick="contentShow(${
              i + 1
            })">Posts</button>
            <button class="btn btn-outline-success" onclick="todosShow(${
              i + 1
            })">Todos</button>
          </div>
        </a>
      </div>
`;
  }
  document.querySelector(".parent").innerHTML = s;
}

function contentShow(userId) {
  axios({
    url: `http://localhost:3004/users/${userId}`,
    method: "get",
  }).then((res) => {
    console.log(res.data);
    let a = ``;
    a += `
  <div class="content__info">
        <strong class="mb-1">${res.data.name}</strong>
        <small>Age: ${res.data.age}</small>
        <small>Phone Number: ${res.data.phoneNumber} </small>
      </div>
      <div class="add__posts">
        <button class="btn btn-outline-primary"data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="addUserId(${userId})">Add Posts</button>
      </div>
      <div class="content__posts">

       
       
        
        </div>
      </div>
      `;
    document.querySelector(".content").innerHTML = a;
    drawUserPost(userId);
  });
}

function todosShow(userId) {
  axios({
    url: `http://localhost:3004/users/${userId}`,
    method: "get",
  }).then((res) => {
    console.log(res.data);
    let a = ``;
    a += `
  <div class="content__info">
        <strong class="mb-1">${res.data.name}</strong>
        <small>Age: ${res.data.age}</small>
        <small>Phone Number: ${res.data.phoneNumber} </small>
      </div>
      <div class="add__posts">
        <button class="btn btn-outline-primary"data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="addUserId(${userId})">Add Posts</button>
      </div>
      <div class="content__posts">

       
       
        
        </div>
      </div>
      `;
    document.querySelector(".content").innerHTML = a;
    drawUserPost(userId);
  });
}

let b = "";
function addUserId(userId) {
  b = userId;
  console.log(b);
  return b;
}
let postTitle = document.querySelector(".post__title");
let bodyPart = document.querySelector(".post__body");
let datePost = document.querySelector(".post__date");
function postUserPost() {
  console.log(postTitle.value);
  console.log(bodyPart.value);
  console.log(datePost.value);
  let mainUserId = addUserId(b);
  axios({
    url: `http://localhost:3004/posts`,
    method: "post",
    data: {
      title: postTitle.value,
      body: bodyPart.value,
      date: datePost.value,
      userId: mainUserId,
    },
  }).then((res) => {
    console.log(res.data);
    drawUserPost(mainUserId);
  });
}

function drawUserPost(id) {
  axios({
    url: `http://localhost:3004/posts/?userId=${id}`,
  }).then((res) => {
    let myPost = ``;
    for (let i = 0; i < res.data.length; i++) {
      myPost += `
       <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">${res.data[i].title}</h5>
            <p class="card-text">
              ${res.data[i].body}
            </p>
            <a href="#" class="btn btn-primary">${res.data[i].date}</a>
          </div>
          </div>
      `;
    }
    document.querySelector(".content__posts").innerHTML = myPost;
  });
}

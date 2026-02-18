const API = "http://localhost:3000";

let userId = 1;


// ================= LOGIN =================
function login() {

  fetch(API + "/login", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      email: email.value,
      password: pass.value
    })

  })
  .then(r => r.json())
  .then(d => {

    if (d.role === "admin")
      location = "admin.html";
    else {
      userId = d.id;
      location = "dashboard.html";
    }
  });
}


// ================= ADD COMPLAINT =================
function addComplaint() {

  fetch(API + "/complaint", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({

      user_id: userId,
      title: title.value,
      category: cat.value,
      description: desc.value

    })

  })
  .then(() => alert("Submitted"));
}


// ================= LOAD ADMIN =================
fetch(API + "/complaints")
.then(r => r.json())
.then(data => {

  if (!document.getElementById("data")) return;

  let html = "";

  data.forEach(c => {

    html += `
      <p>
      ${c.title} - ${c.status}

      <button onclick="update(${c.id},'Resolved')">
        Resolve
      </button>
      </p>
    `;
  });

  dataDiv.innerHTML = html;
});


// ================= UPDATE =================
function update(id,status){

  fetch(API + "/status/"+id,{

    method:"PUT",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({status})

  }).then(()=>location.reload());
}

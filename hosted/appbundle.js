(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("projectMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,r)=>{const c=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await c.json();document.getElementById("projectMessage").classList.add("hidden"),n.error&&t(n.error),n.redirect&&(window.location=n.redirect),r&&r(n)},hideError:()=>{document.getElementById("projectMessage").classList.add("hidden")}}}},t={};function a(r){var c=t[r];if(void 0!==c)return c.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}(()=>{const e=a(603),t=async t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#projectName").value,r=t.target.querySelector("#projectDesc").value,c=t.target.querySelector("#_csrf").value;if(!a||!r)return e.handleError("All field are required! "),!1;const s=await fetch("/maker",{method:"POST",body:new FormData(t.target)}),o=await s.text();return document.getElementById("messages").innerText=o,sendPost(t.target.action,{name:a,desc:r,_csrf:c},n),!1},r=e=>React.createElement("form",{id:"projectForm",onsubmit:t,name:"projectForm",action:"/maker",method:"POST",className:"projectForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{className:"userInput",id:"projectName",type:"text",name:"name",placeholder:"Project Name"}),React.createElement("label",{htmlFor:"desc"},"Description: "),React.createElement("textarea",{className:"userInput",id:"projectDesc",type:"string",name:"desc"}),React.createElement("input",{type:"file",name:"sampleFile"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeProjectSubmit",type:"submit",value:"Make Project"})),c=e=>{if(0===e.projects.length)return React.createElement("div",{className:"projectList"},React.createElement("h3",{className:"emptyProject"},"No Projects Yet!"));const t=e.projects.map((e=>React.createElement("div",{key:e.id,className:"project"},React.createElement("img",{src:"/assets/img/projectface.jpeg",alt:"project face",className:"projectFace"}),React.createElement("h3",{className:"projectName"},e.name," "),React.createElement("h3",{className:"projectDesc"},e.desc," "),React.createElement("img",{src:e.img,alt:e.name}))));return React.createElement("div",{className:"projectList"},t)},n=async()=>{const e=await fetch("/getProjects"),t=await e.json();ReactDOM.render(React.createElement(c,{project:t.project}),document.getElementById("projects"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement(r,{csrf:t.csrfToken}),document.getElementById("makeProject")),ReactDOM.render(React.createElement(c,{projects:[]}),document.getElementById("projects")),n()}})()})();
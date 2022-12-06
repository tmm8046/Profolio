const helper = require('./helper.js');

const handleProject = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#projectName').value;
    const desc = e.target.querySelector('#projectDesc').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name || !desc) {
        helper.handleError('All field are required! ');
        return false;
    }

    sendPost(e.target.action, {name, desc, _csrf}, loadProjectsFromServer);

    return false;
}

const ProjectForm = (props) => {
    return (
        <form id="projectForm"
        onsubmit={handleProject}
        name="projectForm"
        action="/maker"
        method="POST"
        className="projectForm"
        >
            <label htmlFor="name">Name: </label>
            <input className = "userInput" id='projectName' type="text" name="name" placeholder="Project Name" />
            <label htmlFor="desc">Description: </label>
            <input className = "userInput" id="projectDescprojectDesc" type="number" min="0" name="age" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeProjectSubmit" type="submit" value="Make Project" />

        </form>
    )
}

const UploadForm = () => {
    return (
        <form ref='uploadForm' 
        id='uploadForm' 
        action='/upload' 
        method='POST' 
        encType="multipart/form-data">
            <input type="file" name="sampleFile" />
            <input type='submit' value='Upload!' />
        </form> 
    )
}

const ProjectList = (props) => {
    if(props.projects.length === 0) {
        return (
            <div className="projectList">
                <h3 className="emptyProject">No Projects Yet!</h3>
            </div>
        );
    }

    const projectNodes = props.projects.map(project => {
        return (
            <div key={project.id} className = "project">
                <img src="/assets/img/projectface.jpeg" alt="project face" className="projectFace" />
                <h3 className="projectName">{project.name} </h3>
                <h3 className="projectDesc">{project.desc} </h3>
                <img src={project.img} alt={project.name} />
            </div>
        );
    });

    return (
        <div className="projectList">
            {projectNodes}
        </div>
    );
}

const loadProjectsFromServer = async () => {
    const response = await fetch('/getProjects');
    const data = await response.json();
    ReactDOM.render(
        <ProjectList project={data.project} />,
        document.getElementById('projects')
    )
}

const uploadFile = async (e) => {
    e.preventDefault();

    const response = await fetch('/upload',{
        method: 'POST',
        body: new FormData(e.target),
    });

    const text = await response.text();
    document.getElementById('messages').innerText = text;

    return false;
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    //Upload File
    const uploadForm = document.getElementById('uploadForm');
    uploadForm.addEventListener('submit', uploadFile);

    ReactDOM.render(
        <ProjectForm csrf={data.csrfToken} />,
        document.getElementById('makeProject')
    );

    ReactDOM.render(
        <UploadForm csrf={data.csrfToken} />,
        document.getElementById('uploadImage')
    );

    ReactDOM.render(
        <ProjectList projects={[]} />,
        document.getElementById('projects')
    )

    loadProjectsFromServer();
}

window.onload = init;
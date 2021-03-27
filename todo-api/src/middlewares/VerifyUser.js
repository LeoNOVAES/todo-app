const Project = require('../models/ProjectModel');
const Task = require('../models/TasksModel');

module.exports = ({ model }) => async (req, res, next) => {
    try {

        switch (model) {

            case 'project':
                const project = await Project.findById(req.params.id);

                if (String(project.owner) !== req.userId) {
                    throw new Error();
                }

                next();
                break;
            case 'task':
                const task = await Task.findById(req.params.id);
                const projectOwner = await Project.findById(task.project);

                if (String(projectOwner.owner) !== req.userId) {
                    throw new Error();
                }

                next();
                break;
            case 'project_task':
                const projectTask = await Project.findById(req.body.project);

                if (String(projectTask.owner) !== req.userId) {
                    throw new Error();
                }

                next();
                break;
            case 'get_task_by_project':
                const projectByTask = await Project.findById(req.params.project);

                if (String(projectByTask.owner) !== req.userId) {
                    throw new Error();
                }

                next();
                break;
            default:
                console.log('middlware not know model!');
                throw new Error();
                break;
        }

    } catch (e) {
        console.log(e);
        e.httpStatusCode = 401;
        e.responseMessage = 'User not Authorized!';
        next(e);
    }
}
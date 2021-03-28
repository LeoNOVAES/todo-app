const Project = require("../models/ProjectModel");
const Task = require("../models/TasksModel");
const moment = require("moment");

const validateDateStartEnd = (start, end) => {
    console.log(moment(start) < moment(end))
    return moment(start) < moment(end);
}

module.exports = {
    async store(req, res, next) {
        try {
            const { userId } = req;
            const { title, tasks } = req.body;

            const exists = await Project.findOne({ title: title, owner: userId });
            if (exists) return res.status(409).json({ message: "Project already exists!" });

            const project = await Project.create({ title, owner: userId });

            if(tasks && tasks.length) {
                await Promise.all(tasks.map(async (task) => {
                    // END CANNOT BEFORE START 
                    if (!validateDateStartEnd(task.start, task.end)) {
                        return;
                    }
    
                    const projectTask = new Task({ ...task, project: project._id });
                    await projectTask.save();
                    project.tasks.push(projectTask);
                }));
            }
            
            await project.save();
            return res.status(200).json({ project });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 400;
            e.responseMessage = 'Error saving project!';
            next(e);
        }
    },

    async update(req, res, next) {
        try {

            const { title, tasks } = req.body;
            const { id } = req.params;

            const project = await Project.findByIdAndUpdate(id, { title }, { new: true });

            await Promise.all(tasks.map(async (task) => {

                // END CANNOT BEFORE START 
                if (!validateDateStartEnd(task.start, task.end)) {
                    return;
                }

                if (task._id) {
                    await Task.findByIdAndUpdate(task._id, task);
                } else {
                    const projectTask = new Task({ ...task, project: project._id });
                    await projectTask.save();
                    project.tasks.push(projectTask);
                }
            }));

            await project.save();
            return res.json({ project });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 400;
            e.responseMessage = 'Error updating project!';
            next(e);
        }
    },

    async indexAllByUser(req, res) {
        try {
            const { userId } = req;
            const projects = await Project.find({ owner: userId }).populate(['owner', 'tasks']);
            return res.status(200).json({ projects });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 404;
            e.responseMessage = 'Project not found!';
            next(e);
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            await Project.findOneAndRemove({ _id: id });

            await Task.remove({ project: id });

            return res.status(200).json({ message: "Project deleted successfully!" });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 400;
            e.responseMessage = 'Error deleting project!';
            next(e);
        }
    }
}
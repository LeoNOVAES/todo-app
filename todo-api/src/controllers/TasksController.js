const Task = require("../models/TasksModel");
const Project = require("../models/ProjectModel");
const moment = require("moment");

const validateDateStartEnd = (start, end) => {
    return moment(start) < moment(end);
}

module.exports = {
    async store(req, res, next) {
        try {
            const data = req.body;

            const exists = await Task.findOne({ title: data.title, project: data.project });
            if (exists) return res.status(409).json({ message: "Task already exists!" });

            // END CANNOT BEFORE START 
            if (!validateDateStartEnd(data.start, data.end)) {
                throw new Error();
            }

            const projectTask = await Project.findOne({ _id: data.project });
            if(!projectTask) {
                throw new Error();
            }

            const task = await Task.create(data);
            projectTask.tasks.push(task);
            await projectTask.save();
            return res.status(200).json({ task });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 400;
            e.responseMessage = "Error creating Task!";
            next(e);
        }
    },

    async update(req, res, next) {
        try {

            const data = req.body;
            const { id } = req.params;

            // END CANNOT BEFORE START 
            if (!validateDateStartEnd(data.start, data.end)) {
                return;
            }

            const task = await Task.findByIdAndUpdate(id, data, { new: true });

            await task.save();
            return res.json({ task });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 400;
            e.responseMessage = 'Error updating task!';
            next(e);
        }
    },

    async indexByProject(req, res, next) {
        try {
            const { project } = req.params;
            const tasksDone = await Task.find({ project, done: true });
            const tasksNotDone = await Task.find({ project, done: false });
            return res.json({ tasksDone, tasksNotDone });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 400;
            e.responseMessage = 'Error getting tasks!';
            next(e);
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await Task.findOneAndRemove({ _id: id });
            return res.status(200).json({ message: "Task deleted successfully!" });
        } catch (e) {
            console.log(e);
            e.httpStatusCode = 400;
            e.responseMessage = 'Error deleting task!';
            next(e);
        }
    }
}


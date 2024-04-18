import db from "../Database/index.js";

function AssignmentRoutes(app) {
    app.get("/api/Courses/:cid/Assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((m) => m.course === cid);
        res.send(assignments);
    });


    app.post("/api/Courses/:cid/Assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    app.delete("/api/Assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });

    app.put("/api/Assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (a) => a._id === aid);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });
}
export default AssignmentRoutes;
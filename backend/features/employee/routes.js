var EmployeeController = require('./employeeController');

const employeeRoutes = (app, db) => {
    "use strict";
    const controller = new EmployeeController(db);

    app.route('/api/employees')
       .get((req, res) => {
            controller.listEmployees().then(employees => {
             res.json(employees);
            }).catch(err => {
                res.status(500).json({ error: err.toString() });
            });
    });

    app.route('/api/mentor/:mentorId/assign/')
       .put((req,res) => {
            controller
                .assignMentor(req.params.mentorId, req.body)
                .then(() => res.json({"result":"success"}))
                .catch(err => {
                res.status(500).json({ error: err.toString() });
            });
    });

    app.route('/api/mentor/:mentorId/remove/')
       .put((req,res) => {
           controller
                .removeMentees(req.params.mentorId, req.body)
                .then(() => res.json({"result":"success"}))
                .catch(err => {
                    res.status(500).json({ error: err.toString() });
            });
    });

    app.route('/api/mentor/:mentorId/mentees')
       .get((req, res) => {
           controller
                .getMentees(req.params.mentorId)
                .then(emp => res.json(emp))
                .catch(err => {
                        res.status(500).json({ error: err.toString() });
                });
    });

    app.route('/api/employee/:userId/promote/mentor')
       .put((req, res) => {
           controller
                .promoteAsMentor(req.params.userId)
                .then((result) => res.json(result))
                .catch(err => {
                        res.status(500).json({ error: err.toString() });
                });
    });

    app.route('/api/employee/:userId/promote/ph')
       .put((req, res) => {
           controller
                .promoteAsPracticeHead(req.params.userId)
                .then((result) => res.json(result))
                .catch(err => {
                        res.status(500).json({ error: err.toString() });
                });
    });

    app.route('/api/employee/practice/:practiceId/mentees/unassigned')
       .get((req, res) => {
            controller
                .getUnassignedMenteesOf(req.params.practiceId)
                .then(mentees => {
                    res.json(mentees);
                }).catch(err => {
                    res.status(500).json(err);
                });
    });

    //this will be called by an admin user
    app.route('/api/employee/practice/unassigned')
       .get((req, res) => {
            controller
                .getUsersNotAssignedToPractice()
                .then(users => {
                    res.json(users);
                }).catch(err => {
                    res.status(500).json(err);
                });
    });

    app.route('/api/employee/practice/:practiceId/users')
       .get((req, res) => {
            controller
                .getUsersAssignedToPractice(req.params.practiceId)
                .then(users => {
                    res.json(users);
                }).catch(err => {
                    res.status(500).json(err);
                });
    });

    app.route('/api/employee/practice/:practiceId/assign')
    .put((req, res) => {
        controller.assignUsersToPractice(req.params.practiceId, req.body).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/employee/practice/:practiceId/remove')
    .put((req, res) => {
        controller.removeUsersFromPractice(req.params.practiceId, req.body).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/employee/practice/:practiceId/members')
    .get((req, res) => {
        controller.getAllUsersBelongingTo(req.params.practiceId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    //NEW SET OF API's TO BE USED
    app.route('/api/mentee/:menteeId/info')
    .get((req, res) => {
        controller.getMenteeInfo(req.params.menteeId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practicemanager/:pmId/info')
    .get((req, res) => {
        controller.getPracticeManagerInfo(req.params.pmId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practicemanager/:pmId/details')
    .get((req, res) => {
        controller.getPracticeManagerDetails(req.params.pmId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practicehead/:phId/info')
    .get((req, res) => {
        controller.getPracticeHeadInfo(req.params.phId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/practicehead/:phId/details')
    .get((req, res) => {
        controller.getPracticeHeadDetails(req.params.phId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });

    app.route('/api/employee/practice/:practiceId/pm')
    .get((req, res) => {
        controller.getPracticeManagersOfAPractice(req.params.practiceId).then(response => {
            res.json(response);
        }).catch(err => {
            res.status(500).json(err);
        });
    });
};

module.exports = employeeRoutes;
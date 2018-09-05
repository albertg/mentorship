var expect = require('chai').expect;
var getGoalStatus = require('../../backend/lib/goalUtils').goalStatuses;

describe('Testing the goal library utilities', () =>{
    describe('Testing goal statuses based on action statuses', () => {
        it('should set goal status as Not started if all action statuses are Not started', (done) => {
            var goals = [{
                id:1,
                actions:[{
                    id:3,
                    actionStatus:{
                        id:1,
                        statusName: 'Not Started'
                    }
                },{
                    id:4,
                    actionStatus:{
                        id:1,
                        statusName: 'Not Started'
                    }
                }]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.notStarted).to.equal(1);
            done();
        });

        it('should set goal status as in progress if one action status is In Progress', (done) => {
            var goals = [{
                id:1,
                actions:[{
                    id:3,
                    actionStatus:{
                        id:1,
                        statusName: 'Not Started'
                    }
                },{
                    id:4,
                    actionStatus:{
                        id:1,
                        statusName: 'In Progress'
                    }
                }]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.inProgress).to.equal(1);
            done();
        });

        it('should set goal status as completed if all action statuses are completed', (done) => {
            var goals = [{
                id:1,
                actions:[{
                    id:3,
                    actionStatus:{
                        id:1,
                        statusName: 'Completed'
                    }
                },{
                    id:4,
                    actionStatus:{
                        id:1,
                        statusName: 'Completed'
                    }
                }]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.completed).to.equal(1);
            done();
        });

        it('should set the goal status as In Progress if all action statuses are In Progress', (done) => {
            var goals = [{
                id:1,
                actions:[{
                    id:3,
                    actionStatus:{
                        id:1,
                        statusName: 'In Progress'
                    }
                },{
                    id:4,
                    actionStatus:{
                        id:1,
                        statusName: 'In Progress'
                    }
                }]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.inProgress).to.equal(1);
            done();
        });

        it('should set the goal status as In Progress if all 3 action statuses are present', (done) => {
            var goals = [{
                id:1,
                actions:[{
                    id:3,
                    actionStatus:{
                        id:1,
                        statusName: 'In Progress'
                    }
                },{
                    id:4,
                    actionStatus:{
                        id:1,
                        statusName: 'Not Started'
                    }
                },{
                    id:5,
                    actionStatus:{
                        id:1,
                        statusName: 'Completed'
                    }
                }]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.inProgress).to.equal(1);
            done();
        });

        it('should set the goal status as In Progress if 1 action status is Not Started and 1 is completed', (done) => {
            var goals = [{
                id:1,
                actions:[{
                    id:4,
                    actionStatus:{
                        id:1,
                        statusName: 'Not Started'
                    }
                },{
                    id:5,
                    actionStatus:{
                        id:1,
                        statusName: 'Completed'
                    }
                }]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.inProgress).to.equal(1);
            done();
        });

        it('should set the goal status as In Progress if 1 action status is Completed is pending approval', (done) => {
            var goals = [{
                id:1,
                actions:[{
                    id:4,
                    actionStatus:{
                        id:1,
                        statusName: 'Completed'
                    },
                    pendingApproval: true
                }]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.inProgress).to.equal(1);
            done();
        });

        it('should set the goal status as NotStarted if there are no actions defined', (done) => {
            var goals = [{
                id:1,
                actions:[]
            }];
            var goalsWithStatus = getGoalStatus(goals);
            expect(goalsWithStatus.totalGoals).to.equal(1);
            expect(goalsWithStatus.notStarted).to.equal(1);
            expect(goalsWithStatus.inProgress).to.equal(0);
            expect(goalsWithStatus.completed).to.equal(0);
            done();
        });
    });
});
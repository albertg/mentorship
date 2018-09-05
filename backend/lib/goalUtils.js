const determineGoalStatuses = (goals) => {
    "use strict";
    if(goals && goals.length > 0){
        var totalGoals = goals.length;
        var notStartedGoals = 0;
        var inProgressGoals = 0;
        var completedGoals = 0;

        goals.forEach(goal => {
            var status = getStatusFromActions(goal.actions);
            status = status.toLowerCase();
            if(status === 'notstarted'){
                notStartedGoals++;
            }
            else if(status === 'inprogress'){
                inProgressGoals++;
            }
            else if(status === 'completed'){
                completedGoals++;
            }
        });

        return {
            totalGoals: totalGoals,
            notStarted: notStartedGoals,
            inProgress: inProgressGoals,
            completed: completedGoals
        };
    }
    return null;
};

const getStatusFromActions = (actions) =>{
    "use strict";
    var status = '';
    if(actions.length > 0){
        var notStarted=0, inProgress=0, completed = 0, allActions = actions.length;
        actions.forEach(action => {
            if(action.actionStatus.statusName === 'Not Started'){
                notStarted++;
            }
            else if(action.actionStatus.statusName === 'In Progress'){
                inProgress++;
            }
            else if(action.actionStatus.statusName === 'Completed' && !action.pendingApproval){
                completed++;
            }
            else if(action.actionStatus.statusName === 'Completed' && action.pendingApproval){
                inProgress++;
            }
        });
        if(completed === allActions){
            status = 'completed';
        }
        else if(inProgress === allActions){
            status = 'inprogress';
        }
        else if(notStarted === allActions){
            status = 'notstarted';
        }
        else if((notStarted === 0 && completed < allActions) || 
                    (notStarted > 0 && (inProgress === 0 || inProgress > 0))){
            status = 'inprogress';
                    }
        else if(notStarted > 0 ){
            status = 'notstarted';
        }
    }else{
        status = 'notstarted';
    }
    return status;
};

module.exports = {
    goalStatuses: determineGoalStatuses
};
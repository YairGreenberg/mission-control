export class stage{
    constructor(stageId,name,state,dependsOn,timeWindow){
        this.stageId = stageId;
        this.name = name;
        this.state = state;
        this.dependsOn = dependsOn;
        this.timeWindow = timeWindow;
    }
}
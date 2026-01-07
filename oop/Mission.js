class Misson {
    static missionUniqId = 101
    constructor(title,zone,priority,status,team,stages){
        this.missionId = `ms-${Misson.missionId}`;
        this.title = title;
        this.zone = zone;
        this.priority = priority;
        this.status = status;
        this.team = team;
        this.stages = stages;
        this.createdAt = new Date().toISOString();
        Misson.missionUniqId++;
    }
}
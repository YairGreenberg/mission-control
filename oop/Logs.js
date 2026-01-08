export class Login{
    static logid = 1;
    constructor(logId,missionId,type,message,createdBy,createdAt){
        this.logId = logId;
        this.missionId = missionId;
        this.type = type;
        this.message = message;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }
}



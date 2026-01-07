import crypto from 'crypto';
const digest = crypto.randomInt(1000)



export class Operative{
    static operativeId = 1
    constructor(codeName,role,clearanceLevel,active){
        this.id = `op-${Operative.operativeId}`;
        this.codeName = codeName;
        this.role = role;
        this.clearanceLevel = clearanceLevel;
        this.active = active;
        Object.operativeId++;
    }
}
// 1. עזר: יצירת לוג (חייבת להיות מוגדרת מחוץ לפונקציות אחרות כדי שכולם יכירו אותה)
const createLogEntry = (missionId, type, message, operativeId) => ({
    logId: Math.random().toString(36).substr(2, 9),
    missionId,
    type,
    message,
    createdBy: operativeId,
    createdAt: new Date().toISOString()
});

// 2. ניקוי נתונים
export const sanitizeOperative = (operative) => ({
    ...operative,
    codeName: operative.codeName ? operative.codeName.trim() : "",
    active: Boolean(operative.active),
});

// 3. מנוע פתיחת שלבים
export const unlockReadyStages = (mission, now) => {
    const currentTime = new Date(now);
    mission.stages.forEach((stage) => {
        if (stage.state === "locked") {
            // שים לב: שיניתי ל-dependsOn ול-stageId בהתאם למבנה האובייקט
            const dependenciesDone = stage.dependsOn.every((depId) => 
                mission.stages.find((s) => s.stageId === depId)?.state === "done"
            );
            
            const startTime = new Date(stage.timeWindow.start);
            const endTime = new Date(stage.timeWindow.end);
            const inWindow = currentTime >= startTime && currentTime <= endTime;

            if (dependenciesDone && inWindow) {
                stage.state = "ready";
            }
        }
    });
};

// 4. סיום שלב
export const completeStage = (mission, stageId, operative, logs) => {
    const stage = mission.stages.find((s) => s.stageId === stageId);

    if (mission.status !== "active") throw new Error("Mission is not active");
    if (!stage || stage.state !== "ready") throw new Error("Stage is not ready");
    if (operative.clearanceLevel < mission.priority) {
        throw new Error("Operative does not have sufficient clearance");
    }

    stage.state = "done";
    // הוספת לוג פעולה
    logs.push(createLogEntry(mission.missionId, "ACTION", `Stage ${stage.name} completed`, operative.id));
};

// 5. צנזור לוגים
export const redactLogsForViewer = (logs, viewer) => {
    return [...logs]
        .filter(log => {
            if (viewer.clearanceLevel <= 3 && log.type === "SECURITY") return false;
            return true;
        })
        .map(log => {
            if (viewer.clearanceLevel <= 2 && log.type === "WARN") {
                return { ...log, message: "[REDACTED - INSUFFICIENT CLEARANCE]" };
            }
            return log;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

// 6. דאשבורד
export const getUnitDashboard = (missions, logs, now) => {
    const twentyFourHoursAgo = new Date(new Date(now) - 24 * 60 * 60 * 1000);
    
    // מציאת עדיפות מקסימלית רק למשימות פעילות
    const activeMissions = missions.filter(m => m.status === "active");
    const highestPriority = activeMissions.length > 0 
        ? Math.max(...activeMissions.map(m => m.priority)) 
        : 0;

    return {
        activeCount: activeMissions.length,
        highestPriority: highestPriority,
        securityIncidents: logs.filter(l => l.type === "SECURITY" && new Date(l.createdAt) > twentyFourHoursAgo).length,
        zones: missions.reduce((acc, m) => {
            acc[m.zone] = (acc[m.zone] || 0) + 1;
            return acc;
        }, {})
    };
};

// ייצוא הפונקציה createLogEntry אם תרצה להשתמש בה בחוץ
export { createLogEntry };
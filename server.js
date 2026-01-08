import readline from "readline";
import { missions, logs } from "./Stage.js";
import { createLogEntry } from "./services/validation&cleaning.js";
// import { getUnitDashboard } from "./services/validation&cleaning.jsjs";
// import { unlockReadyStages } from "./services/validation&cleaning.js";
// import { missions, logs, createLogEntry } from "./services/validation&cleaning.js";
// import { getUnitDashboard } from "./services/reporting.js";
// import { unlockReadyStages } from "./services/validation&cleaning.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// פונקציית עזר שתאפשר לנו להשתמש ב-prompt בצורה נוחה
const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

async function startApp() {
    let running = true;
    const now = new Date().toISOString();

    console.log("--- Mission Control System Initialized ---");

    while (running) {
        console.log(`
        1) List Missions
        2) Start Mission
        3) Tick Engine (Update Stages)
        4) Complete Stage
        5) View Logs (As Viewer)
        6) Dashboard
        7) Exit
        `);

        const choice = await ask("Select Option: ");

        switch (choice) {
            case "1":
                missions.forEach(m => {
                    const done = m.stages.filter(s => s.state === "done").length;
                    console.log(`[${m.missionId}] ${m.title} | Status: ${m.status} | Priority: ${m.priority} | Progress: ${done}/${m.stages.length}`);
                });
                break;

            case "2":
                const mId = await ask("Enter Mission ID to start: ");
                const mission = missions.find(m => m.missionId === mId);
                if (mission && mission.status === "planned") {
                    mission.status = "active";
                    logs.push(createLogEntry(mId, "ACTION", "Mission started", "op-1"));
                    console.log("SUCCESS: Mission is now ACTIVE.");
                } else {
                    console.log("ERROR: Invalid mission or not in 'planned' state.");
                }
                break;

            case "6":
                const dash = getUnitDashboard(missions, logs, now);
                console.log("\n--- UNIT DASHBOARD ---");
                console.table(dash);
                break;

            case "7":
                running = false;
                console.log("System shutting down...");
                rl.close();
                break;

            default:
                console.log("Invalid selection.");
        }
    }
}

// הפעלת האפליקציה
startApp();
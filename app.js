function startApp() {
    let running = true;
    const now = new Date().toISOString();

    while (running) {
        console.log(`
        --- Mission Control ---
        1) List Missions
        2) Start Mission
        3) Tick Engine (Update Stages)
        4) Complete Stage
        5) View Logs (As Viewer)
        6) Dashboard
        7) Exit
        Select Option:`);

        switch (choice) {
            case "1":
                missions.forEach(m => {
                    const done = m.stages.filter(s => s.state === "done").length;
                    console.log(`[${m.missionId}] ${m.title} - Status: ${m.status} | Priority: ${m.priority} | Progress: ${done}/${m.stages.length}`);
                });
                break;

            case "2":
                const mId = prompt("Enter Mission ID to start:");
                const mission = missions.find(m => m.missionId === mId);
                if (mission && mission.status === "planned") {
                    mission.status = "active";
                    logs.push(createLogEntry(mId, "ACTION", "Mission started", "op-1"));
                    console.log("Mission is now ACTIVE.");
                } else {
                    console.log("Invalid mission or mission not in 'planned' state.");
                }
                break;

            case "3":
                missions.filter(m => m.status === "active").forEach(m => unlockReadyStages(m, now));
                console.log("Engine ticked. Stages updated based on time and dependencies.");
                break;

            case "6":
                const dash = getUnitDashboard(missions, logs, now);
                console.table(dash);
                break;

            case "7":
                running = false;
                console.log("Shutting down system...");
                break;

            default:
                console.log("Unknown command.");
        }
    }
}
startApp();
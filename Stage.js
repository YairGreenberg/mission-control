export const operatives = [
    { id: "op-1", codeName: "Falcon", role: "commander", clearanceLevel: 5, active: true },
    { id: "op-2", codeName: "Owl", role: "intel", clearanceLevel: 3, active: true },
    { id: "op-3", codeName: "Wolf", role: "operator", clearanceLevel: 1, active: true }
];

export const missions = [
    {
        missionId: "ms-101",
        title: "Operation Desert Storm",
        zone: "south",
        priority: 5,
        status: "active",
        team: ["op-1", "op-3"],
        stages: [
            { stageId: "st-1", name: "Briefing", state: "done", dependsOn: [], timeWindow: { start: "2024-01-01T00:00:00Z", end: "2026-12-31T00:00:00Z" } },
            { stageId: "st-2", name: "Insertion", state: "ready", dependsOn: ["st-1"], timeWindow: { start: "2024-01-01T00:00:00Z", end: "2026-12-31T00:00:00Z" } },
            { stageId: "st-3", name: "Extraction", state: "locked", dependsOn: ["st-2"], timeWindow: { start: "2024-01-01T00:00:00Z", end: "2026-12-31T00:00:00Z" } }
        ],
        createdAt: new Date().toISOString()
    },
    {
        missionId: "ms-102",
        title: "North Watch",
        zone: "north",
        priority: 2,
        status: "planned",
        team: ["op-2"],
        stages: [
            { stageId: "st-4", name: "Surveillance", state: "locked", dependsOn: [], timeWindow: { start: "2024-01-01T00:00:00Z", end: "2026-12-31T00:00:00Z" } }
        ],
        createdAt: new Date().toISOString()
    }
];

export let logs = [
    { logId: "l-1", missionId: "ms-101", type: "SECURITY", message: "Unauthorized perimeter breach detected", createdBy: "op-1", createdAt: new Date().toISOString() },
    { logId: "l-2", missionId: "ms-101", type: "WARN", message: "Low fuel in transport vehicle", createdBy: "op-3", createdAt: new Date().toISOString() }
];
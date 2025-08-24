const token = canvas.tokens.controlled[0];
if (!token) {
    ui.notifications.warn("Please select a token first.");
    return;
}

// Get all player-owned tokens
const playerTokens = canvas.tokens.placeables.filter(t => 
    t.actor && t.actor.hasPlayerOwner && !t.document.hidden
);

if (playerTokens.length === 0) {
    ui.notifications.warn("No player tokens found.");
    return;
}

// Find nearest player token
const nearest = playerTokens.reduce((closest, t) => {
    if (t.id === token.id) return closest; // Skip self
    
    const distance = canvas.grid.measureDistance(token.center, t.center);
    return !closest || distance < closest.distance ? 
        { token: t, distance } : closest;
}, null);

if (!nearest) {
    ui.notifications.warn("No valid targets found.");
    return;
}

// Target the nearest token
nearest.token.setTarget(true, { user: game.user, releaseOthers: true });
ui.notifications.info(`Targeting ${nearest.token.name}`);
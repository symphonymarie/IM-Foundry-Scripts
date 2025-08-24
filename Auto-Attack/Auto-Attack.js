// Auto-attack macro
const token = canvas.tokens.controlled[0];
if (!token) {
  ui.notifications.warn("Please select a token first.");
  return;
}

// Get player tokens
const playerTokens = canvas.tokens.placeables.filter(
  (t) => t.actor && t.actor.hasPlayerOwner && !t.document.hidden
);

if (playerTokens.length === 0) {
  ui.notifications.warn("No player tokens found.");
  return;
}

// Calculate nearest player
const nearest = playerTokens.reduce((closest, t) => {
  if (t.id === token.id) return closest; // Skip self

  const distance = canvas.grid.measureDistance(token.center, t.center);
  return !closest || distance < closest.distance
    ? { token: t, distance }
    : closest;
}, null);

if (!nearest) {
  ui.notifications.warn("No valid targets found.");
  return;
}

// Set target to closest player
nearest.token.setTarget(true, { user: game.user, releaseOthers: true });
ui.notifications.info(`Targeting ${nearest.token.name}`);

// Check if target is within 1 square and stop if it isn't and we have to move
const gridDistance = canvas.grid.measureDistance(token.center, nearest.token.center);
if (gridDistance > 1) {
  // Send warning to GM
  const gmUsers = game.users.filter(u => u.isGM);
  if (gmUsers.length) {
    ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker({token: token}),
      content: `${token.name} is targeting ${nearest.token.name} but they are not adjacent (distance: ${gridDistance.toFixed(1)} squares).`,
      whisper: gmUsers.map(u => u._id)
    });
  }
  return; // Stop here without attacking
}

// Delay to make sure we have a target
await new Promise((resolve) => setTimeout(resolve, 100));

// Default attack macro
const defaultAttackMacro = game.macros.getName("DefaultAttack");
if (defaultAttackMacro) {
  await defaultAttackMacro.execute();
} else {
  ui.notifications.error("DefaultAttack macro not found.");
}
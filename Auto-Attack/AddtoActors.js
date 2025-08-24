// Add Auto-Attack to all selected actors
const selectedTokens = canvas.tokens.controlled;

if (selectedTokens.length === 0) {
  ui.notifications.warn("No tokens selected.");
  return;
}
// You may need to change this for your Auto-Attack UUID
const traitUUID = "Item.j6BaZs9wW871CgFj";


const traitItem = await fromUuid(traitUUID);

if (!traitItem) {
  ui.notifications.error("Trait item not found with the provided UUID.");
  return;
}

// Add to each selected actor
for (const token of selectedTokens) {
  if (token.actor) {
    await token.actor.createEmbeddedDocuments("Item", [traitItem.toObject()]);
    console.log(`Added trait to ${token.actor.name}`);
  }
}

ui.notifications.info(`Attempted to add to ${selectedTokens.length} actor(s). Don't see it? Double check the UUID for your Auto-attack effect and try again.`);
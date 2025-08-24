const actor = canvas.tokens.controlled[0]?.actor;
if (!actor) {
    ui.notifications.error("No token selected");
} else {
    const itemsWithAsterisk = actor.items.filter(i => i.name.endsWith("*"));
    if (itemsWithAsterisk.length === 0) {
        ui.notifications.warn("No items ending with '*' found");
    } else {
        itemsWithAsterisk.forEach(item => {
            const itemUUID = item.uuid; // UUID for rollItemMacro
            game.impmal.utility.rollItemMacro(itemUUID, actor);
        });
    }
}
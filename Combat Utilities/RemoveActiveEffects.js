for (const tkn of canvas.tokens.controlled) {

const removeList = tkn.actor.temporaryEffects.map(e => e.id);

await tkn.actor.deleteEmbeddedDocuments("ActiveEffect", removeList)

}
NPC tokens will automatically target the nearest player token and roll a default attack if they are within one square. If they are further than a square away, it will tell you so that you can move closer first. The distance can be changed in the Auto-Attack macro script.

Set up as a trait with the script effect named "Auto-Attack". The script effect should be triggering on the token's Start Turn. (See screenshot.)

When using the AddtoActors macro, you may need to update the UUID used in the script to match your Auto-Attack trait's UUID.

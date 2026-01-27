import { patchHistory } from "./navigation.js";
import { onURLChange } from "./navigation.js";
import { getToken, increaseToken } from "./chatState.js";
import { buildNewChat } from "./utils.js";

patchHistory();
onURLChange(); // initial load
increaseToken();
try {
  const token = getToken();
  await buildNewChat(token);
} catch (e) {
  console.warn("error happened in main file");
}

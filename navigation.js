//this file hosts the functions in the Navigation layer of the program
//list of functions in this file
//1. patchHistory

import {
  clearObserver,
  clearSideBar,
  clearQuestions,
  getToken,
  increaseToken,
} from "./chatState.js";
import { buildNewChat } from "./utils.js";

let patched = false;
let lastUrl = location.href;
let pollInterval = null;

function startUrlPolling() {
  if (pollInterval) return;
  pollInterval = setInterval(() => {
    if (location.href !== lastUrl) {
      console.log("URL Changed:");
      lastUrl = location.href;
      onURLChange();
    }
  }, 1000);
}

function stopUrlPolling() {
  if (pollInterval) {
    clearInterval(pollInterval);
    pollInterval = null;
  }
}

export function patchHistory() {
  if (patched) return;
  patched = true;
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopUrlPolling();
    } else {
      lastUrl = location.href;
      startUrlPolling();
    }
  });
  startUrlPolling();

  //patches pushState, replaceState and popState for
  // const originalPushState = history.pushState;
  // const originalReplaceState = history.replaceState;

  // history.pushState = function (...args) {
  //   originalPushState.apply(this, args);
  //   onURLChange();
  // }; //monkey patched pushState

  // history.replaceState = function (...args) {
  //   originalReplaceState.apply(this, args);
  //   onURLChange();
  // }; //monkey patching replaceState

  // //listening to popstate
  // window.addEventListener("popstate", () => {
  //   onURLChange();
  // });
}

export async function onURLChange() {
  //this function
  try {
    console.log("URL change detected");
    increaseToken();
    const token = getToken();
    console.log("token: ", token);
    clearObserver(); //clearing Observer
    console.log("observer cleared");
    clearSideBar(); //clearing sidebar
    console.log("sidebar cleared");
    clearQuestions(); //clearing questions data
    console.log("Questions cleared");
    await buildNewChat(token); //goes through teh new chat Protocol for every chat.
    console.log("built a new chat");
    if (token !== getToken()) return;
  } catch (e) {
    console.warn("error happened at onURLChange function " + e);
  }
}

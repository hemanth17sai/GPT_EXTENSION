//this file hosts the functions in the Navigation layer of the program
//list of functions in this file
//1. patchHistory

import { clearObserver, clearSideBar, clearQuestions, getToken, increaseToken } from "./chatState";
import { buildNewChat } from "./utils";

let patched = false;

export function patchHistory() {
  if (patched) return;
  patched = true;
  //patches pushState, replaceState and popState for
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    onURLChange();
  }; //monkey patched pushState

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    onURLChange();
  }; //monkey patching replaceState

  //listening to popstate
  window.addEventListener("popstate", () => {
    onURLChange();
  });
}

export async function onURLChange() {
  //this function
  try {
    increaseToken();
    const token = getToken();
    clearObserver(); //clearing Observer
    clearSideBar(); //clearing sidebar
    clearQuestions(); //clearing questions data
    await buildNewChat(token); //goes through teh new chat Protocol for every chat.
    if(token!==getToken()) return;
  } catch (e) {
    console.warn("error happened at onURLChange function " + e);
  }
}

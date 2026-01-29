import { pushToSideBar, refreshSideBar } from "./utils.js";

//we're storing the state of sideBar, questions and observers such that duplications and race conditions doesn't occur
let observer = null;
let sideBar = null;
let questions = [];
let navToken = 0;

export function increaseToken() {
  navToken++;
}

export function getToken() {
  return navToken;
}

export function getObserver() {
  return observer;
}

export function setObserver(newObserver) {
  observer = newObserver;
}

export function clearObserver() {
  if (observer) {
    console.log("Observer has cleared in clearObserver func");
    observer.disconnect();
    observer = null;
  } else {
    console.log("no observer present to clear in clearObserver function");
  }
}

export function getSideBar() {
  return sideBar;
}

export function setSideBar(newSideBar) {
  sideBar = newSideBar;
}

export function clearSideBar() {
  // sideBar.innerHTML = "";
  console.log("Inside clearSideBar function ");
  if (!sideBar) {
    console.log("No sidebar exists to clear");
    return;
  }
  sideBar.querySelectorAll("div.cgpt-q-item").forEach((element) => {
    element.remove();
  });
  console.log("elements in sidebar are cleared");
  //   clearQuestions();
  //   refreshSideBar(sideBar);
}

export function getQuestions() {
  return questions;
}

export function addQuestion(question, list) {
  questions.push(question);
  try {
    //addQuestion to sidebar
    pushToSideBar(question, list);
  } catch (e) {
    console.warn("Question not being added to sidebar somehow");
  }
}

export function clearQuestions() {
  console.log("Inside clearQuestions function");
  questions.length = 0;
  refreshSideBar();
}
export function setQuestions(newQuestions) {
  questions = [...newQuestions]; //questions is a shallowcopy of newly parsed questions.
}

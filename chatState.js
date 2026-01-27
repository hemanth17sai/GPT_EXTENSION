import { pushToSideBar, refreshSideBar } from "./utils";

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
    observer.disconnect();
    observer = null;
  }
}

export function getSideBar() {
  return sideBar;
}

export function setSideBar(newSideBar) {
  sideBar = newSideBar;
}

export function clearSideBar() {
  sideBar.innerHTML = "";
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
  questions.length = 0;
//   refreshSideBar();
}
export function setQuestions(newQuestions) {
  questions = [...newQuestions]; //questions is a shallowcopy of newly parsed questions.
}

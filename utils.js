import {
  setObserver,
  getToken,
  setSideBar,
  getQuestions,
  getSideBar,
} from "./chatState";
import { processQuestion, scanExistingQuestions } from "./fetch.js";

export function waitForElement(timeout = 50000) {
  //function waiting for the DOM to load in 50s
  return new Promise((resolve, reject) => {
    const existing = document.getElementById("prompt-textarea"); //prompt bar
    if (existing) {
      resolve(existing);
      return;
    }
    const observer = new MutationObserver(() => {
      const el = document.getElementById("prompt-textarea");
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => {
      observer.disconnect();
      reject(new Error("TimeoutWaiting for element prompt-textarea"));
    }, timeout);
  });
}

function onMutations(mutations) {
  //function to be run upon new mutations
  for (const mutation of mutations) {
    if (mutation.type != "childList") continue;
    for (const node of mutation.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      if (node.matches("div.whitespace-pre-wrap")) {
        processQuestion(node); //fill this function out
      }
      const node_list = node.querySelectorAll("div.whitespace-pre-wrap");
      node_list.forEach((q) => processQuestion(q));
    }
  }
}

function startMutationObserver() {
  //starting mutationObserver in this chat
  const observer = new MutationObserver(onMutations);
  observer.observe(document.body, { childList: true, subtree: true });
  setObserver(observer);
}

export async function buildNewChat(token) {
  //function to build a new chat
  //waiting till the new DOM Loads
  try {
    try {
      await waitForElement();
    } catch (e) {
      console.warn(e);
    }
    if (token !== getToken()) return;
    buildSideBar();
    if (token !== getToken()) return;
    startMutationObserver();
    if (token !== getToken()) return;
    scanExistingQuestions(token);
    // if(token!==getToken()) return;
    // initSidebar();//initializing by pushing in questions //21-01-2026 signoff
  } catch (e) {
    console.warn(
      "something went wrong in buildNewChat function in utils.js, that is " + e,
    );
  }
}

function createFloatingButton() {
  if (document.getElementById("cgpt-q-open")) return;

  const btn = document.createElement("button");
  btn.id = "cgpt-q-open";
  btn.textContent = "☰";
  btn.style.cssText = `
        position: fixed;
        right: 10px;
        bottom: 20px;
        z-index: 9999;
        padding: 8px 10px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
    `;
  btn.onclick = () => {
    document.getElementById("cgpt-q-sidebar").style.display = "flex";
    btn.remove();
  };
  document.body.appendChild(btn);
}

export function refreshSideBar() {
  sidebar = getSideBar(); //gets sidebar
  sidebar.querySelectorAll(".cgpt-q-item").forEach((e1) => e1.remove());
}

function enableResize(sidebar) {
  const resizer = sidebar.querySelector("#cgpt-q-resizer");
  let isDragging = false;
  resizer.addEventListener("mousedown", () => {
    isDragging = true;
    document.body.style.cursor = "ew-resize";
  });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const newWidth = window.innerWidth - e.clientX;
    sidebar.style.width = Math.min(Math.max(newWidth, 200), 500) + "px";
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.cursor = "";
  });
}

function wireSidebarControls(sidebar) {
  const toggleBtn = sidebar.querySelector("#cgpt-q-toggle");

  toggleBtn.addEventListener("click", () => {
    sidebar.style.display = "none";
    createFloatingButton();
  });
  enableResize(sidebar);
}

function buildSideBar() {
  //create a sidebar.
  if (document.getElementById("cgpt-q-sidebar")) return;

  const sidebar = document.createElement("div");
  sidebar.id = "cgpt-q-sidebar";
  sidebar.innerHTML = `
    <div id="cgpt-q-header">
      <span>Questions</span>
      <button id="cgpt-q-toggle">×</button>
    </div>
    <div id="cgpt-q-list"></div>
    <div id="cgpt-q-resizer"></div>
  `;

  document.body.appendChild(sidebar);
  wireSidebarControls(sidebar);
  setSideBar(sidebar);
}

function initSidebar() {
  //we want to push all the initial questions into sidebar one by one, mimicking the procedure when
  const list = document.getElementById("cgpt-q-list");
  if (!list) return;
  const questions = getQuestions();
  questions.forEach((q, index) => {
    pushToSideBar(q, list);
  });
}

export function pushToSideBar(question, list) {
  //function to push questions into sidebar
  // const list = document.getElementById("cgpt-q-list");
  const item = document.createElement("div");
  item.className = "cgpt-q-item";
  item.textContent = question.text.slice(0, 50);

  item.addEventListener("click", () => {
    question.node.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
  list.appendChild(item);
}

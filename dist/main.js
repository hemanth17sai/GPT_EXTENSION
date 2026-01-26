(() => {
  // fetch.js
  function processQuestion(node) {
    if (!node || node.dataset.processed === "true") return;
    const rawText = node.innerText;
    if (!rawText) return;
    const list = document.getElementById("cgpt-q-list");
    if (!list) return;
    const question = {
      text: rawText,
      node
    };
    addQuestion(question, list);
    node.dataset.processed = "true";
  }
  function scanExistingQuestions(token) {
    const nodes = document.querySelectorAll("div.whitespace-pre-wrap");
    for (const node of nodes) {
      if (token !== getToken()) return;
      processQuestion(node);
    }
  }

  // utils.js
  function waitForElement(timeout = 5e4) {
    return new Promise((resolve, reject) => {
      const existing = document.getElementById("prompt-textarea");
      if (existing) {
        resolve(existing);
        return;
      }
      const observer2 = new MutationObserver(() => {
        const el = document.getElementById("prompt-textarea");
        if (el) {
          observer2.disconnect();
          resolve(el);
        }
      });
      observer2.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer2.disconnect();
        reject(new Error("TimeoutWaiting for element prompt-textarea"));
      }, timeout);
    });
  }
  function onMutations(mutations) {
    for (const mutation of mutations) {
      if (mutation.type != "childList") continue;
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches("div.whitespace-pre-wrap")) {
          processQuestion(node);
        }
        const node_list = node.querySelectorAll("div.whitespace-pre-wrap");
        node_list.forEach((q) => processQuestion(q));
      }
    }
  }
  function startMutationObserver() {
    const observer2 = new MutationObserver(onMutations);
    observer2.observe(document.body, { childList: true, subtree: true });
    setObserver(observer2);
  }
  async function buildNewChat(token) {
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
    } catch (e) {
      console.warn("something went wrong in buildNewChat function in utils.js, that is " + e);
    }
  }
  function createFloatingButton() {
    if (document.getElementById("cgpt-q-open")) return;
    const btn = document.createElement("button");
    btn.id = "cgpt-q-open";
    btn.textContent = "\u2630";
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
    if (document.getElementById("cgpt-q-sidebar")) return;
    const sidebar = document.createElement("div");
    sidebar.id = "cgpt-q-sidebar";
    sidebar.innerHTML = `
    <div id="cgpt-q-header">
      <span>Questions</span>
      <button id="cgpt-q-toggle">\xD7</button>
    </div>
    <div id="cgpt-q-list"></div>
    <div id="cgpt-q-resizer"></div>
  `;
    document.body.appendChild(sidebar);
    wireSidebarControls(sidebar);
    setSideBar(sidebar);
  }
  function pushToSideBar(question, list) {
    const item = document.createElement("div");
    item.className = "cgpt-q-item";
    item.textContent = question.text.slice(0, 50);
    item.addEventListener("click", () => {
      question.node.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
    list.appendChild(item);
  }

  // chatState.js
  var observer = null;
  var sideBar = null;
  var questions = [];
  var navToken = 0;
  function increaseToken() {
    navToken++;
  }
  function getToken() {
    return navToken;
  }
  function setObserver(newObserver) {
    observer = newObserver;
  }
  function clearObserver() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }
  function setSideBar(newSideBar) {
    sideBar = newSideBar;
  }
  function clearSideBar() {
    if (sideBar) {
      sideBar.innerHTML = "";
    }
  }
  function addQuestion(question, list) {
    questions.push(question);
    try {
      pushToSideBar(question, list);
    } catch (e) {
      console.warn("Question not being added to sidebar somehow");
    }
  }
  function clearQuestions() {
    questions.length = 0;
  }

  // navigation.js
  var patched = false;
  function patchHistory() {
    if (patched) return;
    patched = true;
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    history.pushState = function(...args) {
      originalPushState.apply(this, args);
      onURLChange();
    };
    history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      onURLChange();
    };
    window.addEventListener("popstate", () => {
      onURLChange();
    });
  }
  async function onURLChange() {
    try {
      increaseToken();
      const token = getToken();
      clearObserver();
      clearSideBar();
      clearQuestions();
      await buildNewChat(token);
      if (token !== getToken()) return;
    } catch (e) {
      console.warn("error happened at onURLChange function " + e);
    }
  }

  // main.js
  patchHistory();
  onURLChange();
})();

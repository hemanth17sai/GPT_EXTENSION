import { addQuestion,getToken } from "./chatState";
import { pushToSideBar } from "./utils";

// function normalizeQuestionText
export function processQuestion(node){
    //processes the question and adds it to the list
    if(!node || node.dataset.processed === "true") return;

    const rawText=node.innerText;
    if(!rawText) return;
     const list = document.getElementById("cgpt-q-list");
     if(!list) return;
    const question = {
        text: rawText,
        node
    };
    addQuestion(question,list);
    node.dataset.processed = "true";
    // pushToSideBar(question,list);

}

export function scanExistingQuestions(token){
    const nodes = document.querySelectorAll("div.whitespace-pre-wrap");

    for(const node of nodes){
        if(token!==getToken()) return;
        processQuestion(node);
    }
}
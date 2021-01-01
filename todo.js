import minimist from 'minimist';
import fs from 'fs';

const args = minimist(process.argv);
let todoList = fs.readFileSync('./todoList.txt', 'utf-8');
function userGuide() {
        const userManual = `Parancssori Todo applikáció
=============================
Parancssori argumentumok:
        -l   Kilistázza a feladatokat
        -a   Új feladatot ad hozzá
        -r   Eltávolít egy feladatot
        -c   Teljesít egy feladatot`

        console.log(userManual);
    }

function getList(todoList) {
    if (todoList.length === 0) {
        console.log('Nincs mára tennivalód! :)');
        return;
    }

    todoList = todoList.split('\n');
    for (let i = 0; i < todoList.length; i++) {
        
        console.log(`${i + 1}. ${todoList[i]}`);
    }
}

function addNewTask(args) {
    fs.appendFileSync('./todoList.txt', '\n' + args, 'utf-8');
}

// run without args and print userguide
if (Object.keys(args).length < 2) {
    userGuide();
}

if (args.l === true) {
    getList(todoList);
}

if (typeof(args.a)  === 'string') {
    addNewTask(args.a);
}
import minimist from 'minimist';
import fs from 'fs';

const args = minimist(process.argv);

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

function getList() {

    let todoList = fs.readFileSync('./todoList.txt', 'utf-8');

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

    fs.appendFileSync('./todoList.txt', '\n' + args);
}

function removeTask(index) {

    let todoList = fs.readFileSync('./todoList.txt', 'utf-8').split('\n');
    todoList.splice(index, 1);

    fs.writeFileSync('./todoList.txt', '');

    for (let i = 0; i < todoList.length; i++) {
        fs.appendFileSync('./todoList.txt', todoList[i] + '\n');
    }
}

// run without args and print userguide
if (Object.keys(args).length < 2) {
    userGuide();
}

if (args.l === true) {
    getList();
}

if (args.a === 'string') {
    addNewTask(args.a);
} else if (args.a === true){
    console.log('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
}

if (typeof(args.r) === 'number') {
    removeTask(args.r);
} else if (args.r === true) {
    console.log('Nem lehetséges az eltávolítás: nem adott meg indexet!');
}


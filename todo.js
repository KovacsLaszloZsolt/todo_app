import minimist from 'minimist';
import fs from 'fs';

const args = minimist(process.argv);
const basicArgs = ['l', 'a', 'r', 'c'];

function userGuide() {

    console.log(fs.readFileSync('./userManual.txt', 'utf-8'));
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
    
    if (todoList.length < index) {
        console.log('Nem lehetséges az eltávolítás: túlindexelési probléma adódott!');
        return;
    }

    todoList.splice(index - 1, 1);
    todoList = todoList.join('\n');
    fs.writeFileSync('./todoList.txt', todoList);
}

function run() {
    if (Object.keys(args).length < 2) {
        userGuide();
        return;

    } else if ((Object.keys(args).length > 2) || !basicArgs.includes(Object.keys(args)[1])) {
        console.log('Nem támogatott argumentum!');
        userGuide()
        return;
    }

    if (args.l === true) {
        getList();
        return;
    }

    if (args.a === 'string') {
        addNewTask(args.a);
        return;
    } 
    else if (args.a){
        console.log('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
        return;
    }

    if (typeof(args.r) === 'number') {
        removeTask(args.r);
        return;
    } 
    else if (args.r) {
        console.log('Nem lehetséges az eltávolítás: nem adott meg indexet!');
        return;
    } 
    else if (typeof(args.r) === 'string') {
        console.log('Nem lehetséges az eltávolítás: a megadott index nem szám!');
        return;
    }
}

run();




// console.log(args);


// Adott a megnyitott terminál a projekt könyvtáron belül
// Amikor az applikációt egy nem támogatott argumentummal futtatjuk (pl. get)
// Akkor nyomtassa ki a konzolra az alábbi üzenetet:
// Nem támogatott argumentum!
// És nyomtassa ki az applikáció "használati utasítását"

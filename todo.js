import minimist from 'minimist';
import fs from 'fs';

const args = minimist(process.argv);
const basicArgs = ['l', 'a', 'r', 'c'];

function userGuide() {

    console.log(fs.readFileSync('./userManual.txt', 'utf-8'));
}

function getList() {

    let todoList = fs.readFileSync('./todoList.json', 'utf-8');

    // console.log(todoList);
    if (todoList.length === 0) {
        console.log('Nincs mára tennivalód! :)');
        return;
    }

    todoList = JSON.parse(todoList);

    for(let i = 0; i < todoList.length; i++) {
        if (todoList[i].done === true) {
            console.log(`[x] ${todoList[i].task}`);
        }
        else {
            console.log(`[ ] ${todoList[i].task}`);
        }
    }
    

    // for (let i = 0; i < todoList.length; i++) {
        
    //     console.log(`${i + 1}. ${todoList[i]}`);
    // }
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

function taskDone(index) {

    let todoList = fs.readFileSync('./todoList.json', 'utf-8');
    todoList = JSON.parse(todoList);
    todoList[index - 1].done = true;

    fs.writeFileSync('./todolist.json', JSON.stringify( todoList, null, 4 ));
}

function run() {
    // write user manuel: no or not existing arguments
    if (Object.keys(args).length < 2) {
        userGuide();
        return;

    } else if ((Object.keys(args).length > 2) || !basicArgs.includes(Object.keys(args)[1])) {
        console.log('Nem támogatott argumentum!');
        userGuide()
        return;
    }

    // write task list: -l arguments
    if (args.l === true) {
        getList();
        return;
    }

    // add new task: -a arguments
    if (args.a === 'string') {
        addNewTask(args.a);
        return;
    } 
    else if (args.a){
        console.log('Nem lehetséges új feladat hozzáadása: nincs megadva a feladat!');
        return;
    }

    // remove task: argument -r 
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

    // change task status done: -c

    if (typeof(args.c) === 'number') {
        taskDone(args.c);
    }

}

run();

// const jsonContent = fs.readFileSync( 'todos.json', 'utf-8' );
// const jsonTodos = JSON.parse( jsonContent );

// console.log( jsonTodos );
// console.log( jsonTodos[0].name );

// jsonTodos[0].name = 'Medvét kergetni';

// fs.writeFileSync( 'todos.json', JSON.stringify( jsonTodos, null, 4 ) );





// **9. Tennivalo elvegzese**

// **Adott** a megnyitott terminál a projekt könyvtáron belül
//     És a fájl, ahol tároljuk a tennivalókat
//     És a fájlban 0 tennivaló van elmentve
//     **Amikor** az applikációt az -c 2 argumentummal futtatjuk
//     **Akkor** az alkalmazás állítsa át a második tennivaló státuszát elvégzettre

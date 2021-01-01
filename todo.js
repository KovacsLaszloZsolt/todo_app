import minimist from 'minimist';

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

// run without args and print userguide
if (args[0] === undefined) {
    userGuide();
}

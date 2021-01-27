class SuperAdmin {
    constructor(name, money) {
        this.name = name
        this.money = money
        this.iscasino = undefined

    }

    get Casino(){
        return this.iscasino
    }

    createNewCasino(name) {
        this.iscasino = new Casino(name);
    };

    createNewGameMachine(number, id) { 
        if (this.iscasino) {
            if (number <= this.money && number > 0) {
                this.money -= number;
                this.iscasino.createNewGameMachine_Casino(number, id);
            }
            else{
                console.log("There are not money for create GameMachine");

            }
        }
        else {
            console.log("There are not any casino here");
        }
    };
    
    addMoney(number, id){ 
        if(number > 0 && this.money >= number){
            this.money -= number
            this.iscasino.addMoney(number, id)
        }
        else {
            console.log("There are not money in SuperAdmin");
            return false;

        }

    }
    deleteGameMachine(id){ 
        this.iscasino.deleteGameMachineInCasino(id)

    }
    playGameSuperAdmin(number,  numberOfMachine){ 
        if(this.money >= number &&  numberOfMachine){
            this.money -= number
            this.money = this.money + this.iscasino.playGameInGameMachine(number,  numberOfMachine)
        }else {
            console.log("Error")
        }

    }

}






class User {
    constructor(name, money) {
        this.name = name
        if(money>0){
            this.money = money
        }else {
            console.log("User Error")
        }
    }
    playGameUser(money, admin, numberOfMachine){
        if(this.money > 0 && this.money >= money){
            this.money -= money
            this.money = this.money + admin.iscasino.playGameInGameMachine(money, numberOfMachine)
            console.log(this.money)
        }else {
            console.log("Please enter money")

        }
    }

}





class Casino {
    constructor(name) {
        this.name = name
        this.gameMachine = []
    }
    get getMoney() {
        const amount = this.gameMachine.reduce((acc, machine) => acc += machine.money, 0)
        return amount
    }
    
    get getMachineCount(){ 
        return this.gameMachine.length
    }


    createNewGameMachine_Casino(number, id) { 
        this.gameMachine.push(new GameMachine(number, id));
    }

    addMoney(number, id){
        const index = this.gameMachine.map(numb => numb.id).indexOf(id)
        if(index === -1){
            console.log("Can't find this GameMachine");
        }
        else{
            this.gameMachine[index].putMoneyGameMachine(number);
        }
    }

    addMoney_afterdeletedmachine(number){
        for(let i = 0; i < this.gameMachine.length;i++){
            this.gameMachine[i].putMoneyGameMachine(number/this.gameMachine.length)
        }
        // this.gameMachine.forEach(value => value.putMoneyGameMachine(number/this.gameMachine.length));
    }


    
    deleteGameMachineInCasino(id){ 
        const machine = this.gameMachine.find(numb => numb.id === id);
        if(!machine){
            console.log("Can't find this GameMachine")
        }
         else {
            this.gameMachine = this.gameMachine.filter(value => value.id !== id)
            this.addMoney_afterdeletedmachine(machine.number)
        }
    //     let index = this.gameMachine.map(numb => numb.machinenumber).indexOf(machinenumber)
    //     if(index === -1){
    //         console.error('Dont find this GameMachine')
    //     }
    //      else {
    //         let moneyDeleteMachine = this.gameMachine[index].money
    //         const GameMachinesClone = this.gameMachine.filter(v => v.machinenumber !== machinenumber)
    //         this.gameMachine = GameMachinesClone;
    //         this.addMoneyToGameMachineAfterDelete(moneyDeleteMachine)

    // }
}




    
    
    playGameInGameMachine(number, numberOfMachine){   
        let index = this.gameMachine.map(numb => numb.id).indexOf(numberOfMachine)
        if(index !== -1){
            if(this.gameMachine[index].money > number){
                const result = this.gameMachine[index].play(number);
                console.log(this.gameMachine)
                return result;
            }
            else{
                console.log("You can't play here");
            }
        }
        else{
            console.log("Can't find this GameMachine");
        }

    }


}



class GameMachine {
    constructor(number, id) {
        this.id = id
        this.number = number
    } 


    get Machine(){
        return this.number;

    }
    putMoneyGameMachine(number){ 
        this.number = this.number + number;

    }
 
    
    play(number){
        const value =  playGame();

        if(value.CofGameMachine){
            this.money -= number
            const result = number * value.CofGameMachine
            console.log(`You Win. Your number: ${value.win}`)
            return result

        }else{
            this.putMoneyGameMachine(number)
            console.log(`YOU Loose. Your number:${value.win}`)
            return 0

        }

    }
}




function playGame() {
    const random = Math.floor(Math.random() * 10)
       const win = [random, random, random]
    const items = win.length - [...new Set(win)].length 
   
    const koef = (items === 2 || items === 1) ? items + 1 : false   
   
    return {CofGameMachine: koef, win: win.join('')}
   }

   const admin = new SuperAdmin("Ina", 14000);
 console.log(admin);

 admin.createNewCasino("Favbet")
 console.log(admin);
 admin.createNewGameMachine(500,1)
 console.log(admin);
 admin.createNewGameMachine(700,2);
 console.log(admin);
 admin.playGameSuperAdmin(500,2);




















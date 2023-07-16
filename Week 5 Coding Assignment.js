//Week 5 Coding Assignment | Menu App | Hunter Peay | Promineo Tech FE May 2023

//Instructions:
//Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
// Use at least one array.
// Use at least two classes.
// Your menu should have the options to create, view, and delete elements.

//Code Explanation: For my assignment, I will be creating a menu app that allows the user to create a political party and register to vote.
//The voter can create a party, register as a voter of that party, view their party, delete their party and display all parties

//MY CODE:

class Voter { //Created voter class that takes name, address, and state to register the voter.
    constructor(name, address, state){
        this.name = name;
        this.address = address;
        this.state = state;
    }

    describe(){
        return `Voter Name: ${this.name}, Voter Address: ${this.address}, State: ${this.state}`
    }
}

class Party { //Party class takes in a preference and has a voter array.
    constructor(preference){
        this.preference = preference;
        this.voter = [];
    }
    addVoter(voter){
        if (voter instanceof Voter){
            this.voter.push(voter); //Pushes a new voter to the array
        } else {
            throw new Voter(`Invalid Voter Information. Please Re-enter Information`)
        }
    }
    describe(){
        return `${this.preference} has ${this.voter.length} voters.`
    }
}

class Menu { //creates a menu class
    constructor() {
        this.party = []; //Array of parties.
        this.selectedParty = null;
    }

    start() { //Creates a method
        let voterSelection = this.showVoterOptions();
        while (voterSelection != 0) { //Creates a switch that takes in multiple cases. This allows the voter to select the menu options.
            switch (voterSelection) {
                case '1': 
                    this.registerParty(); //Create a political party
                    break;
                case '2':
                    this.viewParty(); //View a political party and the registered voters.
                    break;
                case '3':
                    this.deleteParty(); //Deletes a political party.
                    break;
                case '4':
                    this.displayParties(); //Displays all parties.
                    break;
                default:
                    selection = 0; //Exits the menu.
            }
            voterSelection = this.showVoterOptions();
        }
        alert ('Goodbye!');
    }
    showVoterOptions() { //Displays the menu options.
        return prompt(`
        0) Exit
        1) Register Party
        2) View Party
        3) Delete Party
        4) Display Party
        `);
    }
    
    showVoterMenuOptions(partyInfo){ //Displays the options to register a voter.
        return prompt(`
        0) Back
        1) Register Voter
        2) Delete Voter
        -------------------
        ${partyInfo}
        `);
    }

    displayParties(){  //Method intitiated to display parties.
        let partyString = '';
        for (let i = 0; i < this.party.length; i++) {
            partyString += i + ') ' + this.party[i].preference + '\n'; //loops through each party and displays the preferences in a string.
        }
        alert(partyString);
    }
    
    registerParty() {
        let preference = prompt('Enter Your Political Party Preference: ') //Registeres a party.
        this.party.push(new Party(preference));
    }

    viewParty() { //Method to view parties
        let index = prompt('Enter the index of the party you wish to view: ');
        if (index > -1 && index < this.party.length) { //If statement to display parties.
            this.selectedParty = this.party[index];
            let description = 'Party Name: ' + this.selectedParty.preference + '\n';

            for (let i = 0; i < this.selectedParty.voter.length; i++) { //Loop to display voter with party, voter name and state.
                description += i + ') ' + this.selectedParty.voter[i].name + ' - ' + this.selectedParty.voter[i].state + '\n';
            }
            let selection = this.showVoterMenuOptions(description);
            switch (selection) { //Allows voter to register or delete voter.
                case '1':
                    this.registerVoter();
                    break;
                case '2':
                    this.deleteVoter();
            }
        }
    }

deleteParty() { //Method to delete party.
    let index = prompt('Enter the index of the Party you wish to delete: ');
    if (index > -1 && index < this.party.length) {
        this.party.splice(index, 1); //Removes party by index number
    }
}

    registerVoter() { //Method to register voter
        let name = prompt('Enter your legal name:');
        let address = prompt('Enter your street address:');
        let state = prompt('Enter your state:')
        this.selectedParty.voter.push(new Voter(name, address, state)) //Takes in user input for each prompt.
    }

    deleteVoter() {
        let index = prompt('Enter the index of the voter you wish to delete:');
        if (index > -1 && index < this.selectedParty.voter.length){
            this.selectedParty.voter.splice(index, 1);  //Removes voter by index number
        }
    }
}

let menu = new Menu();
menu.start(); //Initiates menu.
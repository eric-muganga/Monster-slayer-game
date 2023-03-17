function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

Vue.createApp({
    data(){
        return {
            monsterHealth : 100,
            playerHealth : 100,
            currentStrike : 0,
            winner : null,
            logMessages : [],
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                //it's a draw
                this.winner = 'Draw';
            }else if(value <= 0){
                //player lost
                this.winner = 'Monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                //it's a draw
                this.winner = 'Draw';
            }else if(value <= 0){
                //monster lost
                this.winner = 'Player';
            }
        }
    },
    computed: {
        monsterBar(){
            if(this.monsterHealth < 0){
                return {width: '0%' };
            }
            return {width: this.monsterHealth + '%'};
        },
        playerBar(){
            if(this.playerHealth < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.currentStrike % 3 !== 0;
        }
    },
    methods: {
        startNewGame(){
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentStrike = 0;
            this.winner = null;
            this.logMessages = [];
        },
        attackMonster(){
            this.currentStrike++;
          const attackValue = getRandom(5, 12);
          this.monsterHealth -= attackValue;
          this.addLogMessage('Player', 'attack', attackValue);
          this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandom(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('Monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            this.currentStrike++;
            const specialAttackValue = getRandom(10, 25);
            this.monsterHealth -= specialAttackValue;
            this.addLogMessage('Player', 'attack', specialAttackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentStrike++;
            const healValue = getRandom(8, 25);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.addLogMessage('Player', 'Heal', healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner = 'Monster';
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        },
    }
}).mount('#game');
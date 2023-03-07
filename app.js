function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      mosterHealth: 100,
      round: 0,
      winner: null,
      monsterbarColor: "#00a876",
      playerbarColor: "#00a876",
      msgs: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value < 66 && value > 33) {
        this.playerbarColor = "#D2DF29";
      } else if (value <= 33) {
        this.playerbarColor = "#CF411B";
      }

      if (value < 66 && value > 33) {
        this.playerbarColor = "#D2DF29";
      } else if (value <= 33) {
        this.playerbarColor = "#CF411B";
      }

      if (value <= 0 && this.mosterHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Monster";
      }
    },
    mosterHealth(value) {
      if (value < 66 && value > 33) {
        this.monsterbarColor = "#D2DF29";
      } else if (value <= 33) {
        this.monsterbarColor = "#CF411B";
      }

      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "Draw";
      } else if (value <= 0) {
        this.winner = "Player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterbarColor < 0) {
        return {
          width: 0 + "%",
          backgroundColor: "#4D1506",
        };
      } else {
        return {
          width: this.mosterHealth + "%",
          backgroundColor: this.monsterbarColor,
        };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return {
          width: 0 + "%",
          backgroundColor: "#4D1506",
        };
      } else {
        return {
          width: this.playerHealth + "%",
          backgroundColor: this.playerbarColor,
        };
      }
    },
    mayUseSpecialAttack() {
      return this.round % 3 !== 0;
    },
  },

  methods: {
    attackMonster() {
      this.round++;
      const attackValue = getRandomValue(12, 5);
      this.mosterHealth = this.mosterHealth - attackValue;
      this.addLogMsg("Player", "Attack", attackValue);
      this.attackPlayeer();
    },
    attackPlayeer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMsg("Monster", "Attack", attackValue);
    },
    specialAttack() {
      this.round++;
      const attackValue = getRandomValue(10, 25);
      this.mosterHealth = this.mosterHealth - attackValue;
      this.addLogMsg("Player", "Special Attack", attackValue);
      this.attackPlayeer();
    },
    healPlayer() {
      this.round++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.addLogMsg("Player", "Heal", healValue);
      this.attackPlayeer();
    },

    newGame() {
      this.playerHealth = 100;
      this.mosterHealth = 100;
      this.round = 0;
      this.winner = null;
      this.monsterbarColor = "#00a876";
      this.playerbarColor = "#00a876";
      this.msgs = [];
    },

    surrender() {
      this.winner = "Monster";
    },

    addLogMsg(who, what, value) {
      this.msgs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");

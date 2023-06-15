export class Morpion {
    constructor(grid = document.getElementById('grid')) {
        this.grid = grid;
        this.current_player_display = this.#dID("currentPlayer");
        this.current_player_data = 'X';
        this.score_plr1 = 0;
        this.score_plr2 = 0;
        this.count = 0;
        this.game_over = false;
        this.#__init__();
    }

    #dID(id) {
        return document.getElementById(id);
    }

    #dQA(id) {
        return document.querySelectorAll(id);
    }

    #dQS(id) {
        return document.querySelector(id);
    }

    #hook_reset_btn() {
        this.#dID('replay').addEventListener('click', () => {
            this.cells = this.#dQA('.cell');
            for (let i = 0; i < this.cells.length; i++) {
                const element = this.cells[i];
                this.grid.classList.remove('won');
                element.innerText = '';
                this.current_player_data = 'X';
                this.count = 0;
                this.game_over = false;
                this.#update_player();
            }
        })
    }

    #change_turn() {
        if (this.current_player_data == 'X') {
            this.current_player_data = 'O';
        } else {
            this.current_player_data = 'X';
        }
    }

    #update_player() {
        this.current_player_display.innerText = `Joueur ${this.current_player_data}`
    }

    #show_winner(player) {
        this.game_over = true;
        this.grid.classList.add('won');
        const winner = this.#dQS('.win-display');
        player = player == 'X' ? 1 : 2;
        if (player == 1) {
            this.score_plr1 += 1;
            this.#dID('playerOne').innerText = `${this.score_plr1}`;
        } else {
            this.score_plr2 += 1;
            this.#dID('playerTwo').innerText = `${this.score_plr2}`;;
        }
        winner.innerText = `Joueur ${player} a gagné !`;
        return;
    }

    #looping_victorieux_horizontal(from, to) {
        for (let i = from; i < to; i++) {
            if (this.cells[i].innerText != '') {
                switch (this.cells[i + 2]) {
                    case undefined:
                        return false;
                }
                if (this.cells[i].innerText == this.cells[i + 1].innerText &&
                    this.cells[i + 1].innerText == this.cells[i + 2].innerText) {
                    this.count = 2;
                    this.#show_winner(this.current_player_data);
                    return;
                }
            }
        }
    }

    #looping_victorieux_vertical(first, increment) {
        if (this.cells[first].innerText != '' &&
            this.cells[first + increment].innerText != '' &&
            this.cells[first + increment * 2].innerText != ''
        ) {
            if (this.cells[first].innerText == this.cells[first + increment].innerText &&
                this.cells[first + increment].innerText == this.cells[first + increment * 2].innerText) {
                this.count = 2;
                this.#show_winner(this.current_player_data);
            }
        }
    }

    #verify_win() {
        this.#looping_victorieux_horizontal(0, 2);
        this.#looping_victorieux_horizontal(3, 5);
        this.#looping_victorieux_horizontal(6, 8);

        this.#looping_victorieux_vertical(0, 3)
        this.#looping_victorieux_vertical(1, 3)
        this.#looping_victorieux_vertical(2, 3)

        this.#looping_victorieux_vertical(0, 4)
        this.#looping_victorieux_vertical(2, 2)

        if (this.count >= 9) {
            this.grid.classList.add('won');
            const winner = this.#dQS('.win-display');
            winner.innerText = `C'est une égalité !`;
        }
    }

    #__init__() {
        this.#update_player();
        this.#hook_reset_btn();
        this.cells = this.#dQA('.cell');
        for (let i = 0; i < this.cells.length; i++) {
            const element = this.cells[i];
            element.addEventListener('click', () => {
                if (element.innerText == '') {
                    element.innerText = this.current_player_data;
                    this.count++;
                    if (!this.game_over) {
                        this.#verify_win();
                        this.#change_turn();
                        this.#update_player();
                    }
                }
            })
        }
    }

}
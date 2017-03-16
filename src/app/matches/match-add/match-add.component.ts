import { Observable } from 'rxjs/Observable';
import { Match } from './../shared/match.model';
import { PlayerService } from './../../players/shared/player.service';
import { Player } from './../../players/shared/player.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css']
})
export class MatchAddComponent implements OnInit {
  tournamentId: string;
  players: Player[];
  match: Match;
  score: string;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService
  ) {
    this.match = new Match();
   }

  ngOnInit() {
    this.route.params.map(p => p)
      .forEach(param => {
        this.tournamentId = param['tournament_id'];
        this.getPlayers();
      });
  }

  getPlayers() {
    this.playerService.getPlayers(this.tournamentId)
      .then(players => this.players = players);
  }

  searchPlayer = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.players.filter(player => player.username.includes(term)));
  
  playerFormatter(player: Player): string {
    return player.username? player.username : '';
  }

  hasMinTwoPlayers(): boolean {
    if (this.players) {
      return this.players.length > 1;
    } else {
      return false;
    }
  }

  setMatchScore() {
    let scores = this.score.split('-');
    this.match.playerOneScore = +scores[0];
    this.match.playerTwoScore = +scores[1];
  }

  formValid(): boolean {
    return this.match.isValid(true);
  }

  create() {
    
  }
}

import { Component } from '@angular/core';
import {ApiService} from "../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private partyContracts = ['', ''];
  private partyPoints = [0, 0];

  public trials = [];

  constructor(
    private api: ApiService,
  ) {}

  setPartyContract(event, partyNumber) {
    this.partyContracts[partyNumber - 1] = event['contract'];
    this.partyPoints[partyNumber - 1] = event['points'];
  }

  getTrialResultFromApi() {
    const endpoint = 'trial/' + this.partyContracts[0] + '/' + this.partyContracts[1];

    this.api.get(endpoint)
      .then(res => {
        const loser = res.winner === 1 ? 2 : 1;
        this.trials.push(
          'Party ' + res.winner + ' (' + this.partyPoints[res.winner - 1] + ') ' +
          'has won Party ' + loser + ' (' + this.partyPoints[loser - 1] + ') '
        );
      })
  }
}

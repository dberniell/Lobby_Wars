import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {forEach} from "@angular-devkit/schematics";

@Component({
  selector: 'app-party-contract-card',
  templateUrl: './party-contract-card.component.html',
  styleUrls: ['./party-contract-card.component.scss'],
})
export class PartyContractCardComponent implements OnInit {
  @Input() numParty;
  @Output() partyContractOutput = new EventEmitter<Object>();

  public partyContract = '';
  public partyPoints = 0;

  constructor() { }

  ngOnInit() {}

  addRole(role) {
    this.partyContract += role;
    switch (role) {
      case 'K':
        this.partyPoints += 5;
        if (this.partyContract.indexOf('V') !== -1 && this.partyContract.indexOf('K') === this.partyContract.lastIndexOf('K')) {
          const countExtraV = this.partyContract.match(/V/g).length;
          this.partyPoints -= countExtraV;
        }
        break;
      case 'N':
        this.partyPoints += 2;
        break;
      case 'V':
        if (this.partyContract.indexOf('K') === -1) {
          this.partyPoints++;
        }
    }

    this.partyContractOutput.emit({'contract': this.partyContract, 'points': this.partyPoints})
  }
}

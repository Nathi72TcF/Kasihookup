import { Component, OnInit } from '@angular/core';
import { KasiService } from './../../service/kasi.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  kasihoes = [];
  kasihoesNo;
  kamasutra = [];
  kamasutraNo;

  constructor(
    public kasiservice: KasiService,
  ) {
    this.getKamasutra();
    this.gethookup();
   }

  ngOnInit() {
  }

  getKamasutra() {
    this.kasiservice.getkamasutra().subscribe(data => {
      // console.log(data);
      this.kamasutra = data;
      this.kamasutraNo = data.length;
    })
  }

  gethookup() {
    this.kasiservice.gethookup().subscribe(data => {
      // console.log(data);
      this.kasihoes = data;
      this.kasihoesNo = data.length;
    })
  }

}

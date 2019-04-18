import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public textContent = 'Luiz Foli - Full Stack Developer';
  public linkedinUrl = 'https://www.linkedin.com/in/luiz-oliveira-4b7787120/';
  public githubUrl = 'https://github.com/luizfoli';

  constructor() { }

  ngOnInit() {
  }

}

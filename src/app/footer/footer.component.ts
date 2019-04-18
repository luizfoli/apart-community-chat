import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  textContent: string;
  linkedinUrl: string;
  githubUrl: string;

  constructor() { }

  ngOnInit() {
    this.textContent = 'Luiz Foli - Full Stack Developer'
    this.linkedinUrl = 'https://www.linkedin.com/in/luiz-oliveira-4b7787120/';
    this.githubUrl = 'https://github.com/luizfoli';
  }

}

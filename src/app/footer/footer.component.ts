import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  private textContent = 'Luiz Foli - Full Stack Developer';
  private linkedinUrl = 'https://www.linkedin.com/in/luiz-oliveira-4b7787120/';
  private githubUrl = '';

  constructor() { }

  ngOnInit() {
  }

}

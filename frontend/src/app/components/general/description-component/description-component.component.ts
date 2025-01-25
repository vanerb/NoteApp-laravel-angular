import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description-component',
  templateUrl: './description-component.component.html',
  styleUrl: './description-component.component.css'
})
export class DescriptionComponentComponent implements OnInit {
 

  @Input() details!: {
    title: string,
    description: string,
    images: any[]
  }

  ngOnInit(): void {
    console.log(this.details)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  public items = <any>[];
  myform!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private spinner:NgxSpinnerService

  ) {}

  ngOnInit(): void {
    this.spinner.show()

    setTimeout(()=>
    {
      this.spinner.hide();
    },3000);
    this.myform=this.fb.group({
      title:new FormControl("",[Validators.required]),
      desc:new FormControl("",Validators.required),
      visible:new FormControl("",[Validators.required]),
     
  })

    setTimeout(() => {
      this.items = [
        { label: 'CoreUI', url: '/' },
        { label: 'Data', url: '/dashboard/' },
        { label: 'Library', url: '/' },
        { label: 'Home', url: '/', attributes: { title: 'Home' } }
      ];
    }, 5000);
  }
   submit()
    {
      if(this.myform.valid)
      {
        console.log(this.myform.value);
        var ref=document.getElementById("cancel");
        ref?.click();
        
      }
    }
    
}

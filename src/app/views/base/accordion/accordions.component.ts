import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from "../../../../services/api.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent implements OnInit {
  // myform!: FormGroup;
  data!: any;
  items = [1, 2, 3, 4];
  addbtn: boolean = false;
  updatebtn: boolean = false;
  // typeSelected: string;

  constructor(
    // private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private api: ApiService,
    private spinner: NgxSpinnerService
  ) { }

  showbtn() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 300);
    this.myform.reset();
    this.addbtn = true;
    this.updatebtn = false;

  }
  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 2000); // 5 seconds
    this.getusersdetails();


  }

  myform = this.fb.group({
    title: new FormControl("", [Validators.required]),
    price: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),

    // email: new FormControl("", [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.required]),
    image: new FormControl("", [Validators.required])
  })

  submit() {
    if (this.myform.valid) {
      // this.api.postusers(this.myform.value).subscribe({next:(res)=>
      // {
      //   console.log(res);

      // }})




      console.log(this.myform.value);
      var ref = document.getElementById("cancel");
      ref?.click();
      this.getusersdetails();

    }
  }

  // getAccordionBodyText(value: string) {
  //   const textSample = `
  //     <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
  //     default, until the collapse plugin adds the appropriate classes that we use to
  //     style each element. These classes control the overall appearance, as well as
  //     the showing and hiding via CSS transitions. You can modify any of this with
  //     custom CSS or overriding our default variables. It&#39;s also worth noting
  //     that just about any HTML can go within the <code>.accordion-body</code>,
  //     though the transition does limit overflow.
  //   `;
  //   return this.sanitizer.bypassSecurityTrustHtml(textSample);
  // }
  getusersdetails() {
    this.api.getusers().subscribe({
      next: (res) => {
        console.log(res);
        this.data = res;

      },
    })
  }

  update() {
    console.log("works");
    const id = this.api.getid();
    console.log("id is==>", id);

    if (this.myform.valid) {
      this.api.updateuser(id, this.myform.value).subscribe({
        next: (res) => {
          console.log(res);
        }
      })
    }
    var ref = document.getElementById("cancel");
    ref?.click();
    this.getusersdetails();

  }
  editdata(d: any) {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);
    console.log("edit works ==>", d);
    localStorage.setItem("id", d.id);
    this.addbtn = false;
    this.updatebtn = true;

    this.myform.patchValue(
      {
        title: d.title,
        price: d.price,
        category: d.category,
        description: d.description,
        image: d.image


      }
    )



  }

  delete(d: any) {
    console.log(d);

    this.api.deleteuser(d).subscribe({
      next: (res) => {
        console.log(res);

      }
    })
  }


}

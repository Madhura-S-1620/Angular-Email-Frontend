import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../service/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule , HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [MatFormField,MatInputModule,MatButtonModule,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent {

  data={
    to:"",
    subject:"",
    message:""

  }

  constructor(private email :EmailService  , private snak:MatSnackBar,private http: HttpClient){


  }


  doSubmitForm(){
    console.log("Trying to submit form");
    console.log("DATA", this.data);

    if(this.data.to=='' || this.data.subject=='' || this.data.message==''){
      this.snak.open("Fields cannot be empty!!", "OK");
      return;
    }

    this.http.post('http://localhost:8080/sendemail',this.data)
      .subscribe(
        response => console.log('Email sent successfully', response),
        error => console.error('Error sending email', error)
      );
  }

}

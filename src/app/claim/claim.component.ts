import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Claim } from '../models/claim';
import { ClaimService } from '../services/claim.service';
@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {
  isAddMode: boolean = true;
  claimForm: FormGroup;
  id: number;
  base64;
  claimLoading = false;
  claimSubmitted = false;
  returnUrl: string;
  error: string;
  success: string;
  claimSubmitShowMsg: boolean = false;
  claimsList: Claim[];
  currentDateValue = new Date();
  currentDate = new Date().toISOString().slice(0, 10);
  maxDob = new Date(this.currentDateValue.getFullYear() - 18, this.currentDateValue.getMonth(), this.currentDateValue.getDate()).toISOString().slice(0, 10);
  minDob = new Date(this.currentDateValue.getFullYear() - 96, this.currentDateValue.getMonth(), this.currentDateValue.getDate()).toISOString().slice(0, 10);
  constructor(
    private route: Router,
    private claimFormBuilder: FormBuilder,
    private claimService: ClaimService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.claimForm = this.claimFormBuilder.group({
      patientname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      dob: ['', Validators.required],
      admissiondate: ['', Validators.required],
      dischargedate: ['', Validators.required],
      hospitalname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      hospitaladdress: ['', Validators.required],
      claimamount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      contactno: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      bill: ['bill', Validators.required]
    });
    if (!Number.isNaN(this.id)) {
      this.isAddMode = false;
    }
    if (!this.isAddMode) {
      this.claimsList = JSON.parse(sessionStorage.getItem('claims'));
      this.claimForm.patchValue(this.claimsList.filter(claim => claim.id == this.id)[0]);
    }
  }
  get f() {
    return this.claimForm.controls;
  }
  onClaimSubmit() {
    if (!Number.isNaN(this.id)) {
      this.isAddMode = false;
    }

    this.claimSubmitted = true;
    this.claimSubmitShowMsg = false;
    if (!(this.claimForm.invalid)) {
      this.claimSubmitShowMsg = true;
      this.claimService.submitclaim(this.claimForm.value, this.isAddMode, this.id, this.base64);
      this.claimForm.reset();
      this.claimSubmitted = false;
    } else {
      return;
    }
  }
  logout() {
    sessionStorage.clear();
    this.route.navigate(['/']);
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.base64 = myReader.result;
    }
    myReader.readAsDataURL(file);
  }
}

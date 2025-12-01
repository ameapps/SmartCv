import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { deepClone } from 'src/app/shared/helpers/object.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  public texts = ["CONTACTS"];
  emailForm: FormGroup;
  sub!: Subscription;

  constructor(private fb: FormBuilder, private translate: TranslateService) {
    this.emailForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private subscribe() {
    this.sub = this.translate.onLangChange.subscribe(() => {
      setTimeout(() => {
        // L'esecuz. dell'evento costringe la view a controllare i bindings; riassegnare un array cambia il riferimento.
        this.texts = [this.translate.instant("PAGES.CONTACT.TITLE")];
      }, 100);
    });
  }


  onSubmit() {
    if (this.emailForm.valid) {
      const { to, subject, message } = this.emailForm.value;
      const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoLink; // apre client email
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.texts = [this.translate.instant("PAGES.CONTACT.TITLE")];
    }, 1000);
  }
}
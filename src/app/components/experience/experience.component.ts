import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/shared/services/common/common.service";

@Component({
  selector: "app-experience",
  templateUrl: "./experience.component.html",
  styleUrls: ["./experience.component.scss"],
})
export class ExperienceComponent implements OnInit {
  workExp: WorkExperience[] = [];
  showDialog = false;
  dialogData: any = null;
  private longPressTimeouts: any[] = [];
  public get currentYear() {
    return new Date().getFullYear();
  }

  constructor(private common: CommonService) {}

  async ngOnInit(): Promise<void> {
    if (!this.common.hasAppInit) await this.common.initWebApp();
    this.getExperiencesData();
  }

  private getExperiencesData() {
    this.workExp = [
      {
        title: "ZInformatica",
        summary: "Asp .NET MVC",
        description: "Sviluppo e manutenzione di applicazioni web basate su ASP.NET MVC, con particolare attenzione alla progettazione di architetture scalabili e sicure. Implementazione di logiche di business e interfacce utente responsive. Integrazione con database relazionali e servizi esterni. Collaborazione con il team per ottimizzare performance e usabilità.",
        isClicked: false,
        dateFrom: "mm/yy",
        dateTo: "mm/yy",
        country: "Italy",
      },
      {
        title: "LHub",
        summary: "Wordpress; HTML & CSS",
        description: "Realizzazione e personalizzazione di siti web su piattaforma WordPress, curando sia la parte tecnica che quella estetica. Sviluppo di temi e plugin custom. Ottimizzazione SEO on-page e miglioramento delle performance di caricamento. Utilizzo di HTML5 e CSS3 per garantire design responsive e compatibilità cross-browser.",
        isClicked: false,
        dateFrom: "mm/yy",
        dateTo: "mm/yy",
        country: "Italy",
      },
      {
        title: "Artiso",
        summary: "React, WPF",
        description: "Partecipazione a progetti internazionali focalizzati sullo sviluppo di interfacce moderne e performanti. Creazione di single-page applications (SPA) con React. Sviluppo di applicazioni desktop con Windows Presentation Foundation (WPF). Integrazione di API REST e gestione dello stato applicativo. Collaborazione in team agile, con attenzione a qualità del codice e test automatizzati.",
        isClicked: false,
        dateFrom: "mm/yy",
        dateTo: "mm/yy",
        country: "Germany",
      },
      {
        title: "Softech",
        summary: "Angular, Ionic, .NET core, Sql server, postGreSQL",
        description: "Sviluppo full-stack di soluzioni enterprise e mobile, con tecnologie moderne e orientate alla scalabilità. Creazione di applicazioni web con Angular e mobile cross-platform con Ionic. Implementazione di API RESTful e servizi backend in .NET Core. Progettazione e gestione di database complessi (SQL Server, PostgreSQL). Ottimizzazione delle query e tuning delle performance. Partecipazione a processi di CI/CD e metodologie Agile/Scrum.",
        isClicked: false,
        dateFrom: "mm/yy",
        dateTo: "mm/yy",
        country: "Italy",
      },
    ];
  }

  onClickDot(experience: WorkExperience) {
    this.workExp.forEach((exp) => {
      exp.isClicked = false;
    });
    experience.isClicked = true;
  }

  onDotPress(exp: WorkExperience, idx: number) {
    this.clearLongPressTimeout(idx);
    this.longPressTimeouts[idx] = setTimeout(() => {
      this.openDialog(exp);
    }, 250);
  }

  onDotRelease(exp: WorkExperience, idx: number) {
    this.clearLongPressTimeout(idx);
  }

  clearLongPressTimeout(idx: number) {
    if (this.longPressTimeouts[idx]) {
      clearTimeout(this.longPressTimeouts[idx]);
      this.longPressTimeouts[idx] = null;
    }
  }

  openDialog(exp: WorkExperience) {
    this.dialogData = exp;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.dialogData = null;
  }
}

export class WorkExperience {
  title = "";
  summary = "";
  description  = "";
  isClicked = false;
  dateFrom = "mm/yy";
  dateTo = "mm/yy";
  country = "";
}

export class AppData {
    home!: AppDataHome;
    about!: AppDataAbout;
    contact!: AppDataContact;
    experience!: AppDataExperience;
    projects!: AppDataProjects;
    skills!: AppDataSkills;
}

export class AppDataHome {
    name!: string;
    short_descr: string[] = [];
    long_descr = '';
}
export class AppDataAbout {
    short_descr = '';
    long_descr = '';
}
export class AppDataContact {

}
export class AppDataExperience {
    list!: AppDataExperienceWorks[];
    long_descr!: string;
}
export class AppDataProjects {
    list!: AppDataProject[];
}

export class AppDataProject {
  name = '';
  image = '';
  link = '';
  description = '';
  isClicked = false;
  isHovering = false
}

export class AppDataSkills {
    long_descr = '';
}

export class AppDataExperienceWorks {
    title = '';
    summary = '';
    description = '';
    isClicked = false;
    dateFrom = '';
    dateTo = '';
    country = '';
}
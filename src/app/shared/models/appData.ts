export class AppData {
    home!: AppDataHome;
    about!: AppDataAbout;
    contact!: AppDataContact;
    experience!: AppDataExperience;
    project!: AppDataProject;
    skills!: AppDataSkills;
}

export class AppDataHome {
    name!: string;
}
export class AppDataAbout {

}
export class AppDataContact {

}
export class AppDataExperience {
    workEpx!: AppDataExperienceWorks[];
}
export class AppDataProject {

}
export class AppDataSkills {

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
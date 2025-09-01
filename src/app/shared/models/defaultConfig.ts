
export class DefaultConfig {
    common!: DefaultConfigCommon;
    pages!: DefaultConfigPages;
}

export class DefaultConfigCommon {
    header!: DefaultConfigCommonHeader;
};
export class DefaultConfigPages {
    home!: DefaultConfigPagesHome;
    about!: DefaultConfigPagesAbout;
    contact!: DefaultConfigPagesContact;
    experience!: DefaultConfigPagesExperience;
    project!: DefaultConfigPagesProject;
    skills!: DefaultConfigPagesSkills;
};

export class DefaultConfigPagesHome {
    name!: string;
}
export class DefaultConfigPagesAbout {}
export class DefaultConfigPagesContact {}
export class DefaultConfigPagesExperience {}
export class DefaultConfigPagesProject {}
export class DefaultConfigPagesSkills {}

export class DefaultConfigCommonHeader {

}
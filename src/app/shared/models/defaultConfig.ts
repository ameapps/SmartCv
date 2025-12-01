export class DefaultConfig {
  common!: DefaultConfigCommon;
  pages!: DefaultConfigPages;
}

export class DefaultConfigCommon {
  app!: DefaultConfigCommonApp;
  header!: DefaultConfigCommonHeader;
}
export class DefaultConfigPages {
  home!: DefaultConfigPagesHome;
  about!: DefaultConfigPagesAbout;
  contact!: DefaultConfigPagesContact;
  experience!: DefaultConfigPagesExperience;
  project!: DefaultConfigPagesProject;
  skills!: DefaultConfigPagesSkills;
}

export class DefaultConfigPagesHome {
}
export class DefaultConfigPagesAbout {}
export class DefaultConfigPagesContact {}
export class DefaultConfigPagesExperience {}
export class DefaultConfigPagesProject {}
export class DefaultConfigPagesSkills {}

export class DefaultConfigCommonHeader {
  can_show_drag_text = true;
}

export class DefaultConfigCommonApp {
  current_user = 'DEMO';
  app_data: 'assets' | 'url' | 'cloud' = 'assets';
}

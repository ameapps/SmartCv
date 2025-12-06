export class DefaultConfig {
  common!: DefaultConfigCommon;
  pages!: DefaultConfigPages;
  firebase!: DefaultFirebaseConfig;
}

export class DefaultFirebaseConfig {
  dbUrl!: string;  
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
  uId?: string;
  data_source: 'assets' | 'url' | 'cloud' = 'assets';
}
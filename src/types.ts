export interface SocialLinks {
  facebook: string;
  zalo: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
}

export interface AboutData {
  intro: string;
  biography: string;
  experience: string[];
  achievements: string[];
  profileImageUrl: string;
  profilePdfUrl: string;
}

export interface VideoData {
  youtubeId: string;
  title: string;
  description: string;
  poster: string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
}

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface MapData {
  embedUrl: string;
  openUrl: string;
}

export interface NavItem {
  label: string;
  id: string;
}

export interface ProfileData {
  companyLogoName: string;
  companyInitials: string;
  navItems?: NavItem[];
  coverImage: string;
  avatar: string;
  fullName: string;
  title: string;
  bioShort: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  socials: SocialLinks;
  vision: string;
  mission: string;
  strategy: string;
  about: AboutData;
  video: VideoData;
  projects: ProjectData[];
  gallery: GalleryItem[];
  services: ServiceData[];
  community: {
    heading: string;
    description: string;
    facebookGroup: string;
    zaloCommunity: string;
    youtubeChannel: string;
  };
  map: MapData;
}

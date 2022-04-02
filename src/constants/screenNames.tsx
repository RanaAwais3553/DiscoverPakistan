import { VideoTypes } from ".";
import {
  AboutUs,
  CompleteArchive,
  ContactUsIcon,
  PopularShows,
  Documentary,
  Contributor,
  Disclaimer,
  Documentaries,
  Home,
  Likes,
  Logout,
  MostViewed,
  Partners,
  Policies,
  Profile,
  Shows,
  TermsOfUse,
  TouristCommunityIcon,
  WatchLater,
  
} from "../assets/svg";
import { ROUTE } from "../navigation/routeNames";

const SCREEN_NAME = {
  Home: "home",
  Shows: "Popular Shows",
  Shop: "Discover Store",
  AboutUs: "About Us",
  Documentaries: "Popular Documentaries",
  Discover_Shop: "Discover Shop",
  Partners: "Partners",
  Advertise: "Advertise",
  Pakistan: "Pakistan",
  iTrip: "iTrip",
  Become_Contributor: "Become Contributor",
  Tourist_Community: "Tourist Community",
  CONTACT_US: "Contact Us",
  Complete_Archive: "Complete Archive",
  Most_Viewed: "Most Viewed",
  Live: "Live Streaming"
};

const LOGOUTMODALROWS = [
  {
    icon: Profile,
    name: "Profile",
    screen: ROUTE.Profile,
  },

  {
    icon: Likes,
    name: "Likes",
    screen: "Favorites",
  },
  {
    icon: WatchLater,
    name: "Watch Later",
    screen: "",
  },

  {
    icon: Logout,
    name: "Logout",
    screen: "LogOut",
  },
  {},
  {
    icon: Contributor,
    name: "Become Contributor",
    screen: ROUTE.BecomeContributor,
  },

  {
    icon: Disclaimer,
    name: "Disclaimer",
    screen: ROUTE.Disclaimar,
  },
  {
    icon: TermsOfUse,
    name: "Terms of Use",
    screen: ROUTE.TermsCondition,
  },

  {
    icon: Policies,
    name: "Privacy Policy",
    screen: ROUTE.PrivacyPolicy,
  },
];

const DRAWERROWS = [
  
  
  {
    title: SCREEN_NAME.Home,
    icon: Home,
    screen: ROUTE.Home,
    slug: VideoTypes.mostViewed,
    isHome: true,
  },
  {
    title: SCREEN_NAME.Live,
    icon: Documentaries,
    screen: ROUTE.Home,
    slug: VideoTypes.mostViewed,
    isHome: true,
  },
  {
    title: SCREEN_NAME.Shows,
    icon: PopularShows,
    screen: ROUTE.Home,
    show: VideoTypes.Shows,
  },

  {
    title: SCREEN_NAME.Documentaries,
    icon: Documentary,
    screen: ROUTE.Home,
    slug: VideoTypes.popularDocumentaries,
  },

  {
    title: SCREEN_NAME.Most_Viewed,
    icon: MostViewed,
    screen: ROUTE.Home,
    slug: VideoTypes.mostViewed,
  },
  {
    title: SCREEN_NAME.Complete_Archive,
    icon: CompleteArchive,
    screen: ROUTE.Home,
    slug: VideoTypes.completeArchieve,
  },

  {
    title: SCREEN_NAME.Become_Contributor,
    icon: Partners,
    screen: ROUTE.BecomeContributor,
  },
  {
    title: SCREEN_NAME.Shop,
    icon: TouristCommunityIcon,
    screen: ROUTE.Shop,
  },
  {
    title: SCREEN_NAME.AboutUs,
    icon: AboutUs,
    screen: ROUTE.AboutUs,
  },
  {
    title: SCREEN_NAME.CONTACT_US,
    icon: ContactUsIcon,
    screen: ROUTE.ContactUs,
  },
];

export { SCREEN_NAME, DRAWERROWS, LOGOUTMODALROWS };

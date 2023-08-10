export interface Submenu {
  label: string;
  url: string;
}

export interface Menu {
  label: string;
  url: string;
  submenu?: Submenu[];
}

const menuData: Menu[] = [
  {
    label: 'Movies',
    url: '/movie',
    submenu: [
      {
        label: 'Popular',
        url: '/movie',
      },
      {
        label: 'Now Playing',
        url: '/movie/now-playing',
      },
      {
        label: 'Upcoming',
        url: '/movie/upcoming',
      },
      {
        label: 'Top Rated',
        url: '/movie/top-rated',
      },
    ],
  },
  {
    label: 'TV Shows',
    url: '/tv',
    submenu: [
      {
        label: 'Popular',
        url: '/tv',
      },
      {
        label: 'Airing Today',
        url: '/tv/airing-today',
      },
      {
        label: 'On TV',
        url: '/tv/on-the-air',
      },
      {
        label: 'Top Rated',
        url: '/tv/top-rated',
      },
    ],
  },
  {
    label: 'People',
    url: '/person',
    submenu: [
      {
        label: 'Popular People',
        url: '/person',
      },
    ],
  },
  {
    label: 'More',
    url: '',
    submenu: [
      {
        label: 'Discussions',
        url: '/discuss',
      },
      {
        label: 'Leaderboard',
        url: '/leaderboard',
      },
      {
        label: 'Support',
        url: '/talk',
      },
      {
        label: 'API',
        url: 'https://developer.themoviedb.org/docs',
      },
    ],
  },
];

export default menuData;

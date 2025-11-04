export interface Episode {
  season: number;
  episode: number;
  title: string;
  duration: number; // in seconds
  videoUrl?: string; // placeholder for now
}

// Family Guy episode data (Seasons 1-10 for demo)
export const EPISODES: Episode[] = [
  // Season 1
  { season: 1, episode: 1, title: "Death Has a Shadow", duration: 1320 },
  { season: 1, episode: 2, title: "I Never Met the Dead Man", duration: 1320 },
  { season: 1, episode: 3, title: "Chitty Chitty Death Bang", duration: 1320 },
  { season: 1, episode: 4, title: "Mind Over Murder", duration: 1320 },
  { season: 1, episode: 5, title: "A Hero Sits Next Door", duration: 1320 },
  { season: 1, episode: 6, title: "The Son Also Draws", duration: 1320 },
  { season: 1, episode: 7, title: "Brian: Portrait of a Dog", duration: 1320 },
  
  // Season 2
  { season: 2, episode: 1, title: "Peter, Peter, Caviar Eater", duration: 1320 },
  { season: 2, episode: 2, title: "Holy Crap", duration: 1320 },
  { season: 2, episode: 3, title: "Da Boom", duration: 1320 },
  { season: 2, episode: 4, title: "Brian in Love", duration: 1320 },
  { season: 2, episode: 5, title: "Love Thy Trophy", duration: 1320 },
  { season: 2, episode: 6, title: "Death Is a Bitch", duration: 1320 },
  { season: 2, episode: 7, title: "The King Is Dead", duration: 1320 },
  { season: 2, episode: 8, title: "I Am Peter, Hear Me Roar", duration: 1320 },
  { season: 2, episode: 9, title: "If I'm Dyin', I'm Lyin'", duration: 1320 },
  { season: 2, episode: 10, title: "Running Mates", duration: 1320 },
  { season: 2, episode: 11, title: "A Picture's Worth $1,000", duration: 1320 },
  { season: 2, episode: 12, title: "Fifteen Minutes of Shame", duration: 1320 },
  { season: 2, episode: 13, title: "Road to Rhode Island", duration: 1320 },
  { season: 2, episode: 14, title: "Let's Go to the Hop", duration: 1320 },
  { season: 2, episode: 15, title: "Dammit Janet!", duration: 1320 },
  { season: 2, episode: 16, title: "There's Something About Paulie", duration: 1320 },
  { season: 2, episode: 17, title: "He's Too Sexy for His Fat", duration: 1320 },
  { season: 2, episode: 18, title: "E. Peterbus Unum", duration: 1320 },
  { season: 2, episode: 19, title: "The Story on Page One", duration: 1320 },
  { season: 2, episode: 20, title: "Wasted Talent", duration: 1320 },
  { season: 2, episode: 21, title: "Fore Father", duration: 1320 },
  
  // Season 3
  { season: 3, episode: 1, title: "The Thin White Line", duration: 1320 },
  { season: 3, episode: 2, title: "Brian Does Hollywood", duration: 1320 },
  { season: 3, episode: 3, title: "Mr. Griffin Goes to Washington", duration: 1320 },
  { season: 3, episode: 4, title: "One if by Clam, Two if by Sea", duration: 1320 },
  { season: 3, episode: 5, title: "And the Wiener Is...", duration: 1320 },
  { season: 3, episode: 6, title: "Death Lives", duration: 1320 },
  { season: 3, episode: 7, title: "Lethal Weapons", duration: 1320 },
  { season: 3, episode: 8, title: "The Kiss Seen Around the World", duration: 1320 },
  { season: 3, episode: 9, title: "Mr. Saturday Knight", duration: 1320 },
  { season: 3, episode: 10, title: "A Fish out of Water", duration: 1320 },
  { season: 3, episode: 11, title: "Emission Impossible", duration: 1320 },
  { season: 3, episode: 12, title: "To Love and Die in Dixie", duration: 1320 },
  { season: 3, episode: 13, title: "Screwed the Pooch", duration: 1320 },
  { season: 3, episode: 14, title: "Peter Griffin: Husband, Father...Brother?", duration: 1320 },
  { season: 3, episode: 15, title: "Ready, Willing, and Disabled", duration: 1320 },
  { season: 3, episode: 16, title: "A Very Special Family Guy Freakin' Christmas", duration: 1320 },
  { season: 3, episode: 17, title: "Brian Wallows and Peter's Swallows", duration: 1320 },
  { season: 3, episode: 18, title: "From Method to Madness", duration: 1320 },
  { season: 3, episode: 19, title: "Stuck Together, Torn Apart", duration: 1320 },
  { season: 3, episode: 20, title: "Road to Europe", duration: 1320 },
  { season: 3, episode: 21, title: "Family Guy Viewer Mail #1", duration: 1320 },
  { season: 3, episode: 22, title: "When You Wish Upon a Weinstein", duration: 1320 },
  
  // Season 4
  { season: 4, episode: 1, title: "North by North Quahog", duration: 1320 },
  { season: 4, episode: 2, title: "Fast Times at Buddy Cianci Jr. High", duration: 1320 },
  { season: 4, episode: 3, title: "Blind Ambition", duration: 1320 },
  { season: 4, episode: 4, title: "Don't Make Me Over", duration: 1320 },
  { season: 4, episode: 5, title: "The Cleveland-Loretta Quagmire", duration: 1320 },
  { season: 4, episode: 6, title: "Petarded", duration: 1320 },
  { season: 4, episode: 7, title: "Brian the Bachelor", duration: 1320 },
  { season: 4, episode: 8, title: "8 Simple Rules for Buying My Teenage Daughter", duration: 1320 },
  { season: 4, episode: 9, title: "Breaking Out Is Hard to Do", duration: 1320 },
  { season: 4, episode: 10, title: "Model Misbehavior", duration: 1320 },
  { season: 4, episode: 11, title: "Peter's Got Woods", duration: 1320 },
  { season: 4, episode: 12, title: "Perfect Castaway", duration: 1320 },
  { season: 4, episode: 13, title: "Jungle Love", duration: 1320 },
  { season: 4, episode: 14, title: "PTV", duration: 1320 },
  { season: 4, episode: 15, title: "Brian Goes Back to College", duration: 1320 },
  { season: 4, episode: 16, title: "The Courtship of Stewie's Father", duration: 1320 },
  { season: 4, episode: 17, title: "The Fat Guy Strangler", duration: 1320 },
  { season: 4, episode: 18, title: "The Father, the Son, and the Holy Fonz", duration: 1320 },
  { season: 4, episode: 19, title: "Brian Sings and Swings", duration: 1320 },
  { season: 4, episode: 20, title: "Patriot Games", duration: 1320 },
  { season: 4, episode: 21, title: "I Take Thee Quagmire", duration: 1320 },
  { season: 4, episode: 22, title: "Sibling Rivalry", duration: 1320 },
  { season: 4, episode: 23, title: "Deep Throats", duration: 1320 },
  { season: 4, episode: 24, title: "Peterotica", duration: 1320 },
  { season: 4, episode: 25, title: "You May Now Kiss the...Uh...Guy Who Receives", duration: 1320 },
  { season: 4, episode: 26, title: "Petergeist", duration: 1320 },
  { season: 4, episode: 27, title: "Untitled Griffin Family History", duration: 1320 },
  { season: 4, episode: 28, title: "Stewie B. Goode", duration: 1320 },
  { season: 4, episode: 29, title: "Stu & Stewie's Excellent Adventure", duration: 1320 },
  { season: 4, episode: 30, title: "Bango Was His Name Oh", duration: 1320 },
  
  // Season 5
  { season: 5, episode: 1, title: "Stewie Loves Lois", duration: 1320 },
  { season: 5, episode: 2, title: "Mother Tucker", duration: 1320 },
  { season: 5, episode: 3, title: "Hell Comes to Quahog", duration: 1320 },
  { season: 5, episode: 4, title: "Saving Private Brian", duration: 1320 },
  { season: 5, episode: 5, title: "Whistle While Your Wife Works", duration: 1320 },
  { season: 5, episode: 6, title: "Prick Up Your Ears", duration: 1320 },
  { season: 5, episode: 7, title: "Chick Cancer", duration: 1320 },
  { season: 5, episode: 8, title: "Barely Legal", duration: 1320 },
  { season: 5, episode: 9, title: "Road to Rupert", duration: 1320 },
  { season: 5, episode: 10, title: "Peter's Two Dads", duration: 1320 },
  { season: 5, episode: 11, title: "The Tan Aquatic with Steve Zissou", duration: 1320 },
  { season: 5, episode: 12, title: "Airport '07", duration: 1320 },
  { season: 5, episode: 13, title: "Bill & Peter's Bogus Journey", duration: 1320 },
  { season: 5, episode: 14, title: "No Meals on Wheels", duration: 1320 },
  { season: 5, episode: 15, title: "Boys Do Cry", duration: 1320 },
  { season: 5, episode: 16, title: "No Chris Left Behind", duration: 1320 },
  { season: 5, episode: 17, title: "It Takes a Village Idiot, and I Married One", duration: 1320 },
  { season: 5, episode: 18, title: "Meet the Quagmires", duration: 1320 },
];

export function getEpisodesBySeasons(season: number): Episode[] {
  return EPISODES.filter(ep => ep.season === season);
}

export function getEpisode(season: number, episode: number): Episode | undefined {
  return EPISODES.find(ep => ep.season === season && ep.episode === episode);
}

export function getNextEpisode(season: number, episode: number): Episode | undefined {
  const currentIndex = EPISODES.findIndex(ep => ep.season === season && ep.episode === episode);
  if (currentIndex === -1 || currentIndex === EPISODES.length - 1) return undefined;
  return EPISODES[currentIndex + 1];
}

export function getPreviousEpisode(season: number, episode: number): Episode | undefined {
  const currentIndex = EPISODES.findIndex(ep => ep.season === season && ep.episode === episode);
  if (currentIndex <= 0) return undefined;
  return EPISODES[currentIndex - 1];
}

export function getRandomEpisode(excludeSeasons: number[] = []): Episode {
  const availableEpisodes = excludeSeasons.length > 0
    ? EPISODES.filter(ep => !excludeSeasons.includes(ep.season))
    : EPISODES;
  
  const randomIndex = Math.floor(Math.random() * availableEpisodes.length);
  return availableEpisodes[randomIndex];
}

export function getAllSeasons(): number[] {
  return Array.from(new Set(EPISODES.map(ep => ep.season))).sort((a, b) => a - b);
}

const APP_DATA_REGEX = /application\/ld\+json.*?>(.*?)</gim;
const MORE_APP_DATA_REGEX = /<script.*?shoebox-ember-data-store[^>]*>(.*?)<\/script>/gmi;
const FORMAT_IMAGE_URL = (url, width) => url.replace('{w}', width).replace('{h}', '0').replace('{c}', 'w').replace('{f}', 'jpg');
const SCREENSHOT_MAP = ({ url, width }) => FORMAT_IMAGE_URL(url, width);
const VIDEO_MAP = ({ previewFrame: { url, width }, video }) => ({
  video,
  preview: FORMAT_IMAGE_URL(url, width),
});
const REGEX_EXEC = (string, regex) => {
  const s = string.replace(/\r?\n|\r/g, ' ');
  const found = regex.exec(s);

  return JSON.parse(found[1]);
};

const getAppData = (string) => REGEX_EXEC(string, APP_DATA_REGEX);

const getMoreAppData = (string) => REGEX_EXEC(string, MORE_APP_DATA_REGEX);

const cleanItunesData = (app) => ({
  id: app.trackId,
  appId: app.bundleId,
  name: app.trackName,
  url: app.trackViewUrl,
  description: app.description,
  icon: app.artworkUrl512 || app.artworkUrl100 || app.artworkUrl60,
  categories: app.genres,
  categoryIds: app.genreIds,
  primaryGenre: app.primaryGenreName,
  primaryGenreId: app.primaryGenreId,
  contentRating: app.contentAdvisoryRating,
  languages: app.languageCodesISO2A,
  size: app.fileSizeBytes,
  requiredOsVersion: app.minimumOsVersion,
  released: app.releaseDate,
  updated: app.currentVersionReleaseDate || app.releaseDate,
  releaseNotes: app.releaseNotes,
  version: app.version,
  price: app.price,
  currency: app.currency,
  developerId: app.artistId,
  developer: app.artistName,
  developerUrl: app.artistViewUrl,
  developerWebsite: app.sellerUrl,
  rating: app.averageUserRating,
  reviews: app.userRatingCount,
  currentVersionRating: app.averageUserRatingForCurrentVersion,
  currentVersionReviews: app.userRatingCountForCurrentVersion,
  iphone55Screenshots: app.kind === 'software' ? app.screenshotUrls : [],
  ipadScreenshots: app.ipadScreenshotUrls || [],
  tvScreenshots: app.appletvScreenshotUrls || [],
  macScreenshots: app.kind === 'mac-software' ? app.screenshotUrls : [],
  supportedDevices: app.supportedDevices || [],
});

const cleanAppData = (data) => ({
  featuredImage: data.image,
  operatingSystem: data.operatingSystem,
});

const cleanMoreAppData = (data, id) => {
  const platformIds = [ `${id}-ios`, `${id}-osx`, `${id}-appletvos` ];
  const editorialArtworkKeys = [ 'originalFlowcaseBrick', 'storeFlowcase', 'subscriptionHero', 'bannerUber', 'brandLogo' ];
  const editorialNotesKeys = [ 'tagline', 'standard', 'short' ];
  const platformsData = data[id].data.relationships.platforms.data.filter((a) => {
    return platformIds.indexOf(a.id) > -1;
  }).sort((a, b) => {
    const aIndex = platformIds.indexOf(a.id);
    const bIndex = platformIds.indexOf(b.id);

    if (aIndex < bIndex) {
      return -1;
    }

    if (aIndex > bIndex) {
      return 1;
    }

    return 0;
  });

  const {
    privacyPolicyUrl = '',
    supportURLForLanguage = '',
    messagesScreenshots = {},
    editorialArtwork = {},
    subtitle = '',
    copyright = '',
    editorialNotes = {},
    privacyPolicyText = '',
  } = platformsData[0].attributes;

  const screenshotsByType = platformsData.reduce((a, { attributes: { screenshotsByType }}) => {
    return { ...a, ...screenshotsByType };
  }, {});
  const videoPreviewsByType = platformsData.reduce((a, { attributes: { videoPreviewsByType }}) => {
    return { ...a, ...videoPreviewsByType };
  }, {});

  return {
    deviceFamilies: data[id].data.attributes.deviceFamilies || [],
    privacyPolicyUrl: privacyPolicyUrl,
    supportUrl: supportURLForLanguage,
    subtitle: subtitle,
    copyright: copyright,
    privacyPolicyText: privacyPolicyText,
    editorialNotes: editorialNotesKeys.reduce((a, c) => ({ ...a, [c]: editorialNotes[c] || '' }), {}),
    editorialArtwork: editorialArtworkKeys.reduce((a, c) => ({
      ...a,
      [c]: editorialArtwork[c] ? FORMAT_IMAGE_URL(editorialArtwork[c].url, editorialArtwork[c].width) : '',
    }), {}),
    iphone55Screenshots: (screenshotsByType['iphone6+'] || []).map(SCREENSHOT_MAP),
    iphone65Screenshots: (screenshotsByType['iphone_6_5'] || screenshotsByType['iphone_5_8'] || []).map(SCREENSHOT_MAP),
    ipadScreenshots: (screenshotsByType['ipadPro_2018'] || screenshotsByType['ipadPro'] || []).map(SCREENSHOT_MAP),
    watchScreenshots: (screenshotsByType['appleWatch_2018'] || []).map(SCREENSHOT_MAP),
    tvScreenshots: (screenshotsByType['appleTV'] || []).map(SCREENSHOT_MAP),
    macScreenshots: (screenshotsByType['mac'] || []).map(SCREENSHOT_MAP),
    iphone55MessageScreenshots: (messagesScreenshots['iphone6+'] || []).map(SCREENSHOT_MAP),
    iphone65MessageScreenshots: (messagesScreenshots['iphone_6_5'] || messagesScreenshots['iphone_5_8'] || []).map(SCREENSHOT_MAP),
    ipadMessageScreenshots: (messagesScreenshots['ipadPro_2018'] || messagesScreenshots['ipadPro'] || []).map(SCREENSHOT_MAP),
    iphone65Previews: (videoPreviewsByType['iphone_6_5'] || videoPreviewsByType['iphone_5_8'] || []).map(VIDEO_MAP),
    macPreviews: (videoPreviewsByType['mac'] || []).map(VIDEO_MAP),
  };
};

module.exports = { getAppData, getMoreAppData, cleanItunesData, cleanAppData, cleanMoreAppData };

const axios = require('axios');
const { getAppData, getMoreAppData, cleanItunesData, cleanAppData, cleanMoreAppData } = require('./utilities');

exports.pluginOptionsSchema = ({ Joi }) =>
  Joi.object().keys({
    id: Joi.number()
      .description(`Your app's Apple App Store ID.`)
      .required()
      .empty(),
  });

exports.onPreInit = ({}, { id }) => {
  console.log(`Fetching app store information for ${id}.`);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type EditorialNotes implements Node {
      short: String!
      standard: String!
      tagline: String!
    }

    type EditorialArtwork implements Node {
      bannerUber: String!
      brandLogo: String!
      originalFlowcaseBrick: String!
      storeFlowcase: String!
      subscriptionHero: String!
    }

    type Preview implements Node {
      preview: String!
      video: String!
    }

    type AppStoreApp implements Node {
      appId: Int!
      bundleId: String!
      categories: [String]!
      categoryIds: [String]!
      contentRating: String!
      copyright: String!
      currency: String!
      currentVersionRating: Float!
      currentVersionReviews: Int!
      description: String!
      developer: String!
      developerId: Int!
      developerUrl: String!
      developerWebsite: String!
      deviceFamilies: [String]!
      editorialArtwork: EditorialArtwork!
      editorialNotes: EditorialNotes!
      featuredImage: String!
      icon: String!
      ipadMessageScreenshots: [String]!
      ipadScreenshots: [String]!
      iphone55MessageScreenshots: [String]!
      iphone55Screenshots: [String]!
      iphone65MessageScreenshots: [String]!
      iphone65Previews: [Preview]!
      iphone65Screenshots: [String]!
      languages: [String]!
      macPreviews: [Preview]!
      macScreenshots: [String]!
      name: String!
      operatingSystem: String!
      price: Float!
      primaryGenre: String!
      primaryGenreId: String!
      privacyPolicyText: String!
      privacyPolicyUrl: String!
      rating: Float!
      released: String!
      releaseNotes: String!
      requiredOsVersion: String!
      reviews: Int!
      size: String!
      subtitle: String!
      supportedDevices: [String]!
      supportUrl: String!
      tvScreenshots: [String]!
      updated: String!
      url: String!
      version: String!
      watchScreenshots: [String]!
    }
  `;

  createTypes(typeDefs);
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, { id }) => {
  const { createNode } = actions;

  const itunesResponse = await axios.get(`https://itunes.apple.com/lookup?id=${id}&entity=software`);
  const itunesData = cleanItunesData(itunesResponse.data.results[0]);

  const appStoreResponse = await axios.get(itunesData.url);
  const appStoreData = cleanAppData(getAppData(appStoreResponse.data));
  const moreAppStoreData = cleanMoreAppData(getMoreAppData(appStoreResponse.data), id);

  const appData = {
    ...itunesData,
    ...appStoreData,
    ...moreAppStoreData,
  };

  const nodeMeta = {
    id: createNodeId(`app-${appData.appId}`),
    parent: null,
    children: [],
    internal: {
      type: 'AppStoreApp',
      mediaType: 'application/json',
      content: JSON.stringify(appData),
      contentDigest: createContentDigest(appData),
    },
    appData,
  };

  const node = Object.assign({}, appData, nodeMeta);

  createNode(node);

  return;
};

# gatsby-source-apple-app-store

Gatsby source plugin for pulling app information from Apple's App Store for iPhone, iPad, Apple TV, Apple Watch, and Mac apps. It creates and entry so the data can be queried in Gatsby using GraphQL.

You can see an example of this plugin in use [here](https://sharp-engelbart-a2379e.netlify.app/).

## How to Install

To install run

```
npm install gatsby-source-apple-app-store
// or
yarn add gatsby-source-apple-app-store
```

## How to Use

```
// gatsby-config.js
module.exports = {
  plugins: [
    // Add the plugin to your gatsby-config
    {
      resolve: "gatsby-source-apple-app-store",
      options: {
        id: "1502047522", // required
      },
    },
  ],
}
```

## Available options

| **Name** | **Type** | **Description** |
|-----|-----|-----|
| id | string | `Required.`, App ID that you want to getch data for. |

## Response Format

Here is the format of an app's data.

```
appId: Int
bundleId: String
categories: [String]
categoryIds: [String]
contentRating: String
copyright: String
currency: String
currentVersionRating: Float
currentVersionReviews: Int
description: String
developer: String
developerId: Int
developerUrl: String
developerWebsite: String
deviceFamilies: [String]
editorialArtwork: {
  bannerUber: String
  brandLogo: String
  originalFlowcaseBrick: String
  storeFlowcase: String
  subscriptionHero: String
}
editorialNotes: {
  short: String
  standard: String
  tagline: String
}
featuredImage: String
icon: String
ipadMessageScreenshots: [String]
ipadScreenshots: [String]
iphone55MessageScreenshots: [String]
iphone55Screenshots: [String]
iphone65MessageScreenshots: [String]
iphone65Previews: [{
  preview: String
  video: String
}]
iphone65Screenshots: [String]
languages: [String]
macPreviews: [{
  preview: String
  video: String
}]
macScreenshots: [String]
name: String
operatingSystem: String
price: Float
primaryGenre: String
primaryGenreId: String
privacyPolicyText: String
privacyPolicyUrl: String
rating: Float
released: String
releaseNotes: String
requiredOsVersion: String
reviews: Int
size: String
subtitle: String
supportedDevices: [String]
supportUrl: String
tvScreenshots: [String]
updated: String
url: String
version: String
watchScreenshots: [String]
```

## Response Example

A response for [Netflix's app](https://apps.apple.com/us/app/netflix/id363590051):

```
{
    "id": 363590051,
    "appId": "com.netflix.Netflix",
    "title": "Netflix",
    "url": "https://apps.apple.com/us/app/netflix/id363590051?uo=4",
    "description": "Looking for the most talked about TV shows and movies from around the world? They’re all on Netflix.\n\nWe’ve got award-winning series, movies, documentaries, and stand-up specials. And with the mobile app, you get
Netflix while you travel, commute, or just take a break.\n\nWhat you’ll love about Netflix:\n• We add TV shows and movies all the time. Browse new titles or search for your favorites, and stream videos right on your device.\n• The more
you watch, the better Netflix gets at recommending TV shows and movies you’ll love.\n• Create up to five profiles for an account. Profiles give different members of your household their own personalized Netflix.\n• Enjoy a safe watching
experience just for kids with family-friendly entertainment.\n• Preview quick videos of our series and movies and get notifications for new episodes and releases.\n• Save your data. Download titles to your mobile device and watch offline,
 wherever you are.\n\nNetflix membership is a month-to-month subscription that begins at sign up. You can easily cancel anytime, online, 24 hours a day. There are no long-term contracts or cancellation fees. We just want you to love what
you watch.\n\nPlease note that the App Privacy information applies to information collected through the Netflix iOS, iPadOS and tvOS apps. See the Netflix Privacy Statement (link below) to learn more about information we collect in other
contexts, including account registration.\n\nPrivacy policy: www.netflix.com/privacy\nTerms of use: www.netflix.com/terms",
    "icon": "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/e6/12/ba/e612baa8-dc57-d787-9c18-86013ea1939a/source/512x512bb.jpg",
    "categories": [
        "Entertainment",
        "Lifestyle"
    ],
    "categoryIds": [
        "6016",
        "6012"
    ],
    "primaryGenre": "Entertainment",
    "primaryGenreId": 6016,
    "contentRating": "12+",
    "languages": [
        "AR",
        "HR",
        "CS",
        "DA",
        "NL",
        "EN",
        "FI",
        "FR",
        "DE",
        "EL",
        "HE",
        "HI",
        "HU",
        "ID",
        "IT",
        "JA",
        "KO",
        "MS",
        "NB",
        "PL",
        "PT",
        "RO",
        "RU",
        "ZH",
        "ES",
        "SW",
        "SV",
        "TH",
        "ZH",
        "TR",
        "VI"
    ],
    "size": "77370368",
    "requiredOsVersion": "13.0",
    "released": "2010-04-01T20:41:34Z",
    "updated": "2021-03-16T16:00:26Z",
    "releaseNotes": "We’re working on the app experience. You work on what, when, and how you watch next. That's equally as important.\n\nWe want to help you find your next favorite show. This update’s playback improvements will help make
 it look even better too.",
    "version": "13.19.0",
    "price": 0,
    "currency": "USD",
    "developerId": 363590054,
    "developer": "Netflix, Inc.",
    "developerUrl": "https://apps.apple.com/us/developer/netflix-inc/id363590054?uo=4",
    "developerWebsite": "http://www.netflix.com",
    "score": 3.78831,
    "reviews": 265958,
    "currentVersionScore": 3.78831,
    "currentVersionReviews": 265958,
    "iphone55Screenshots": [],
    "ipadScreenshots": [],
    "tvScreenshots": [],
    "macScreenshots": [],
    "supportedDevices": [
        "iPhone5s-iPhone5s",
        "iPadAir-iPadAir",
        "iPadAirCellular-iPadAirCellular",
        "iPadMiniRetina-iPadMiniRetina",
        "iPadMiniRetinaCellular-iPadMiniRetinaCellular",
        "iPhone6-iPhone6",
        "iPhone6Plus-iPhone6Plus",
        "iPadAir2-iPadAir2",
        "iPadAir2Cellular-iPadAir2Cellular",
        "iPadMini3-iPadMini3",
        "iPadMini3Cellular-iPadMini3Cellular",
        "iPodTouchSixthGen-iPodTouchSixthGen",
        "iPhone6s-iPhone6s",
        "iPhone6sPlus-iPhone6sPlus",
        "iPadMini4-iPadMini4",
        "iPadMini4Cellular-iPadMini4Cellular",
        "iPadPro-iPadPro",
        "iPadProCellular-iPadProCellular",
        "iPadPro97-iPadPro97",
        "iPadPro97Cellular-iPadPro97Cellular",
        "iPhoneSE-iPhoneSE",
        "iPhone7-iPhone7",
        "iPhone7Plus-iPhone7Plus",
        "iPad611-iPad611",
        "iPad612-iPad612",
        "iPad71-iPad71",
        "iPad72-iPad72",
        "iPad73-iPad73",
        "iPad74-iPad74",
        "iPhone8-iPhone8",
        "iPhone8Plus-iPhone8Plus",
        "iPhoneX-iPhoneX",
        "iPad75-iPad75",
        "iPad76-iPad76",
        "iPhoneXS-iPhoneXS",
        "iPhoneXSMax-iPhoneXSMax",
        "iPhoneXR-iPhoneXR",
        "iPad812-iPad812",
        "iPad834-iPad834",
        "iPad856-iPad856",
        "iPad878-iPad878",
        "iPadMini5-iPadMini5",
        "iPadMini5Cellular-iPadMini5Cellular",
        "iPadAir3-iPadAir3",
        "iPadAir3Cellular-iPadAir3Cellular",
        "iPodTouchSeventhGen-iPodTouchSeventhGen",
        "iPhone11-iPhone11",
        "iPhone11Pro-iPhone11Pro",
        "iPadSeventhGen-iPadSeventhGen",
        "iPadSeventhGenCellular-iPadSeventhGenCellular",
        "iPhone11ProMax-iPhone11ProMax",
        "iPhoneSESecondGen-iPhoneSESecondGen",
        "iPadProSecondGen-iPadProSecondGen",
        "iPadProSecondGenCellular-iPadProSecondGenCellular",
        "iPadProFourthGen-iPadProFourthGen",
        "iPadProFourthGenCellular-iPadProFourthGenCellular",
        "iPhone12Mini-iPhone12Mini",
        "iPhone12-iPhone12",
        "iPhone12Pro-iPhone12Pro",
        "iPhone12ProMax-iPhone12ProMax",
        "iPadAir4-iPadAir4",
        "iPadAir4Cellular-iPadAir4Cellular",
        "iPadEighthGen-iPadEighthGen",
        "iPadEighthGenCellular-iPadEighthGenCellular"
    ],
    "featuredImage": "https://is4-ssl.mzstatic.com/image/thumb/Purple124/v4/da/c9/30/dac930ad-d71e-b895-18a7-cff07fbc2dbd/AppIcon-1x_U007emarketing-0-10-0-0-85-220-0.png/1200x630wa.png",
    "operatingSystem": "Requires iOS 13.0 or later. Compatible with iPhone, iPad, and iPod touch.",
    "deviceFamilies": [
        "tvos",
        "iphone",
        "ipad",
        "ipod"
    ],
    "privacyPolicyUrl": "",
    "supportUrl": "",
    "subtitle": "",
    "copyright": "",
    "privacyPolicyText": "",
    "editorialNotes": {},
    "editorialArtwork": {},
    "iphone65Screenshots": [],
    "watchScreenshots": [],
    "iphone55MessagrScreenshots": [],
    "iphone65MessageScreenshots": [],
    "ipadMessageScreenshots": [],
    "iphone65Previews": [],
    "macPreviews": []
}
```

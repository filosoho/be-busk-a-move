const { faker } = require("@faker-js/faker");

const ukCities = [
  "London",
  "Birmingham",
  "Manchester",
  "Glasgow",
  "Liverpool",
  "Newcastle",
  "Sheffield",
  "Leeds",
  "Edinburgh",
  "Leicester",
  "Bristol",
  "Nottingham",
  "Coventry",
  "Hull",
  "Bradford",
  "Cardiff",
  "Stoke-on-Trent",
  "Wolverhampton",
  "Plymouth",
  "Derby",
];

function getRandomCity() {
  const randomIndex = Math.floor(Math.random() * ukCities.length);
  return ukCities[randomIndex];
}

function generateBuskData(numRecords) {
  const busks = [];

  for (let i = 0; i < numRecords; i++) {
    const recentDate = faker.date.recent();

    const buskTime = recentDate.getTime();

    busks.push({
      busk_location: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      busk_location_name: getRandomCity(),
      busk_time: buskTime,
      username: faker.internet.userName(),
      user_image_url: faker.image.avatar(),
      busk_about_me: faker.lorem.paragraph(),
      busk_setup: faker.lorem.sentence(),
    });
  }

  return busks;
}

const numRecords = 14;
const buskData = generateBuskData(numRecords);

console.log(JSON.stringify(buskData, null, 2));

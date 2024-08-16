const { faker } = require("@faker-js/faker");

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
      busk_location_name: faker.location.city(),
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

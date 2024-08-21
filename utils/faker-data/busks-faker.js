const { faker } = require("@faker-js/faker");

exports.generateBuskData = (numRecords) => {
  const busks = [];

  for (let i = 0; i < numRecords; i++) {
    const recentDate = faker.date.recent();
    const buskDate = recentDate.toISOString().split("T")[0];

    busks.push({
      busk_location: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      busk_location_name: faker.location.city(),
      busk_time_date: buskDate,
      username: faker.internet.userName(),
      user_image_url: faker.image.avatar(),
      busk_about_me: faker.lorem.paragraph(),
      busk_setup: faker.lorem.sentence(),
    });
  }

  return busks;
};

// Example usage to generate data (this part is not needed for the tests)
// if (require.main === module) {
//   const numRecords = 14;
//   const buskData = exports.generateBuskData(numRecords);

//   console.log(JSON.stringify(buskData, null, 2));
// }

// const numRecords = 14;
// const buskData = exports.generateBuskData(numRecords);

// console.log(JSON.stringify(buskData, null, 2));

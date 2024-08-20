const { faker } = require("@faker-js/faker");

exports.generateValidPassword = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "-!$%^&*()_+|~=`{}[]:\";'<>?,./";
  const randomChars = "abcdefghijklmnopqrstuvwxyz0123456789";

  const getRandom = (charset) =>
    charset.charAt(Math.floor(Math.random() * charset.length));

  const uppercaseLetter = getRandom(letters);
  const specialChar = getRandom(specialChars);

  let password = uppercaseLetter + specialChar;
  while (password.length < 10) {
    password += getRandom(randomChars);
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

exports.generateUser = () => {
  const instruments = [
    "Guitar",
    "Piano",
    "Violin",
    "Cello",
    "Drums",
    "Vocals",
    "Bass Guitar",
    "Synthesizer",
    "Flute",
    "Recorder",
    "Harp",
    "Keyboard",
    "Saxophone",
    "Clarinet",
  ];

  const firstInstrument = faker.helpers.arrayElement(instruments);
  const remainingInstruments = instruments.filter(
    (instrument) => instrument !== firstInstrument
  );
  const secondInstrument = faker.helpers.arrayElement(remainingInstruments);

  return {
    username: faker.internet.userName(),
    full_name: faker.person.fullName(),
    user_email: faker.internet.email(),
    user_password: exports.generateValidPassword(),
    user_image_url: faker.image.avatar(),
    user_location: `${faker.location.city()}, UK`,
    user_about_me: faker.lorem.sentence(),
    user_set_up: faker.datatype.boolean(),
    instruments: [firstInstrument, secondInstrument],
  };
};

exports.generateUsers = (count = 10) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(exports.generateUser());
  }
  return users;
};

// Example usage to generate data (this part is not needed for the tests)
// const users = exports.generateUsers(14);
// console.log(JSON.stringify(users, null, 4));

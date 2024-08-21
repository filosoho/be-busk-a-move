const {
  generateValidPassword,
  generateUser,
  generateUsers,
} = require("../utils/faker-data/users-faker");
const { generateBuskData } = require("../utils/faker-data/busks-faker");
const {
  generateBuskDataUk,
  getRandomCity,
} = require("../utils/faker-data/busks-faker-uk");

describe("users-faker", () => {
  describe("generateValidPassword", () => {
    it("should generate a password with at least one uppercase letter", () => {
      const password = generateValidPassword();
      const uppercaseRegex = /[A-Z]/;
      expect(uppercaseRegex.test(password)).toBe(true);
    });

    it("should generate a password with at least one special character", () => {
      const password = generateValidPassword();
      const specialCharRegex = /[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/;
      expect(specialCharRegex.test(password)).toBe(true);
    });

    it("should generate a password at least 10 characters long", () => {
      const password = generateValidPassword();
      const length = password.length;
      expect(length).toBeGreaterThanOrEqual(10);
    });
  });

  describe("generateUser", () => {
    it("should generate a user with correct properties", () => {
      const user = generateUser();

      expect(user).toHaveProperty("username");
      expect(user).toHaveProperty("full_name");
      expect(user).toHaveProperty("user_email");
      expect(user).toHaveProperty("user_password");
      expect(user).toHaveProperty("user_image_url");
      expect(user).toHaveProperty("user_location");
      expect(user).toHaveProperty("user_about_me");
      expect(user).toHaveProperty("user_set_up");
      expect(user).toHaveProperty("instruments");
    });

    it("should generate a user with correct properties types", () => {
      const user = generateUser();

      expect(typeof user.username).toBe("string");
      expect(typeof user.full_name).toBe("string");
      expect(typeof user.user_email).toBe("string");
      expect(typeof user.user_password).toBe("string");
      expect(typeof user.user_image_url).toBe("string");
      expect(typeof user.user_location).toBe("string");
      expect(typeof user.user_about_me).toBe("string");
      expect(typeof user.user_set_up).toBe("boolean");
      expect(Array.isArray(user.instruments)).toBe(true);
      expect(user.instruments.length).toBeGreaterThan(0);
    });

    it("should generate a user with instruments that are different", () => {
      const user = generateUser();
      expect(user.instruments[0]).not.toBe(user.instruments[1]);
    });
  });

  describe("generateUsers", () => {
    it("should generate the specified number of users with correct properties", () => {
      const users = generateUsers(5);

      expect(users.length).toBe(5);
      users.forEach((user) => {
        expect(user).toHaveProperty("username");
        expect(user).toHaveProperty("full_name");
        expect(user).toHaveProperty("user_email");
        expect(user).toHaveProperty("user_password");
        expect(user).toHaveProperty("user_image_url");
        expect(user).toHaveProperty("user_location");
        expect(user).toHaveProperty("user_about_me");
        expect(user).toHaveProperty("user_set_up");
        expect(user).toHaveProperty("instruments");
      });
    });

    it("should generate the specified number of users with correct types", () => {
      const users = generateUsers(5);

      expect(users.length).toBe(5);
      users.forEach((user) => {
        expect(typeof user.username).toBe("string");
        expect(typeof user.full_name).toBe("string");
        expect(typeof user.user_email).toBe("string");
        expect(typeof user.user_password).toBe("string");
        expect(typeof user.user_image_url).toBe("string");
        expect(typeof user.user_location).toBe("string");
        expect(typeof user.user_about_me).toBe("string");
        expect(typeof user.user_set_up).toBe("boolean");
        expect(Array.isArray(user.instruments)).toBe(true);
        expect(user.instruments.length).toBeGreaterThan(0);
      });
    });

    it("should generate 10 users by default", () => {
      const users = generateUsers();

      expect(users.length).toBe(10);
    });

    it("should generate unique usernames", () => {
      const users = generateUsers(10);
      const usernames = users.map((user) => user.username);
      const uniqueUsernames = new Set(usernames);

      expect(uniqueUsernames.size).toBe(usernames.length);
    });

    it("should assign each user between 1 and 5 instruments", () => {
      const users = generateUsers(10);

      users.forEach((user) => {
        expect(user.instruments.length).toBeGreaterThanOrEqual(1);
        expect(user.instruments.length).toBeLessThanOrEqual(5);
      });
    });
  });
});

describe("busks-faker", () => {
  describe("generateBuskData", () => {
    it("should not generate any null or empty fields in the busker profile", () => {
      const busks = generateBuskDataUk(10);

      busks.forEach((busk) => {
        expect(busk.username).not.toBeNull();
        expect(busk.username).not.toEqual("");
        expect(busk.user_image_url).not.toBeNull();
        expect(busk.user_image_url).not.toEqual("");
        expect(busk.busk_about_me).not.toBeNull();
        expect(busk.busk_about_me).not.toEqual("");
      });
    });

    it("should generate the specified number of busk records", () => {
      const numRecords = 10;
      const busks = generateBuskData(numRecords);
      expect(busks.length).toBe(numRecords);
    });

    it("should generate busk records with correct properties", () => {
      const busks = generateBuskData(5);

      expect(busks.length).toBeGreaterThan(0);
      busks.forEach((busk) => {
        expect(busk).toHaveProperty("busk_location");
        expect(busk).toHaveProperty("busk_location_name");
        expect(busk).toHaveProperty("busk_time_date");
        expect(busk).toHaveProperty("username");
        expect(busk).toHaveProperty("user_image_url");
        expect(busk).toHaveProperty("busk_about_me");
        expect(busk).toHaveProperty("busk_setup");
      });
    });

    it("should generate busk records with correct types", () => {
      const busks = generateBuskData(5);

      expect(busks.length).toBeGreaterThan(0);
      busks.forEach((busk) => {
        expect(typeof busk.busk_location).toBe("object");
        expect(typeof busk.busk_location_name).toBe("string");
        expect(typeof busk.busk_time_date).toBe("string");
        expect(typeof busk.username).toBe("string");
        expect(typeof busk.user_image_url).toBe("string");
        expect(typeof busk.busk_about_me).toBe("string");
        expect(typeof busk.busk_setup).toBe("string");

        expect(typeof busk.busk_location.latitude).toBe("number");
        expect(typeof busk.busk_location.longitude).toBe("number");
      });
    });

    it("should generate busk times that are recent", () => {
      const busks = generateBuskData(5);
      const now = new Date().getTime();

      expect(busks.length).toBeGreaterThan(0);
      busks.forEach((busk) => {
        const buskDate = new Date(busk.busk_time_date).getTime();
        expect(buskDate).toBeLessThanOrEqual(now);
      });
    });

    it("should generate busk location with valid latitude and longitude", () => {
      const busks = generateBuskData(5);

      expect(busks.length).toBeGreaterThan(0);
      busks.forEach((busk) => {
        const latitude = parseFloat(busk.busk_location.latitude);
        const longitude = parseFloat(busk.busk_location.longitude);

        expect(latitude).toBeGreaterThanOrEqual(-90);
        expect(latitude).toBeLessThanOrEqual(90);
        expect(longitude).toBeGreaterThanOrEqual(-180);
        expect(longitude).toBeLessThanOrEqual(180);
      });
    });
  });
});

describe("busks-faker-uk", () => {
  describe("generateBuskDataUk", () => {
    it("should not generate any null or empty fields in the busker profile", () => {
      const busks = generateBuskDataUk(10);

      busks.forEach((busk) => {
        expect(busk.username).not.toBeNull();
        expect(busk.username).not.toEqual("");
        expect(busk.user_image_url).not.toBeNull();
        expect(busk.user_image_url).not.toEqual("");
        expect(busk.busk_about_me).not.toBeNull();
        expect(busk.busk_about_me).not.toEqual("");
      });
    });

    it("should generate the correct number of records", () => {
      const numRecords = 10;
      const busks = generateBuskDataUk(numRecords);
      expect(busks).toHaveLength(numRecords);
    });

    it("should generate busk location names that are valid UK cities", () => {
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

      const numRecords = 10;
      const busks = generateBuskDataUk(numRecords);

      expect(busks.length).toBeGreaterThan(0);
      busks.forEach((busk) => {
        expect(ukCities).toContain(busk.busk_location_name);
      });
    });

    it("should generate busk times that are recent", () => {
      const numRecords = 10;
      const busks = generateBuskDataUk(numRecords);

      const now = Date.now();

      expect(busks.length).toBeGreaterThan(0);
      busks.forEach((busk) => {
        const buskDateTimestamp = new Date(busk.busk_time_date).getTime();
        expect(buskDateTimestamp).toBeLessThanOrEqual(now);
      });
    });

    it("should generate data with the correct properties", () => {
      const numRecords = 1;
      const busks = generateBuskDataUk(numRecords);
      const busk = busks[0];

      expect(busk).toHaveProperty("busk_location");
      expect(busk).toHaveProperty("busk_location_name");
      expect(busk).toHaveProperty("busk_time_date");
      expect(busk).toHaveProperty("username");
      expect(busk).toHaveProperty("user_image_url");
      expect(busk).toHaveProperty("busk_about_me");
      expect(busk).toHaveProperty("busk_setup");
    });

    it("should generate data with correct types", () => {
      const numRecords = 1;
      const busks = generateBuskDataUk(numRecords);
      const busk = busks[0];

      expect(typeof busk.busk_location.latitude).toBe("number");
      expect(typeof busk.busk_location.longitude).toBe("number");
      expect(typeof busk.busk_location_name).toBe("string");
      expect(typeof busk.busk_time_date).toBe("string");
      expect(typeof busk.username).toBe("string");
      expect(typeof busk.user_image_url).toBe("string");
      expect(typeof busk.busk_about_me).toBe("string");
      expect(typeof busk.busk_setup).toBe("string");
    });
  });
});

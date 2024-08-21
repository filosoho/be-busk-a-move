# Be-Busk-A-Move API

Be-Busk-A-Move is a RESTful API built using Node.js, Express, and PostgreSQL. It is designed to manage users and busking events. Users can create, read, update, and delete (CRUD) both user profiles and busking events. The API supports filtering and sorting options and uses JSON for data exchange. It is ideal for applications that manage busking events or communities.

## Hosted Version

Access the hosted version of the Be-Busk-A-Move API at: [Be-Busk-A-Move](https://be-busk-a-move.onrender.com/api)

## Prerequisites

Before you start, ensure you have the following installed on your machine:

```bash
Node.js (version 14 or higher)
PostgreSQL (version 12 or higher)
```

## Setup

### Clone the Repository

```bash
git clone https://github.com/filosoho/be-busk-a-move.git
```

```bash
cd be-busk-a-move
```

### Install Dependencies

```bash
npm install
```

### Set up environment variables:

As .env.\* files are ignored by Git, you will need to create these files manually to set up the necessary environment variables for connecting to the databases.

### Create the following files in the root of the project

Ensure these `.env` files are listed in your `.gitignore` to prevent them from being pushed to GitHub.

```bash
.env.development
PGDATABASE=database_name
```

```bash
.env.test
PGDATABASE=database_name_test
```

### Run database setup and seed scripts:

```bash
npm run setup-dbs
```

```bash
npm run seed
```

## Running Tests

Run the automated tests with:

```
npm test
```

## API Endpoints

| Endpoint                   | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| GET /api                   | Responds with a list of available endpoints                    |
| GET /api/users             | Responds with a list of users                                  |
| GET /api/users/:user_id    | Responds with a single object of a user retirved by a username |
| PATCH /api/users/:user_id  | Updates a user object by user_id                               |
| DELETE /api/users/:user_id | Deletes a user object by user_id                               |
| GET /api/busks             | Responds with a list of busks                                  |
| GET /api/busks/:busk_id    | Responds with a single busk retrived by busk_id                |
| POST /api/busks            | Adds a new busk                                                |
| DELETE /api/busks/:busk_id | Deletes a busk by busk_id                                      |

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/AmazingFeature).
3. Commit your changes (git commit -m 'Add some AmazingFeature').
4. Push to the branch (git push origin feature/AmazingFeature).
5. Open a pull request.

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

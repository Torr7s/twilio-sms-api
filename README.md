# Twilio SMS Api

This project was made to put into practice some security methods in a rest api, such as phone number confirmation by SMS and authentication via JSONWebToken.

## Stacks 

- Node.js
- Typescript
- NestJs
- TypeORM
- Docker, docker-compose

## Running Project
To execute the project follow the steps:

1. Clone this repository:
```
git clone https://github.com/Torr7s/twilio-sms-api
cd twilio-sms-api
```

2. Install the dependencies:
```
yarn
```

3. Setup Docker and docker-compose
```
docker build -t twilio .
docker-compose up
```

## Documentation

- **User creation**

After you have registered with your cell phone number, check your messages and look for the code that was sent.

```http
POST /api/users/register
```

| Parâmetro   | Tipo       | Descrição                     |
| :---------- | :--------- | :-----------------------------|
| `name`      | `string`   | **Required** User name     |
| `email`     | `string`   | **Required** User email    |
| `password`  | `string`   | **Required** User password |
| `phone_number` | `string`  | **Required** User phone number |

- **User authentication**

Authenticate yourself to be able to access the confirmation route of your phone number.

```http
POST /api/login
```

| Parâmetro   | Tipo       | Descrição                     |
| :---------- | :--------- | :-----------------------------|
| `email`     | `string`   | **Required** User email       |
| `password`  | `string`   | **Required** User password    |

- **Phone number confirmation**

After you have logged in, use the token to gain access to this route.

```http
POST /api/users/confirm
```

| Parâmetro   | Tipo       | Descrição                     |
| :---------- | :--------- | :-----------------------------|
| `user_id`     | `string`   | **Required** User id        |
| `phone_number`| `string`   | **Required** User phone_number    |
| `code`        | `string`   | **Required** Received code   |

**Note**: The user_id parameter will be received automatically as soon as you log in.

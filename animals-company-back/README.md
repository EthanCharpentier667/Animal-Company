<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Test Responses

- #### Quel animal est le plus vieux ?

```
id: 1934
name: Rocky
dateOfBirth: 2009-09-21
breed: Flemish Giant
species: Rabbit
person_id: 372
weight: 31879
```


- #### Quelle espèce est la mieux représentée ? (Le plus d’entités de cette espèce)

```
species: Bird
count: 179
```

- #### Qui possède le plus d’animaux ?

```
id: 268
firstName: Sarah
lastName: White
count: 6
```

- #### Qui possède le plus de chats ?

```
id: 268
firstName: Sarah
lastName: White
count: 4
```

- #### Qui possède l’animal le plus lourd ? Comment s’appelle cet animal et quel est son poids ?

```
id: 209
firstName: Emma
lastName: Smith
animalName: Chloe
weight: 49937
```

- #### Qui possède le groupe d’animaux le plus lourd ? Quel est le poids total de ce groupe d’animaux ?

```
id: 873
firstName: Sarah
lastName: Wilson
animalNames:
  Bella,
  Chloes
weight: 3063782
```
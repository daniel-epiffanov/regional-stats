Here is initial 1.0.0 version of Regional Statistics app. It is being developed in a monorepo based on Lerna.

Root URL of the project: https://regional-stats.herokuapp.com/

## packages

[Backend package](https://github.com/daniel-epiffanov/regional-stats/tree/master/packages/backend) The graphql access point is ```/api```

### Frontend

[Frontend package](https://github.com/daniel-epiffanov/regional-stats/tree/master/packages/react)

## deployment
Learna monorepo has an issue when running ```lerna bootstrap``` on heroku environment. Specifically it doesn't npm install dev dependencies of sub projects. The workaround I've found is moving all dev dependencies into dependencies block.

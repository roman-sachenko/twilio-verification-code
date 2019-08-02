
const path = require('path');
global.basePath = path.normalize(`${__dirname}/..`);

const dotenv = require('dotenv');

const configResult = dotenv.config({ path: `${basePath}/.env` });

const startInstances = (inputCluster, instanceLim) => {
  for (let i = 0; i < instanceLim; i++) {
    inputCluster.fork();
  }
};

const onExit = (worker) => {
  console.log(`worker ${worker.process.pid} died`);
};

const onUncaughtException = (err) => {
  console.error(err);
  process.exit(1);
};

if (configResult.error) {
  console.log(`CONFIG ERROR: ${JSON.stringify(configResult.error)}`);
}

const ConfigService = require('../app/shared/config.service');
const cluster = require('cluster');
const cpusLength = require('os').cpus().length;
const numberOfInstances = ConfigService.getValue('appNumberOfInstances');
const coresToUser = numberOfInstances || cpusLength;


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  startInstances(cluster, coresToUser);
  cluster.on('exit', onExit);

} else {
  console.log(`Worker ${process.pid} started`);
  process
    .on('uncaughtException', onUncaughtException);

  require('./app');
}

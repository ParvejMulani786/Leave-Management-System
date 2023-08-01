import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'lms',
  connector: 'mongodb',
  url: '',
  host: '127.0.0.1',
  port: 27017,
  user: '',
  password: '',
  database: 'lms',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class LmsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'lms';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.lms', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

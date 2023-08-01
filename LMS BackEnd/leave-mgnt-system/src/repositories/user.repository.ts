import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LmsDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userId,
  UserRelations
> {
  constructor(
    @inject('datasources.lms') dataSource: LmsDataSource,
  ) {
    super(User, dataSource);
  }
}

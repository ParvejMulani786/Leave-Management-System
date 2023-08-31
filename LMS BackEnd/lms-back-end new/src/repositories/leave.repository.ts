import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Leave, LeaveRelations} from '../models';


export type userIdentity = {
  id: string;
};
export class LeaveRepository extends DefaultCrudRepository<
  Leave,
  typeof Leave.prototype.leaveId,
  LeaveRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Leave, dataSource);
  }
}

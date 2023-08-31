import {Entity, model, property} from '@loopback/repository';

@model()
export class Leave extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  leaveId?: string;

  @property({
    type: 'string',
    required: true,
  })
  empId?: string;

  @property({
    type: 'string',
    required: true,
  })
  leaveType: string;

  @property({
    type: 'string',
    required: true,
  })
  leaveDetails: string;

  @property({
    type: 'string',
    required: true,
  })
  startLeaveDate: string;

  @property({
    type: 'string',
    required: true,
  })
  endLeaveDate: string;

  @property({
    type: 'string',
    required: true,
  })
  numOfDay?: string;

  @property({
    type: 'string',
    required: true,
  })
  leaveStatus: string;

  @property({
    type: 'string',
    // required: true,
  })
  session?: string;


  constructor(data?: Partial<Leave>) {
    super(data);
  }
}

export interface LeaveRelations {
  // describe navigational properties here
}

export type LeaveWithRelations = Leave & LeaveRelations;

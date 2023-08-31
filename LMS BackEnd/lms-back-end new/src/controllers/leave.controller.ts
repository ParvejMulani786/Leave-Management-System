import {authenticate} from '@loopback/authentication';
import {MyUserService, UserRepository, UserServiceBindings} from "@loopback/authentication-jwt";
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  Where,
  repository
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Leave} from '../models';
import {LeaveRepository} from '../repositories';



export class LeaveController {
  constructor(
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @repository(LeaveRepository)
    public leaveRepository: LeaveRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }


  //post leave
  @authenticate('jwt')
  @post('/leave')
  @response(200, {
    description: 'Leave model instance',
    content: {'application/json': {schema: getModelSchemaRef(Leave)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leave, {
            title: 'NewLeave',
            exclude: ['leaveId'],
          }),
        },
      },
    })
    leave: Omit<Leave, 'leaveId'>,
  ): Promise<Leave> {

    return this.leaveRepository.create(leave);
  }


  // //fetch all leaves by admin only
  @authenticate('jwt')
  @post('/allLeaves', {
    responses: {
      '200': {
        description: 'Leave model instance',
        content: {'application/json': {schema: getModelSchemaRef(Leave)}},

      },
    },
  })
  async allLeaves(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'string',
            properties: {
              // email: {type: "string"},
              // password: {type: "string"}
              id: {type: "string"}
            },
          },
        },
      },
    })

    id: string,
    @param.filter(Leave) filter?: Filter<Leave>,

  ): Promise<Leave[]> {
    const user = await this.userService.findUserById(id);
    const userRole = user.role;

    if (userRole == "Admin") {

      return this.leaveRepository.find(filter);
    }
    else {
      return [];
    }
  }


  //get leave count
  @authenticate('jwt')
  @get('/leaves/count')
  @response(200, {
    description: 'Leave model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Leave) where?: Where<Leave>,
  ): Promise<Count> {
    return this.leaveRepository.count(where);
  }



  @authenticate('jwt')
  @patch('/leaves')
  @response(200, {
    description: 'Leave PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leave, {partial: true}),
        },
      },
    })
    leave: Leave,

    @param.where(Leave) where?: Where<Leave>,
  ): Promise<Count> {
    return this.leaveRepository.updateAll(leave, where);
  }




  //access All leavesby empID
  @authenticate('jwt')
  @get('/leaves/{empId}')
  @response(200, {
    description: 'Array of Leave model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Leave, {includeRelations: true}),
        },
      },
    },
  })
  async findByEmpId(
    @param.path.string('empId') empId: string,

  ): Promise<Leave[]> {
    return this.leaveRepository.find({where: {empId}});
  }

  @authenticate('jwt')
  @patch('/leaves/{id}')
  @response(204, {
    description: 'Leave PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Leave, {partial: true}),
        },
      },
    })
    leave: Leave,
  ): Promise<void> {
    await this.leaveRepository.updateById(id, leave);
  }


  // @authenticate('jwt')
  @put('/leaves/{id}')
  @response(204, {
    description: 'Leave PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() leave: Leave,
  ): Promise<void> {
    await this.leaveRepository.replaceById(id, leave);
  }

  @authenticate('jwt')
  @del('/leaves/{id}')
  @response(204, {
    description: 'Leave DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.leaveRepository.deleteById(id);
  }

  @authenticate('jwt')
  @get('/leave/{leaveId}')
  async findById(@param.path.string('leaveId') leaveId: string): Promise<Leave> {
    const leave = await this.leaveRepository.findById(leaveId);
    if (!leave) {
      throw new Error('Leave not found');
    }
    return leave;
  }
  // get perticular leave
  // @authenticate('jwt')
  // @get('/leaves/{id}')
  // @response(200, {
  //   description: 'Leave model instance',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Leave, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findById(
  //   @param.path.string('id') id: string,
  //   @param.filter(Leave, {exclude: 'where'}) filter?: FilterExcludingWhere<Leave>
  // ): Promise<Leave> {
  //   return this.leaveRepository.findById(id, filter);
  // }


  // get perticular leave by empId
  // @authenticate('jwt')
  // @get('/leaves/{empId}')
  // @response(200, {
  //   description: 'Leave model instances',
  //   content: {
  //     'application/json': {
  //       schema: getModelSchemaRef(Leave, {includeRelations: true}),
  //     },
  //   },
  // })
  // async findOne(
  //   @param.path.string('empId') empId: string,

  // ): Promise<Leave | null> {
  //   return this.leaveRepository.findOne({where: {empId}});
  // }

  //get all leaves
  // @authenticate('jwt')
  // @get('/leaves')
  // @response(200, {
  //   description: 'Array of Leave model instances',
  //   content: {
  //     'application/json': {
  //       schema: {
  //         type: 'array',
  //         items: getModelSchemaRef(Leave, {includeRelations: true}),
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.filter(Leave) filter?: Filter<Leave>,
  // ): Promise<Leave[]> {
  //   return this.leaveRepository.find(filter);
  // }

}

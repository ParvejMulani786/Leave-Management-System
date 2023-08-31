// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';

import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';


@model()
export class CreateUser extends User {

  @property({
    type: 'string',
    required: true,
  })
  empname: string;


  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  gender?: string;

  @property({
    type: 'string',
    required: true,
  })
  dob?: string;

}

const UserSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
    },
  },
};

export const RequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: UserSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }


  //signup endpoint, which will listen to POST requests.
  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': CreateUser,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateUser, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: CreateUser,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit(newUserRequest, 'password'),
    );

    await this.userRepository.userCredentials(savedUser.id).create({password});

    return savedUser;
  }


  //Create Your Login Controller
  @post('/signin', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async signIn(
    @requestBody(RequestBody) credentials: Credentials,
  ): Promise<{token: string, user: User}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userProfile = this.userService.convertToUserProfile(user);
    const token = await this.jwtService.generateToken(userProfile);
    return {token, user};
  }

  @get('/users/{userId}')
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  @get('/users/by-email/{email}')
  async getByEmail(@param.path.string('email') email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {email},
    });
    return user;
  }

  @get('/users/by-empId/{empname}')
  async findByEmpName(@param.path.string('empname') empname: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        empname: empname,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  //show the currently logged-in user by adding a /whoami endpoint
  @authenticate('jwt')
  @get('/whoami', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    loggedInUserProfile: UserProfile,
  ): Promise<string> {
    return loggedInUserProfile[securityId];
  }

}

/** Types generated for queries found in "src/queries/get_users.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** Query 'GetUsers' is invalid, so its result is assigned type 'never'.
 *  */
export type IGetUsersResult = never;

/** Query 'GetUsers' is invalid, so its parameters are assigned type 'never'.
 *  */
export type IGetUsersParams = never;

const getUsersIR: any = {"usedParamSet":{"userId":true},"params":[{"name":"userId","required":false,"transform":{"type":"scalar"},"locs":[{"a":31,"b":37}]}],"statement":"SELECT * FROM users WHERE id = :userId"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM users WHERE id = :userId
 * ```
 */
export const getUsers = new PreparedQuery<IGetUsersParams,IGetUsersResult>(getUsersIR);



/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * Sample Auth-Server
 * OpenAPI spec version: v1
 */
import type { ModifyingUserResourceRolesItem } from './modifyingUserResourceRolesItem';
import type { Link } from './link';

export interface ModifyingUserResource {
  identifier?: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  roles?: ModifyingUserResourceRolesItem[];
  links?: Link[];
}

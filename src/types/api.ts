/**
 * A representation of any object returned from the API.
 *
 * All other API objects can extend from this.
 */
export interface ApiObject {
  id: number;
}

/**
 * A representation of a paginator instance returned from the API.
 */
export interface Paginator<T extends ApiObject = ApiObject> {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

/**
 * A representation of a response from the API.
 *
 * If using Laravel's API Resources (https://laravel.com/docs/10.x/eloquent-resources), then the returned
 * objects will be in the "data" attribute.
 */
export interface ApiResponse<T extends ApiObject = ApiObject> {
  data: T;
}

/**
 * A representation of a "No Content" response from the API.
 */
export interface ApiResponseNoContent {}

/**
 * A representation of a User instance from the API.
 */
export interface User extends ApiObject {
  name: string;
  email: string;
  email_verified_at?: number;
  is_verified?: boolean;
}

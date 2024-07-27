/**
 * Dictionary with app routes' urls. Must be sync with routing folder.
 * Paths with "Root" postfix must be used with adding dynamic url part.
 * @example
 * `${RoutePath.ProfileRoot}/${profileId}`
 */
export const enum RoutePath {
  Profile = '/profile',
  UsersRoot = '/users',
  Registration = '/registration',
  Login = '/login',
}

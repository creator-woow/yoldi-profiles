/**
 * Dictionary with app routes' urls. Must be sync with routing folder.
 * Paths with "Root" postfix must be used with adding dynamic url part.
 * @example
 * `${RoutePath.ProfileRoot}/${profileId}`
 */
export const enum RoutePath {
  ProfilesRoot = '/profiles',
  Registration = '/registration',
  Login = '/login',
}

export const enum RouteHandlerPath {
  Login = `${RoutePath.Login}/api`,
  Registration = `${RoutePath.Registration}/api`,
}

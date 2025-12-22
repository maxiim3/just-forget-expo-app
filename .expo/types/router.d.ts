/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/capture` | `/capture`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/grid` | `/grid`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/retrieve` | `/retrieve`; params?: Router.UnknownInputParams; };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/capture` | `/capture`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/grid` | `/grid`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/retrieve` | `/retrieve`; params?: Router.UnknownOutputParams; };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/capture${`?${string}` | `#${string}` | ''}` | `/capture${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/grid${`?${string}` | `#${string}` | ''}` | `/grid${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/retrieve${`?${string}` | `#${string}` | ''}` | `/retrieve${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/capture` | `/capture`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/grid` | `/grid`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/retrieve` | `/retrieve`; params?: Router.UnknownInputParams; };
    }
  }
}

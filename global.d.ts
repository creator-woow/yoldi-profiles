import en from './public/messages/en.json';

type Messages = typeof en;

declare global {
  interface IntlMessages extends Messages {}
}

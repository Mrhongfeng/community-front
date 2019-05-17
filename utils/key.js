import Config from './config.js';

const version = Config.version
const storageKeyPrefix = 'storage'

const Key = {
  storageKey: {
    openid: 'openid',
    //token: 'token',
    userinfo: storageKeyPrefix + '_' + 'userinfo' + version,
    userpreference: storageKeyPrefix + '_' + 'userpreference' + version,
    userSelectedSearchRule: storageKeyPrefix + '_' + 'userSelectedSearchRule' + version
  }
}

export default Key;
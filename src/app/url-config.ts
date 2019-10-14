
import { environment } from '../environments/environment';

export class UrlConfig {
  // public static GET_USER_INFO = 'http://www.mocky.io/v2/5da2f19b2f0000cc6df419f2';
  public static GET_USER_INFO = environment.serverUrl + '/api/user/info/v1';

  // public static PROXY_DOWNLOAD_URL = 'http://www.mocky.io/v2/5da18fdc3000007000f8a2a7';
  public static PROXY_DOWNLOAD_URL = environment.serverUrl + '/api/file/proxyDown/v1';

  // public static LOGIN_URL = 'http://www.mocky.io/v2/5da32a492f00002a008a0711'; // login failed
  // public static LOGIN_URL = 'http://www.mocky.io/v2/5da2f39b2f00006700f419f4'; // login success
  public static LOGIN_URL = environment.serverUrl + '/api/auth/login/v1';

  // public static REGISTER_URL = 'http://www.mocky.io/v2/5da18fdc3000007000f8a2a7';
  public static REGISTER_URL = environment.serverUrl + '/api/auth/register/v1';

}

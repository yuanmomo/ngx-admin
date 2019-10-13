
import { environment } from '../environments/environment';

export class UrlConfig {
  public static GET_USER_INFO = 'http://www.mocky.io/v2/5da2f19b2f0000cc6df419f2';
  // public static GET_USER_INFO = environment.serverUrl + '/api/v1/user/info';

  public static PROXY_DOWNLOAD_URL = 'http://www.mocky.io/v2/5da18fdc3000007000f8a2a7';
  // public static PROXY_DOWNLOAD_URL = environment.serverUrl + '/api/v1/api/file/proxyDown';

  public static LOGIN_URL = 'http://www.mocky.io/v2/5da2f4452f0000cc6df419f8'; // login failed
  // public static LOGIN_URL = 'http://www.mocky.io/v2/5da2f39b2f00006700f419f4'; // login success
  // public static LOGIN_URL = environment.serverUrl + '/api/v1/auth/login';

  public static REGISTER_URL = 'http://www.mocky.io/v2/5da18fdc3000007000f8a2a7';
  // public static REGISTER_URL = environment.serverUrl + '/api/v1/auth/register';

}

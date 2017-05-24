CRISTAL MOBILE APP

para compilar

/*Pré instalações*/
npm install -g cordova
npm install -g webpack


/*instalando componentes do npm*/
npm install

/*compilando*/
npm run compile:prod
npm run compile


/*executando*/

npm run browser
npm run android
npm run ios
npm run windows


/*Para abilitar o Linter no atom*/
de acordo com https://gist.github.com/darokel/90fe5c8ad8df5efcab6b
Só dar o install no projeto  
Download Atom and get these two packages: Linter and [Linter-ESLint)(https://atom.io/packages/linter-eslint)


/*pacotes no cordova */



/* alterações ios */ 

EM resources/info.plist adicionar
<key>NSAppTransportSecurity</key>
    <dict>
        <key>NSExceptionDomains</key>
        <dict>
            <key>wlapst.tiona.com.br</key>
            <dict>
                <key>NSIncludesSubdomains</key>
                <true/>
                <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
                <true/>
                <key>NSTemporaryExceptionMinimumTLSVersion</key>
                <string>TLSv1.0</string>
                <key>NSTemporaryExceptionRequiresForwardSecrecy</key>
                <false/>
            </dict>
            </dict>
        </dict>

em appDelegate.m adcionar no final 

@implementation NSURLRequest(DataController) 
+ (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host 
{ 
return YES; 
} 
@end



/* alterações android */


public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
  final String packageName = this.cordova.getActivity().getPackageName();
  final PackageManager pm = this.cordova.getActivity().getPackageManager();

  ApplicationInfo appInfo;
  try {
    appInfo = pm.getApplicationInfo(packageName, PackageManager.GET_META_DATA);
    if ((appInfo.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0) {
      // debug = true
      handler.proceed();
      return;
    } else {
      // debug = false
      // THIS IS WHAT YOU NEED TO CHANGE:
      // 1. COMMENT THIS LINE
      // super.onReceivedSslError(view, handler, error);
      // 2. ADD THESE TWO LINES
      // ---->
      handler.proceed();
      return;
      // <----
    }
  } catch (NameNotFoundException e) {
    // When it doubt, lock it out!
    super.onReceivedSslError(view, handler, error);
  }
}

project/platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java
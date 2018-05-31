# Adobe IMS Oauth Playground

Try this simple app to locally run and interact with Adobe IMS!

1.  [Setup](#Setup)
1.  [Run It!](#Run)

## <a name="Setup">Setup</a>

To set up the playground:

### Step 1: Create an integration on [Adobe Console](https://console.adobe.io/)

You need to set up OAuth web credentials to use the sample.

* Select "Web" for the platform
* For the default redirect URI:
  _ `https://` + some domain name + `:3000` + `/callback`
  _ For example: `https://localhost:3000/callback`
* Input a corresponding redirect URI pattern. \* For example: `https://www\.example\.net/callback`

### Step 2: Create a self-signed SSL certificate to run a local https server

Because we are only running this locally and in non-production mode, we can secure the server connection with a self-signed SSL cert. This can be done via openssl.

Make sure the openssl library is installed by checking the path

    $ which openssl

Install if necessary: [MacOSX Homebrew](http://brewformulas.org/Openssl), [Windows](http://gnuwin32.sourceforge.net/packages/openssl.htm)

In the project directory, generate your cert and private key files: `server.key` and `server.crt`. The challenge password is used for certificate revocation-- you can leave this empty for the example

    $ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
    $ openssl rsa -passin pass:x -in server.pass.key -out server.key
    writing RSA key
    $ rm server.pass.key
    $ openssl req -new -key server.key -out server.csr
    You are about to be asked to enter information that will be incorporated
    into your certificate request.
    ...
    A challenge password []:
    ...
    $ openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

## <a name="Run">Run It!</a>

To run the app, execute the following commands:

```sh
$ npm install
$ npm start
```

Browse to https://localhost:3000 and follow the shown instruction. Paste your credentials (which can be found in your I/O integration), and you are ready to start!

# Credits

* [@passport-adobe-oauth2](https://github.com/adobe/passport-adobe-oauth2)
* Hiren Shah [@hirenshah111](https://github.com/hirenshah111)

# License

[MIT](LICENSE)

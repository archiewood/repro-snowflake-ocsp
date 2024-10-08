# Repro for Snowflake OCSP Warning

Run `npm install` to install the dependencies.

Then run `node index.js` to connect to Snowflake.

You should see the following warning:

```
[6:47:26.354 PM]: WARNING!!! using fail-open to connect. Driver is connecting to an HTTPS endpoint without OCSP based Certificated Revocation checking as it could not obtain a valid OCSP Response to use from the CA OCSP responder. Details: Error: 1.3.6.1.5.5.7.48.1 not found in AuthorityInfoAccess
```
# offlineCleanup
A simple JavaScript utility for cleaning up all DOM storage data. No dependencies.

## Installation
You have three, easy choices for installing offlineCleanup:
* [Directly get the file](offline-cleanup.js)
* Install via Bower: `bower install offline-cleanup`
* Install via NPM: `npm install offline-cleanup`

## Usage
Easy as that:

```javascript
offlineCleanup(function ( err ) {
    if ( err ) {
        console.log( "oh boy, something went wrong" );
    } else {
        console.log( "OH LOOK my DOM Storage is now gone!!1!" );
    }
});
```

## Support
Storage types:

* indexedDB
* localStorage
* ~~WebSQL~~ (wished feature)
* ~~Cookies~~ (does anyone still use it as a storage?)

## License
MIT
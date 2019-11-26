(function () {
    function generateGaCookie(host) {

        return [
          'GA1',
           host.replace('www.', '').split('.').length,
           generateGaClientId()
        ].join('.');
      
    }
    
    function generateGaClientId() {    
        const rand = Math.round(Math.random() * 2147483647);
        const ts = Math.round(+new Date() / 1000.0);
        
        return [rand, ts].join('.');
    }
    
    function isDefined_(thing) {
        return typeof thing !== 'undefined';
    }

    function generateCookieString(config) {
        let base = [[config.name, config.value]];
        ['domain', 'path', 'expires'].forEach(opt => {
            if (isDefined_(config[opt])) base.push([opt, config[opt]]);
        });
        
        return base.map(pair => pair.join('=') + ';').join('') + 'secure;';
    } 

    function handleGaCookie() {
        const cookie = document.cookie || "";
        const cookiePairs = cookie.split(";");
        const docCookies = {};
        for (let index = 0; index < cookiePairs.length; index++) {
            const element = cookiePairs[index];
            const elmtSplit = element.split("=");
            if (elmtSplit.length === 2) {
                docCookies[elmtSplit[0]] = elmtSplit[1];
            }
        }
        const domain = document.domain || document.URL;
        const gaCookie = docCookies._ga || generateGaCookie(domain);
        console.log('GA Cookie: ' + gaCookie);
        // const clientId = parseClientIdFromGaCookie(gaCookie);
        if(!docCookies._ga) {
            const cookieString = generateCookieString({
                name: '_ga',
                value: gaCookie,
                domain: domain.replace('www.', ''),
                path: '/',
                expires: new Date(1000 * 60 * 60 * 24 * 365 * 2 + (+new Date)).toGMTString()
            });

            document.cookie = cookieString;
        }

        if(window.Hull) {
            window.Hull.alias(gaCookie);
        }

        window.__track_id = gaCookie;

        return gaCookie;
    }

    
    const gaId = handleGaCookie();
    // Hull.alias("ga:" + gaId);

    window.hullAsyncInit = function(hull) {
        console.log('Hull Async Init', gaId);
        hull.alias(gaId);
    };
})();
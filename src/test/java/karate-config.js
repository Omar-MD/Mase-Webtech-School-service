function fn() {
    const env = karate.env; // get system property 'karate.env'
    karate.log('karate.env system property was:', env);

    const config = {
        baseUrl: 'http://localhost:' + karate.properties['local.server.port'],
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Function to get the authentication token for a given user role
    config.getAuthToken = function(username, password, role) {
        let response = karate.callSingle('classpath:com/tus/schoolservice/karate/auth.feature?' + role, {
            'baseUrl': config.baseUrl,
            'username': username,
            'password': password
        });
        return response.authToken;
    };

    return config;
}
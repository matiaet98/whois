const Promise = require('bluebird');
const whois = Promise.promisifyAll(require('node-whois'));
const Hapi = require('hapi');
const Boom = require('boom');


module.exports = () => {
    const server = new Hapi.Server();
server.connection({ host: 'localhost', port: 3000, routes : {cors : true} });

server.route({
    method: 'GET',
    path:'/api/whois', 
    handler: (request, reply) => {
        whois.lookupAsync(request.query.site)
            .then((data, error) => {
                if (error) {
                    return reply(Boom.notFound('Algo salio mal'));
                }
                else {
                    return reply({'data': data });
                }
            }
        );
    }
});



server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('api service iniciado: ', server.info.uri);
}); 
}


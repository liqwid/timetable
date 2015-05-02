var webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require('./config.webpack');

new WebpackDevServer(webpack(config), {
    hot: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}).listen(parseInt(process.env.PORT || '1234', 10), '0.0.0.0', function(err) {
        if (err) {
            console.log(err);
        }
    });

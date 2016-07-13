/**
 * Created by jonlazarini on 12/07/16.
 */

var context = require.context('./app', true, /.test\.js$/);
context.keys().forEach(context);
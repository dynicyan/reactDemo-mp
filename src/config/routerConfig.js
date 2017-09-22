//import indexComponent from '../containers/index/index.component';

const routeConfig = [{
    path: '/',
    //component: indexComponent,
    onEnter: function(nextState, replaceState) {
        //console.log('onEnter', nextState)
        let pathName = nextState.location.pathname.replace(/^\//, '')
        if (pathName == '') {
            replaceState(`index`)
        }
    },
    childRoutes: [{
        path: 'index',
        getComponents(location, callback) {
            require.ensure([], function(require) {
                callback(null, require('../index/index.component').default)
            })
        }
    }]
}];

export default routeConfig;
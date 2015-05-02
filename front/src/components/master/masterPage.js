import React from 'react';
import Reflux from 'reflux';
import authorStore from 'stores/authorStore';
import lectureStore from 'stores/lectureStore';
import themeStore from 'stores/themeStore';
import localStorageGet from 'utils/localStorageGet';
import localStorageInit from 'utils/localStorageInit';
import dataActions from 'actions/dataActions';
import Loader from 'components/master/loader';
import {AppCanvas} from 'material-ui';
import NavBar from 'components/master/navBar';
import Page from 'components/master/page';


const MasterPage = React.createClass({
    mixins: [Reflux.ListenerMixin],

    getInitialState() {
        return {
            dataLoaded: false
        };
    },

    componentWillMount() {
        if (
            !localStorage.authors ||
            !localStorage.lectures ||
            !localStorage.themes ||
            localStorage.authors === '[]' ||
            localStorage.lectures === '[]' ||
            localStorage.themes === '[]'
        ) {
            localStorageInit();
        }
        dataActions.load(localStorageGet());
    },

    componentDidMount() {
        this.joinTrailing(authorStore, lectureStore, themeStore, this.onLoad);
    },

    onLoad() {
        this.setState({
            dataLoaded: true
        });
    },

    render() {
        let result;
        if (!this.state.dataLoaded) {
            result = (<Loader/>);
        } else {
            result = (
                <AppCanvas predefinedLayout = {1}>
                    <NavBar/>
                    <Page>
                        {this.props.children}
                    </Page>
                </AppCanvas>
            );
        }
        return (<span>
                {result}
                </span>
            );
    }
});

export {MasterPage as default};

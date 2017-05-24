import React from 'react';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';

import { theme, cristalSecondaryColor } from './Theme';
import { loadingDivStyle, appNameStyle } from '../styles/styles';

import { fetchLogout } from '../actions/fetchActions';
import { redirectLogin, redirectConfig } from '../actions/redirectActions';


class Template extends React.Component {

    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };


    static propTypes = {


        children: PropTypes.arrayOf(PropTypes.element).isRequired,
        isLoading: PropTypes.bool.isRequired,
        loggedUser: PropTypes.string.isRequired,
        loggedUserName: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired,
        loggedUserPass: PropTypes.string.isRequired
    };

    static defaultProps = {
        children: [(<div />)]
    };


    componentDidMount() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        if (!loggedUser || !loggedUserPass) {
            redirectLogin(router);
        }
    }

    componentDidUpdate() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        if (!loggedUser || !loggedUserPass) {
            redirectLogin(router);
        }
    }


    handleExitClick = () => {
        this.props.dispatch(fetchLogout());
    };


    handleConfig = () => {
        const { router } = this.context;
        redirectConfig(router);
    };


    render() {
        const { loggedUserName, isLoading } = this.props;
        let progressDiv;
        if (isLoading) {
            progressDiv = (
                <div className="fill-parent loading-bg vcenter" >
                    <div className="loadingDiv">
                        <CircularProgress size={100} thickness={7} color={'White'} style={loadingDivStyle} />
                    </div>
                </div>
        );
        }


        return (

            <MuiThemeProvider muiTheme={theme}>
                <div className="fill-parent">
                    { progressDiv }
                    <AppBar
                      title={`Usuário: ${loggedUserName}`}
                      showMenuIconButton={false}
                      iconElementLeft={<img src="img/icon.png" alt="logo" />}
                      iconElementRight={
                          <div>
                              <FlatButton
                                onTouchTap={this.handleExitClick}
                                backgroundColor={cristalSecondaryColor}
                                label="SAIR"
                              />
                              <FlatButton
                                onTouchTap={this.handleConfig}
                                backgroundColor={cristalSecondaryColor}
                                icon={<FontIcon className="fa fa-wrench" />}
                              />
                          </div>
                }
                    />
                    <div style={appNameStyle}>
                        <div className="templateLogobar" />
                        <p>
                          Encontre Meu Pet
                        </p>

                    </div>
                    {this.props.children}
                </div>

            </MuiThemeProvider>

        );
    }
}


const mapStateToProps = (state) => {
    const { loggedUserName, loggedUser, loggedUserPass, isLoading } = state;

    return {
        loggedUser,
        loggedUserName,
        loggedUserPass,
        isLoading
    };
};

export default connect(mapStateToProps)(Template);

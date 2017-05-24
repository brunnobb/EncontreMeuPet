/* eslint jsx-a11y/no-static-element-interactions: 0 */  // --> OFF
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';


import { loadingDivStyle,
 facebookButton, googleButton } from '../styles/styles';
import { gotFetchLogin, errorFetchLogin } from '../actions/mainActions';
import { } from '../actions/fetchActions';
import { redirectHome } from '../actions/redirectActions';
import { theme } from './Theme';


class Login extends React.Component {


    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };


    static propTypes = {

        isLoading: PropTypes.bool.isRequired,
        loggedUser: PropTypes.string.isRequired,
        loggedUserPass: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    state = {
        openSnackbar: false
    };

    componentDidMount() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        if (loggedUser && loggedUserPass) {
            redirectHome(router);
        }
    }

    componentDidUpdate() {
        const { loggedUser, loggedUserPass } = this.props;
        const { router } = this.context;
        if (loggedUser && loggedUserPass) {
            redirectHome(router);
        }
    }

    handleRequestClose = () => {
        this.setState({
            openSnackbar: false
        });
    };


    checkFacebook = () => {
        const { router } = this.context;
        const provider = new window.firebase.auth.FacebookAuthProvider();
        window.firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result);
  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
  // The signed-in user info.
            const user = result.user;
            localStorage.setItem('loggedUser', (user.email || ''));
            localStorage.setItem('loggedUserPass', (token || ''));
            localStorage.setItem('loggedUserUid', (user.uid || ''));
            localStorage.setItem('loggedUserName', (user.displayName || ''));
            this.props.dispatch(gotFetchLogin(user.email, token, user.displayName, user.uid));
            redirectHome(router);
  // ...
        }).catch((error) => {
  // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
  // The email of the user's account used.
            const email = error.email;
  // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;

            console.log(`errorCode ${errorCode}`);
            console.log(`errorMessage ${errorMessage}`);
            console.log(`email ${email}`);
            console.log(`credential ${credential}`);
            this.setState({
                openSnackbar: true
            });
            this.props.dispatch(errorFetchLogin('', '', ''));


  // ...
        });
    };


    checkGoogle = () => {
        const { router } = this.context;
        const provider = new window.firebase.auth.GoogleAuthProvider();
        window.firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const token = result.credential.accessToken;
      // The signed-in user info.
            const user = result.user;
            localStorage.setItem('loggedUser', (user.email || ''));
            localStorage.setItem('loggedUserUid', (user.uid || ''));
            localStorage.setItem('loggedUserPass', (token || ''));
            localStorage.setItem('loggedUserName', (user.displayName || ''));
            this.props.dispatch(gotFetchLogin(user.email, token, user.displayName, user.uid));
            redirectHome(router);

      // ...
        }).catch((error) => {
      // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
      // The email of the user's account used.
            const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
            const credential = error.credential;
            console.log(`errorCode ${errorCode}`);
            console.log(`errorMessage ${errorMessage}`);
            console.log(`email ${email}`);
            console.log(`credential ${credential}`);
            this.setState({
                openSnackbar: true
            });
            this.props.dispatch(errorFetchLogin('', '', ''));
      // ...
        });
    };


    render() {
        const { isLoading } = this.props;
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
                <div className="fill-parent login-bg vcenter" >
                    { progressDiv }
                    <div className="logobar" />

                    <DeviceOrientation>


                        <Orientation orientation="portrait" alwaysRender>
                            <div className="loginDiv loginSize">
                                <div className="inline width100">
                                    <div className="fill-parent overlay-bg">
                                        <div className="width100">
                                            <div className="small-margin">
                                                <RaisedButton
                                                  onTouchTap={this.checkFacebook}
                                                  label="Entrar Com Facebook"
                                                  labelColor="#FFFFFF"
                                                  style={facebookButton}
                                                  backgroundColor="#627aac"
                                                  fullWidth
                                                  icon={<FontIcon className="fa fa-facebook" />}
                                                />
                                            </div>

                                            <div className="small-margin">
                                                <RaisedButton
                                                  onTouchTap={this.checkGoogle}
                                                  label="Entrar Com Google"
                                                  labelColor="#FFFFFF"
                                                  style={googleButton}
                                                  backgroundColor="#D14836"
                                                  fullWidth
                                                  icon={<FontIcon className="fa fa-google" />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </Orientation>


                        <Orientation orientation="landscape" alwaysRender>
                            <div className="loginDiv loginSize">
                                <div className="inline half-width small-margin-vertical">
                                    <RaisedButton
                                      onTouchTap={this.checkFacebook}
                                      label="Entrar Com Facebook"
                                      labelColor="#FFFFFF"
                                      style={facebookButton}
                                      backgroundColor="#627aac"
                                      fullWidth
                                      icon={<FontIcon className="fa fa-facebook" />}
                                    />
                                </div>
                                <div className="inline half-width  small-margin-vertical">
                                    <RaisedButton
                                      onTouchTap={this.checkGoogle}
                                      label="Entrar com Google"
                                      labelColor="#FFFFFF"
                                      style={googleButton}
                                      backgroundColor="#D14836"
                                      fullWidth
                                      icon={<FontIcon className="fa fa-google" />}
                                    />
                                </div>

                            </div>
                        </Orientation>
                    </DeviceOrientation>

                    <Snackbar
                      open={this.state.openSnackbar}
                      message="Login inválido"
                      autoHideDuration={4000}
                      onRequestClose={this.handleRequestClose}
                    />
                </div>
            </MuiThemeProvider>


        );
    }
}

const mapStateToProps = (state) => {
    const {
      dispatch,
      loginUserName,
      loginPassword,
      isLoading,
      loginErrorMsg,
      loggedUser,
      loggedUserPass
    } = state;

    return {
        dispatch,
        loginUserName,
        loginPassword,
        isLoading,
        loginErrorMsg,
        loggedUser,
        loggedUserPass
    };
};

export default connect(mapStateToProps)(Login);

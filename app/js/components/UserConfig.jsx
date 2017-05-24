import React from 'react';
import { connect } from 'react-redux';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import UndoIcon from 'material-ui/svg-icons/content/undo';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import PropTypes from 'prop-types';

import { cristalSecondaryColor } from './Theme';
import {
  bottomNavParentStyle,
  bottomNavStyle,
  descriptionFieldStyle,
  sidePaddedDivStyle,
  leftListFieldStyle,
  rightListFieldStyle,
  listFieldStyle
} from '../styles/styles';
import { redirectHome } from '../actions/redirectActions';

class UserConfig extends React.Component {


    static contextTypes = {
        router: PropTypes.shape({
            history: PropTypes.object.isRequired
        })
    };

    static propTypes = {

        params: PropTypes.shape({
            filter: PropTypes.string.isRequired
        }).isRequired,
        solicitacaoList: PropTypes.arrayOf(PropTypes.shape({
            COD_SOCO: PropTypes.number.isRequired
        })).isRequired,
        dispatch: PropTypes.func.isRequired,
        loggedUser: PropTypes.string.isRequired,
        loggedUserPass: PropTypes.string.isRequired,
        loggedUserName: PropTypes.string.isRequired,
        loggedUserUid: PropTypes.string.isRequired,
        showAprovarMessage: PropTypes.bool.isRequired,
        resultAprovar: PropTypes.string.isRequired
    };

    state = {
        selectedIndex: 0,
        open: false,
        proposedIndex: 0
    };

    select = (index) => {
        const { router } = this.context;
        const { loggedUserName, loggedUser, loggedUserUid } = this.props;
        this.setState({ proposedIndex: index });
        if (index === 0) {
            redirectHome(router, '');
        } else {
            window.firebase.database().ref(`users/${loggedUserUid}`).set({
                uid: loggedUserUid,
                username: loggedUserName,
                email: loggedUser,
                contact: 'teste contato'
            });
            // this.handleOpen();
        }
    };


    render() {
        const { loggedUserName, loggedUser } = this.props;


        const actions = [
            <FlatButton
              label="Não"
              primary
            />,
            <FlatButton
              label="Sim"
              primary
            />
        ];


        return (
            <div style={bottomNavParentStyle}>
                <Dialog
                  title="Confirmação"
                  actions={actions}
                  modal
                  open={this.state.open}
                >
              Deseja Aprovar a solicitação?
          </Dialog>
                <div style={sidePaddedDivStyle}>
                    <TextField
                      disabled
                      multiLine
                      style={listFieldStyle}
                      floatingLabelText="Nome do Usuário"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value={loggedUserName}
                      fullWidth
                    />

                    <TextField
                      disabled
                      multiLine
                      style={listFieldStyle}
                      floatingLabelText="Email Usuário"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value={loggedUser}
                      fullWidth
                    />

                    <TextField
                      multiLine
                      style={listFieldStyle}
                      floatingLabelText="Contato"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value="{fieldContatoValue}"
                      fullWidth
                    />

                    <TextField
                      style={leftListFieldStyle}
                      floatingLabelText="CEP"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value="{contato}"
                      fullWidth
                    />


                    <TextField
                      style={listFieldStyle}
                      floatingLabelText="Endereço"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value="{contato}"
                      fullWidth
                    />


                    <TextField
                      style={leftListFieldStyle}
                      floatingLabelText="Numero"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value="{contato}"

                    />


                    <TextField
                      style={rightListFieldStyle}
                      floatingLabelText="Complemento"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value="{contato}"

                    />
                </div>
                <Paper zDepth={1} style={bottomNavStyle}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                          label="Retornar"
                          icon={<UndoIcon color={cristalSecondaryColor} />}
                          onTouchTap={() => this.select(0)}
                        />
                        <BottomNavigationItem
                          label="Salvar"
                          icon={<DoneIcon color={cristalSecondaryColor} />}
                          onTouchTap={() => this.select(1)}
                        />
                    </BottomNavigation>
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {
  loggedUser,
    loggedUserUid,
  loggedUserName,
  loggedUserPass,
  isLoading,
  solicitacaoList,
    showAprovarMessage,
    resultAprovar
} = state;

    return {
        loggedUser,
        loggedUserUid,
        loggedUserName,
        loggedUserPass,
        isLoading,
        solicitacaoList,
        showAprovarMessage,
        resultAprovar
    };
};

export default connect(mapStateToProps)(UserConfig);

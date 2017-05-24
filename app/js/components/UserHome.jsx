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
  leftListFieldStyle
} from '../styles/styles';
import { redirectHome } from '../actions/redirectActions';

class UserHome extends React.Component {


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
        this.setState({ proposedIndex: index });
        if (index === 0) {
            redirectHome(router, '');
        } else {
            // this.handleOpen();
        }
    };


    render() {
        const {
      solicitacaoList, showAprovarMessage, resultAprovar
    } = this.props;

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
                      style={leftListFieldStyle}
                      floatingLabelText="HOME"
                      floatingLabelStyle={descriptionFieldStyle}
                      floatingLabelFocusStyle={descriptionFieldStyle}
                      value="{item.COD_SOCO.toFixed(0)}"
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
  loggedUserPass,
  isLoading,
  solicitacaoList,
    showAprovarMessage,
    resultAprovar
} = state;

    return {
        loggedUser,
        loggedUserPass,
        isLoading,
        solicitacaoList,
        showAprovarMessage,
        resultAprovar
    };
};

export default connect(mapStateToProps)(UserHome);

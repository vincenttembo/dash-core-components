import PropTypes from 'prop-types';
import {Component} from 'react';


/**
 * ConfirmDialog is used to display the browser's native "confirm" modal,
 * with an optional message and two buttons ("OK" and "Cancel").
 * This ConfirmDialog can be used in conjunction with buttons when the user
 * is performing an action that should require an extra step of verification.
 */
export default class ConfirmDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayed: props.displayed
        };
        this._setStateAndProps = this._setStateAndProps.bind(this);
        this._update = this._update.bind(this);
        // this._update();
    }

    _setStateAndProps(value) {
        const { setProps } = this.props;
        this.setState(value);
        if (setProps) setProps(value);
    }

    componentWillReceiveProps(props) {
        this.setState({displayed: props.displayed})
    }

    _update() {
        const {
            message,
            cancel_n_clicks, cancel_n_clicks_timestamp,
            submit_n_clicks, submit_n_clicks_timestamp
        } = this.props;

        const displayed = this.state.displayed;

        if (displayed) {
            new Promise(resolve => resolve(window.confirm(message))).then(result => {
                this._setStateAndProps({
                    cancel_n_clicks: !result ?
                        cancel_n_clicks + 1 : cancel_n_clicks,
                    cancel_n_clicks_timestamp: !result ?
                        Date.now() :  cancel_n_clicks_timestamp,
                    submit_n_clicks: result ?
                        submit_n_clicks + 1: submit_n_clicks,
                    submit_n_clicks_timestamp: result ?
                        Date.now() : submit_n_clicks_timestamp,
                    displayed: false
                });
            });
        }
    }

    componentDidUpdate() {
        this._update()
    }

    render() {
        return null;
    }
}

ConfirmDialog.defaultProps = {
    submit_n_clicks: 0,
    submit_n_clicks_timestamp: -1,
    cancel_n_clicks: 0,
    cancel_n_clicks_timestamp: -1
};

ConfirmDialog.propTypes = {
    id: PropTypes.string,

    /**
     * Message to show in the popup.
     */
    message: PropTypes.string,
    /**
     * Number of times the submit button was clicked
     */
    submit_n_clicks: PropTypes.number,
    /**
     * Last time the submit button was clicked.
     */
    submit_n_clicks_timestamp: PropTypes.number,
    /**
     * Number of times the popup was canceled.
     */
    cancel_n_clicks: PropTypes.number,
    /**
     * Last time the cancel button was clicked.
     */
    cancel_n_clicks_timestamp: PropTypes.number,
    /**
     *  Set to true to send the ConfirmDialog.
     */
    displayed: PropTypes.bool,

    /**
     * Dash-assigned callback that gets fired when the value changes.
     */
    setProps: PropTypes.func
};

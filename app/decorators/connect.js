/**
 * Created by Will on 8/17/2015.
 */
import React from 'react';

const connect = (Component, store) => {
    return class Connect extends React.Component {
        constructor(props) {
            super(props);

            this.storeChanged = this.storeChanged.bind(this);
            this.state = store.getState();

            store.listen(this.storeChanged);
        }

        componentWillUnmount() {
            NoteStore.unlisten(this.storeChanged);
        }

        storeChanged(state) {
            this.setState(state);
        }

        render() {
            return <Component {...this.props} {...this.state} />;
        }
    };
};

export default (store) => {
    return (target) => connect(target, store);
};
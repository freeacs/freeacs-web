import * as React from 'react';

const componentWillUnMount = <P extends object>(onUnMount: (p: P) => void) => (Component: React.ComponentType<P>) =>
    class Wrapper extends React.Component<P> {
        public componentWillUnmount(): void {
            onUnMount(this.props);
        }

        public render() {
            return <Component {...this.props} />;
        }
    };

export default componentWillUnMount;
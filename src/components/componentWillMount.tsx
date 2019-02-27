import * as React from 'react';

const componentWillMount = <P extends object>(onMount: (p: P) => void) => (Component: React.ComponentType<P>) =>
    class Wrapper extends React.Component<P> {
        public componentWillMount(): void {
            onMount(this.props);
        }

        public render() {
            return <Component {...this.props} />;
        }
    };

export default componentWillMount;
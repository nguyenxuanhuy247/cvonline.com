import React from 'react';

export const TechnologyContext = React.createContext();

export class TechnologyProvider extends React.Component {
    render() {
        const { value, children } = this.props;
        return <TechnologyContext.Provider value={value}>{children}</TechnologyContext.Provider>;
    }
}

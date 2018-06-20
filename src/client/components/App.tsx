import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Texto = styled.h1`
    color: blue;
`;

interface Props {
    objeto?: any;
}

interface State {
    objeto: any;
}

export class App extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);
        let objeto = [];

        if(typeof document !== 'undefined') {
            objeto = (window as any).__INITIAL_DATA__ || []
            delete (window as any).__INITIAL_DATA__
        } else {
            objeto = this.props.objeto;
        }

        this.state = {
            objeto
        };

        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount () {
        this.fetchData()
            .then(({ data }) => {
                this.setState({ objeto: data });
            })
            .catch((error) => {
                console.log('Error: axios ~> client/components/App.tsx', error);
            });
    }
    fetchData (): any {
        return axios.get('https://jsonplaceholder.typicode.com/posts');
    }
    render () {
        console.log( typeof this.state.objeto );
        return (
            <div>
                <Texto>Hola Shit.!</Texto>
                <ol>
                    {
                        this.state.objeto.map((obj, id) => <li key={id}>{ obj.title }</li>)
                    }
                </ol>
            </div>
        );
    }
}

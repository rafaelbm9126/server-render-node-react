import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { User } from './User';

const Texto = styled.h1`
    color: blue;
`;

interface Props {
    objeto?: any;
}

interface State {
    objeto: any;
}

const Item = styled.li`
    margin-bottom: 10px;
`;

const Botones = styled.a`
    margin-left: 10px;
    margin-right: 10px;
    text-decoration: underline;
    color: #000;
    cursor: pointer;
`;

export class App extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props);
        let objeto: any = [];

        if(typeof document !== 'undefined') {
            objeto = (window as any).__INITIAL_DATA__ || []
            delete (window as any).__INITIAL_DATA__
        } else {
            objeto = this.props.objeto;
        }

        this.state = {
            objeto
        };

        this.fetchDataUsers = this.fetchDataUsers.bind(this);
    }
    fetchDataUsers (): any {
        return axios.get('https://jsonplaceholder.typicode.com/users');
    }
    fetchDataUser (IdUser: number, callback: any, IdPost?: number): void {
        axios.get('https://jsonplaceholder.typicode.com/users/' + IdUser)
            .then(({ data }) => {
                if (IdPost) {
                    this.fetchDataPost(IdPost, data, callback);
                } else {
                    this.fetchDataPostList(IdUser, data, callback);
                }
            })
            .catch((error: any) => {
                console.log('Error (1): axios ~> client/components/App.tsx', error);
            });
    }
    fetchDataPostList (IdUser: number, userData: any, callback: any): void {
        axios.get('https://jsonplaceholder.typicode.com/posts?userId=' + IdUser)
            .then(({ data }) => {
                callback({ user: userData, posts: data });
            })
            .catch((error: any) => {
                console.log('Error (2): axios ~> client/components/App.tsx', error);
            });
    }
    fetchDataPost (IdPost: number, userData: any, callback: any): void {
        axios.get('https://jsonplaceholder.typicode.com/posts/' + IdPost)
            .then(({ data }) => {
                this.fetchDataCommnets(IdPost, userData, data, callback);
            })
            .catch((error: any) => {
                console.log('Error (3): axios ~> client/components/App.tsx', error);
            });
    }
    fetchDataCommnets (IdPost: number, userData: any, postData: any, callback: any): void {
        axios.get('https://jsonplaceholder.typicode.com/comments?postId=' + IdPost)
            .then(({ data }) => {
                callback({ user: userData, posts: [{...postData, comments: data}] });
            })
            .catch((error: any) => {
                console.log('Error (4): axios ~> client/components/App.tsx', error);
            });
    }
    implementAjax (IdUser: number, IdPost?: number) {
        this.fetchDataUser(IdUser, (data) => {
            this.setState({ objeto: data });
        }, ((typeof IdPost === 'number') ? IdPost : null) );
    }
    render () {
        let { objeto } = this.state;
        return (
            <React.Fragment>
                {
                    (objeto.ListUser) ?
                        <React.Fragment>
                            <h1>Lista Usuarios</h1>
                            <ul>
                            {
                               objeto.ListUser.map((user, id) =>
                                    <Item key={id}>
                                        {user.name}
                                        <Botones href={'/user/' + user.id}>ver (link)</Botones>
                                        <Botones onClick={this.implementAjax.bind(this, user.id)}>ver (ajax)</Botones>
                                    </Item>
                                )
                            }
                            </ul>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <h1>Usuario</h1>
                            <User {...objeto} implementAjax={this.implementAjax} _self={this} />
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

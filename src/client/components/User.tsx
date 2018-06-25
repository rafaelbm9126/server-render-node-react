import * as React from 'react';
import styled from 'styled-components';

import { Post } from './Post';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Comments {
    id: number;
    name: string;
    email: string;
    body: string;
}

interface PostData {
    id: number;
    title: string;
    body: string;
    comments: [Comments];
}

interface Props {
    user: User;
    posts: [PostData];
    implementAjax: any;
    _self: any;
}

const WrapperUser = styled.div`
    display: block;
    width: 100%;
    height: auto;
    border: 0px;
`;

const WrapperPost = styled.div`
    display: block;
    width: 80%;
    height: auto;
    border: 0px;
    margin-left: 20%;
`;

const Title = styled.h1`
    color: red;
`;

const Item = styled.div`
`;

const ItemName = styled.span`
    color: black;
    font-weight: bold;
`;

const ItemText = styled.span`
    color: black;
`;

const Botones = styled.a`
    margin-left: 10px;
    margin-right: 10px;
    text-decoration: underline;
    color: #000;
    cursor: pointer;
`;

function User ({ user, posts, implementAjax, _self }: Props) {
    return (
        <WrapperUser>
            <Item>
                <ItemName>Id:&nbsp;&nbsp;</ItemName>
                <ItemText>{user.id}</ItemText>
            </Item>
            <Item>
                <ItemName>Name:&nbsp;&nbsp;</ItemName>
                <ItemText>{user.name}</ItemText>
            </Item>
            <Item>
                <ItemName>Email:&nbsp;&nbsp;</ItemName>
                <ItemText>{user.email}</ItemText>
            </Item>
            <Item>
                <Title>Posts</Title>
            </Item>
            <WrapperPost>
                {
                    posts.map((post: PostData, id: number) =>
                        <React.Fragment key={id}>
                            <Post {...post} />
                            {
                                (posts.length > 1) ?
                                    <React.Fragment>
                                        <Botones href={'/user/' + user.id + '/post/' + post.id}>ver (link)</Botones>
                                        <Botones onClick={implementAjax.bind(_self, user.id, post.id)}>ver (ajax)</Botones>
                                        <hr />
                                    </React.Fragment>
                                :
                                    null
                            }
                        </React.Fragment>
                    )
                }
            </WrapperPost>
        </WrapperUser>
    );
}

export { User };

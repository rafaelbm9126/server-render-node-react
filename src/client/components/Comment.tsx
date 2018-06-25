import * as React from 'react';
import styled from 'styled-components';

interface Props {
    id: number;
    name: string;
    email: string;
    body: string;
}

const Item = styled.div`
`;

const ItemName = styled.span`
    color: black;
    font-weight: bold;
`;

const ItemText = styled.span`
    color: black;
`;

function Commnent ({ id, name, email, body }: Props) {
    return (
        <React.Fragment>
            <Item>
                <ItemName>Id (Commnet):&nbsp;&nbsp;</ItemName>
                <ItemText>{id}</ItemText>
            </Item>
            <Item>
                <ItemName>Name:&nbsp;&nbsp;</ItemName>
                <ItemText>{name}</ItemText>
            </Item>
            <Item>
                <ItemName>Email:&nbsp;&nbsp;</ItemName>
                <ItemText>{email}</ItemText>
            </Item>
            <Item>
                <ItemName>Body:&nbsp;&nbsp;</ItemName>
                <ItemText>{body}</ItemText>
            </Item>
        </React.Fragment>
    );
}

export { Commnent };

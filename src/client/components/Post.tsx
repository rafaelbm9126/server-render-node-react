import * as React from 'react';
import styled from 'styled-components';

import { Commnent } from './Comment';

interface Comments {
    id: number;
    name: string;
    email: string;
    body: string;
}

interface Props {
    id: number;
    title: string;
    body: string;
    comments: [Comments];
}

const Title = styled.h3`
    color: green;
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

const WrapperComments = styled.div`
    width: 60%;
    height: auto;
    margin-left: 40%;
`;

function Post ({ id, title, body, comments }: Props) {
    return (
        <React.Fragment>
            <Item>
                <ItemName>Id (Post):&nbsp;&nbsp;</ItemName>
                <ItemText>{id}</ItemText>
            </Item>
            <Item>
                <ItemName>Title:&nbsp;&nbsp;</ItemName>
                <ItemText>{title}</ItemText>
            </Item>
            {
                (comments) ?
                    <React.Fragment>
                        <Item>
                            <ItemName>Body:&nbsp;&nbsp;</ItemName>
                            <ItemText>{body}</ItemText>
                        </Item>
                        <Item>
                            <Title>Comments: ({ (comments) ? comments.length : 0 })</Title>
                        </Item>
                    </React.Fragment>
                :
                    null
            }
            <WrapperComments>
                {
                    (comments) ?
                        comments.map((comment: Comments, id: number) =>
                            <React.Fragment key={id}>
                                <Commnent {...comment} />
                                <hr />
                            </React.Fragment>
                        )
                    :
                        null
                }
            </WrapperComments>
        </React.Fragment>
    );
}

export { Post };

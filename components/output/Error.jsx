import React, { useContext, useEffect, useState } from 'react';

const HTTPError = ({httpErrorCode,message, image, style, links}) => {
    return (
        <View style={style.container}>
            <Image source={image} style={style.image}/>
            <Title style={style.title}>
                Error {httpErrorCode}
            </Title>
            <Paragraph style={style.description} >
                {message}
            </Paragraph>
            {
                forEach(links, (link) => {
                    <Link
                        href={link.href}
                        style={style.link} >
                        {link.label}
                    </Link>
                })
            }
        </View>
    );
};
import React from 'react';

function Hello({color, name, isSpecial }) {
    return (
    <div style={{color:color}}>
        안녕하세요!? {name} 
        <b>{isSpecial ? ' 안녕해' : ' 안녕못해'}</b>
    </div>
    )
}

Hello.defaultProps = {
    name:"이름없음"
};
export default Hello;
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
    color?: string;
}

function SvgComponent(props: IconProps) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={6}
            height={25}
            viewBox="0 0 6 25"
            fill="none"
            {...props}
        >
            <Path
                d="M.778 13.267c.033 1.39.94 2.353 2.206 2.353 1.297 0 2.205-.962 2.238-2.353L5.514 3.21C5.546 1.605 4.508.5 2.984.5 1.492.5.454 1.605.486 3.21l.292 10.057zM0 21.255C0 23.074 1.33 24.5 2.984 24.5c1.686 0 2.984-1.426 3.016-3.245 0-1.783-1.33-3.21-3.016-3.21C1.33 18.045 0 19.472 0 21.255z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;

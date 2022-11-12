import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
    color?: string;
}

function SvgComponent(props: IconProps) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            {...props}
        >
            <Path
                d="M2.38 7.677l4.238.015c.079 0 .097.014.097.097l.01 4.209c0 .995 1.234 1.221 1.675.26l4.318-9.327c.456-.994-.317-1.675-1.283-1.227L2.065 6.03c-.878.402-.701 1.641.315 1.647z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;

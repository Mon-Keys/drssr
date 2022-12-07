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
            height={22}
            viewBox="0 0 14 22"
            fill="none"
            {...props}
        >
            <Path
                d="M14 20.5943C14 20.3023 13.8724 20.025 13.6508 19.835L3.34328 11L13.6508 2.16499C13.8724 1.97501 14 1.69766 14 1.40574L14 1.17422C14 0.319865 12.9979 -0.141044 12.3492 0.414962L0.885799 10.2407C0.420188 10.6398 0.420187 11.3602 0.885799 11.7593L12.3492 21.585C12.9979 22.141 14 21.6801 14 20.8258L14 20.5943Z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;

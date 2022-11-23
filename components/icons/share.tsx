import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
    color?: string;
}

function SvgComponent(props: IconProps) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={48}
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M17.6266 5C16.3291 5 15.2848 3.8796 15.2848 2.49164C15.2848 1.1204 16.3291 0 17.6266 0C18.9399 0 20 1.1204 20 2.49164C20 3.8796 18.9399 5 17.6266 5ZM10 5C8.70253 5 7.6424 3.8796 7.6424 2.49164C7.6424 1.1204 8.70253 0 10 0C11.2975 0 12.3576 1.1204 12.3576 2.49164C12.3576 3.8796 11.2975 5 10 5ZM2.35759 5C1.06013 5 0 3.8796 0 2.49164C0 1.1204 1.06013 0 2.35759 0C3.65506 0 4.71519 1.1204 4.71519 2.49164C4.71519 3.8796 3.65506 5 2.35759 5Z"
                fill={props.color}
            />
        </Svg>
    );
}

export default SvgComponent;

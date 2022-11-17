import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath, SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
    color?: string;
}

const SvgComponent = (props: IconProps) => (
    <Svg
        width={16}
        height={18}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {/*@ts-ignore*/}
        <G clipPath="url(#a)">
            <Path
                d="M8 8.848c2.127 0 3.85-1.881 3.85-4.184 0-2.268-1.723-4.07-3.85-4.07-2.118 0-3.858 1.829-3.85 4.088C4.16 6.976 5.873 8.848 8 8.848ZM8 7.31c-1.213 0-2.241-1.152-2.241-2.628C5.75 3.24 6.779 2.132 8 2.132c1.23 0 2.241 1.09 2.241 2.532 0 1.477-1.02 2.646-2.241 2.646ZM2.516 17.02h10.96c1.52 0 2.25-.483 2.25-1.52 0-2.417-3.015-5.634-7.726-5.634-4.71 0-7.734 3.217-7.734 5.634 0 1.037.73 1.52 2.25 1.52Zm-.273-1.538c-.21 0-.29-.07-.29-.228 0-1.345 2.171-3.85 6.047-3.85 3.867 0 6.038 2.505 6.038 3.85 0 .158-.079.228-.29.228H2.243Z"
                fill={props.color}
            />
        </G>
        <Defs>
            {/*@ts-ignore*/}
            <ClipPath id="a">
                <Path fill={props.color} d="M0 0h16v18H0z" />
            </ClipPath>
        </Defs>
    </Svg>
);

export default SvgComponent;
